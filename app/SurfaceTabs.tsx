"use client";

import { KeyboardEvent, useRef, useState } from "react";

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
    label: "Driveways and Concrete",
    title: "Driveways and concrete",
    text: "Professional surface cleaning for driveways, sidewalks, patios, and other concrete, followed by a thorough rinse for an even finish.",
  },
  {
    label: "Pavers",
    title: "Pavers",
    text: "Careful cleaning for brick and concrete pavers that lifts weeds, grime, moss, and surface staining while protecting the paver surface.",
  },
  {
    label: "Decks and fences",
    title: "Decks and fences",
    text: "Surface-appropriate cleaning for wood and composite decks and fences to remove algae, mildew, dirt, and weathered buildup.",
  },
  {
    label: "Gutter cleaning and brightening",
    title: "Gutter cleaning and brightening",
    text: "Interior debris removal to restore gutter flow, plus exterior brightening to tackle dark streaks, oxidation, and visible grime.",
  },
];

export default function SurfaceTabs() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const current = services[active];

  const handleKeys = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % services.length;
    if (event.key === "ArrowLeft") next = (index - 1 + services.length) % services.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = services.length - 1;
    if (next === index) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <>
      <div
        className="surface-tabs"
        role="tablist"
        aria-label="Exterior cleaning services"
      >
        {services.map((service, index) => (
          <button
            key={service.label}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            id={`service-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-controls="service-panel"
            tabIndex={index === active ? 0 : -1}
            className={index === active ? "is-active" : undefined}
            onClick={() => setActive(index)}
            onKeyDown={(event) => handleKeys(event, index)}
          >
            {service.label}
          </button>
        ))}
      </div>
      <div className="feature-grid">
        <article
          className="feature-card feature-card--wide"
          id="service-panel"
          key={current.label}
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`service-tab-${active}`}
        >
          <h3>{current.title}</h3>
          <p>{current.text}</p>
        </article>
      </div>
    </>
  );
}
