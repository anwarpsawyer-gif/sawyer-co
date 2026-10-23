from fastapi import FastAPI, APIRouter, HTTPException, Request, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import hmac
import html
import logging
import time
from collections import defaultdict, deque
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Literal
import uuid
import resend
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend setup
resend.api_key = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
INQUIRY_DESTINATION = os.environ.get('INQUIRY_DESTINATION', 'inquiries@sawyerandco.com')

ADMIN_API_KEY = os.environ.get('ADMIN_API_KEY', '')

# Inquiry rate limit: INQUIRY_LIMIT submissions per INQUIRY_WINDOW seconds, per client IP.
# In-memory, so it is per process; put a shared limiter in front if you scale out.
INQUIRY_LIMIT = int(os.environ.get('INQUIRY_LIMIT', '5'))
INQUIRY_WINDOW = int(os.environ.get('INQUIRY_WINDOW', '3600'))
_inquiry_hits: dict[str, deque] = defaultdict(deque)

# Create the main app without a prefix
app = FastAPI(title="Sawyer & Co. Institutional API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
InquiryCategory = Literal["Advisory", "Capital", "Partnership", "Media"]


class InquiryCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    category: InquiryCategory
    message: str = Field(min_length=10, max_length=5000)
    organization: str | None = Field(default=None, max_length=160)


class Inquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    category: InquiryCategory
    message: str
    organization: str | None = None
    received_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---------- Security helpers ----------
def require_admin(request: Request) -> None:
    """Bearer-token gate for admin-only routes. Disabled until ADMIN_API_KEY is set."""
    if not ADMIN_API_KEY:
        raise HTTPException(status_code=404, detail="Not found")
    supplied = request.headers.get("authorization", "").removeprefix("Bearer ").strip()
    if not hmac.compare_digest(supplied.encode(), ADMIN_API_KEY.encode()):
        raise HTTPException(status_code=401, detail="Unauthorized", headers={"WWW-Authenticate": "Bearer"})


def _client_ip(request: Request) -> str:
    # The last X-Forwarded-For hop is the one our own proxy appended; earlier hops are client-controlled.
    forwarded = request.headers.get("x-forwarded-for", "")
    if forwarded:
        return forwarded.split(",")[-1].strip()
    return request.client.host if request.client else "unknown"


def rate_limit_inquiry(request: Request) -> None:
    now = time.monotonic()
    hits = _inquiry_hits[_client_ip(request)]
    while hits and now - hits[0] > INQUIRY_WINDOW:
        hits.popleft()
    if len(hits) >= INQUIRY_LIMIT:
        raise HTTPException(status_code=429, detail="Too many inquiries. Please try again later.")
    hits.append(now)


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Sawyer & Co. — Institutional API online."}


def _build_inquiry_email_html(inquiry: Inquiry) -> str:
    e = html.escape
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="font-family: Inter, Helvetica, Arial, sans-serif; background:#0D1B2A; padding:32px;">
      <tr>
        <td>
          <table width="600" align="center" cellpadding="0" cellspacing="0" style="background:#F5F0E8; padding:48px;">
            <tr><td style="font-family: 'Cormorant Garamond', Georgia, serif; font-size:24px; color:#0D1B2A; letter-spacing:1px;">SAWYER &amp; CO.</td></tr>
            <tr><td style="padding-top:8px; font-family: 'Courier New', monospace; font-size:11px; color:#7A8B94; letter-spacing:2px;">[ NEW INSTITUTIONAL INQUIRY ]</td></tr>
            <tr><td style="padding-top:32px; border-top:1px solid #C9B99A;"></td></tr>
            <tr><td style="padding-top:24px; font-size:14px; color:#1C1C1C; line-height:1.7;">
              <strong>Category:</strong> {e(inquiry.category)}<br/>
              <strong>Name:</strong> {e(inquiry.name)}<br/>
              <strong>Email:</strong> {e(inquiry.email)}<br/>
              <strong>Organization:</strong> {e(inquiry.organization or '—')}<br/>
              <strong>Received:</strong> {inquiry.received_at.isoformat()}<br/>
            </td></tr>
            <tr><td style="padding-top:24px; font-family: 'Courier New', monospace; font-size:11px; color:#7A8B94; letter-spacing:2px;">[ MESSAGE ]</td></tr>
            <tr><td style="padding-top:8px; font-size:14px; color:#1C1C1C; line-height:1.8; white-space:pre-wrap;">{e(inquiry.message)}</td></tr>
            <tr><td style="padding-top:40px; font-family: 'Courier New', monospace; font-size:10px; color:#7A8B94; letter-spacing:2px;">REF :: {inquiry.id}</td></tr>
          </table>
        </td>
      </tr>
    </table>
    """


async def _send_inquiry_email(inquiry: Inquiry) -> str | None:
    if not resend.api_key:
        logger.warning("RESEND_API_KEY not configured — skipping email delivery.")
        return None
    params = {
        "from": SENDER_EMAIL,
        "to": [INQUIRY_DESTINATION],
        "subject": f"[Sawyer & Co.] {inquiry.category} Inquiry — {' '.join(inquiry.name.split())}",
        "html": _build_inquiry_email_html(inquiry),
        "reply_to": inquiry.email,
    }
    try:
        result = await asyncio.to_thread(resend.Emails.send, params)
        return result.get("id") if isinstance(result, dict) else None
    except Exception as e:
        logger.error(f"Resend delivery failed: {e}")
        return None


@api_router.post("/inquiry", response_model=Inquiry, dependencies=[Depends(rate_limit_inquiry)])
async def submit_inquiry(payload: InquiryCreate):
    inquiry = Inquiry(**payload.model_dump())
    doc = inquiry.model_dump()
    doc['received_at'] = doc['received_at'].isoformat()
    try:
        await db.inquiries.insert_one(doc)
    except Exception as e:
        logger.error(f"Inquiry storage failed: {e}")
        raise HTTPException(status_code=500, detail="Unable to record inquiry.")

    email_id = await _send_inquiry_email(inquiry)
    logger.info(f"Inquiry {inquiry.id} stored. Email id: {email_id}")
    return inquiry


@api_router.get("/inquiry", response_model=List[Inquiry], dependencies=[Depends(require_admin)])
async def list_inquiries():
    rows = await db.inquiries.find({}, {"_id": 0}).sort("received_at", -1).to_list(500)
    for r in rows:
        if isinstance(r.get('received_at'), str):
            r['received_at'] = datetime.fromisoformat(r['received_at'])
    return rows


# Include router
app.include_router(api_router)

# No wildcard default: set CORS_ORIGINS (comma-separated) to add origins.
ALLOWED_ORIGINS = [
    o.strip() for o in os.environ.get('CORS_ORIGINS', 'https://sawyer-co.vercel.app').split(',')
    if o.strip() and o.strip() != '*'
]
app.add_middleware(
    CORSMiddleware,
    allow_credentials=False,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)



@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
