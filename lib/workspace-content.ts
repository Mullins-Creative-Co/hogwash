export type PublishedPage = {
  id: string;
  title: string;
  slug: string;
  header: string;
  body: string;
  imageUrl: string;
  metaTitle: string;
  metaDescription: string;
  updatedAt: string;
};

type PublishedSite = {
  id: string;
  name: string;
  primaryColor: string;
  accentColor: string;
  pages: PublishedPage[];
};

const contentUrl =
  process.env.MULLINS_CONTENT_API_URL ??
  "https://mullinscreative.company/api/public/client-sites/hogwash";

export async function getHogwashHomeContent() {
  const site = await getPublishedHogwashSite();
  return site?.pages.find((page) => page.slug === "/") ?? null;
}

export async function getHogwashPageContent(slug: string) {
  const site = await getPublishedHogwashSite();
  const normalizedSlug = `/${slug.replace(/^\/+|\/+$/g, "")}`;
  return site?.pages.find((page) => page.slug === normalizedSlug) ?? null;
}

async function getPublishedHogwashSite() {
  try {
    const response = await fetch(contentUrl, { cache: "no-store" });
    if (!response.ok) return null;

    return (await response.json()) as PublishedSite;
  } catch (error) {
    console.error("Unable to load Hogwash workspace content.", error);
    return null;
  }
}
