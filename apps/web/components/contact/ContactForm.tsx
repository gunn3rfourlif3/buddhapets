"use client";

import { useState } from "react";
import { CheckDot } from "@/components/ui/icons";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError(null);

    const data = Object.fromEntries(new FormData(event.currentTarget));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("sent");
    } catch {
      setStatus("error");
      setError("That didn't send. Email us directly at hello@buddhapets.co.za and we'll pick it up.");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-card border border-line bg-white p-8 shadow-soft">
        <CheckDot size={28} />
        <h2 className="text-[clamp(1.5rem,3vw,2rem)]">Message received</h2>
        <p className="max-w-[46ch] text-[15px] leading-[1.8] text-body">
          Thanks — we&rsquo;ll come back to you within one business day. If it&rsquo;s urgent and
          about an order in transit, replying to your order confirmation email reaches us fastest.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-[13px] font-semibold">
            Your name
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className="rounded-2xl border border-line bg-ivory px-4 py-3 text-sm outline-none transition-colors focus:border-violet"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-[13px] font-semibold">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="rounded-2xl border border-line bg-ivory px-4 py-3 text-sm outline-none transition-colors focus:border-violet"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="topic" className="text-[13px] font-semibold">
          What&rsquo;s this about?
        </label>
        <select
          id="topic"
          name="topic"
          className="rounded-2xl border border-line bg-ivory px-4 py-3 text-sm outline-none transition-colors focus:border-violet"
        >
          <option>An order</option>
          <option>Which product suits my pet</option>
          <option>The 60-Day Guarantee</option>
          <option>Something else</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-[13px] font-semibold">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Tell us about your pet — breed, age, and what they do when they're unsettled. The more you tell us, the more useful our answer."
          className="resize-none rounded-2xl border border-line bg-ivory px-4 py-3 text-sm leading-[1.7] outline-none transition-colors focus:border-violet"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="self-start rounded-full bg-violet px-8 py-3.5 text-[14.5px] font-semibold text-white shadow-violet transition-all hover:bg-violet-deep disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>

      {error && <p className="text-[13px] text-rose-deep">{error}</p>}

      <p className="text-[12.5px] leading-[1.7] text-muted">
        We use your email to reply to this message and nothing else — no marketing list unless you
        ask to join one.
      </p>
    </form>
  );
}
