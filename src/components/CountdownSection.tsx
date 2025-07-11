"use client";
import Countdown from "react-countdown";

export default function CountdownSection() {
  // 5 minutos de contagem regressiva
  const endTime = Date.now() + 5 * 60 * 1000;
  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <h2 className="text-3xl font-bold">Obrigado por ver as fotos!</h2>
      <p className="text-lg">Aguarde o tempo acabar para a próxima surpresa:</p>
      <Countdown
        date={endTime}
        renderer={({ minutes, seconds, completed }) =>
          completed ? (
            <span className="text-green-600 font-bold text-2xl">Surpresa liberada!</span>
          ) : (
            <span className="text-2xl font-mono">{minutes}:{seconds.toString().padStart(2, "0")}</span>
          )
        }
      />
    </div>
  );
} 