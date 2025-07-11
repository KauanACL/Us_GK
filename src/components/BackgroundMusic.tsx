"use client";
import { useEffect, useRef, useState } from "react";

interface BackgroundMusicProps {
  forcePlay?: boolean;
}

export default function BackgroundMusic({ forcePlay }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Sincronizar com prop forcePlay
  useEffect(() => {
    if (forcePlay) setPlaying(true);
  }, [forcePlay]);

  useEffect(() => {
    if (playing && audioRef.current) {
      audioRef.current.volume = 1.0;
      audioRef.current.play().catch(() => {
        setShowHint(true);
      });
    } else if (!playing && audioRef.current) {
      audioRef.current.pause();
    }
  }, [playing]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <button
        className={`rounded-full p-3 bg-pink-600 hover:bg-pink-700 shadow-lg transition-colors text-white text-xl focus:outline-none focus:ring-2 focus:ring-pink-400`}
        onClick={() => { setPlaying((p) => !p); setShowHint(false); }}
        aria-label={playing ? "Pausar música" : "Tocar música"}
      >
        {playing ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.25v13.5l13.5-6.75-13.5-6.75z" />
          </svg>
        )}
      </button>
      <audio ref={audioRef} src="/music.mp3" loop />
      {showHint && (
        <div className="mt-2 px-4 py-2 bg-black bg-opacity-80 text-white rounded shadow text-sm animate-pulse">
          Clique no botão para ouvir a música!
        </div>
      )}
    </div>
  );
} 