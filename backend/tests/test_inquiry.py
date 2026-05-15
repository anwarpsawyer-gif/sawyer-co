"""Backend tests for Sawyer & Co. institutional API."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://sawyer-institution-1.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Root ----------
class TestRoot:
    def test_root_returns_institutional_message(self, client):
        r = client.get(f"{API}/", timeout=15)
        assert r.status_code == 200
        body = r.json()
        assert "message" in body
        assert "Sawyer" in body["message"]


# ---------- Inquiry creation ----------
class TestInquiryCreate:
    def test_create_inquiry_valid(self, client):
        payload = {
            "name": "TEST Wellington Hayes",
            "email": "test.wellington@example.com",
            "category": "Advisory",
            "message": "We are evaluating institutional advisory for our family office mandate.",
            "organization": "TEST Hayes Family Office",
        }
        r = client.post(f"{API}/inquiry", json=payload, timeout=30)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) >= 8
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["category"] == "Advisory"
        assert data["message"] == payload["message"]
        assert data["organization"] == payload["organization"]
        assert "received_at" in data
        # ISO timestamp parseable
        from datetime import datetime
        datetime.fromisoformat(data["received_at"].replace("Z", "+00:00"))
        # store id for downstream test
        pytest.created_inquiry_id = data["id"]

    def test_inquiry_persisted_in_list(self, client):
        r = client.get(f"{API}/inquiry", timeout=15)
        assert r.status_code == 200
        rows = r.json()
        assert isinstance(rows, list)
        ids = [row["id"] for row in rows]
        cid = getattr(pytest, "created_inquiry_id", None)
        assert cid is not None, "create test must run first"
        assert cid in ids

    def test_create_inquiry_all_categories(self, client):
        for cat in ["Capital", "Partnership", "Media"]:
            payload = {
                "name": f"TEST {cat} Caller",
                "email": f"test.{cat.lower()}@example.com",
                "category": cat,
                "message": f"Institutional {cat} inquiry of substantive nature.",
            }
            r = client.post(f"{API}/inquiry", json=payload, timeout=20)
            assert r.status_code == 200, f"{cat}: {r.text}"
            assert r.json()["category"] == cat


# ---------- Validation ----------
class TestInquiryValidation:
    def test_rejects_invalid_category(self, client):
        payload = {
            "name": "TEST Bad Cat",
            "email": "test.badcat@example.com",
            "category": "Sales",  # not allowed
            "message": "Trying an invalid category for the inquiry form.",
        }
        r = client.post(f"{API}/inquiry", json=payload, timeout=15)
        assert r.status_code == 422

    def test_rejects_invalid_email(self, client):
        payload = {
            "name": "TEST Bad Email",
            "email": "not-an-email",
            "category": "Advisory",
            "message": "Valid length message but with an invalid email.",
        }
        r = client.post(f"{API}/inquiry", json=payload, timeout=15)
        assert r.status_code == 422

    def test_rejects_short_message(self, client):
        payload = {
            "name": "TEST Short",
            "email": "test.short@example.com",
            "category": "Advisory",
            "message": "tooshort",  # 8 chars, below min 10
        }
        r = client.post(f"{API}/inquiry", json=payload, timeout=15)
        assert r.status_code == 422

    def test_rejects_missing_required_fields(self, client):
        r = client.post(f"{API}/inquiry", json={"name": "x"}, timeout=15)
        assert r.status_code == 422
