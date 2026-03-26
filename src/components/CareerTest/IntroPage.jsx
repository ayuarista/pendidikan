import { HiSparkles, HiArrowRight, HiAcademicCap, HiBriefcase, HiTrendingUp, HiShoppingBag, HiDownload } from "react-icons/hi";

const FEATURES = [
  { 
    icon: HiAcademicCap,  
    label: "Rekomendasi Jurusan", 
    desc: "Jurusan kuliah yang cocok buat kamu", 
    color: "dark:text-violet-400 dark:bg-violet-400/10 dark:border-violet-400/20 text-violet-600 bg-violet-50 border-violet-200" 
  },
  { 
    icon: HiBriefcase,    
    label: "Analisis Karir",       
    desc: "3 profesi terbaik buat kamu ", 
    color: "dark:text-blue-400 dark:bg-blue-400/10 dark:border-blue-400/20 text-blue-600 bg-blue-50 border-blue-200" 
  },
  { 
    icon: HiShoppingBag,  
    label: "Peluang UMKM",         
    desc: "Ide usaha yang bisa dimulai dengan skill kamu", 
    color: "dark:text-amber-400 dark:bg-amber-400/10 dark:border-amber-400/20 text-amber-600 bg-amber-50 border-amber-200" 
  },
  { 
    icon: HiDownload,   
    label: "Unduh Hasil Analisis",      
    desc: "File PDF yang bisa kamu simpan",   
    color: "dark:text-emerald-400 dark:bg-emerald-400/10 dark:border-emerald-400/20 text-emerald-600 bg-emerald-50 border-emerald-200" 
  },
];

const STATS = [
  { value: "15", label: "Pertanyaan" },
  { value: "~5",  label: "Menit" },
  { value: "100%", label: "Gratis" },
];

export default function IntroPage({ onStart }) {
  return (
    <div className="pt-24 sm:pt-0 min-h-screen dark:bg-background bg-neutral-100 flex items-center justify-center p-5 relative overflow-hidden transition-colors duration-300">

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 dark:opacity-[0.08] opacity-[0.10]"
        style={{ backgroundImage: "linear-gradient(#a3a3a3 1px,transparent 1px),linear-gradient(90deg,#a3a3a3 1px,transparent 1px)", backgroundSize: "48px 48px" }} />

      {/* Glow blobs */}
      <div className="absolute top-1/4 -left-32 w-72 h-72 dark:bg-blue-600/15 bg-blue-400/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-72 h-72 dark:bg-violet-600/15 bg-violet-400/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 dark:bg-blue-500/10 bg-blue-100 border dark:border-blue-500/25 border-blue-200 dark:text-blue-400 text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            <HiSparkles className="size-4" /> Powered by AI
          </span>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-accent font-black dark:text-white text-slate-900 leading-none mb-4"
            style={{ fontSize: "clamp(2.4rem, 7vw, 4rem)", letterSpacing: "-0.02em" }}>
            Cari Tahu Karir<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b dark:from-violet-200 dark:to-violet-700 from-violet-500 to-blue-800">Impian Kamu</span>
          </h1>
          <p className="dark:text-slate-400 text-slate-600 leading-relaxed max-w-md mx-auto text-[12px] lg:text-base">
            Jawab <strong className="dark:text-white text-slate-900">15 pertanyaan</strong> singkat, dan AI kami bakal kasih rekomendasi
            karir, jurusan kuliah, roadmap skill, sampai ide bisnis yang cocok buat kamu.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {FEATURES.map(({ icon: Icon, label, desc, color }, i) => (
            <div key={i}
              className="dark:bg-neutral-900 bg-neutral-50 rounded-2xl p-3.5 flex flex-col gap-3 dark:shadow-none"
              style={{ animation: `fadeUp .4s ease ${i * 0.07}s both` }}>
              <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${color}`}>
                <Icon className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="dark:text-white text-slate-900 font-semibold text-xs leading-snug">{label}</p>
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
                <p className="font-black dark:text-white text-slate-900 text-2xl">{s.value}</p>
                <p className="text-slate-500 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
          
          <button onClick={onStart}
            className="hover:cursor-pointer sm:flex-1 w-full sm:w-auto bg-violet-500 hover:bg-violet-700 active:scale-95 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-2xl hover:shadow-violet-500/30 text-sm group">
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