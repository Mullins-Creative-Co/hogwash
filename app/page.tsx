import type { Metadata } from "next";
import HeroSlideshow from "./HeroSlideshow";
import ImageSlot from "./ImageSlot";
import MobileNav from "./MobileNav";
import QuoteForm from "./QuoteForm";
import ScrollReveal from "./ScrollReveal";
import SurfaceTabs from "./SurfaceTabs";
import InteractiveEffects from "./InteractiveEffects";
import { getHogwashHomeContent } from "../lib/workspace-content";

export const dynamic = "force-dynamic";

const phoneDisplay = "562-324-6588";
const phoneHref = "tel:+15623246588";
const facebookUrl = "https://www.facebook.com/hogwashexteriorcleaning";
const facebookEmbedUrl = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
  facebookUrl
)}&tabs=timeline&width=500&height=620&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`;

  const trustChips = ["Owner-operated", "Free quotes", "Satisfaction guaranteed"];

const steps = [
  ["01", "Reach out", "Call, text, or send the form. Share a couple details about what needs cleaning."],
  ["02", "Quick quote", "We price most jobs right over the phone, or after a fast look. No pressure, ever."],
  ["03", "We show up", "The owner arrives with the right gear and pressure for your surfaces."],
  ["04", "See the difference", "Grime gone, curb appeal back. You'll notice it from the street."],
];

const stats = [
  ["1", "Owner on every job. The person you call is the person who shows up."],
  ["100%", "Free quotes, zero pressure (on you, anyway)."],
  ["0", "Grime left behind."],
];

const results = [
  {
    src: "/hogwash/driveway.jpg",
    tag: "Driveway",
    alt: "Before and after of a stained home driveway restored to clean concrete",
    caption: "Years of dirt and tire staining lifted off residential concrete.",
  },
  {
    src: "/hogwash/gazebo.jpg",
    tag: "Wood restoration",
    alt: "Before and after of a poolside wooden gazebo restored from gray to warm brown",
    caption: "Weathered gray wood brought back to a warm, natural finish.",
  },
  {
    src: "/hogwash/garage.jpg",
    tag: "Garage & apron",
    alt: "Before and after of a garage door and concrete apron on a metal building",
    caption: "Grimy door and apron cleaned up sharp on a pole barn.",
  },
  {
    src: "/hogwash/updates-2026-07-24/1.jpg",
    tag: "Roof washing",
    alt: "Before and after of dark roof shingles restored with a professional roof wash",
    caption: "Dark organic buildup treated to restore a cleaner, brighter roof.",
  },
  {
    src: "/hogwash/updates-2026-07-24/2.jpg",
    tag: "House washing",
    alt: "Before and after of algae-covered yellow siding restored with a house wash",
    caption: "Heavy algae and grime removed from siding without harsh pressure.",
  },
  {
    src: "/hogwash/updates-2026-07-24/3.jpg",
    tag: "Pavers",
    alt: "Before and after of a brick paver driveway cleaned of weeds and grime",
    caption: "Weeds and buildup cleared to bring the paver pattern back to life.",
  },
];

const testimonials = [
  {
    quote:
      "Shawn did a top-quality job restoring our deck and detailing the camper. The container turned out looking like new. Above and beyond a 5-star experience.",
    name: "Craig Grossman",
    location: "Google review · 1 month ago",
    sourceUrl:
      "https://www.google.com/maps/contrib/104249777077163717087/reviews?hl=en-US",
  },
  {
    quote:
      "Shawn did such an amazing job on my house. I recommend him to everyone who wants their home power washed and looking good for spring. Hogwash for the win!!",
    name: "Jennifer Adams",
    location: "Google review · 2 months ago",
    sourceUrl: null,
  },
  {
    quote:
      "Shawn did a great job! I highly recommend him for any of your exterior cleaning needs!",
    name: "Erin Swope",
    location: "Google review · 2 months ago",
    sourceUrl: null,
  },
  {
    quote:
      "The owner is top notch! As reputable as they come, will do an excellent job at an honest rate!!",
    name: "Tim Hopkins",
    location: "Google review · 2 months ago",
    sourceUrl: null,
  },
  {
    quote:
      "Couldn’t be happier! Hogwash took care of years of stains, and made our pool deck and gazebo look new again. 10 out 10!",
    name: "Doug Short",
    location: "Google review · 1 month ago",
    sourceUrl:
      "https://www.google.com/maps/contrib/105983376958374722355/reviews?hl=en-US",
  },
  {
    quote:
      "Beyond pleased with the results from our recent exterior cleanin. Customer service was top notch. We will continue to book in the future.",
    name: "Preston Ross",
    location: "Google review · 2 months ago",
    sourceUrl:
      "https://www.google.com/maps/contrib/115391577312091898272/reviews?hl=en-US",
  },
];

const faqs = [
  {
    q: "How much does it cost?",
    a: "Every job is different, so pricing depends on the size, surface, and how dirty things are. Most jobs we can quote right over the phone, and quotes are always free with zero pressure.",
  },
  {
    q: "Will pressure washing damage my surfaces?",
    a: "No. We match the method to the surface, using a gentle low-pressure soft wash for roofs and siding and higher pressure only where it's safe, like concrete. The right technique gets it clean without the damage.",
  },
  {
    q: "Do I need to be home?",
    a: "Not necessarily. As long as we can access the areas being cleaned and an outdoor water spigot, you're welcome to go about your day. We'll confirm everything before we start.",
  },
  {
    q: "What about my plants, pets, and landscaping?",
    a: "We take care around greenery and use safe cleaning solutions. Plants get pre-wet and rinsed, and we keep an eye on pets and anything that needs protecting.",
  },
  {
    q: "How long does a job take?",
    a: "Most residential jobs wrap up in a few hours depending on size. We'll give you a time estimate with your quote.",
  },
  {
    q: "What areas do you serve?",
    a: "We serve local homes and businesses throughout the surrounding area. Not sure if you're in range? Just call or text and we'll let you know.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const content = await getHogwashHomeContent();

  return {
    title:
      content?.metaTitle ||
      "Hogwash Exterior Cleaning | Pressure Washing & House Washing",
    description:
      content?.metaDescription ||
      "Professional pressure washing for driveways, siding, decks, fences, trailers, and more. Owner-operated, free quotes, and results you can see from the street. Call or text 562-324-6588.",
  };
}

export default async function Home() {
  const workspaceContent = await getHogwashHomeContent();
  const heroDescription =
    workspaceContent?.body ||
    "Hogwash strips away years of dirt, algae, and grime from the surfaces people notice first, using professional equipment and the right pressure for every surface. You'll see the difference from the street.";

  return (
    <>
      <ScrollReveal />
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Hogwash Exterior Cleaning home">
          <ImageSlot
            className="brand__logo"
            src="/hogwash/logo.jpg"
            alt="Hogwash logo"
            label="Logo"
            rounded
            priority
          />
          <span>Hogwash</span>
        </a>
        <nav className="nav" aria-label="Primary navigation">
          <a href="#services">Services</a>
          <a href="#results">Results</a>
          <a href="#reviews">Reviews</a>
          <a href="#faq">FAQ</a>
          <a href="#quote">Quote</a>
        </nav>
        <div className="site-header__actions">
          <a className="call-link" href={phoneHref} aria-label={`Call or text Hogwash at ${phoneDisplay}`}>
            {phoneDisplay}
          </a>
          <a className="button button--dark button--sm" href="#quote" data-quote-trigger>
            Free quote
          </a>
          <MobileNav />
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="hero-grand" id="top" aria-labelledby="hero-title">
          <HeroSlideshow />
          <div className="hero-grand__content">
            <p className="eyebrow eyebrow--light">
              Professional exterior cleaning for homes, driveways, decks &amp; rigs
            </p>
            <h1 id="hero-title">Restore. Protect. Impress.</h1>
            <p className="hero-grand__lede">
              {heroDescription}
            </p>
            <div className="hero__actions hero__actions--center">
              <a className="button button--dark" href={phoneHref}>
                Call or text for a free quote
              </a>
              <a className="button button--frost" href="#quote" data-quote-trigger>
                Request a quote online
              </a>
            </div>
            <ul className="trust-chips" aria-label="Why homeowners choose Hogwash">
              {trustChips.map((chip) => (
                <li key={chip}>{chip}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="intro" aria-labelledby="intro-title">
          <div className="intro__copy">
            <p className="eyebrow">Local &amp; owner-operated</p>
            <h2 id="intro-title">Grime costs more than a wash does.</h2>
            <p>
              Dirt, mold, and algae don&apos;t just look bad. Left alone, they
              slowly break down concrete, wood, and siding. A good wash protects
              what you&apos;ve put into your property and saves you from repairs
              down the road. Take a look at the before and afters below.
            </p>
          </div>
          <ImageSlot
            className="intro__photo"
            src="/hogwash/surface-cleaner.jpg"
            alt="Surface cleaner attachment lifting years of grime off a concrete driveway"
            label="Action photo"
            rounded
          />
        </section>

        <section className="results" id="results" aria-labelledby="results-title">
          <div className="results__top">
            <p className="eyebrow">Before &amp; after</p>
            <h2 id="results-title">Real jobs. Real difference.</h2>
            <p>
              Every one of these is an actual Hogwash job. Same surface, same
              day, just a whole lot cleaner.
            </p>
          </div>
          <ul className="results-grid" aria-label="Before and after cleaning results">
            {results.map((item) => (
              <li className="result-card" key={item.src}>
                <ImageSlot
                  className="result-card__photo"
                  src={item.src}
                  alt={item.alt}
                  label="Before / after"
                />
                <div className="result-card__body">
                  <span className="result-card__tag">{item.tag}</span>
                  <p>{item.caption}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="image-band" aria-label="Hogwash brand statement">
          <ImageSlot
            className="image-band__bg"
            src="/hogwash/driveway2.jpg"
            alt=""
            label="Full-width photo"
          />
          <div className="image-band__statement">
            <p>A cleaner driveway. A brighter deck. A property you&apos;re proud to come home to.</p>
          </div>
        </section>

        <section className="surface-fit" id="services" aria-labelledby="surface-fit-title">
          <div className="surface-fit__top">
            <p className="eyebrow">Services</p>
            <h2 id="surface-fit-title">The clean-up list.</h2>
            <p>
              Residential and light commercial washing with the right method for
              every surface. Select a service to see what&apos;s included.
            </p>
          </div>
          <SurfaceTabs />
          <dl className="stats-band" aria-label="Hogwash service highlights">
            {stats.map(([value, label]) => (
              <div key={label}>
                <dt>{value}</dt>
                <dd>{label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="process" id="process" aria-labelledby="process-title">
          <div className="process__top">
            <p className="eyebrow">How it works</p>
            <h2 id="process-title">Simple from hello to spotless.</h2>
          </div>
          <ol className="process-grid" aria-label="How Hogwash works">
            {steps.map(([num, title, text]) => (
              <li className="process-card" key={num}>
                <span className="process-card__num">{num}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="testimonials" id="reviews" aria-labelledby="testimonials-title">
          <div className="testimonials__top">
            <p className="eyebrow">What people say</p>
            <h2 id="testimonials-title">Neighbors who&apos;d call again.</h2>
            <p className="testimonials__rating">
              <span aria-label="5 out of 5 stars">{"\u2605\u2605\u2605\u2605\u2605"}</span>
              <strong>5.0</strong> from 19 Google reviews
            </p>
          </div>
          <ul className="testimonial-grid" aria-label="Customer reviews">
            {testimonials.map((item) => (
              <li className="testimonial-card" key={item.name}>
                <span className="testimonial-card__stars" aria-label="5 out of 5 stars">
                  {"\u2605\u2605\u2605\u2605\u2605"}
                </span>
                <blockquote>{item.quote}</blockquote>
                <div className="testimonial-card__by">
                  {item.sourceUrl ? (
                    <a
                      className="testimonial-card__name"
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <span className="testimonial-card__name">{item.name}</span>
                  )}
                  <span className="testimonial-card__loc">{item.location}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="faq" id="faq" aria-labelledby="faq-title">
          <div className="faq__top">
            <p className="eyebrow">Good to know</p>
            <h2 id="faq-title">Questions, answered.</h2>
          </div>
          <div className="faq-list">
            {faqs.map((item) => (
              <details className="faq-item" key={item.q}>
                <summary>
                  <span>{item.q}</span>
                  <span className="faq-item__icon" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="quote" id="quote" aria-labelledby="quote-title">
          <div className="quote__copy">
            <p className="eyebrow">Free quote</p>
            <h2 id="quote-title">Tell us what&apos;s dirty. We&apos;ll handle the rest.</h2>
            <p>
              Call or text and we can usually price it right over the phone.
              Prefer to type? Leave a few details below and Hogwash will follow
              up with pricing and timing.
            </p>
            <a className="quote__phone" href={phoneHref} aria-label={`Call or text Hogwash at ${phoneDisplay}`}>
              {phoneDisplay}
            </a>
          </div>
          <QuoteForm />
        </section>

        <section className="facebook-section" aria-labelledby="facebook-title">
          <div className="facebook-section__copy">
            <p className="eyebrow">Follow the work</p>
            <h2 id="facebook-title">The proof is on the page.</h2>
            <p>
              Fresh before and afters, availability notes, and updates straight
              from the Hogwash Facebook page. The work speaks for itself.
            </p>
            <a className="button button--dark" href={facebookUrl} target="_blank" rel="noreferrer">
              Open Facebook
            </a>
          </div>
          <div className="facebook-embed">
            <iframe
              title="Hogwash Exterior Cleaning Facebook page"
              src={facebookEmbedUrl}
              width="500"
              height="620"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              loading="lazy"
            />
          </div>
        </section>
      </main>
      <InteractiveEffects />

      <div className="mobile-action-bar" aria-label="Quick quote actions">
        <a href={phoneHref}>Call</a>
        <a href="sms:+15623246588">Text</a>
        <a href="#quote">Online quote</a>
      </div>

      <footer className="footer">
        <div className="footer__brand">
          <ImageSlot
            className="footer__logo"
            src="/hogwash/logo.jpg"
            alt="Hogwash logo"
            label="Logo"
            rounded
          />
          <div>
            <p className="footer__name">Hogwash Exterior Cleaning</p>
            <p className="footer__tag">Serving local homes and businesses.</p>
          </div>
        </div>
        <nav className="footer__nav" aria-label="Footer navigation">
          <a href="#services">Services</a>
          <a href="#results">Results</a>
          <a href="#reviews">Reviews</a>
          <a href="#faq">FAQ</a>
          <a href="#quote">Quote</a>
        </nav>
        <a className="footer__phone" href={phoneHref} aria-label={`Call or text Hogwash at ${phoneDisplay}`}>
          {phoneDisplay}
        </a>
      </footer>
    </>
  );
}
