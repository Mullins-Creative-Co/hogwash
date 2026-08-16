"use client";

import { useRef } from "react";

export default function MobileNav({ links, callLabel }: { links: Array<[string, string]>; callLabel: string }) {
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
          {callLabel}
        </a>
      </nav>
    </details>
  );
}
