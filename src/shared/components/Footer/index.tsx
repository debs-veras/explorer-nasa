import { Rocket } from "lucide-react";

export default function Footer() {
  return (
    <div className="relative max-w-7xl mx-auto px-6 py-24 space-y-24 text-white">
      <footer className="pt-12 border-t border-cyan-500/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-linear-to-br from-cyan-900/30 to-purple-900/30 rounded-lg border border-cyan-500/20">
              <Rocket className="w-5 h-5 text-cyan-300" />
            </div>
            <div className="space-y-1">
              <p className="text-cyan-100">NASA Cosmic Explorer</p>
              <p className="text-cyan-100/50 text-xs">
                Projeto de código aberto • APOD API v1.0
              </p>
            </div>
          </div>

          <div className="text-center space-y-1">
            <p className="text-cyan-100/70">
              Desenvolvido para exploradores do infinito
            </p>
            <p className="text-cyan-100/40 text-xs">
              "Alguma coisa em algum lugar espera para ser conhecida"
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
