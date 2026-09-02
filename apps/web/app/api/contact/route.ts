import "server-only";
import { NextResponse } from "next/server";

/**
 * Contact form handler.
 *
 * Like the quiz, this degrades honestly: with no mail provider configured it
 * logs the enquiry server-side and returns success, so the form never breaks
 * for a customer. Wire Brevo (or any transactional provider) here before
 * launch — an enquiry that only reaches a log file is an enquiry you will miss.
 */

const MAX_MESSAGE = 4000;

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const topic = String(body.topic ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "That email doesn't look right." }, { status: 400 });
  }

  if (message.length > MAX_MESSAGE) {
    return NextResponse.json({ error: "That message is a little too long." }, { status: 400 });
  }

  // TODO (before launch): send via Brevo and store a copy.
  //   await fetch("https://api.brevo.com/v3/smtp/email", { ... BREVO_API_KEY ... })
  // Until then the enquiry is logged so nothing is silently swallowed in dev.
  console.info(
    `[contact] ${name} <${email}> — ${topic || "no topic"}\n${message.slice(0, 500)}`,
  );

  return NextResponse.json({ ok: true });
}
