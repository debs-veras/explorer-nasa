import { useState } from "react";
import { ApodModal } from "../../components/ApodModal";
import { useApodGallery } from "../../hooks/useApod";
import Loading from "../../../../shared/components/Loading";
import ErrorSection from "../../../../shared/components/ErrorSection";
import { Calendar } from "lucide-react";
import { DateFilter } from "../../components/DateFilter";
import { ApodGallery } from "../../components/ApodGallery";
import type { Apod } from "../../types";

export default function ApodGalleryPage() {
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-01-10");
  const [selected, setSelected] = useState<Apod | null>(null);

  const { data, isLoading, error } = useApodGallery(startDate, endDate);
  return (
    <>
      <div className="relative max-w-7xl mx-auto px-6 py-24 space-y-24 text-white">
        {isLoading && <Loading />}
        {error && <ErrorSection />}
        {data && (
          <section className="space-y-12">
            <header className="space-y-3">
              <h2 className="text-4xl font-light tracking-tight">
                Galeria Astronômica
              </h2>
              <p className="text-zinc-400 max-w-xl">
                Um arquivo visual das imagens mais impressionantes capturadas
                pela NASA ao longo dos anos.
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
            <ApodGallery items={data} onSelect={setSelected} />
          </section>
        )}
      </div>
      {selected && (
        <ApodModal item={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
