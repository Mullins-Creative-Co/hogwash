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
  homeSections?: {
    heroEyebrow?: string;
    heroSecondaryHeading?: string;
    heroPrimaryButton?: string;
    heroSecondaryButton?: string;
    heroTags?: string;
    heroVideoUrl?: string;
    heroPosterUrl?: string;
    heroTrustOne?: string;
    heroTrustTwo?: string;
    heroTrustThree?: string;
    menuItems?: string;
    menuServices?: string;
    menuResults?: string;
    menuReviews?: string;
    menuFaq?: string;
    menuQuote?: string;
    menuQuoteButton?: string;
    mobileCallButton?: string;
    introEyebrow?: string;
    introHeading?: string;
    introBody?: string;
    resultsEyebrow?: string;
    resultsHeading?: string;
    resultsBody?: string;
    brandStatement?: string;
    servicesEyebrow?: string;
    servicesHeading?: string;
    servicesBody?: string;
    statOneValue?: string;
    statOneLabel?: string;
    statTwoValue?: string;
    statTwoLabel?: string;
    statThreeValue?: string;
    statThreeLabel?: string;
    processEyebrow?: string;
    processHeading?: string;
    reviewsEyebrow?: string;
    reviewsHeading?: string;
    reviewsSummary?: string;
    faqEyebrow?: string;
    faqHeading?: string;
    quoteEyebrow?: string;
    quoteHeading?: string;
    quoteBody?: string;
    facebookEyebrow?: string;
    facebookHeading?: string;
    facebookBody?: string;
    facebookButton?: string;
  };
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

export async function getHogwashPublishedPages() {
  const site = await getPublishedHogwashSite();
  return site?.pages ?? [];
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
