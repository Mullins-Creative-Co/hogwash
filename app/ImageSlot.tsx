"use client";

import { useState } from "react";

type ImageSlotProps = {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  priority?: boolean;
  rounded?: boolean;
};

/**
 * Renders a photo when the file exists in /public, and a clean branded
 * placeholder when it does not. Drop real images into public/hogwash/ using
 * the exact `src` paths referenced in the app and they appear automatically.
 */
export default function ImageSlot({
  src,
  alt,
  label,
  className,
  priority,
  rounded,
}: ImageSlotProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`img-slot${rounded ? " img-slot--rounded" : ""}${
        className ? ` ${className}` : ""
      }`}
      data-empty={failed ? "true" : undefined}
    >
      {failed ? (
        <div className="img-slot__ph" aria-hidden="true">
          <svg
            className="img-slot__icon"
            viewBox="0 0 24 24"
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <circle cx="8.5" cy="10" r="1.5" />
            <path d="m21 16-4.5-4.5L7 21" />
          </svg>
          <span className="img-slot__label">{label ?? "Add photo"}</span>
          <span className="img-slot__path">{src}</span>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
