"use client";

import Link from "next/link";
import { useState } from "react";
import type { SiteVersionSummary } from "@/data/siteVersions";

export default function VersionSidebar({
  versions,
  currentVersionDate,
}: {
  versions: SiteVersionSummary[];
  currentVersionDate: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white shadow-xl backdrop-blur transition hover:border-rose-100 hover:bg-white hover:text-[#17080c] focus:outline-none focus:ring-2 focus:ring-rose-300"
        onClick={() => setIsOpen((value) => !value)}
        aria-label={isOpen ? "Fechar versões" : "Abrir versões"}
        aria-expanded={isOpen}
      >
        <MenuIcon isOpen={isOpen} />
      </button>

      <div
        className={`fixed inset-0 z-40 bg-black/45 backdrop-blur-sm transition-opacity md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`fixed bottom-0 left-0 top-0 z-40 w-[min(82vw,320px)] border-r border-white/10 bg-[#090506]/95 px-5 pb-6 pt-20 text-white shadow-2xl backdrop-blur-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Versões do site"
        aria-hidden={!isOpen}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rose-200/70">
          Versões
        </p>
        <nav className="mt-6 flex flex-col gap-3">
          {versions.map((version) => {
            const isCurrent = version.date === currentVersionDate;

            return (
              <Link
                key={version.date}
                href={version.route}
                className={`rounded-lg border px-4 py-3 transition ${
                  isCurrent
                    ? "border-rose-200 bg-rose-100 text-[#17080c]"
                    : "border-white/10 bg-white/[0.04] text-rose-50 hover:border-rose-100/60 hover:bg-white/[0.08]"
                }`}
                onClick={() => setIsOpen(false)}
                aria-current={isCurrent ? "page" : undefined}
                tabIndex={isOpen ? undefined : -1}
              >
                <span className="block text-sm font-bold">{version.label}</span>
                <span
                  className={`mt-1 block text-xs ${
                    isCurrent ? "text-[#17080c]/70" : "text-rose-100/60"
                  }`}
                >
                  {version.date}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  if (isOpen) {
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
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    );
  }

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
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
