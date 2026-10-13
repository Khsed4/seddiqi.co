import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1 },
    { path: "/work", priority: 0.9 },
    { path: "/about", priority: 0.8 },
    { path: "/resume", priority: 0.8 },
    { path: "/contact", priority: 0.7 },
    ...projects.map((project) => ({ path: `/work/${project.slug}`, priority: 0.6 })),
  ];
  return pages.map((page) => ({
    url: `${siteUrl}${page.path}`,
    changeFrequency: "monthly",
    priority: page.priority,
  }));
}
