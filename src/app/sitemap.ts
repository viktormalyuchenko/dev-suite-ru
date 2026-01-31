import { MetadataRoute } from "next";
import toolsData from "@/data/tools.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dev.viktoor.ru";

  // 1. Страницы инструментов (теперь плоские: /posthog)
  const toolEntries: MetadataRoute.Sitemap = toolsData.map((tool: any) => ({
    url: `${baseUrl}/${tool.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 2. Страницы категорий
  const categories = Array.from(new Set(toolsData.map((t: any) => t.category)));
  const categoryEntries: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/categories/${encodeURIComponent(cat)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // 3. Статические страницы
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...toolEntries,
    ...categoryEntries,
  ];
}
