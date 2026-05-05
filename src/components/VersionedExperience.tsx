"use client";

import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect, useState } from "react";
import BackgroundMusic from "@/components/BackgroundMusic";
import BirthdayTimelineCarousel from "@/components/BirthdayTimelineCarousel";
import ImageCarousel from "@/components/ImageCarousel";
import RomanticSection from "@/components/RomanticSection";
import type { SiteVersion } from "@/data/siteVersions";

type VersionedExperienceProps = {
  version: SiteVersion;
  mode: "birthday" | "classic";
};

export default function VersionedExperience({
  version,
  mode,
}: VersionedExperienceProps) {
  const [musicStarted, setMusicStarted] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const [showRomantic, setShowRomantic] = useState(false);

  useEffect(() => {
    if (!musicStarted) return;

    const timer = window.setTimeout(() => setShowCarousel(true), 1400);
    return () => window.clearTimeout(timer);
  }, [musicStarted]);

  if (mode === "classic") {
    return (
      <div className="relative min-h-screen bg-black">
        <Analytics />
        <SpeedInsights />
        <BackgroundMusic forcePlay={musicStarted} src={version.musicSrc} />
        {!musicStarted ? (
          <StartScreen
            label={version.playLabel}
            onStart={() => setMusicStarted(true)}
          />
        ) : (
          <>
            <div className="flex min-h-screen items-center justify-center px-6 pt-20 pb-10 text-center">
              <h1 className="bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600 bg-clip-text text-5xl font-extrabold text-transparent drop-shadow-lg transition-all duration-1000">
                {version.title}
              </h1>
            </div>

            {showCarousel && (
              <div className="px-4 opacity-100 transition-opacity duration-1000">
                <ImageCarousel
                  images={version.images}
                  onEnd={() => setShowRomantic(true)}
                />
              </div>
            )}

            {showRomantic && (
              <div className="transition-all duration-1000 ease-in-out">
                <RomanticSection version={version} />
                <VersionFooter currentRoute={version.route} />
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080506] text-white">
      <Analytics />
      <SpeedInsights />
      <BackgroundMusic forcePlay={musicStarted} src={version.musicSrc} />

      {!musicStarted ? (
        <BirthdayStart version={version} onStart={() => setMusicStarted(true)} />
      ) : (
        <>
          <BirthdayHero version={version} />

          {showCarousel && (
            <section className="relative z-10 bg-[#080506] px-4 py-16 sm:py-20">
              <div className="mx-auto max-w-4xl text-center">
                <p className="mb-4 text-sm uppercase tracking-[0.24em] text-rose-200/80">
                  11 de junho
                </p>
                <h2 className="text-3xl font-bold text-white sm:text-5xl">
                  Mais uma data guardada na nossa historia
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-rose-50/70">
                  Uma selecao de capitulos para guardar esse aniversario com
                  carinho.
                </p>
              </div>
              <BirthdayTimelineCarousel
                items={version.timeline ?? []}
                onEnd={() => setShowRomantic(true)}
              />
            </section>
          )}

          {showRomantic && (
            <>
              <RomanticSection version={version} />
              <BirthdayClosing version={version} />
            </>
          )}
        </>
      )}
    </div>
  );
}

function StartScreen({
  label,
  onStart,
}: {
  label: string;
  onStart: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <button
        className="flex flex-col items-center rounded-full bg-pink-600 p-8 text-5xl text-white shadow-2xl transition-colors hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-400"
        onClick={onStart}
        aria-label={label}
      >
        <PlayIcon className="h-20 w-20" />
      </button>
    </div>
  );
}

function BirthdayStart({
  version,
  onStart,
}: {
  version: SiteVersion;
  onStart: () => void;
}) {
  return (
    <main className="relative flex min-h-screen items-end overflow-hidden px-6 py-10 sm:px-10">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${version.heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-8 pb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-rose-100/90">
          11 de junho
        </p>
        <div className="max-w-3xl">
          <h1 className="text-5xl font-black leading-tight text-white drop-shadow-xl sm:text-7xl">
            {version.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-rose-50 sm:text-xl">
            {version.subtitle}
          </p>
        </div>
        <button
          className="inline-flex w-fit items-center gap-3 rounded-full bg-white px-6 py-4 text-base font-bold text-[#17080c] shadow-xl transition hover:bg-rose-100 focus:outline-none focus:ring-4 focus:ring-rose-300"
          onClick={onStart}
          aria-label={version.playLabel}
        >
          <PlayIcon className="h-5 w-5" />
          Comecar
        </button>
      </div>
    </main>
  );
}

function BirthdayHero({ version }: { version: SiteVersion }) {
  return (
    <section className="flex min-h-screen items-center justify-center px-6 py-24 text-center">
      <div className="max-w-4xl">
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-rose-200/80">
          Nova versao
        </p>
        <h1 className="text-4xl font-black leading-tight text-white sm:text-6xl">
          Um presente novo para uma data que merece ficar guardada.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-rose-50/85">
          {version.subtitle}
        </p>
      </div>
    </section>
  );
}

function BirthdayClosing({ version }: { version: SiteVersion }) {
  return (
    <footer className="bg-[#12080b] px-6 py-16 text-center">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-black text-white sm:text-5xl">
          Feliz aniversario, meu amor.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-rose-50/80">
          {version.footerText}
        </p>
        <div className="mt-10">
          <Link
            href="/primeira-versao"
            className="inline-flex items-center justify-center rounded-full border border-rose-200/40 px-5 py-3 text-sm font-semibold text-rose-50 transition hover:border-rose-100 hover:bg-white hover:text-[#17080c]"
          >
            Primeira versao
          </Link>
        </div>
      </div>
    </footer>
  );
}

function VersionFooter({ currentRoute }: { currentRoute: string }) {
  const href = currentRoute === "/" ? "/primeira-versao" : "/";
  const label = currentRoute === "/" ? "Primeira versao" : "Versao aniversario";

  return (
    <footer className="bg-black px-6 py-10 text-center">
      <Link
        href={href}
        className="inline-flex items-center justify-center rounded-full border border-pink-300/40 px-5 py-3 text-sm font-semibold text-pink-100 transition hover:border-pink-100 hover:bg-pink-100 hover:text-black"
      >
        {label}
      </Link>
    </footer>
  );
}

function PlayIcon({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 48 48"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v32l28-16L12 8z" />
    </svg>
  );
}
