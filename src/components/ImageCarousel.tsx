"use client";
import { useEffect, useRef, useState } from "react";

const images = [
  "/img1.jpg",
  "/img2.jpg", 
  "/img3.jpg",
  // Adicione mais imagens conforme necessário
];

export default function ImageCarousel({ onEnd }: { onEnd: () => void }) {
  const [currentImage, setCurrentImage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const containerTop = containerRef.current?.offsetTop || 0;
      const containerHeight = containerRef.current?.offsetHeight || 0;
      
      // Calcular progresso do scroll (0 a 1)
      const totalScrollDistance = containerHeight + windowHeight;
      const currentScrollDistance = scrollTop - containerTop + windowHeight;
      const progress = Math.max(0, Math.min(1, currentScrollDistance / totalScrollDistance));
      
      setScrollProgress(progress);
      
      // Calcular qual imagem deve ser mostrada
      const imageIndex = Math.floor(progress * images.length);
      if (imageIndex !== currentImage && imageIndex < images.length) {
        setCurrentImage(imageIndex);
        
        // Marcar que chegou ao final, mas manter as imagens visíveis
        if (imageIndex === images.length - 1 && !hasReachedEnd) {
          setHasReachedEnd(true);
          // Aguardar um pouco mais antes de mostrar a próxima seção
          setTimeout(() => onEnd(), 2000);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentImage, onEnd, hasReachedEnd]);

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto relative">
      {/* Container principal com altura para scroll */}
      <div className="h-[400vh] relative">
        {/* Carrossel fixo que se move com o scroll */}
        <div 
          className="sticky top-1/2 transform -translate-y-1/2 w-full flex justify-center"
          style={{
            transform: `translateY(${scrollProgress * 50}px)`
          }}
        >
          <div className="relative h-96 w-full max-w-2xl rounded-lg shadow-lg overflow-hidden">
            {images.map((src, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-1500 ${
                  idx === currentImage ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img 
                  src={src} 
                  alt={`Imagem ${idx + 1}`} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error(`Erro ao carregar imagem: ${src}`);
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='Arial' font-size='24' fill='%23999'%3EImagem %3C/tspan%3Etspan%3E${idx + 1}%3C/tspan%3E%3C/text%3E%3C/svg%3E";
                  }}
                />
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  {idx + 1} de {images.length}
                </div>
              </div>
            ))}
          </div>
          
          {/* Indicadores de progresso */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  idx === currentImage ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center text-sm text-gray-600 bg-white bg-opacity-80 px-4 py-2 rounded-full">
            Role a página para ver as próximas imagens
          </div>
        </div>
      </div>
    </div>
  );
} 