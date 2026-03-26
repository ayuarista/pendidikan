import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CAREERS, CATEGORIES } from "../../data/careerData";
import {
  HiSearch, HiX, HiArrowRight, HiTrendingUp,
  HiCurrencyDollar, HiLightningBolt,
} from "react-icons/hi";

const BG = {
  page: "#0a0a0b",
  s1: "#111116",
  s2: "#141418",
  s3: "#1a1a1f",
  hi: "#f9fafb",
  md: "#9ca3af",
  lo: "#6b7280",
  faint: "#4b5563",
  rule: "rgba(255,255,255,0.06)",
};

const LIGHT_BG = {
  page: "#fafafa",
  s1: "#ffffff",
  s2: "rgba(243, 244, 246, 0.6)",
  s3: "#f5f5f5",
  hi: "#0f172a",
  md: "#737373",
  lo: "#737373",
  faint: "#a3a3a3",
  rule: "transparent",
};

const DEMAND_META = {
  "Sangat Tinggi": { color: "#6ee7b7", bg: "rgba(110, 231, 183, 0.08)" },
  "Tinggi": { color: "#93c5fd", bg: "rgba(147, 197, 253, 0.08)" },
  "Sedang": { color: "#fcd34d", bg: "rgba(252, 211, 77, 0.08)" },
  "Rendah": { color: "#9ca3af", bg: "rgba(156, 163, 175, 0.08)" },
};

const ENTRY_META = {
  "Rendah": { color: "#6ee7b7" },
  "Menengah": { color: "#fcd34d" },
  "Tinggi": { color: "#f87171" },
};

