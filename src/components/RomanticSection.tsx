"use client";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

export default function RomanticSection() {
  const [totalSeconds, setTotalSeconds] = useState(0);


  // Data de início do namoro (17/12/2024)
  const startDate = dayjs("2024-12-17T00:00:00");

  useEffect(() => {
  const updateTime = () => {
    const now = dayjs();
    let diff = now.diff(startDate, 'second'); // diferença total em segundos
    if (diff < 0) diff = 0;
    setTotalSeconds(diff);
  };
  updateTime();
  const interval = setInterval(updateTime, 1000);
  return () => clearInterval(interval);
}, []);


  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-black">
      <div className="max-w-4xl mx-auto text-center">
        {/* Texto Romântico */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-pink-400 mb-6 drop-shadow-lg">
            Uma pequena dedicatória ❤️
          </h2>
          <div className="text-lg text-white leading-relaxed space-y-4">
            <p>
              Cada dia ao seu lado é um presente que eu guardo no coração. 
              Sua presença ilumina meus dias e faz tudo ter mais sentido.
            </p>
            <p>
              Você é minha inspiração, minha força e minha alegria. 
              Juntos construímos memórias que ficarão para sempre em nossos corações.
            </p>
            <p>
              Obrigado por ser exatamente quem você é e por me fazer tão feliz. 
              Te amo mais a cada dia que passa.
            </p>
          </div>
        </div>

        {/* Contador do Tempo de Namoro */}
        <div className="bg-gradient-to-r from-fuchsia-700 via-pink-600 to-purple-800 rounded-2xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-white mb-6">
            Te amo há!
          </h3>
          
<div className="bg-black bg-opacity-40 rounded-lg p-6 flex flex-col items-center">
  <div className="text-5xl font-extrabold text-white drop-shadow-lg bg-black bg-opacity-60 rounded-lg px-6 py-4 border-2 border-pink-400">
    {totalSeconds.toLocaleString('pt-BR')}
  </div>
    Segundos
  </div>
    </div>
      <p className="text-white text-sm mt-4 opacity-90">
        E sempre vou te amar, hoje, amanhã e para sempre!
      </p>
    </div>
  </div>
    
  );
} 