"use client";

import { useState } from "react";

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

interface SmartImageProps {
  id: string;
  name: string;
  type: "icon" | "screenshot";
}

export default function SmartImage({ id, name, type }: SmartImageProps) {
  const [error, setError] = useState(false);
  const gradientClass = getGradient(id);

  if (type === "icon") {
    return (
      <div className="w-16 h-16 shrink-0">
        {!error ? (
          <img
            src={`/tools/${id}-favicon.webp`}
            alt={`${name} icon`}
            className="w-16 h-16 object-contain rounded-2xl border border-border shadow-sm bg-card"
            onError={() => setError(true)}
          />
        ) : (
          <div
            className={`w-16 h-16 rounded-2xl bg-linear-to-br ${gradientClass} flex items-center justify-center text-white text-2xl font-black uppercase shadow-lg`}
          >
            {name[0]}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      {!error ? (
        <div className="aspect-video w-full rounded-3xl overflow-hidden border border-border shadow-xl bg-muted">
          <img
            src={`/tools/${id}-screenshot.webp`}
            alt={`${name} screenshot`}
            className="w-full h-full object-cover object-top"
            onError={() => setError(true)}
          />
        </div>
      ) : (
        <div className="aspect-video w-full rounded-3xl border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground bg-muted/20">
          <div
            className={`w-12 h-12 rounded-full bg-linear-to-br ${gradientClass} opacity-20 mb-4`}
          />
          <p className="text-sm font-bold uppercase tracking-widest opacity-50">
            Скриншот скоро появится
          </p>
        </div>
      )}
    </div>
  );
}
