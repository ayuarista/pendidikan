import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MAJORS, EDU_CATEGORIES, DEMAND_LEVEL } from "../../data/educationData";
import { HiSearch, HiX, HiArrowRight, HiAcademicCap } from "react-icons/hi";

const ITEMS_PER_PAGE = 9;

const DEGREE_COLOR = {
  "S1": { text: "text-blue-500 dark:text-blue-400", bg: "bg-blue-500/10" },
  "D4": { text: "text-amber-500 dark:text-amber-400", bg: "bg-amber-500/10" },
  "D3": { text: "text-rose-500 dark:text-rose-400", bg: "bg-rose-500/10" },
  "S1 + Profesi": { text: "text-emerald-500 dark:text-emerald-400", bg: "bg-emerald-500/10" },
};

function getDegreeStyle(degree) {
  return DEGREE_COLOR[degree] || DEGREE_COLOR["S1"];
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function MajorCard({ major, onClick, style }) {
  const demand = DEMAND_LEVEL[major.demand] || DEMAND_LEVEL["Sedang"];
  const degStyle = getDegreeStyle(major.degree);

  return (
    <button
      onClick={() => onClick(major.slug)}
      style={style}
      className="group text-left w-full rounded-2xl p-5 transition-colors duration-200
        bg-gray-100/60 hover:bg-white/[0.06]
        dark:bg-neutral-800/55 dark:hover:bg-white/[0.06]
        light:bg-neutral-100/60 light:hover:bg-neutral-100"
    >
      {/* top row: degree badge + category label */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold uppercase tracking-wider bg-violet-100 dark:bg-violet-500/20 px-2 py-1 text-violet-600 dark:text-violet-300 rounded-md">
          {major.category === "teknologi" ? "Teknologi"
            : major.category === "bisnis" ? "Bisnis"
              : major.category === "kreatif" ? "Kreatif"
                : major.category === "sosial" ? "Sosial & Hukum"
                  : major.category === "kesehatan" ? "Kesehatan"
                    : "Sains & Teknik"}
        </span>
        <div className="inline-flex">
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${degStyle.bg} ${degStyle.text}`}>
            {major.degree}
          </span>
          <p className="text-[11px] font-medium text-neutral-400/70 dark:text-white/50 ml-2">
            gelar
          </p>
        </div>
      </div>

      {/* title */}
      <h3 className="text-sm font-semibold leading-snug mb-2 text-neutral-900 dark:text-white">
        {major.name}
      </h3>

      {/* desc */}
      <p className="text-xs leading-relaxed mb-4 line-clamp-2 text-neutral-500 dark:text-white/30">
        {major.shortDesc}
      </p>

      {/* bottom row: demand + arrow */}
      <div className="flex items-center justify-between">
        <div className="inline-flex text-[11px] items-center gap-1">
          <p className="text-neutral-400 dark:text-neutral-300">Prospek kerja:</p>
          <span
            className="font-semibold px-2 py-0.5 rounded-md"
            style={{ color: demand.color, background: demand.bg }}
          >
            {major.demand}
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

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ExploreEducation() {
    useEffect(() => {
      document.title = "Edutech - Explore Education";
    }, []);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    setPage(1); // reset page on filter change
    return MAJORS.filter(m => {
      const matchCat = activeCategory === "all" || m.category === activeCategory;
      const q = query.toLowerCase();
      const matchQ = !q
        || m.name.toLowerCase().includes(q)
        || m.shortDesc.toLowerCase().includes(q)
        || m.skills.some(s => s.toLowerCase().includes(q))
        || m.careers.some(c => c.toLowerCase().includes(q));
      return matchCat && matchQ;
    });
  }, [query, activeCategory]);

  // useMemo above calls setPage which causes warning — use separate effect pattern
  const paginatedFiltered = useMemo(() => filtered, [query, activeCategory]);

  const totalPages = Math.ceil(paginatedFiltered.length / ITEMS_PER_PAGE);
  const paginated = paginatedFiltered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleCategoryChange = (id) => {
    setActiveCategory(id);
    setPage(1);
  };

  const handleQueryChange = (val) => {
    setQuery(val);
    setPage(1);
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
            Eksplorasi Jurusan
          </p>
          <h1
            className="font-bold tracking-tight mb-3 font-accent text-neutral-900 dark:text-white"
            style={{ fontSize: "clamp(1.25rem,5vw,3rem)", letterSpacing: "-0.025em" }}
          >
            Explore Education
          </h1>
          <p className="text-sm leading-relaxed max-w-lg text-neutral-500 dark:text-white/35">
            Jelajahi berbagai jurusan kuliah. Temukan jurusan yang sesuai dengan minat, potensi, dan tujuan karirmu.
          </p>
        </div>

        {/* ── Search ── */}
        <div className="relative mb-4 fu1">
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-neutral-400 dark:text-white/25" />
          <input
            type="text"
            placeholder="Cari jurusan, skill, atau arah karir..."
            value={query}
            onChange={e => handleQueryChange(e.target.value)}
            className="w-full pl-11 pr-10 py-3.5 rounded-xl text-sm outline-none
              bg-white dark:bg-white/[0.04]
              text-neutral-900 dark:text-white
              placeholder:text-neutral-400 dark:placeholder:text-white/25
              transition-all"
          />
          {query && (
            <button
              onClick={() => handleQueryChange("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-white/25"
            >
              <HiX className="size-4" />
            </button>
          )}
        </div>

        {/* ── Category filter ── */}
        <div className="flex flex-wrap gap-2 mb-8 fu2">
          {EDU_CATEGORIES.map(cat => {
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-150 cursor-pointer ${active
                  ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
                  : "bg-neutral-100 dark:bg-white/[0.05] text-neutral-500 dark:text-white/35 hover:bg-neutral-200 dark:hover:bg-white/[0.08]"
                  }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* ── Count ── */}
        <p className="text-xs mb-5 fu3 text-neutral-400 dark:text-white/25">
          {paginatedFiltered.length} jurusan ditemukan
          {query && (
            <> untuk "<span className="text-neutral-600 dark:text-white/45">{query}</span>"</>
          )}
          {totalPages > 1 && (
            <span className="ml-2 text-neutral-300 dark:text-white/15">
              · Halaman {page} dari {totalPages}
            </span>
          )}
        </p>

        {/* ── Grid ── */}
        {paginated.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {paginated.map((major, i) => (
                <MajorCard
                  key={major.slug}
                  major={major}
                  onClick={slug => navigate(`/education/${slug}`)}
                  style={{ animation: `fadeUp .4s ease ${Math.min(i * 0.04, 0.24)}s both` }}
                />
              ))}
            </div>

            {/* ── Pagination ── */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer
                    bg-white dark:bg-white/[0.04]
                    text-neutral-500 dark:text-white/35
                    hover:bg-neutral-100 dark:hover:bg-white/[0.07]
                    disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ←
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <button
                    key={n}
                    onClick={() => { setPage(n); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className={`size-9 rounded-lg text-sm font-semibold transition-all duration-150 cursor-pointer ${n === page
                      ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
                      : "bg-white dark:bg-white/[0.04] text-neutral-500 dark:text-white/35 hover:bg-neutral-100 dark:hover:bg-white/[0.07]"
                      }`}
                  >
                    {n}
                  </button>
                ))}

                <button
                  onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer
                    bg-white dark:bg-white/[0.04]
                    text-neutral-500 dark:text-white/35
                    hover:bg-neutral-100 dark:hover:bg-white/[0.07]
                    disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  →
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="size-12 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-white dark:bg-white/[0.04]">
              <HiAcademicCap className="size-5 text-neutral-300 dark:text-white/15" />
            </div>
            <p className="text-sm font-semibold mb-1 text-neutral-900 dark:text-white">
              Jurusan tidak ditemukan
            </p>
            <p className="text-xs text-neutral-400 dark:text-white/25">
              Coba kata kunci lain atau pilih kategori berbeda
            </p>
          </div>
        )}
      </div>
    </div>
  );
}