
import { HiSparkles, HiArrowRight, HiAcademicCap, HiBriefcase, HiTrendingUp, HiShoppingBag } from "react-icons/hi";

const FEATURES = [
  { icon: HiAcademicCap,  label: "Rekomendasi Jurusan", desc: "Cocok sama profil kamu",      color: "text-violet-400 bg-violet-400/10 border-violet-400/20" },
  { icon: HiBriefcase,    label: "Analisis Karir",       desc: "3 profesi terbaik buat kamu", color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
  { icon: HiTrendingUp,   label: "Roadmap 5 Tahun",      desc: "Skill yang perlu dikuasai",   color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
  { icon: HiShoppingBag,  label: "Peluang UMKM",         desc: "Ide usaha yang bisa dimulai", color: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
];

const STATS = [
  { value: "15", label: "Pertanyaan" },
  { value: "~5",  label: "Menit" },
  { value: "100%", label: "Gratis" },
];

export default function IntroPage({ onStart }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-5 relative overflow-hidden">

      <div className="absolute inset-0 opacity-[0.10]"
        style={{ backgroundImage: "linear-gradient(#3b82f6 1px,transparent 1px),linear-gradient(90deg,#3b82f6 1px,transparent 1px)", backgroundSize: "48px 48px" }} />

      {/* Glow blobs */}
      <div className="absolute top-1/4 -left-32 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-72 h-72 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            <HiSparkles className="size-4" /> Powered by AI
          </span>
        </div>

        <div className="text-center mb-10">
          <h1 className="font-black text-white leading-none mb-4"
            style={{ fontSize: "clamp(2.4rem, 7vw, 4rem)", letterSpacing: "-0.02em" }}>
            Cari Tahu Karir<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-secondary to-blue-700">Impian Kamu</span>
          </h1>
          <p className="text-slate-400 leading-relaxed max-w-md mx-auto text-sm lg:text-base">
            Jawab <strong className="text-white">15 pertanyaan</strong> singkat, dan AI kami bakal kasih rekomendasi
            karir, jurusan kuliah, roadmap skill, sampai ide bisnis yang cocok buat kamu.
          </p>
        </div>

        {/* Feature grid — 2 col mobile, 4 col desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {FEATURES.map(({ icon: Icon, label, desc, color }, i) => (
            <div key={i}
              className="bg-gray-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3"
              style={{ animation: `fadeUp .4s ease ${i * 0.07}s both` }}>
              <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${color}`}>
                <Icon className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-white font-semibold text-xs leading-snug">{label}</p>
                <p className="text-slate-500 text-xs mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats + CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="flex gap-8 sm:gap-6">
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-black text-white text-2xl">{s.value}</p>
                <p className="text-slate-500 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
          <button onClick={onStart}
            className="hover:cursor-pointer sm:flex-1 w-full sm:w-auto bg-primary hover:bg-secondary active:scale-95 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-2xl hover:shadow-blue-500/30 text-sm group">
            Mulai Tes <HiArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}