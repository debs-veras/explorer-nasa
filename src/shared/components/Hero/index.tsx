import { useMemo } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

type Star = {
  top: string;
  left: string;
  size: string;
  opacity: number;
};

function generateStars(count: number): Star[] {
  return Array.from({ length: count }).map(() => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 2 + 1}px`,
    opacity: Math.random() * 0.6 + 0.2,
  }));
}

/* ===== VARIANTS ===== */
const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function Hero() {
  const stars = useMemo(() => generateStars(160), []);

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* ===== BACKGROUND ===== */}
      <div className="absolute inset-0">
        {stars.map((star, index) => (
          <div
            key={index}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
            }}
          />
        ))}

        {/* Nebulosa animada */}
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-purple-900/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-900/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* Grade espacial sutil */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
                           linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* ===== TEXTOS ===== */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-10"
        >
          <div
            className="flex items-center gap-4 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-spin-slow" />
              <span className="text-sm uppercase tracking-widest text-cyan-400 font-mono">
                Explorer NASA
              </span>
            </div>
            <div className="h-px flex-1 bg-linear-to-r from-cyan-500/50 to-transparent" />
          </div>

          <motion.h1
            variants={item}
            className="text-5xl md:text-7xl font-light text-white leading-tight"
          >
            Explore o universo <br />
            <span className="text-cyan-400">imagem por imagem</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-zinc-400 text-lg max-w-xl leading-relaxed"
          >
            Uma galeria visual das imagens astronômicas oficiais da NASA,
            capturadas por telescópios e missões espaciais ao longo de décadas.
          </motion.p>

          <motion.button
            variants={item}
            whileHover={{ x: 6 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            onClick={() => {
              document.getElementById("galeria")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            className="inline-flex items-center gap-3 text-sm uppercase tracking-widest text-white cursor-pointer"
          >
            Explorar galeria
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </motion.button>
        </motion.div>

        {/* ===== LOGO NASA ===== */}
        <div className="relative flex items-center justify-center h-[460px]">
          <div className="absolute w-[520px] h-[520px] rounded-full border border-white/10 animate-spin-slow" />
          <div className="absolute w-[420px] h-[420px] rounded-full border border-cyan-400/30 animate-spin-slower" />

          <motion.div
            initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.img
              src="https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg"
              alt="NASA Logo"
              className="w-[300px] md:w-[360px] object-contain drop-shadow-[0_0_80px_rgba(56,189,248,0.45)]"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-linear-to-b from-cyan-400 to-purple-400 rounded-full mt-2 animate-scroll" />
          </div>
        </div>
      </div>
    </section>
  );
}
