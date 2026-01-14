type Props = {
  startDate: string;
  endDate: string;
  onChange: (start: string, end: string) => void;
};

export function DateFilter({ startDate, endDate, onChange }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 rounded-2xl bg-zinc-900/60 p-4 backdrop-blur-xl border border-white/10">
      <input
        type="date"
        value={startDate}
        onChange={(e) => onChange(e.target.value, endDate)}
        className=" rounded-lg bg-zinc-950 border border-white/10 px-4 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
      />

      <input
        type="date"
        value={endDate}
        onChange={(e) => onChange(startDate, e.target.value)}
        className=" rounded-lg bg-zinc-950 border border-white/10 px-4 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
      />
    </div>
  );
}
