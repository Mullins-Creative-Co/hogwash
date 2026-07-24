"use client";

import { useState } from "react";

export default function QuoteForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="quote-form"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
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
        Address or town
        <input
          name="area"
          type="text"
          placeholder="City or neighborhood"
          autoComplete="address-level2"
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
      <button className="button button--dark quote-form__wide" type="submit">
        Preview quote request
      </button>
      <p className="form-note quote-form__wide" id="quote-note">
        Required fields: name, phone, and service. This preview form does not send yet.
      </p>
      <p className="form-note quote-form__wide" role="status" aria-live="polite">
        {sent
          ? "Preview received. For a real quote today, call or text the number on this page."
          : ""}
      </p>
    </form>
  );
}
