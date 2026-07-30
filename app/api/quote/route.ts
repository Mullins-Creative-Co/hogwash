import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type QuoteRequest = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  service?: unknown;
  area?: unknown;
  notes?: unknown;
  website?: unknown;
};

const clean = (value: unknown, maxLength: number) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character,
  );

export async function POST(request: Request) {
  let body: QuoteRequest;

  try {
    body = (await request.json()) as QuoteRequest;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Silently accept bot submissions caught by the honeypot.
  if (clean(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 100);
  const phone = clean(body.phone, 40);
  const email = clean(body.email, 200);
  const service = clean(body.service, 100);
  const area = clean(body.area, 200);
  const notes = clean(body.notes, 2000);

  if (!name || !phone || !service || !area) {
    return NextResponse.json(
      { error: "Name, phone, service, and address are required." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to =
    process.env.QUOTE_RECIPIENT_EMAIL ??
    "hogwashpressurecleaning@gmail.com";
  const from = process.env.QUOTE_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error("Quote email environment variables are not configured.");
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const safe = {
    name: escapeHtml(name),
    phone: escapeHtml(phone),
    email: escapeHtml(email || "Not provided"),
    service: escapeHtml(service),
    area: escapeHtml(area || "Not provided"),
    notes: escapeHtml(notes || "None").replace(/\n/g, "<br />"),
  };

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email || undefined,
    subject: `New Hogwash quote request — ${name}`,
    html: `
      <h1>New quote request</h1>
      <p><strong>Name:</strong> ${safe.name}</p>
      <p><strong>Phone:</strong> <a href="tel:${safe.phone}">${safe.phone}</a></p>
      <p><strong>Email:</strong> ${safe.email}</p>
      <p><strong>Service:</strong> ${safe.service}</p>
      <p><strong>Address:</strong> ${safe.area}</p>
      <p><strong>Notes:</strong><br />${safe.notes}</p>
      <p style="margin-top:32px;font-size:10px;line-height:1.4;color:#94a3b8;">
        <a
          href="https://mullinscreative.company"
          style="color:#94a3b8;text-decoration:none;"
        >mullinscreative.company</a>
      </p>
    `,
    text: [
      "New Hogwash quote request",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email || "Not provided"}`,
      `Service: ${service}`,
      `Address: ${area}`,
      `Notes: ${notes || "None"}`,
      "",
      "mullinscreative.company",
    ].join("\n"),
  });

  if (error) {
    console.error("Resend quote email failed:", error);
    return NextResponse.json(
      { error: "Email could not be sent." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
