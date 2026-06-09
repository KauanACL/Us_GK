"use client";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

export default function ImageCarousel({
  images,
  onEnd,
}: {
  images: string[];
  onEnd: () => void;
}) {
  const [currentImage, setCurrentImage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const safeImages = useMemo(
    () => (images.length > 0 ? images : ["/versions/2024-12-17/foto1.jpg"]),
    [images],
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const containerTop = containerRef.current?.offsetTop || 0;
      const containerHeight = containerRef.current?.offsetHeight || 0;
      const totalScrollDistance = containerHeight + windowHeight;
      const currentScrollDistance = scrollTop - containerTop + windowHeight;
      const progress = Math.max(
        0,
        Math.min(1, currentScrollDistance / totalScrollDistance),
      );

      setScrollProgress(progress);

      const imageIndex = Math.floor(progress * safeImages.length);
      if (imageIndex !== currentImage && imageIndex < safeImages.length) {
        setCurrentImage(imageIndex);

        if (imageIndex === safeImages.length - 1 && !hasReachedEnd) {
          setHasReachedEnd(true);
          setTimeout(() => onEnd(), 0);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentImage, onEnd, hasReachedEnd, safeImages]);

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-4xl">
      <div
        className="relative"
        style={{ height: `${safeImages.length * 140}vh` }}
      >
        <div
          className="sticky top-1/2 flex w-full justify-center"
          style={{
            transform: `translateY(calc(-50% + ${scrollProgress * 50}px))`,
          }}
        >
          <div className="relative h-[70vh] max-h-[760px] min-h-[420px] w-full max-w-2xl overflow-hidden rounded-lg shadow-lg">
            {safeImages.map((src, idx) => (
              <div
                key={src}
                className={`absolute inset-0 transition-opacity duration-1500 ${
                  idx === currentImage ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={src}
                  alt={`Foto ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 672px"
                  className="object-cover"
                  priority={idx === 0}
                />
                <div className="absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
                  {idx + 1} de {safeImages.length}
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {safeImages.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  idx === currentImage ? "bg-rose-500" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
