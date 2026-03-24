// src/pages/ExploreCareer.jsx
// Route: /explore-career
// Klik card → /career/:slug

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CAREERS, CATEGORIES } from "../data/careerData";
import {
  HiSearch, HiX, HiArrowRight, HiTrendingUp,
  HiCurrencyDollar, HiLightningBolt,
} from "react-icons/hi";

// ─── TOKENS ───────────────────────────────────────────────────────────────────
const BG = {
  page:   "#0a0a0b", // Sedikit lebih gelap untuk kontras yang bersih
  s1:     "#111116",
  s2:     "#141418", // Card background
  s3:     "#1a1a1f", // Hover state
  hi:     "#f9fafb",
  md:     "#9ca3af",
  lo:     "#6b7280",
  faint:  "#4b5563",
  rule:   "rgba(255,255,255,0.06)",
};

// Warna demand dibuat lebih lembut (pastel/low saturation) agar tidak mencolok
const DEMAND_META = {
  "Sangat Tinggi": { color: "#6ee7b7", bg: "rgba(110, 231, 183, 0.08)" }, // Hijau lembut
  "Tinggi":        { color: "#93c5fd", bg: "rgba(147, 197, 253, 0.08)" }, // Biru lembut
  "Sedang":        { color: "#fcd34d", bg: "rgba(252, 211, 77, 0.08)" },  // Kuning lembut
  "Rendah":        { color: "#9ca3af", bg: "rgba(156, 163, 175, 0.08)" }, // Abu-abu
};

const ENTRY_META = {
  "Rendah":    { color: "#6ee7b7" },
  "Menengah":  { color: "#fcd34d" },
  "Tinggi":    { color: "#f87171" },
};

// ─── CAREER CARD ──────────────────────────────────────────────────────────────
function CareerCard({ career, onClick }) {
  const demand = DEMAND_META[career.demand] || DEMAND_META["Sedang"];
  const entry = ENTRY_META[career.entryLevel] || { color: BG.md };

  return (
    <button
      onClick={() => onClick(career.slug)}
      className="group text-left w-full transition-all duration-200 rounded-xl overflow-hidden border"
      style={{ background: BG.s2, borderColor: BG.rule }}
      onMouseEnter={e => {
        e.currentTarget.style.background = BG.s3;
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = BG.s2;
        e.currentTarget.style.borderColor = BG.rule;
      }}
    >
      <div className="p-5 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            {/* Field label diatas judul, warna netral */}
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5 text-gray-500">
              {career.field}
            </p>
            <h3 className="text-white font-semibold text-base leading-snug">
              {career.title}
            </h3>
          </div>
          {/* Arrow icon netral */}
          <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 bg-white/5 group-hover:bg-white/10">
            <HiArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors" />
          </div>
        </div>

        {/* Deskripsi singkat */}
        <p className="text-xs leading-relaxed mb-4 flex-grow text-gray-500">
          {career.shortDesc}
        </p>

        {/* Separator line */}
        <div className="border-t border-white/5 pt-3 mt-auto space-y-2.5">
          
          {/* Gaji - Clean look */}
          <div className="flex items-center gap-2">
            <HiCurrencyDollar className="w-3.5 h-3.5 text-gray-600" />
            <span className="text-xs font-medium text-gray-400">{career.salary}</span>
          </div>

          {/* Demand - Subtle badge */}
          <div className="flex items-center gap-2">
            <HiTrendingUp className="w-3.5 h-3.5 text-gray-600" />
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md"
              style={{ color: demand.color, background: demand.bg }}>
              {career.demand}
            </span>
          </div>

          {/* Entry Level - Minimalist text */}
          <div className="flex items-center gap-2">
            <HiLightningBolt className="w-3.5 h-3.5 text-gray-600" />
            <span className="text-xs text-gray-500">
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

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function ExploreCareer() {
  const navigate = useNavigate();
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
    <div className="min-h-screen pb-24 px-4 pt-10" style={{ background: BG.page }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .fu { animation: fadeUp .4s ease both; }
      `}</style>

      <div className="max-w-5xl mx-auto">

        {/* ── HEADER ── */}
        <div className="mb-10 fu">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] mb-3 text-gray-600">
            Eksplorasi Karir
          </p>
          <h1 className="text-white font-bold tracking-tight mb-3"
            style={{ fontSize: "clamp(1.75rem,5vw,2.5rem)", letterSpacing: "-0.025em" }}>
            Explore Career
          </h1>
          <p className="text-sm leading-relaxed max-w-lg text-gray-500">
            Jelajahi berbagai pilihan karir secara bebas — tanpa harus ikut tes dulu.
            Temukan profesi yang sesuai dengan minat Anda.
          </p>
        </div>

        {/* ── SEARCH ── */}
        <div className="mb-5 fu" style={{ animationDelay: ".05s" }}>
          <div className="relative">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
            <input
              type="text"
              placeholder="Cari profesi atau kata kunci..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3.5 rounded-xl text-sm outline-none transition-all border"
              style={{
                background: BG.s1,
                color: BG.hi,
                caretColor: "#ffffff",
                borderColor: "rgba(255,255,255,0.06)"
              }}
              onFocus={e => e.target.style.borderColor = "rgba(255,255,255,0.15)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.06)"}
            />
            {query && (
              <button onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2">
                <HiX className="w-4 h-4 text-gray-500 hover:text-white transition-colors" />
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
                background:  activeCategory === cat.id ? "#ffffff" : BG.s2,
                color:       activeCategory === cat.id ? "#000000" : BG.lo,
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── RESULT COUNT ── */}
        <p className="text-xs mb-5 fu text-gray-600" style={{ animationDelay: ".12s" }}>
          {filtered.length} profesi ditemukan
          {query && <span> untuk "<span className="text-gray-400">{query}</span>"</span>}
          {activeCategory !== "all" && (
            <span> di kategori <span className="text-gray-400">
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
                <CareerCard career={career} onClick={handleCardClick} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-white/5">
              <HiSearch className="w-5 h-5 text-gray-600" />
            </div>
            <p className="text-sm font-semibold mb-1 text-white">
              Profesi tidak ditemukan
            </p>
            <p className="text-xs text-gray-500">
              Coba kata kunci lain atau pilih kategori yang berbeda
            </p>
          </div>
        )}
      </div>
    </div>
  );
}