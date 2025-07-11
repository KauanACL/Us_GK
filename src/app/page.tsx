"use client";
import Image from "next/image";
import ImageCarousel from "@/components/ImageCarousel";
import RomanticSection from "@/components/RomanticSection";
import BackgroundMusic from "@/components/BackgroundMusic";
import { useState, useEffect } from "react";

export default function Home() {
  const [showRomantic, setShowRomantic] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);

  // Remove o autoplay e o scroll-trigger do BackgroundMusic
  // O botão de play centralizado inicia a experiência

  useEffect(() => {
    if (musicStarted) {
      const timer = setTimeout(() => setShowCarousel(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [musicStarted]);

  return (
    <div className="relative bg-black min-h-screen">
      <BackgroundMusic forcePlay={musicStarted} />
      {!musicStarted ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <button
            className="rounded-full p-8 bg-pink-600 hover:bg-pink-700 shadow-2xl transition-colors text-white text-5xl focus:outline-none focus:ring-4 focus:ring-pink-400 flex flex-col items-center"
            onClick={() => setMusicStarted(true)}
            aria-label="Tocar música e começar surpresa"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v32l28-16-28-16z" />
            </svg>
          </button>
        </div>
      ) : (
        <>
          {/* Seção do título */}
          <div className="pt-20 pb-10 text-center min-h-screen flex items-center justify-center">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600 drop-shadow-lg transition-all duration-1000">
              Bom dia meu amor, aqui está uma pequena surpresa para você!
            </h1>
          </div>

          {/* Seção do carrossel */}
          {showCarousel && (
            <div className="px-4 transition-opacity duration-1000 opacity-100">
              <ImageCarousel onEnd={() => setShowRomantic(true)} />
            </div>
          )}

          {/* Seção romântica com transição suave */}
          {showRomantic && (
            <div className="transition-all duration-1000 ease-in-out">
              <RomanticSection />
            </div>
          )}
        </>
      )}
    </div>
  );
}
