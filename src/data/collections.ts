import { Sparkles, DollarSign, Github, Server, Building2 } from "lucide-react";

export const collections = [
  {
    id: "ai-powered",
    slug: "ai-powered",
    title: "На базе ИИ",
    description:
      "Инструменты с использованием искусственного интеллекта и нейросетей.",
    icon: Sparkles,
    color: "text-blue-500",
    filter: (tool: any) =>
      tool.tags?.includes("ai") ||
      tool.short_description.toLowerCase().includes("ии"),
  },
  {
    id: "free-tier",
    slug: "free-tier",
    title: "Бесплатные",
    description: "Сервисы, у которых есть полноценный бесплатный тариф.",
    icon: DollarSign,
    color: "text-emerald-500",
    filter: (tool: any) =>
      tool.pricing?.toLowerCase().includes("free") ||
      tool.pricing?.toLowerCase().includes("бесплатно"),
  },
  {
    id: "open-source",
    slug: "open-source",
    title: "Open Source",
    description: "Проекты с открытым исходным кодом, доступные на GitHub.",
    icon: Github,
    color: "text-orange-500",
    filter: (tool: any) => tool.is_open_source === true,
  },
  {
    id: "self-hosted",
    slug: "self-hosted",
    title: "Self-hosted",
    description:
      "Инструменты, которые можно развернуть на собственном сервере.",
    icon: Server,
    color: "text-purple-500",
    filter: (tool: any) => tool.tags?.includes("self-hosted"),
  },
];
