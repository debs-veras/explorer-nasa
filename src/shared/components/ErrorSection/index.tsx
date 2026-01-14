import { AlertCircle } from "lucide-react";

export default function ErrorSection() {
  return (
    <div className="glass-cosmic p-8 rounded-3xl border border-red-500/20 shadow-2xl shadow-red-500/10 animate-shake">
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="p-4 bg-linear-to-br from-red-900/40 to-pink-900/40 rounded-2xl backdrop-blur-sm border border-red-500/20">
            <AlertCircle className="w-10 h-10 text-red-400" />
          </div>
          <div className="absolute -inset-2 bg-red-500/10 blur-lg rounded-2xl -z-10" />
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-semibold text-red-300">
            Interferência Espacial Detectada
          </h3>
          <p className="text-red-200/80">
            Ocorreu uma anomalia na conexão com a rede de satélites da NASA.
          </p>
          <div className="space-y-2 pt-2">
            <p className="text-sm text-red-200/60">Possíveis causas:</p>
            <ul className="text-sm text-red-200/60 space-y-1 list-disc list-inside">
              <li>Tempestade solar interferindo nas comunicações</li>
              <li>Satélites fora do alcance orbital</li>
              <li>Manutenção programada na APOD API</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