function CareerCard({ career, onClick, palette, isDark }) {
  const demand = DEMAND_META[career.demand] || DEMAND_META["Sedang"];
  const entry = ENTRY_META[career.entryLevel] || { color: BG.md };

  return (
    <button
      onClick={() => onClick(career.slug)}
      className={`group text-left w-full transition-all duration-200 rounded-xl overflow-hidden ${isDark ? "border" : ""}`}
      style={{ background: palette.s2, borderColor: palette.rule }}
      onMouseEnter={e => {
        e.currentTarget.style.background = palette.s3;
        e.currentTarget.style.borderColor = isDark ? "rgba(255,255,255,0.1)" : "transparent";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = palette.s2;
        e.currentTarget.style.borderColor = palette.rule;
      }}
    >
      <div className="p-5 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            {/* Field label diatas judul, warna netral */}
            <p className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 ${isDark ? "text-gray-500" : "text-neutral-400"}`}>
              {career.field}
            </p>
            <h3 className={`font-semibold text-base leading-snug ${isDark ? "text-white" : "text-neutral-900"}`}>
              {career.title}
            </h3>
          </div>
          {/* Arrow icon netral */}
          <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${isDark ? "bg-white/5 group-hover:bg-white/10" : "bg-neutral-100 group-hover:bg-white"}`}>
            <HiArrowRight className={`w-3.5 h-3.5 transition-colors ${isDark ? "text-gray-400 group-hover:text-white" : "text-neutral-300 group-hover:text-neutral-500"}`} />
          </div>
        </div>

        {/* Deskripsi singkat */}
        <p className={`text-xs leading-relaxed mb-4 grow ${isDark ? "text-gray-500" : "text-neutral-500"}`}>
          {career.shortDesc}
        </p>

        {/* Separator line */}
        <div className={`pt-3 mt-auto space-y-2.5 ${isDark ? "border-t border-white/5" : ""}`}>

          {/* Gaji - Clean look */}
          <div className="flex items-center gap-2">
            <HiCurrencyDollar className={`w-3.5 h-3.5 ${isDark ? "text-gray-600" : "text-neutral-400"}`} />
            <span className={`text-xs font-medium ${isDark ? "text-gray-400" : "text-neutral-500"}`}>{career.salary}</span>
          </div>

          {/* Demand - Subtle badge */}
          <div className="flex items-center gap-2">
            <HiTrendingUp className={`w-3.5 h-3.5 ${isDark ? "text-gray-600" : "text-neutral-400"}`} />
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md"
              style={{ color: demand.color, background: demand.bg }}>
              {career.demand}
            </span>
          </div>

          {/* Entry Level - Minimalist text */}
          <div className="flex items-center gap-2">
            <HiLightningBolt className={`w-3.5 h-3.5 ${isDark ? "text-gray-600" : "text-neutral-400"}`} />
            <span className={`text-xs ${isDark ? "text-gray-500" : "text-neutral-500"}`}>
              Hambatan masuk:{" "}
              <span className="font-medium" style={{ color: entry.color }}>
                {career.entryLevel}
              </span>
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

export default function ExploreCareer() {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));

  useEffect(() => {
    document.title = "Edutech - Explore Career";
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains("dark"));
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const palette = isDark ?            Jelajahi Karir
igate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(() => {
    return CAREERS.filter(c => {
      const matchCategory = activeCategory === "all" || c.category === activeCategory;
      const q = query.toLowerCase();
      const matchQuery = !q
        || c.title.toLowerCase().includes(q)
        || c.field.toLowerCase().includes(q)
        || c.shortDesc.toLowerCase().includes(q);
      return matchCategory && matchQuery;
    });
  }, [query, activeCategory]);

  const handleCardClick = (slug) => {
    navigate(`/career/${slug}`);
  };

  return (
    <div className="min-h-screen pb-24 px-4 pt-28 transition-colors duration-300" style={{ background: palette.page }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .fu { animation: fadeUp .4s ease both; }
      `}</style>

      <div className="max-w-5xl mx-auto">

        {/* ── HEADER ── */}
        <div className="mb-10 fu">
          <p className={`text-[10px] font-bold uppercase tracking-[0.14em] mb-3 ${isDark ? "text-gray-600" : "text-neutral-400"}`}>
            Eksplorasi Karir
          </p>
          <h1 className={`${isDark ? "text-white" : "text-neutral-900"} font-bold tracking-tight mb-3`}
            style={{ fontSize: "clamp(1.75rem,5vw,2.5rem)", letterSpacing: "-0.025em" }}>
            Explore Career
          </h1>
          <p className={`text-sm leading-relaxed max-w-lg ${isDark ? "text-gray-500" : "text-neutral-500"}`}>
            Jelajahi berbagai pilihan karir secara bebas — tanpa harus ikut tes dulu.
            Temukan profesi yang sesuai dengan minat Anda.
          </p>
        </div>

        {/* ── SEARCH ── */}
        <div className="mb-5 fu" style={{ animationDelay: ".05s" }}>
          <div className="relative">
            <HiSearch className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-600" : "text-neutral-400"}`} />
            <input
              type="text"
              placeholder="Cari profesi atau kata kunci..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className={`w-full pl-11 pr-10 py-3.5 rounded-xl text-sm outline-none transition-all ${isDark ? "border" : ""}`}
              style={{
                background: palette.s1,
                color: palette.hi,
                caretColor: isDark ? "#ffffff" : "#0f172a",
                borderColor: isDark ? "rgba(255,255,255,0.06)" : "transparent",
              }}
              onFocus={e => e.target.style.borderColor = isDark ? "rgba(255,255,255,0.15)" : "transparent"}
              onBlur={e => e.target.style.borderColor = isDark ? "rgba(255,255,255,0.06)" : "transparent"}
            />
            {query && (
              <button onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2">
                <HiX className={`w-4 h-4 transition-colors ${isDark ? "text-gray-500 hover:text-white" : "text-neutral-400 hover:text-neutral-700"}`} />
              </button>
            )}
          </div>
        </div>

        {/* ── FILTER KATEGORI ── */}
        <div className="flex flex-wrap gap-2 mb-8 fu" style={{ animationDelay: ".1s" }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="text-xs font-medium px-4 py-2 rounded-lg transition-all duration-150"
              style={{
                background: activeCategory === cat.id
                  ? (isDark ? "#ffffff" : "#171717")
                  : palette.s2,
                color: activeCategory === cat.id
                  ? (isDark ? "#000000" : "#ffffff")
                  : palette.lo,
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── RESULT COUNT ── */}
        <p className={`text-xs mb-5 fu ${isDark ? "text-gray-600" : "text-neutral-400"}`} style={{ animationDelay: ".12s" }}>
          {filtered.length} profesi ditemukan
          {query && <span> untuk "<span className={isDark ? "text-gray-400" : "text-neutral-600"}>{query}</span>"</span>}
          {activeCategory !== "all" && (
            <span> di kategori <span className={isDark ? "text-gray-400" : "text-neutral-600"}>
              {CATEGORIES.find(c => c.id === activeCategory)?.label}
            </span></span>
          )}
        </p>

        {/* ── GRID ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((career, i) => (
              <div key={career.slug}
                style={{ animation: `fadeUp .4s ease ${Math.min(i * 0.04, 0.3)}s both` }}>
                <CareerCard career={career} onClick={handleCardClick} palette={palette} isDark={isDark} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className={`w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center ${isDark ? "bg-white/5" : "bg-white"}`}>
              <HiSearch className={`w-5 h-5 ${isDark ? "text-gray-600" : "text-neutral-300"}`} />
            </div>
            <p className={`text-sm font-semibold mb-1 ${isDark ? "text-white" : "text-neutral-900"}`}>
              Profesi tidak ditemukan
            </p>
            <p className={`text-xs ${isDark ? "text-gray-500" : "text-neutral-400"}`}>
              Coba kata kunci lain atau pilih kategori yang berbeda
            </p>
          </div>
        )}
      </div>
    </div>
  );
}