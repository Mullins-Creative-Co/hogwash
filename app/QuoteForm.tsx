"use client";

import { useState } from "react";

export default function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  return (
    <form
      className="quote-form"
      onSubmit={async (event) => {
        event.preventDefault();
        setStatus("sending");

        try {
          const response = await fetch("/api/quote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
              Object.fromEntries(new FormData(event.currentTarget).entries()),
            ),
          });

          if (!response.ok) {
            throw new Error("Quote request failed");
          }

          event.currentTarget.reset();
          setStatus("sent");
        } catch {
          setStatus("error");
        }
      }}
    >
      <label>
        Name
        <input
          name="name"
          type="text"
          placeholder="Your name"
          autoComplete="name"
          required
          aria-required="true"
        />
      </label>
      <label>
        Email
        <input
          name="email"
          type="email"
          placeholder="Your email"
          autoComplete="email"
        />
      </label>
      <label>
        Phone
        <input
          name="phone"
          type="tel"
          placeholder="Best number"
          autoComplete="tel"
          required
          aria-required="true"
        />
      </label>
      <label>
        Service
        <select name="service" defaultValue="" required aria-required="true">
          <option value="" disabled>
            What needs cleaning?
          </option>
          <option>Roof washing</option>
          <option>House washing</option>
          <option>Driveways and concrete</option>
          <option>Pavers</option>
          <option>Decks and fences</option>
          <option>Gutter cleaning and brightening</option>
          <option>Other exterior cleaning</option>
        </select>
      </label>
      <label>
        Address
        <input
          name="area"
          type="text"
          placeholder="Street address"
          autoComplete="street-address"
          required
          aria-required="true"
        />
      </label>
      <label className="quote-form__wide">
        Notes
        <textarea
          name="notes"
          placeholder="Tell us what you are looking at."
          aria-describedby="quote-note"
        />
      </label>
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px" }}
      >
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button
        className="button button--dark quote-form__wide"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Request a quote"}
      </button>
      <p className="form-note quote-form__wide" id="quote-note">
        Required fields: name, phone, service, and address.
      </p>
      <p className="form-note quote-form__wide" role="status" aria-live="polite">
        {status === "sent"
          ? "Thanks! Your quote request was sent. We’ll be in touch soon."
          : status === "error"
            ? "We couldn’t send your request. Please call or text the number on this page."
            : ""}
      </p>
    </form>
  );
}
