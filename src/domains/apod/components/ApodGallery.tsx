import { Telescope } from "lucide-react";
import ErrorSection from "../../../shared/components/ErrorSection";
import Loading from "../../../shared/components/Loading";
import { OptimizedImage } from "../../../shared/components/OptimizedImage/index";
import type { Apod } from "../../../shared/types/types";

interface ApodGalleryProps {
  items: Apod[];
  onSelect: (item: Apod) => void;
  isLoading: boolean;
  error: Error | null;
}

export function ApodGallery({
  items,
  onSelect,
  isLoading,
  error,
}: ApodGalleryProps) {
  return (
    <>
      {error && <ErrorSection message={error.message} />}
      {isLoading && <Loading />}
      <div
        id="galeria"
        className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {items.length > 0 ? (
          items.map((item) => (
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
                  <OptimizedImage
                    src={item.url}
                    alt={item.title}
                    className="rounded-t-3xl"
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
                  <h3 className="font-bold text-lg text-cyan-300">
                    {item.title}
                  </h3>
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
          ))
        ) : (
          !isLoading &&
          !error && (
            <div className="col-span-full py-32 text-center space-y-6 animate-in fade-in zoom-in duration-700">
              <div className="relative inline-block">
                <div className="p-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_50px_rgba(6,182,212,0.15)]">
                  <Telescope className="w-16 h-16 text-cyan-400/80 animate-pulse" />
                </div>
                <div className="absolute -inset-4 bg-cyan-500/5 blur-2xl rounded-full -z-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-light text-zinc-300">
                  Silêncio no Cosmos
                </h3>
                <p className="text-zinc-500 max-w-sm mx-auto font-light">
                  Nenhum segredo espacial foi capturado nesta órbita temporal.
                  Tente ajustar suas coordenadas de data.
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}
