import { useState } from "react";
import { ApodModal } from "../../components/ApodModal";
import { useApodGallery } from "../../hooks/useApod";
import { Calendar } from "lucide-react";
import { DateFilter } from "../../components/DateFilter";
import { ApodGallery } from "../../components/ApodGallery";

export default function ApodGalleryPage() {
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 10);
    return d.toISOString().split("T")[0];
  });
  const [endDate, setEndDate] = useState(
    () => new Date().toISOString().split("T")[0],
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { data, isLoading, error } = useApodGallery(startDate, endDate);

  return (
    <>
      <div className="relative max-w-7xl mx-auto px-6 py-24 space-y-24 text-white">
        <section className="space-y-12">
          <header className="space-y-3">
            <h2 className="text-4xl font-light tracking-tight">
              Galeria Astronômica
            </h2>
            <p className="text-zinc-400 max-w-xl">
              Um arquivo visual das imagens mais impressionantes capturadas pela
              NASA ao longo dos anos.
            </p>
          </header>

          <div className="h-px bg-linear-to-r from-transparent via-cyan-500/30 to-transparent" />
          {/* ===== FILTRO ===== */}
          <section className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 shadow-[0_30px_120px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <Calendar className="w-5 h-5 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-light tracking-wide">
                Filtrar imagens por data
              </h2>
            </div>

            <DateFilter
              startDate={startDate}
              endDate={endDate}
              onChange={(start, end) => {
                setStartDate(start);
                setEndDate(end);
              }}
            />
          </section>

          <ApodGallery
            items={[]}
            error={error}
            isLoading={isLoading}
            onSelect={(item) => {
              const index = data?.findIndex((i) => i.date === item.date);
              setSelectedIndex(index ?? 0);
            }}
          />
        </section>
      </div>
      {selectedIndex !== null && data && (
        <ApodModal
          items={data}
          initialIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </>
  );
}
