"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { TimelinePhoto } from "@/data/siteVersions";

export default function BirthdayTimelineCarousel({
  items,
  onEnd,
}: {
  items: TimelinePhoto[];
  onEnd: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const safeItems = useMemo(
    () =>
      items.length > 0
        ? items
        : [
            {
              src: "/IMG7.JPG",
              title: "Nossa historia",
              caption: "Adicione uma legenda para esta foto.",
            },
          ],
    [items],
  );
  const activeItem = safeItems[activeIndex] ?? safeItems[0];
  const progressPercent = ((activeIndex + 1) / safeItems.length) * 100;

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(Math.max(0, Math.min(index, safeItems.length - 1)));
    },
    [safeItems.length],
  );

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const goPrevious = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  useEffect(() => {
    if (activeIndex === safeItems.length - 1 && !hasReachedEnd) {
      setHasReachedEnd(true);
      window.setTimeout(onEnd, 250);
    }
  }, [activeIndex, hasReachedEnd, onEnd, safeItems.length]);

  const handleTouchEnd = (clientX: number) => {
    if (touchStartX === null) return;

    const distance = touchStartX - clientX;
    if (Math.abs(distance) > 40) {
      if (distance > 0) {
        goNext();
      } else {
        goPrevious();
      }
    }

    setTouchStartX(null);
  };

  return (
    <div className="mx-auto mt-12 w-full max-w-6xl">
      <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div
          className="relative min-h-[460px] overflow-hidden rounded-[28px] bg-white/5 shadow-2xl ring-1 ring-white/10 sm:min-h-[560px]"
          onTouchStart={(event) => setTouchStartX(event.touches[0].clientX)}
          onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0].clientX)}
        >
          {safeItems.map((item, index) => (
            <div
              key={item.src}
              className={`absolute inset-0 transition duration-700 ease-out ${
                index === activeIndex
                  ? "scale-100 opacity-100"
                  : "scale-105 opacity-0"
              }`}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 1024px) 100vw, 760px"
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-5 sm:hidden">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-100/80">
              {activeIndex + 1} de {safeItems.length}
            </p>
            <h3 className="mt-2 text-2xl font-black text-white">
              {activeItem.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-rose-50/85">
              {activeItem.caption}
            </p>
          </div>

          <CarouselButton
            direction="previous"
            disabled={activeIndex === 0}
            onClick={goPrevious}
          />
          <CarouselButton
            direction="next"
            disabled={activeIndex === safeItems.length - 1}
            onClick={goNext}
          />
        </div>

        <aside className="flex rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-xl backdrop-blur sm:p-8">
          <div className="flex w-full flex-col">
            <div className="mb-6 flex items-center justify-between text-sm text-rose-100/80">
              <span className="font-semibold uppercase tracking-[0.22em]">
                Capitulo
              </span>
              <span>
                {activeIndex + 1}/{safeItems.length}
              </span>
            </div>

            <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-rose-300 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="hidden sm:block">
              <h3 className="text-4xl font-black leading-tight text-white">
                {activeItem.title}
              </h3>
              <p className="mt-5 text-base leading-7 text-rose-50/80">
                {activeItem.caption}
              </p>
            </div>

            <div className="mt-auto pt-8">
              <div className="flex gap-3">
                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-rose-100 hover:bg-white hover:text-[#17080c] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:bg-transparent disabled:hover:text-white"
                  onClick={goPrevious}
                  disabled={activeIndex === 0}
                  aria-label="Foto anterior"
                >
                  <ChevronIcon direction="previous" />
                </button>
                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-100 text-[#17080c] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
                  onClick={goNext}
                  disabled={activeIndex === safeItems.length - 1}
                  aria-label="Proxima foto"
                >
                  <ChevronIcon direction="next" />
                </button>
              </div>

              <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
                {safeItems.map((item, index) => (
                  <button
                    key={item.src}
                    type="button"
                    className={`relative h-16 w-12 shrink-0 overflow-hidden rounded-lg ring-2 transition sm:h-20 sm:w-16 ${
                      index === activeIndex
                        ? "ring-rose-200"
                        : "ring-white/10 opacity-60 hover:opacity-100"
                    }`}
                    aria-label={`Abrir ${item.title}`}
                    onClick={() => goTo(index)}
                  >
                    <Image
                      src={item.src}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function CarouselButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "previous" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  const isPrevious = direction === "previous";

  return (
    <button
      type="button"
      className={`absolute top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur transition hover:bg-white hover:text-[#17080c] disabled:cursor-not-allowed disabled:opacity-30 sm:flex ${
        isPrevious ? "left-4" : "right-4"
      }`}
      onClick={onClick}
      disabled={disabled}
      aria-label={isPrevious ? "Foto anterior" : "Proxima foto"}
    >
      <ChevronIcon direction={direction} />
    </button>
  );
}

function ChevronIcon({
  direction,
}: {
  direction: "previous" | "next";
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-5 w-5"
      aria-hidden="true"
    >
      {direction === "previous" ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      )}
    </svg>
  );
}
