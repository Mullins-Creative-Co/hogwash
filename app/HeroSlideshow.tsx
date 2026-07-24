export default function HeroSlideshow() {
  return (
    <div className="hero-slides" aria-hidden="true">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/hogwash/Updates%207-24/2.jpg"
      >
        <source src="/hogwash/Updates%207-24/hero-video.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
