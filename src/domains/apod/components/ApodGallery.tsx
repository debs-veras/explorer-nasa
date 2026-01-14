import type { Apod } from "../types";

interface ApodGalleryProps {
  items: Apod[];
  onSelect: (item: Apod) => void;
}

export function ApodGallery({ items, onSelect }: ApodGalleryProps) {
  return (
    <div
      id="galeria"
      className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {items.map((item) => (
        <div
          key={item.date}
          className="relative group cursor-pointer perspective"
          onClick={() => onSelect(item)}
        >
          {/* Card com hover animado */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-cyan-500/20 bg-linear-to-tr from-gray-900/70 via-black/60 to-gray-900/70 transition-transform transform hover:scale-105 hover:rotate-1 hover:shadow-cyan-500/50">
            {/* Anéis orbitais */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <div className="absolute w-36 h-36 border border-purple-500/20 rounded-full animate-spin-slow"></div>
              <div className="absolute w-48 h-48 border border-cyan-500/20 rounded-full animate-spin-slow-reverse"></div>
            </div>

            {/* Imagem ou vídeo */}
            {item.media_type === "image" ? (
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-64 object-cover rounded-t-3xl"
              />
            ) : (
              <iframe
                src={item.url}
                title={item.title}
                className="w-full h-64 rounded-t-3xl"
              />
            )}

            {/* Glow hover */}
            <div className="absolute inset-0 rounded-3xl bg-cyan-500/20 opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none" />

            {/* Conteúdo do card */}
            <div className="p-4 space-y-2 text-white relative z-10">
              <h3 className="font-bold text-lg text-cyan-300">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.date}</p>
              <p className="text-sm text-gray-200 line-clamp-3">
                {item.explanation}
              </p>
            </div>

            {/* Mini partículas flutuantes */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.7,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
