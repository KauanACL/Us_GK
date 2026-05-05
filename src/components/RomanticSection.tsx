"use client";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import type { SiteVersion } from "@/data/siteVersions";
dayjs.extend(duration);

export default function RomanticSection({ version }: { version: SiteVersion }) {
  const [totalSeconds, setTotalSeconds] = useState(0);

  useEffect(() => {
    const startDate = dayjs(version.startDate);
    const updateTime = () => {
      const now = dayjs();
      let diff = now.diff(startDate, "second");
      if (diff < 0) diff = 0;
      setTotalSeconds(diff);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [version.startDate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-12">
          <h2 className="mb-6 text-4xl font-bold text-pink-400 drop-shadow-lg">
            {version.dedicationTitle}
          </h2>
          <div className="space-y-4 text-lg leading-relaxed text-white">
            {version.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-r from-fuchsia-700 via-pink-600 to-purple-800 p-8 shadow-xl">
          <h3 className="mb-6 text-2xl font-bold text-white">
            {version.counterTitle}
          </h3>

          <div className="flex flex-col items-center rounded-lg bg-black/40 p-6 text-white">
            <div className="rounded-lg border-2 border-pink-400 bg-black/60 px-6 py-4 text-5xl font-extrabold text-white drop-shadow-lg">
              {totalSeconds.toLocaleString("pt-BR")}
            </div>
            Segundos
          </div>
        </div>
      <p className="text-white text-sm mt-4 opacity-90">
        {version.footerText}
      </p>
    </div>
  </div>

  );
}
