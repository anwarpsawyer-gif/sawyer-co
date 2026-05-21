import { useState } from "react";
import { toast } from "sonner";

const CATEGORIES = ["Advisory", "Capital", "Partnership", "Media"];

// ─── Drop your Formspree form ID here ────────────────────────────────────────
// 1. Go to https://formspree.io → create free account → New Form
// 2. Copy the form ID (e.g. "xpzvwkqb") and paste below
// 3. Formspree emails submissions directly to you — no backend needed
// ─────────────────────────────────────────────────────────────────────────────
const FORMSPREE_ID = process.env.REACT_APP_FORMSPREE_ID || "";

// Falls back to your existing backend if REACT_APP_BACKEND_URL is set
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function InquiryForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        organization: "",
        category: "Advisory",
        message: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone] = useState(false);

    const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

    const submit = async (e) => {
        e.preventDefault();
        if (submitting) return;
        if (!form.name || !form.email || !form.message || form.message.trim().length < 5) {
            if (!form.name) { toast.error("Please enter your name."); return; }
            if (!form.email) { toast.error("Please enter your email."); return; }
            if (!form.message || form.message.trim().length < 5) { toast.error("Please enter a brief message (at least 5 characters)."); return; }
            return;
        }
        setSubmitting(true);
        try {
            let res;

            if (BACKEND_URL) {
                // Use existing backend if configured
                res = await fetch(`${BACKEND_URL}/api/inquiry`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                });
            } else if (FORMSPREE_ID) {
                // Formspree fallback
                res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        name: form.name,
                        email: form.email,
                        organization: form.organization,
                        category: form.category,
                        message: form.message,
                    }),
                });
            } else {
                throw new Error("No submission endpoint configured.");
            }

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.detail || err.error || "Submission failed.");
            }

            setDone(true);
            toast.success("Inquiry received. The institution will respond privately.");
        } catch (err) {
            toast.error(err.message || "Unable to submit at this time.");
        } finally {
            setSubmitting(false);
        }
    };

    if (done) {
        return (
            <div
                data-testid="inquiry-success"
                className="max-w-xl mx-auto text-center"
            >
                <p className="inst-label text-sand">[ RECEIVED ]</p>
                <p className="font-display text-3xl md:text-4xl mt-4 text-ivory">
                    The institution acknowledges your inquiry.
                </p>
                <p className="text-silver mt-6 font-body text-sm leading-relaxed">
                    Correspondence is handled privately. A member of the firm
                    will respond from a discreet channel within the institution's
                    natural advisory rhythm.
                </p>
            </div>
        );
    }

    return (
        <form
            data-testid="inquiry-form"
            onSubmit={submit}
            className="max-w-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8"
        >
            <div className="md:col-span-1">
                <span className="inst-label">[ 01 ] NAME</span>
                <input
                    data-testid="inquiry-name"
                    className="inst-input mt-3"
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Full name"
                    required
                />
            </div>
            <div className="md:col-span-1">
                <span className="inst-label">[ 02 ] CORRESPONDENCE</span>
                <input
                    data-testid="inquiry-email"
                    className="inst-input mt-3"
                    value={form.email}
                    onChange={update("email")}
                    type="email"
                    placeholder="private@channel.com"
                    required
                />
            </div>
            <div className="md:col-span-2">
                <span className="inst-label">[ 03 ] INSTITUTION</span>
                <input
                    data-testid="inquiry-organization"
                    className="inst-input mt-3"
                    value={form.organization}
                    onChange={update("organization")}
                    placeholder="Organization / family office (optional)"
                />
            </div>
            <div className="md:col-span-2">
                <span className="inst-label">[ 04 ] CATEGORY</span>
                <div className="mt-4 flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => {
                        const active = form.category === cat;
                        return (
                            <button
                                type="button"
                                key={cat}
                                data-testid={`inquiry-category-${cat.toLowerCase()}`}
                                onClick={() => setForm({ ...form, category: cat })}
                                className="px-5 py-3 text-[10px] tracking-[0.32em] uppercase transition-all duration-500 border"
                                style={{
                                    color: active ? "#0D1B2A" : "#F5F0E8",
                                    background: active ? "#C9B99A" : "transparent",
                                    borderColor: active
                                        ? "#C9B99A"
                                        : "rgba(201,185,154,0.35)",
                                }}
                            >
                                {cat}
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="md:col-span-2">
                <span className="inst-label">[ 05 ] INQUIRY</span>
                <textarea
                    data-testid="inquiry-message"
                    className="inst-input mt-3 resize-none"
                    rows={5}
                    value={form.message}
                    onChange={update("message")}
                    placeholder="Briefly describe the nature of your inquiry."
                    required
                />
            </div>
            <div className="md:col-span-2 mt-4">
                <button
                    type="submit"
                    disabled={submitting}
                    data-testid="inquiry-submit"
                    className="inst-btn inst-btn--solid w-full md:w-auto justify-center"
                    style={{ opacity: submitting ? 0.5 : 1 }}
                >
                    {submitting ? "TRANSMITTING…" : "INQUIRE PRIVATELY"}
                </button>
            </div>
        </form>
    );
}
