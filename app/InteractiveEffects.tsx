"use client";

import { useEffect, useState } from "react";

const phoneDisplay = "562-324-6588";
const phoneHref = "tel:+15623246588";

export default function InteractiveEffects() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  useEffect(() => {
    const revealTargets = document.querySelectorAll<HTMLElement>(
      "main > section, .result-card, .testimonial-card, .process-step"
    );

    document.documentElement.classList.add("motion-ready");
    revealTargets.forEach((element) => element.setAttribute("data-reveal", ""));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );

    revealTargets.forEach((element) => observer.observe(element));

    const openQuote = (event: Event) => {
      const target = event.target as Element | null;
      if (!target?.closest("[data-quote-trigger]")) return;
      event.preventDefault();
      setQuoteOpen(true);
    };

    document.addEventListener("click", openQuote);
    return () => {
      observer.disconnect();
      document.removeEventListener("click", openQuote);
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  useEffect(() => {
    if (!quoteOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setQuoteOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    document.body.classList.add("modal-open");
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("modal-open");
    };
  }, [quoteOpen]);

  if (!quoteOpen) return null;

  return (
    <div
      className="quote-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setQuoteOpen(false);
      }}
    >
      <div className="quote-modal__card">
        <button
          className="quote-modal__close"
          type="button"
          onClick={() => setQuoteOpen(false)}
          aria-label="Close quote popup"
        >
          ×
        </button>
        <p className="eyebrow">Free quote</p>
        <h2 id="quote-modal-title">Ready to wash the grime away?</h2>
        <p>
          Call or text Hogwash for a quick, no-pressure quote. Most jobs can be
          priced with a few details and photos.
        </p>
        <div className="quote-modal__actions">
          <a className="button button--dark" href={phoneHref}>
            Call {phoneDisplay}
          </a>
          <a
            className="button quote-modal__form-link"
            href="#quote"
            onClick={() => setQuoteOpen(false)}
          >
            Use the online form
          </a>
        </div>
      </div>
    </div>
  );
}
