import { OptimizedImage } from "../../../shared/components/OptimizedImage/index";
import { X, Calendar, Star, ExternalLink, Video, Info, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import type { Apod } from "../../../shared/types/types";
import { formatDateBR, formatDateFullBR } from "../../../shared/utils/date";


type Props = { items: Apod[]; initialIndex: number; onClose: () => void };

export function ApodModal({ items, initialIndex, onClose }: Props) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const item = items[currentIndex];
  
  const isVideo = item.media_type === "video";
  const imageUrl = item.hdurl ?? item.url;

  const resetPosition = useCallback(() => {
    setScale(1);
    x.set(0);
    y.set(0);
  }, [x, y]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
    resetPosition();
  }, [items.length, resetPosition]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    resetPosition();
  }, [items.length, resetPosition]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, handleNext, handlePrev]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => {
    setScale((prev) => {
      const newScale = Math.max(prev - 0.5, 1);
      if (newScale === 1) {
        x.set(0);
        y.set(0);
      }
      return newScale;
    });
  };
  const handleResetZoom = () => resetPosition();
  
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 });

  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setDragConstraints({
          left: -((scale - 1) * offsetWidth) / 2,
          right: ((scale - 1) * offsetWidth) / 2,
          top: -((scale - 1) * offsetHeight) / 2,
          bottom: ((scale - 1) * offsetHeight) / 2,
        });
      }
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, [scale, item.date]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-linear-to-br from-black via-gray-900/95 to-black backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Navigation Buttons - Desktop */}
      <button
        onClick={handlePrev}
        className="hidden lg:flex absolute left-8 z-50 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all hover:scale-110 group active:scale-95"
        aria-label="Imagem anterior"
      >
        <ChevronLeft className="w-8 h-8 text-white group-hover:text-cyan-400 transition-colors" />
      </button>

      <button
        onClick={handleNext}
        className="hidden lg:flex absolute right-8 z-50 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all hover:scale-110 group active:scale-95"
        aria-label="Próxima imagem"
      >
        <ChevronRight className="w-8 h-8 text-white group-hover:text-cyan-400 transition-colors" />
      </button>

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
        <div className="relative w-full lg:w-1/2 overflow-hidden shrink-0 bg-black flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.date}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full relative"
            >
              {isVideo ? (
                <div className="relative w-full h-0 pb-[56.25%] bg-black self-center">
                  <iframe
                    src={item.url}
                    className="absolute inset-0 w-full h-full"
                    title={item.title}
                    allowFullScreen
                  />
                </div>
              ) : (
                <div 
                  ref={containerRef}
                  className="relative w-full h-full overflow-hidden flex items-center justify-center"
                >
                  <motion.div
                    drag={scale > 1}
                    dragConstraints={dragConstraints}
                    dragElastic={0.1}
                    animate={{ scale }}
                    style={{ x, y }}
                    className="w-full h-full cursor-grab active:cursor-grabbing"
                  >
                    <OptimizedImage
                      src={imageUrl}
                      alt={item.title}
                      aspectRatio="aspect-square lg:aspect-auto lg:h-full"
                      className="w-full h-full object-contain pointer-events-none"
                    />
                  </motion.div>
                  
                  {/* Zoom Controls */}
                  <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-20">
                    <button 
                      onClick={handleZoomIn}
                      className="p-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-lg text-white hover:bg-white/10 transition"
                      title="Aumentar zoom"
                    >
                      <ZoomIn className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={handleZoomOut}
                      className="p-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-lg text-white hover:bg-white/10 transition"
                      title="Diminuir zoom"
                    >
                      <ZoomOut className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={handleResetZoom}
                      className="p-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-lg text-white hover:bg-white/10 transition"
                      title="Resetar zoom"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Badges */}
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 z-20">
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
              <div className="hidden sm:flex px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-full border border-white/10 items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-medium text-white">
                  © {item.copyright}
                </span>
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden absolute inset-y-0 inset-x-0 flex items-center justify-between px-4 pointer-events-none">
            <button
              onClick={handlePrev}
              className="p-3 bg-black/50 backdrop-blur border border-white/10 rounded-full text-white pointer-events-auto active:scale-95 transition"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 bg-black/50 backdrop-blur border border-white/10 rounded-full text-white pointer-events-auto active:scale-95 transition"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-10 overflow-y-auto max-h-[95vh] space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Calendar className="w-4 h-4" />
              {formatDateFullBR(item.date)}
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
                {formatDateBR(item.date)}
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
    </div>
  );
}
