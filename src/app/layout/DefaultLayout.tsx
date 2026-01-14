import { Outlet } from "react-router-dom";
import Hero from "../../shared/components/Hero";
import Footer from "../../shared/components/Footer";

export function DefaultLayout() {
  return (
    <>
      <Hero />
      <main className="relative bg-black overflow-hidden">
        {/* Transição suave */}
        <div className="h-15 bg-linear-to-b from-black via-black/80 to-black" />

        {/* Nebulosas de fundo */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-cyan-500/10 blur-[200px]" />
          <div className="absolute bottom-0 right-1/4 w-[700px] h-[500px] bg-indigo-500/10 blur-[220px]" />
        </div>

        <Outlet />
        <Footer />
      </main>
    </>
  );
}
