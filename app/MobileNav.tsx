"use client";

import { useRef } from "react";

const links = [
  ["Services", "#services"],
  ["Results", "#results"],
  ["Reviews", "#reviews"],
  ["FAQ", "#faq"],
  ["Quote", "#quote"],
];

export default function MobileNav() {
  const menuRef = useRef<HTMLDetailsElement>(null);

  return (
    <details className="mobile-nav" ref={menuRef}>
      <summary aria-label="Open navigation menu">
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </summary>
      <nav aria-label="Mobile navigation">
        {links.map(([label, href]) => (
          <a
            href={href}
            key={href}
            onClick={() => menuRef.current?.removeAttribute("open")}
          >
            {label}
          </a>
        ))}
        <a className="mobile-nav__phone" href="tel:+15623246588">
          Call 562-324-6588
        </a>
      </nav>
    </details>
  );
}
