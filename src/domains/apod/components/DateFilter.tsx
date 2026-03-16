import { useState } from "react";
import { Search } from "lucide-react";

type Props = {
  startDate: string;
  endDate: string;
  onChange: (start: string, end: string) => void;
};

export function DateFilter({ startDate, endDate, onChange }: Props) {
  const [localStartDate, setLocalStartDate] = useState(startDate);
  const [localEndDate, setLocalEndDate] = useState(endDate);

  const handleApply = () => {
    onChange(localStartDate, localEndDate);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleApply();
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 rounded-2xl bg-zinc-900/60 p-4 backdrop-blur-xl border border-white/10">
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <input
          type="date"
          value={localStartDate}
          onChange={(e) => setLocalStartDate(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full rounded-lg bg-zinc-950 border border-white/10 px-4 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
        />

        <input
          type="date"
          value={localEndDate}
          onChange={(e) => setLocalEndDate(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full rounded-lg bg-zinc-950 border border-white/10 px-4 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
        />
      </div>

      <button
        onClick={handleApply}
        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 transition-colors text-white px-6 py-2 rounded-lg font-medium shadow-lg shadow-cyan-900/20 cursor-pointer"
      >
        <Search className="w-4 h-4" />
        <span>Filtrar</span>
      </button>
    </div>
  );
}
