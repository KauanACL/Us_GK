"use client";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import type { SiteVersion } from "@/data/siteVersions";
dayjs.extend(duration);

export default function RomanticSection({ version }: { version: SiteVersion }) {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const isBirthdayVersion = version.date === "2026-06-11";

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

        {isBirthdayVersion ? (
          <ElegantCounter
            title={version.counterTitle}
            totalSeconds={totalSeconds}
          />
        ) : (
          <ClassicCounter
            title={version.counterTitle}
            totalSeconds={totalSeconds}
          />
        )}
      <p className="text-white text-sm mt-4 opacity-90">
        {version.footerText}
      </p>
    </div>
  </div>

  );
}

function ElegantCounter({
  title,
  totalSeconds,
}: {
  title: string;
  totalSeconds: number;
}) {
  const units = getCounterUnits(totalSeconds);

  return (
    <div className="rounded-2xl border border-rose-100/15 bg-[#15080d]/85 p-6 shadow-2xl shadow-rose-950/40 backdrop-blur sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-200/80">
        {title}
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="rounded-xl border border-rose-100/15 bg-white/[0.06] px-3 py-5 text-center shadow-inner"
          >
            <div className="text-3xl font-black text-white sm:text-4xl">
              {unit.value.toLocaleString("pt-BR")}
            </div>
            <div className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-rose-100/65">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ClassicCounter({
  title,
  totalSeconds,
}: {
  title: string;
  totalSeconds: number;
}) {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-fuchsia-700 via-pink-600 to-purple-800 p-8 shadow-xl">
      <h3 className="mb-6 text-2xl font-bold text-white">
        {title}
      </h3>

      <div className="flex flex-col items-center rounded-lg bg-black/40 p-6 text-white">
        <div className="rounded-lg border-2 border-pink-400 bg-black/60 px-6 py-4 text-5xl font-extrabold text-white drop-shadow-lg">
          {totalSeconds.toLocaleString("pt-BR")}
        </div>
        Segundos
      </div>
    </div>
  );
}

function getCounterUnits(totalSeconds: number) {
  const days = Math.floor(totalSeconds / 86_400);
  const hours = Math.floor((totalSeconds % 86_400) / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const seconds = totalSeconds % 60;

  return [
    { label: "dias", value: days },
    { label: "horas", value: hours },
    { label: "minutos", value: minutes },
    { label: "segundos", value: seconds },
  ];
}
