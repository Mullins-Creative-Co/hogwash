"use client";

import { useEffect, useRef } from "react";

export default function HeroSlideshow() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncPlayback = () => {
      if (!videoRef.current) return;
      if (media.matches) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      } else {
        void videoRef.current.play().catch(() => undefined);
      }
    };

    syncPlayback();
    media.addEventListener("change", syncPlayback);
    return () => media.removeEventListener("change", syncPlayback);
  }, []);

  return (
    <div className="hero-slides" aria-hidden="true">
      <video
        ref={videoRef}
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/hogwash/updates-2026-07-24/2.jpg"
      >
        <source src="/hogwash/updates-2026-07-24/hero-video.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
