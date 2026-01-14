
import { X, Calendar, Star, ExternalLink, Video, Info } from "lucide-react";
import { useState, useEffect } from "react";
import type { Apod } from "../types";

type Props = { item: Apod; onClose: () => void };

export function ApodModal({ item, onClose }: Props) {
  const [imageLoading, setImageLoading] = useState(true);
  const isVideo = item.media_type === "video";
  const imageUrl = item.hdurl ?? item.url;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-linear-to-br from-black via-gray-900/95 to-black backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-3xl sm:max-w-5xl lg:max-w-6xl bg-linear-to-br from-gray-900 via-black to-gray-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-50 group cursor-pointer"
          aria-label="Fechar modal"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition" />
            <div className="relative p-3 bg-black/70 backdrop-blur border border-white/10 rounded-full hover:scale-110 transition">
              <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform" />
            </div>
          </div>
        </button>

        {/* Media */}
        <div className="relative w-full lg:w-1/2 overflow-hidden shrink-0">
          {imageLoading && !isVideo && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 border-4 border-transparent border-t-cyan-400 border-r-blue-400 rounded-full animate-spin" />
            </div>
          )}

          {isVideo ? (
            <div className="relative w-full h-0 pb-[56.25%] bg-black">
              <iframe
                src={item.url}
                className="absolute inset-0 w-full h-full"
                title={item.title}
                allowFullScreen
              />
            </div>
          ) : (
            <>
              <img
                src={imageUrl}
                alt={item.title}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  imageLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => setImageLoading(false)}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
            </>
          )}

          {/* Badges */}
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            <div className="px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-full border border-white/10 flex items-center gap-2">
              {isVideo ? (
                <Video className="w-4 h-4 text-purple-400" />
              ) : (
                <img
                  src="https://www.nasa.gov/wp-content/themes/nasa/assets/images/nasa-logo.svg"
                  className="w-4 h-4"
                  alt="NASA"
                />
              )}
              <span className="text-xs font-medium text-white">
                {isVideo ? "Vídeo" : "NASA Image"}
              </span>
            </div>
            {item.copyright && (
              <div className="px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-full border border-white/10 flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-medium text-white">
                  © {item.copyright}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-10 overflow-y-auto max-h-[95vh] space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Calendar className="w-4 h-4" />
              {new Date(item.date).toLocaleDateString("pt-BR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>

            <h2 className="text-2xl lg:text-3xl font-bold bg-linear-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              {item.title}
            </h2>
          </div>

          <article className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-cyan-300">
              <Info className="w-5 h-5" /> EXPLICAÇÃO
            </div>
            <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
              {item.explanation}
            </p>
          </article>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
            {!isVideo && (
              <>
                <a
                  href={imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group
                    relative
                    px-5 py-2.5
                    rounded-lg
                    bg-linear-to-r from-blue-600 to-indigo-600
                    text-sm font-medium text-white
                    transition-all
                    hover:scale-[1.04]
                    hover:shadow-lg hover:shadow-blue-500/30
                    focus-visible:outline-none
                    focus-visible:ring-2 focus-visible:ring-blue-400
                  "
                >
                  <ExternalLink className="inline w-4 h-4 mr-2 group-hover:translate-x-0.5 transition" />
                  Ver em HD
                </a>
              </>
            )}
          </div>

          <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-zinc-500">Data de Publicação</p>
              <p className="font-medium text-white">
                {new Date(item.date).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-zinc-500">Tipo de Mídia</p>
              <p className="font-medium text-white">
                {isVideo ? "Vídeo" : "Imagem"}
              </p>
            </div>
            {item.copyright && (
              <div className="col-span-2">
                <p className="text-zinc-500">Créditos</p>
                <p className="font-medium text-white">{item.copyright}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scrollbar */}
      <style>
        {`
          /* Remove setas */
          *::-webkit-scrollbar-button {
            display: none;
            width: 0;
            height: 0;
          }

          *::-webkit-scrollbar {
            width: 6px;
          }

          *::-webkit-scrollbar-track {
            background: transparent;
          }

          *::-webkit-scrollbar-thumb {
            background: linear-gradient(
              180deg,
              rgba(56,189,248,0.9),
              rgba(37,99,235,0.9)
            );
            border-radius: 999px;
            box-shadow:
              0 0 8px rgba(56,189,248,0.5),
              inset 0 0 6px rgba(255,255,255,0.15);
          }

          *::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(
              180deg,
              rgba(125,211,252,1),
              rgba(59,130,246,1)
            );
            box-shadow: 0 0 14px rgba(125,211,252,0.8);
          }
        `}
      </style>
    </div>
  );
}
