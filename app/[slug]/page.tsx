import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InteractiveEffects from "../InteractiveEffects";
import ImageSlot from "../ImageSlot";
import { getHogwashPageContent } from "../../lib/workspace-content";

const phoneDisplay = "562-324-6588";
const phoneHref = "tel:+15623246588";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getHogwashPageContent(slug);

  if (!page) return {};
  return {
    title: page.metaTitle || `${page.title} | Hogwash Exterior Cleaning`,
    description: page.metaDescription || page.body.slice(0, 160),
  };
}

export default async function PublishedContentPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getHogwashPageContent(slug);
  if (!page) notFound();

  return (
    <>
      <header className="site-header">
        <a className="brand" href="/" aria-label="Hogwash Exterior Cleaning home">
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
          <a href="/#services">Services</a>
          <a href="/#results">Results</a>
          <a href="/#reviews">Reviews</a>
          <a href="/#faq">FAQ</a>
        </nav>
        <div className="site-header__actions">
          <a className="call-link" href={phoneHref}>{phoneDisplay}</a>
          <a className="button button--dark button--sm" href="/#quote" data-quote-trigger>
            Free quote
          </a>
        </div>
      </header>

      <main className="cms-page">
        <section className="cms-page__hero">
          <p className="eyebrow">Hogwash Exterior Cleaning</p>
          <h1>{page.header || page.title}</h1>
          <p>{page.body}</p>
          <div className="cms-page__actions">
            <a className="button button--dark" href={phoneHref}>Call for a free quote</a>
            <a className="button cms-page__home" href="/">Back to home</a>
          </div>
        </section>
      </main>

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
        <a className="footer__phone" href={phoneHref}>{phoneDisplay}</a>
      </footer>
      <InteractiveEffects />
    </>
  );
}
