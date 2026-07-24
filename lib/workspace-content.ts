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
  try {
    const response = await fetch(contentUrl, { cache: "no-store" });
    if (!response.ok) return null;

    const site = (await response.json()) as PublishedSite;
    return site.pages.find((page) => page.slug === "/") ?? null;
  } catch (error) {
    console.error("Unable to load Hogwash workspace content.", error);
    return null;
  }
}
