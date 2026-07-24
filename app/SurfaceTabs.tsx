"use client";

import { useState } from "react";

const services = [
  {
    label: "Roof washing",
    title: "Roof washing",
    text: "A low-pressure soft wash that treats algae, moss, lichen, and dark streaks without the damage high pressure can cause to shingles.",
  },
  {
    label: "House washing",
    title: "House washing",
    text: "A gentle exterior wash for siding, trim, soffits, and exterior surfaces that removes dirt, algae, mildew, and organic buildup.",
  },
  {
    label: "Driveways & concrete",
    title: "Driveways and concrete",
    text: "Professional surface cleaning for driveways, sidewalks, patios, and other concrete, followed by a thorough rinse for an even finish.",
  },
  {
    label: "Pavers",
    title: "Pavers",
    text: "Careful cleaning for brick and concrete pavers that lifts weeds, grime, moss, and surface staining while protecting the paver surface.",
  },
  {
    label: "Decks & fences",
    title: "Decks and fences",
    text: "Surface-appropriate cleaning for wood and composite decks and fences to remove algae, mildew, dirt, and weathered buildup.",
  },
  {
    label: "Gutters",
    title: "Gutter cleaning and brightening",
    text: "Interior debris removal to restore gutter flow, plus exterior brightening to tackle dark streaks, oxidation, and visible grime.",
  },
];

export default function SurfaceTabs() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <>
      <div className="surface-tabs" aria-label="Exterior cleaning services">
        {services.map((service, index) => (
          <button
            key={service.label}
            type="button"
            aria-pressed={index === active}
            className={index === active ? "is-active" : undefined}
            onClick={() => setActive(index)}
          >
            {service.label}
          </button>
        ))}
      </div>
      <div className="feature-grid">
        <article className="feature-card feature-card--wide" aria-live="polite">
          <h3>{current.title}</h3>
          <p>{current.text}</p>
        </article>
      </div>
    </>
  );
}
