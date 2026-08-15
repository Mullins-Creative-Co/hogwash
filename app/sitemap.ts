import type { MetadataRoute } from "next";
import { getHogwashPublishedPages } from "../lib/workspace-content";

const siteUrl = "https://hogwash-gilt.vercel.app";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getHogwashPublishedPages();

  if (pages.length === 0) {
    return [{ url: siteUrl, changeFrequency: "monthly", priority: 1 }];
  }

  return pages.map((page) => {
    const path = page.slug === "/" ? "" : `/${page.slug.replace(/^\/+/, "")}`;

    return {
      url: `${siteUrl}${path}`,
      lastModified: page.updatedAt ? new Date(page.updatedAt) : undefined,
      changeFrequency: page.slug === "/" ? "weekly" : "monthly",
      priority: page.slug === "/" ? 1 : 0.8,
    };
  });
}
