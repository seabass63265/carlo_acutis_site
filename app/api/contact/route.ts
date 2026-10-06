import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const FIELD_LABELS: [string, string][] = [
  ["name", "Name"],
  ["organization", "Organization"],
  ["email", "Email"],
  ["audience", "Who Are You"],
  ["reason", "Regarding"],
  ["message", "Message"],
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MAX_LENGTH = 5000;
const FIELD_MAX_LENGTH = 300;

// Plain text only (Resend `text:`). If this ever becomes `html:`, every value
// must be HTML-escaped first, or user input becomes injected markup in the inbox.
function buildNotificationBody(values: Record<string, string>): string {
  const lines = ["New contact form message", ""];
  for (const [key, label] of FIELD_LABELS) {
    if (values[key]) lines.push(`${label}: ${values[key]}`);
  }
  return lines.join("\n");
}

export async function POST(request: NextRequest) {
  let raw: Record<string, unknown>;
  try {
    raw = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Honeypot: "company" is hidden from real users, so only bots fill it.
  // Respond as if it worked so they can't tell the submission was dropped.
  if (typeof raw.company === "string" && raw.company.trim()) {
    return NextResponse.json({ ok: true });
  }

  const values: Record<string, string> = {};
  for (const [key] of FIELD_LABELS) {
    const value = raw[key];
    if (typeof value === "string" && value.trim()) {
      const cap = key === "message" ? MESSAGE_MAX_LENGTH : FIELD_MAX_LENGTH;
      values[key] = value.trim().slice(0, cap);
    }
  }

  if (!values.name || !values.message || !values.email || !EMAIL_PATTERN.test(values.email)) {
    return NextResponse.json({ error: "Name, a valid email, and a message are required" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Contact form is missing RESEND_API_KEY or CONTACT_TO_EMAIL");
    return NextResponse.json({ error: "Failed to deliver message" }, { status: 502 });
  }

  const resend = new Resend(apiKey);
  const from = process.env.CONTACT_FROM_EMAIL || "Friends of Carlo <onboarding@resend.dev>";

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: values.email,
    subject: `New contact message from ${values.name}`,
    text: buildNotificationBody(values),
  });

  if (error) {
    console.error("Failed to send contact notification email:", error.message);
    return NextResponse.json({ error: "Failed to deliver message" }, { status: 502 });
  }

  // Confirmation to the submitter is best-effort: the notification above is what matters.
  const { error: confirmError } = await resend.emails.send({
    from,
    to: values.email,
    subject: "We got your message — Friends of St. Carlo Acutis",
    text: [
      `Hi ${values.name},`,
      "",
      "Thank you for reaching out to Friends of St. Carlo Acutis. A member of our team will reply within 2–3 business days.",
      "",
      "God bless,",
      "Friends of St. Carlo Acutis",
    ].join("\n"),
  });
  if (confirmError) {
    console.error("Failed to send contact confirmation email:", confirmError.message);
  }

  return NextResponse.json({ ok: true });
}
