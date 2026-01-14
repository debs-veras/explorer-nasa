import { Satellite } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-8 animate-fade-in">
      <div className="relative">
        {/* Satélite giratório */}
        <div className="w-32 h-32 border-2 border-cyan-500/30 rounded-full">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <Satellite className="w-12 h-12 text-cyan-400 animate-orbit" />
              <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full" />
            </div>
          </div>
        </div>

        {/* Anéis de loading */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-40 h-40 border-t-2 border-cyan-400/50 border-dashed rounded-full animate-spin-slow" />
          <div className="w-48 h-48 border-b-2 border-purple-400/30 border-dashed rounded-full animate-spin-slow-reverse" />
        </div>
      </div>

      <div className="text-center space-y-3">
        <p className="text-cyan-100/60 text-sm max-w-md">
          Estabelecendo conexão com os observatórios da NASA. Aguarde enquanto
          capturamos as imagens do espaço profundo.
        </p>
      </div>
    </div>
  );
}
