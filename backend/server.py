from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
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

# Create the main app without a prefix
app = FastAPI(title="Sawyer & Co. Institutional API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


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


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Sawyer & Co. — Institutional API online."}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    rows = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for r in rows:
        if isinstance(r.get('timestamp'), str):
            r['timestamp'] = datetime.fromisoformat(r['timestamp'])
    return rows


def _build_inquiry_email_html(inquiry: Inquiry) -> str:
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="font-family: Inter, Helvetica, Arial, sans-serif; background:#0D1B2A; padding:32px;">
      <tr>
        <td>
          <table width="600" align="center" cellpadding="0" cellspacing="0" style="background:#F5F0E8; padding:48px;">
            <tr><td style="font-family: 'Cormorant Garamond', Georgia, serif; font-size:24px; color:#0D1B2A; letter-spacing:1px;">SAWYER &amp; CO.</td></tr>
            <tr><td style="padding-top:8px; font-family: 'Courier New', monospace; font-size:11px; color:#7A8B94; letter-spacing:2px;">[ NEW INSTITUTIONAL INQUIRY ]</td></tr>
            <tr><td style="padding-top:32px; border-top:1px solid #C9B99A;"></td></tr>
            <tr><td style="padding-top:24px; font-size:14px; color:#1C1C1C; line-height:1.7;">
              <strong>Category:</strong> {inquiry.category}<br/>
              <strong>Name:</strong> {inquiry.name}<br/>
              <strong>Email:</strong> {inquiry.email}<br/>
              <strong>Organization:</strong> {inquiry.organization or '—'}<br/>
              <strong>Received:</strong> {inquiry.received_at.isoformat()}<br/>
            </td></tr>
            <tr><td style="padding-top:24px; font-family: 'Courier New', monospace; font-size:11px; color:#7A8B94; letter-spacing:2px;">[ MESSAGE ]</td></tr>
            <tr><td style="padding-top:8px; font-size:14px; color:#1C1C1C; line-height:1.8; white-space:pre-wrap;">{inquiry.message}</td></tr>
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
        "subject": f"[Sawyer & Co.] {inquiry.category} Inquiry — {inquiry.name}",
        "html": _build_inquiry_email_html(inquiry),
        "reply_to": inquiry.email,
    }
    try:
        result = await asyncio.to_thread(resend.Emails.send, params)
        return result.get("id") if isinstance(result, dict) else None
    except Exception as e:
        logger.error(f"Resend delivery failed: {e}")
        return None


@api_router.post("/inquiry", response_model=Inquiry)
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


@api_router.get("/inquiry", response_model=List[Inquiry])
async def list_inquiries():
    rows = await db.inquiries.find({}, {"_id": 0}).sort("received_at", -1).to_list(500)
    for r in rows:
        if isinstance(r.get('received_at'), str):
            r['received_at'] = datetime.fromisoformat(r['received_at'])
    return rows


# Include router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
