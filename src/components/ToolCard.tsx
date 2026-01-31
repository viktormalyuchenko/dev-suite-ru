"use client";

import { useState } from "react";
import Link from "next/link";
import { DollarSign } from "lucide-react";

const getGradient = (id: string) => {
  const gradients = [
    "from-blue-500 to-indigo-600",
    "from-emerald-400 to-cyan-500",
    "from-violet-500 to-purple-600",
    "from-rose-500 to-orange-500",
    "from-amber-400 to-orange-600",
    "from-fuchsia-500 to-pink-600",
  ];
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % gradients.length;
  return gradients[index];
};

export default function ToolCard({ tool }: { tool: any }) {
  const [imgError, setImgError] = useState(false);
  const gradientClass = getGradient(tool.id);

  return (
    <Link
      href={`/${tool.id}`}
      className="group relative flex flex-col p-6 rounded-2xl border transition-all duration-150 cursor-pointer overflow-hidden
        h-52.5
        bg-card border-border hover:bg-card-hover"
    >
      {/* Шапка: Иконка + Заголовок */}
      <div className="flex items-center gap-3 mb-4 shrink-0">
        <div className="w-10 h-10 rounded-lg border border-border overflow-hidden bg-background shrink-0 transition-colors group-hover:border-primary/30">
          {!imgError ? (
            <img
              src={`/tools/${tool.id}-favicon.webp`}
              alt=""
              className="w-full h-full object-contain p-1.5 relative z-10"
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className={`w-full h-full bg-linear-to-br ${gradientClass} flex items-center justify-center text-white font-black text-[10px] uppercase`}
            >
              {tool.name[0]}
            </div>
          )}
        </div>

        <h3 className="text-lg font-black tracking-tight text-foreground group-hover:text-primary transition-colors truncate">
          {tool.name}
        </h3>
      </div>

      {/* Описание с двойной логикой */}
      <div className="relative z-10 grow">
        {/* Состояние ПОКОЯ: Супер-короткое (если есть) или обрезанное короткое */}
        <p className="text-muted-foreground text-[13px] leading-relaxed line-clamp-2 transition-all duration-300 group-hover:opacity-0 group-hover:invisible">
          {tool.super_short_description || tool.short_description}
        </p>

        {/* Состояние НАВЕДЕНИЯ: Всегда полное короткое описание (всплывает поверх) */}
        <p className="absolute top-0 left-0 w-full text-muted-foreground text-[13px] leading-relaxed opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
          {tool.short_description}
        </p>
      </div>

      {/* Блок цены: Исчезает быстро и на месте */}
      <div className="absolute bottom-6 left-6 transition-all duration-150 opacity-100 group-hover:opacity-0 group-hover:pointer-events-none">
        <div className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border bg-background/50">
          <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-[12px] font-medium text-muted-foreground lowercase">
            {tool.pricing}
          </span>
        </div>
      </div>
    </Link>
  );
}
