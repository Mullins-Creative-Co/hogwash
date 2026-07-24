"use client";

import { useEffect } from "react";

const revealSelector = [
  "main > section:not(#top)",
  ".result-card",
  ".surface-tabs button",
  ".process-card",
  ".testimonial-card",
  ".faq-item",
].join(",");

export default function ScrollReveal() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(revealSelector)
    );

    elements.forEach((element, index) => {
      element.classList.add("scroll-reveal");
      element.style.setProperty("--reveal-delay", `${(index % 3) * 70}ms`);
    });

    document.documentElement.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.12,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("reveal-ready");
      elements.forEach((element) => {
        element.classList.remove("scroll-reveal", "is-revealed");
        element.style.removeProperty("--reveal-delay");
      });
    };
  }, []);

  return null;
}
