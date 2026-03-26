import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CAREERS, CATEGORIES } from "../../data/careerData";
import {
  HiSearch, HiX, HiArrowRight, HiTrendingUp,
  HiCurrencyDollar, HiLightningBolt,
} from "react-icons/hi";

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

function CareerCard({ career, onClick, style }) {
  const demand = DEMAND_META[career.demand] || DEMAND_META["Sedang"];
  const entry = ENTRY_META[career.entryLevel] || { color: "#9ca3af" };

  return (
    <button
      onClick={() => onClick(career.slug)}
      style={style}
      className="group text-left w-full rounded-2xl p-5 transition-colors duration-200
        bg-gray-100/60 hover:bg-white/6
        dark:bg-neutral-800/55 dark:hover:bg-white/6
        light:bg-neutral-100/60 light:hover:bg-neutral-100"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-[10px] font-bold uppercase tracking-wider bg-violet-100 dark:bg-violet-500/20 px-2 py-1 text-violet-600 dark:text-violet-300 rounded-md">
          {career.category === "teknologi" ? "Teknologi"
            : career.category === "bisnis" ? "Bisnis"
              : career.category === "kreatif" ? "Kreatif"
                : career.category === "sosial" ? "Sosial"
                  : career.category === "kesehatan" ? "Kesehatan"
                    : "Lainnya"}
        </span>
        <p className="text-[11px] font-medium text-neutral-400/70 dark:text-white/50 ml-2">
          {career.field}
        </p>
      </div>

      <h3 className="text-sm font-semibold leading-snug mb-2 text-neutral-900 dark:text-white">
        {career.title}
      </h3>

      <p className="text-xs leading-relaxed mb-4 line-clamp-2 text-neutral-500 dark:text-white/30">
        {career.shortDesc}
      </p>

      <div className="flex items-center justify-between">
        <div className="inline-flex text-[11px] items-center gap-1">
          <HiTrendingUp className="size-3.5 text-neutral-400 dark:text-neutral-300" />
          <span className="font-semibold px-2 py-0.5 rounded-md" style={{ color: demand.color, background: demand.bg }}>
            {career.demand}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <HiCurrencyDollar className="size-3.5 text-neutral-400 dark:text-neutral-300" />
          <span className="text-[11px] text-neutral-500 dark:text-white/35">{career.salary}</span>
          <HiLightningBolt className="size-3.5 text-neutral-400 dark:text-neutral-300 ml-1" />
          <span className="text-[11px]" style={{ color: entry.color }}>
            {career.entryLevel}
          </span>
        </div>

        <HiArrowRight
          className="size-3.5 text-neutral-300 dark:text-white/20
            transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-neutral-500 dark:group-hover:text-white/50"
        />
      </div>
    </button>
  );
}

export default function ExploreCareer() {
  useEffect(() => {
    document.title = "Edutech - Explore Career";
  }, []);

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
    <div className="min-h-screen pb-24 px-4 pt-28 bg-neutral-50 dark:bg-background text-neutral-900 dark:text-white">
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .fu  { animation: fadeUp .4s ease both; }
        .fu1 { animation: fadeUp .4s .05s ease both; }
        .fu2 { animation: fadeUp .4s .10s ease both; }
        .fu3 { animation: fadeUp .4s .15s ease both; }
      `}</style>

      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-10 fu">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] mb-3 text-neutral-400 dark:text-white/25">
            Eksplorasi Karir
          </p>
          <h1
            className="font-bold tracking-tight mb-3 font-accent text-neutral-900 dark:text-white"
            style={{ fontSize: "clamp(1.25rem,5vw,3rem)", letterSpacing: "-0.025em" }}
          >
            Jelajahi Karir
          </h1>
          <p className="text-sm leading-relaxed max-w-lg text-neutral-500 dark:text-white/35">
            Jelajahi berbagai pilihan karir secara bebas — tanpa harus ikut tes dulu.
            Temukan profesi yang sesuai dengan minat Anda.
          </p>
        </div>

        {/* ── Search ── */}
        <div className="relative mb-4 fu1">
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-neutral-400 dark:text-white/25" />
          <input
            type="text"
            placeholder="Cari profesi atau kata kunci..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3.5 rounded-xl text-sm outline-none
              bg-white dark:bg-white/4
              text-neutral-900 dark:text-white
              placeholder:text-neutral-400 dark:placeholder:text-white/25
              transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-white/25"
            >
              <HiX className="size-4" />
            </button>
          )}
        </div>

        {/* ── Category filter ── */}
        <div className="flex flex-wrap gap-2 mb-8 fu2">
          {CATEGORIES.map(cat => {
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-150 cursor-pointer ${active
                  ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
                  : "bg-neutral-100 dark:bg-white/5 text-neutral-500 dark:text-white/35 hover:bg-neutral-200 dark:hover:bg-white/8"
                  }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* ── Count ── */}
        <p className="text-xs mb-5 fu3 text-neutral-400 dark:text-white/25">
          {filtered.length} profesi ditemukan
          {query && (
            <> untuk "<span className="text-neutral-600 dark:text-white/45">{query}</span>"</>
          )}
          {activeCategory !== "all" && (
            <span> di kategori <span className="text-neutral-600 dark:text-white/45">
              {CATEGORIES.find(c => c.id === activeCategory)?.label}
            </span></span>
          )}
        </p>

        {/* ── GRID ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((career, i) => (
              <CareerCard
                key={career.slug}
                career={career}
                onClick={handleCardClick}
                style={{ animation: `fadeUp .4s ease ${Math.min(i * 0.04, 0.24)}s both` }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="size-12 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-white dark:bg-white/4">
              <HiSearch className="size-5 text-neutral-300 dark:text-white/15" />
            </div>
            <p className="text-sm font-semibold mb-1 text-neutral-900 dark:text-white">
              Profesi tidak ditemukan
            </p>
            <p className="text-xs text-neutral-400 dark:text-white/25">
              Coba kata kunci lain atau pilih kategori yang berbeda
            </p>
          </div>
        )}
      </div>
    </div>
  );
}