import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MAJORS, EDU_CATEGORIES, DEMAND_LEVEL } from "../data/educationData";
import { HiSearch, HiX, HiArrowRight, HiAcademicCap, HiClock, HiTrendingUp } from "react-icons/hi";

// ─── Card ─────────────────────────────────────────────────────────────────────
function MajorCard({ major, onClick }) {
    const demand = DEMAND_LEVEL[major.demand] || DEMAND_LEVEL["Sedang"];
    const catLabel = {
        teknologi: "Teknologi",
        bisnis:    "Bisnis",
        kreatif:   "Kreatif",
        sosial:    "Sosial & Hukum",
        kesehatan: "Kesehatan",
        sains:     "Sains & Teknik",
    }[major.category] || major.category;

    return (
        <button
            onClick={() => onClick(major.slug)}
            className="group text-left w-full rounded-2xl overflow-hidden transition-colors duration-150
                bg-white hover:bg-neutral-50
                dark:bg-white/[0.03] dark:hover:bg-white/[0.055]"
        >
            {/* Accent top strip */}
            <div className="h-[3px]" style={{ background: major.accentColor, opacity: 0.8 }} />

            <div className="p-5">
                {/* Category + title */}
                <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="min-w-0">
                        <span className="block text-[10px] font-bold uppercase tracking-widest mb-1"
                            style={{ color: major.accentColor }}>
                            {catLabel}
                        </span>
                        <h3 className="text-sm font-bold leading-snug
                            text-neutral-900 dark:text-white">
                            {major.name}
                        </h3>
                    </div>
                    <div className="shrink-0 size-7 rounded-lg flex items-center justify-center
                        transition-transform group-hover:translate-x-0.5"
                        style={{ background: `${major.accentColor}18` }}>
                        <HiArrowRight className="size-3.5" style={{ color: major.accentColor }} />
                    </div>
                </div>

                {/* Short desc */}
                <p className="text-xs leading-relaxed mb-4 line-clamp-2
                    text-neutral-500 dark:text-white/32">
                    {major.shortDesc}
                </p>

                {/* Stats */}
                <div className="space-y-1.5 mb-4">
                    <div className="flex items-center gap-2">
                        <HiClock className="size-3.5 shrink-0
                            text-neutral-300 dark:text-white/20" />
                        <span className="text-[11px]
                            text-neutral-500 dark:text-white/35">
                            {major.degree} · {major.duration}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <HiTrendingUp className="size-3.5 shrink-0
                            text-neutral-300 dark:text-white/20" />
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md"
                            style={{ color: demand.color, background: demand.bg }}>
                            Prospek {major.demand}
                        </span>
                    </div>
                </div>

                {/* Skill pills */}
                <div className="flex flex-wrap gap-1.5">
                    {major.skills.slice(0, 3).map((s, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-md
                            bg-neutral-100 text-neutral-500
                            dark:bg-white/[0.05] dark:text-white/30">
                            {s}
                        </span>
                    ))}
                    {major.skills.length > 3 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-md
                            bg-neutral-100 text-neutral-400
                            dark:bg-white/[0.05] dark:text-white/20">
                            +{major.skills.length - 3}
                        </span>
                    )}
                </div>
            </div>
        </button>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ExploreEducation() {
    const navigate = useNavigate();
    const [query, setQuery]               = useState("");
    const [activeCategory, setActiveCategory] = useState("all");

    const filtered = useMemo(() => MAJORS.filter(m => {
        const matchCat = activeCategory === "all" || m.category === activeCategory;
        const q = query.toLowerCase();
        const matchQ = !q
            || m.name.toLowerCase().includes(q)
            || m.shortDesc.toLowerCase().includes(q)
            || m.skills.some(s => s.toLowerCase().includes(q))
            || m.careers.some(c => c.toLowerCase().includes(q));
        return matchCat && matchQ;
    }), [query, activeCategory]);

    return (
        <div className="min-h-screen pb-24 px-4 pt-10
            bg-neutral-50 dark:bg-background
            text-neutral-900 dark:text-white">

            <style>{`
                @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
                .fu{animation:fadeUp .4s ease both}
            `}</style>

            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="mb-10 fu">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] mb-3
                        text-neutral-400 dark:text-white/25">
                        Eksplorasi Jurusan
                    </p>
                    <h1 className="font-black tracking-tight mb-3"
                        style={{ fontSize: "clamp(2rem,5vw,3rem)", letterSpacing: "-0.025em" }}>
                        Explore Education
                    </h1>
                    <p className="text-sm leading-relaxed max-w-lg
                        text-neutral-500 dark:text-white/35">
                        Jelajahi berbagai jurusan kuliah secara bebas. Temukan jurusan yang sesuai
                        dengan minat, potensi, dan tujuan karirmu.
                    </p>
                </div>

                {/* Search */}
                <div className="relative mb-5 fu" style={{ animationDelay: ".05s" }}>
                    <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 size-4
                        text-neutral-400 dark:text-white/25" />
                    <input
                        type="text"
                        placeholder="Cari jurusan, skill, atau arah karir..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className="w-full pl-11 pr-10 py-3.5 rounded-xl text-sm outline-none
                            bg-white dark:bg-white/[0.04]
                            text-neutral-900 dark:text-white
                            placeholder:text-neutral-400 dark:placeholder:text-white/25
                            ring-1 ring-transparent focus:ring-white/10
                            transition-all"
                    />
                    {query && (
                        <button onClick={() => setQuery("")}
                            className="absolute right-4 top-1/2 -translate-y-1/2
                                text-neutral-400 dark:text-white/25">
                            <HiX className="size-4" />
                        </button>
                    )}
                </div>

                {/* Category filter */}
                <div className="flex flex-wrap gap-2 mb-8 fu" style={{ animationDelay: ".1s" }}>
                    {EDU_CATEGORIES.map(cat => {
                        const active = activeCategory === cat.id;
                        return (
                            <button key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-150 cursor-pointer ${
                                    active
                                        ? "bg-violet-500 text-white"
                                        : "bg-white dark:bg-white/[0.04] text-neutral-500 dark:text-white/35 hover:bg-neutral-100 dark:hover:bg-white/[0.07]"
                                }`}>
                                {cat.label}
                            </button>
                        );
                    })}
                </div>

                {/* Count */}
                <p className="text-xs mb-5 fu text-neutral-400 dark:text-white/25"
                    style={{ animationDelay: ".12s" }}>
                    {filtered.length} jurusan ditemukan
                    {query && <> untuk "<span className="text-neutral-600 dark:text-white/45">{query}</span>"</>}
                </p>

                {/* Grid */}
                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {filtered.map((major, i) => (
                            <div key={major.slug}
                                style={{ animation: `fadeUp .4s ease ${Math.min(i * 0.04, 0.28)}s both` }}>
                                <MajorCard major={major} onClick={slug => navigate(`/education/${slug}`)} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="size-12 rounded-2xl mx-auto mb-4 flex items-center justify-center
                            bg-white dark:bg-white/[0.04]">
                            <HiAcademicCap className="size-5
                                text-neutral-300 dark:text-white/15" />
                        </div>
                        <p className="text-sm font-semibold mb-1
                            text-neutral-900 dark:text-white">
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