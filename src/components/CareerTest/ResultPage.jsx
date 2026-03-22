import { useState, useEffect } from "react";
import {
    HiSparkles, HiRefresh, HiCheckCircle, HiChevronDown,
    HiBriefcase, HiAcademicCap, HiLightBulb, HiChartBar,
    HiShoppingBag, HiTrendingUp, HiBookOpen, HiArrowRight,
    HiCode, HiGlobe, HiHeart, HiPencil,
    HiBeaker, HiMusicNote, HiCamera, HiCurrencyDollar,
} from "react-icons/hi";
import { LuMessageCircleHeart } from "react-icons/lu";
import { FaMoneyBillWave } from "react-icons/fa";
import CareerDetailPage from "../../pages/CareerDetailPage";

function getPersonalityIcon(type = "") {
    const t = type.toLowerCase();
    if (t.includes("creative") || t.includes("artist") || t.includes("designer") || t.includes("alchemist")) return HiPencil;
    if (t.includes("tech") || t.includes("developer") || t.includes("digital") || t.includes("builder")) return HiCode;
    if (t.includes("analyst") || t.includes("strategist") || t.includes("scientist") || t.includes("thinker")) return HiBeaker;
    if (t.includes("entrepreneur") || t.includes("business") || t.includes("leader") || t.includes("visionary")) return HiCurrencyDollar;
    if (t.includes("empathetic") || t.includes("healer") || t.includes("helper") || t.includes("caregiver")) return HiHeart;
    if (t.includes("global") || t.includes("communicator") || t.includes("linguist") || t.includes("connector")) return HiGlobe;
    if (t.includes("scholar") || t.includes("learner") || t.includes("academic") || t.includes("intellectual")) return HiBookOpen;
    if (t.includes("musician") || t.includes("music") || t.includes("performer")) return HiMusicNote;
    if (t.includes("visual") || t.includes("creator") || t.includes("photographer") || t.includes("media")) return HiCamera;
    return HiSparkles;
}

const LEVEL = {
    Pemula:   { pct: 25,  bar: "bg-slate-500",    badge: "bg-slate-800/80 text-slate-300",    dot: "bg-slate-400" },
    Menengah: { pct: 50,  bar: "bg-blue-500",      badge: "bg-blue-950/80 text-blue-300",      dot: "bg-blue-400" },
    Mahir:    { pct: 75,  bar: "bg-emerald-500",   badge: "bg-emerald-950/80 text-emerald-300",dot: "bg-emerald-400" },
    Expert:   { pct: 100, bar: "bg-amber-400",     badge: "bg-amber-950/80 text-amber-200",    dot: "bg-amber-300" },
};
const DEF = LEVEL.Pemula;

function FadeUp({ children, delay = 0, className = "" }) {
    const [on, setOn] = useState(false);
    useEffect(() => { const t = setTimeout(() => setOn(true), delay); return () => clearTimeout(t); }, [delay]);
    return (
        <div className={`transition-all duration-500 ease-out ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} ${className}`}>
            {children}
        </div>
    );
}

function AnimBar({ pct, barClass, trackClass = "bg-white/5" }) {
    const [w, setW] = useState(0);
    useEffect(() => { const t = setTimeout(() => setW(pct), 650); return () => clearTimeout(t); }, [pct]);
    return (
        <div className={`relative h-1.5 w-full rounded-full overflow-hidden ${trackClass}`}>
            <div className={`absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out ${barClass}`}
                style={{ width: `${w}%` }} />
        </div>
    );
}

function SectionLabel({ children }) {
    return (
        <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/25 mb-5">
            {children}
        </p>
    );
}

function HR() {
    return <div className="w-full h-px bg-white/[0.05] my-10" />;
}

function LevelBadge({ level }) {
    const cfg = LEVEL[level] || DEF;
    return (
        <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-md ${cfg.badge}`}>
            <span className={`size-1.5 rounded-full ${cfg.dot}`} />
            {level}
        </span>
    );
}

export default function ResultPage({ result, onRetry }) {
    const [roadmapOpen, setRoadmapOpen] = useState(false);
    const [selectedCareer, setSelectedCareer] = useState(null);

    const PersonalityIcon = getPersonalityIcon(result.personalityType);

    if (selectedCareer) {
        return (
            <CareerDetailPage
                career={selectedCareer}
                onBack={() => { setSelectedCareer(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            />
        );
    }

    return (
        <div className="relative min-h-screen bg-background text-white antialiased overflow-x-hidden">

            {/* ══ BLOB GLOWS ══ */}
            {/* top-left: blue (primary accent) */}
            <div className="pointer-events-none fixed -top-48 left-100 w-[560px] h-[560px] rounded-full bg-primary/[0.20] blur-[120px]" />
            {/* bottom-center-right: violet */}
            <div className="pointer-events-none fixed bottom-20 right-0 w-[250px] h-[250px] rounded-full bg-violet-600/[0.20] blur-[140px]" />
            {/* soft teal whisper top-right */}
            <div className="pointer-events-none fixed bottom-[10%] -left-24 w-[280px] h-[280px] rounded-full bg-teal-500/[0.20] blur-[100px]" />

            <div className="relative z-10 max-w-[720px] mx-auto px-5 sm:px-8 py-20">

                {/* ─────────────── HERO ─────────────── */}
                <FadeUp delay={0} className="flex flex-col items-center text-center mb-16">
                    {/* icon ring */}
                    <div className="mb-6 size-[62px] rounded-full bg-white/[0.05] ring-1 ring-white/10 flex items-center justify-center">
                        <PersonalityIcon className="size-6 text-white/60" />
                    </div>

                    {/* status badge */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/20 text-emerald-400 text-[11px] font-semibold mb-4">
                        <HiCheckCircle className="size-3.5" />
                        Hasil Analisis
                    </span>

                    <h1 className="text-[clamp(26px,5vw,40px)] font-bold tracking-tight leading-tight mb-3">
                        {result.personalityType}
                    </h1>
                    <p className="max-w-[460px] text-sm text-white/40 leading-relaxed">
                        {result.personalityDescription}
                    </p>
                </FadeUp>

                {/* ─────────────── KARIR ─────────────── */}
                <FadeUp delay={100}>
                    <SectionLabel>Peluang Karir Terbaik</SectionLabel>

                    <div>
                        {result.topCareers?.map((c, i) => (
                            <div key={i}>
                                <div className="flex gap-4 items-start">

                                    {/* match % */}
                                    <div className={`shrink-0 size-12 md:size-15 rounded-full flex items-center justify-center mt-0.5 ${i === 0 ? "bg-primary/15" : "bg-white/[0.04]"}`}>
                                        <span className={`text-sm md:text-base font-bold leading-none ${i === 0 ? "text-blue-300" : "text-white/35"}`}>
                                            {c.match}%
                                        </span>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        {/* title */}
                                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                            <span className="text-[15px] md:text-lg font-semibold text-white">{c.title}</span>
                                            {i === 0 && (
                                                <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 ring-1 ring-amber-400/20">
                                                    Top Pick
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-sm text-white/38 leading-relaxed mb-2.5 text-justify">{c.description}</p>

                                        {/* match bar */}
                                        <AnimBar
                                            pct={c.match}
                                            barClass={i === 0 ? "bg-primary" : "bg-white/15"}
                                            trackClass="bg-white/[0.05]"
                                        />

                                        {/* info chips */}
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {c.avgSalary && (
                                                <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-md">
                                                    {c.avgSalary}
                                                </span>
                                            )}
                                            {c.industryDemand && (
                                                <span className="text-[11px] text-white/30 bg-white/[0.05] px-2.5 py-1 rounded-md">
                                                    Permintaan pasar: {c.industryDemand}
                                                </span>
                                            )}
                                        </div>

                                        {/* detail CTA */}
                                        <button
                                            onClick={() => { setSelectedCareer(c); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                                            className="mt-3 flex items-center gap-1 text-xs text-white/22 hover:text-white/55 transition-colors duration-200 group/d cursor-pointer"
                                        >
                                            Lihat detail lengkap
                                            <HiArrowRight className="size-3 transition-transform duration-200 group-hover/d:translate-x-0.5" />
                                        </button>
                                    </div>
                                </div>

                                {i < (result.topCareers?.length ?? 0) - 1 && <HR />}
                            </div>
                        ))}
                    </div>
                </FadeUp>

                <HR />

                {/* ─────────────── SKILL GAPS ─────────────── */}
                <FadeUp delay={200}>
                    <SectionLabel>Skill yang Perlu Dipelajari</SectionLabel>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {result.skillGaps?.map((s, i) => {
                            const cur = LEVEL[s.currentLevel] || DEF;
                            const tgt = LEVEL[s.targetLevel] || LEVEL.Mahir;

                            return (
                                <div key={i}
                                    className="rounded-2xl bg-white/[0.03] p-4 ring-1 ring-white/[0.06] hover:ring-white/[0.1] transition-all duration-200">

                                    {/* skill name */}
                                    <p className="text-sm font-semibold text-white mb-3">{s.skill}</p>

                                    {/* current → target row — clear labelling */}
                                    <div className="flex items-end gap-2 mb-3">
                                        <div className="flex-1">
                                            <p className="text-[9px] font-bold tracking-[0.12em] uppercase text-white/22 mb-1.5">
                                                Level Kamu
                                            </p>
                                            <LevelBadge level={s.currentLevel} />
                                        </div>

                                        <HiArrowRight className="size-3.5 text-white/15 mb-1 shrink-0" />

                                        <div className="flex-1 flex flex-col items-end">
                                            <p className="text-[9px] font-bold tracking-[0.12em] uppercase text-white/22 mb-1.5">
                                                Target
                                            </p>
                                            <LevelBadge level={s.targetLevel} />
                                        </div>
                                    </div>

                                    {/* progress bar — track = target level, fill = current level */}
                                    <div className={`relative h-1.5 w-full rounded-full overflow-hidden ${tgt.bar} opacity-20`}>
                                        <SkillAnimBar pct={cur.pct} barClass={cur.bar} />
                                    </div>
                                    {/* semantic hint below bar */}
                                    <div className="flex justify-between mt-1 mb-3">
                                        <span className="text-[10px] text-white/25">Sekarang</span>
                                        <span className="text-[10px] text-white/25">Target ({tgt.pct}%)</span>
                                    </div>

                                    {/* how to learn */}
                                    {s.howToLearn && (
                                        <p className="text-[12px] text-white/28 leading-relaxed border-t border-white/[0.05] pt-3">
                                            {s.howToLearn}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </FadeUp>

                <HR />

                {/* ─────────────── 2-COL: JURUSAN + UMKM ─────────────── */}
                <FadeUp delay={280}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

                        {/* JURUSAN */}
                        <div>
                            <SectionLabel>Jurusan Kuliah</SectionLabel>
                            <div className="space-y-6">
                                {result.recommendedMajors?.map((m, i) => (
                                    <div key={i}>
                                        <p className="text-[14px] font-semibold text-white mb-1">{m.name}</p>
                                        <p className="text-xs text-white/33 leading-relaxed mb-2.5">{m.reason}</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {m.universities?.slice(0, 3).map((u, j) => (
                                                <span key={j} className="text-[11px] px-2 py-0.5 rounded-md bg-primary/10 text-blue-300">
                                                    {u}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* UMKM */}
                        <div>
                            <SectionLabel>Ide UMKM</SectionLabel>
                            <div className="space-y-4">
                                {result.umkmOpportunities?.map((u, i) => (
                                    <div key={i} className="flex gap-3 items-start">
                                        <div className="size-1.5 rounded-full bg-violet-400/50 shrink-0 mt-1.5" />
                                        <div>
                                            <p className="text-[13px] font-medium text-white/65 mb-0.5">{u.sector}</p>
                                            <p className="text-xs text-white/28 leading-relaxed">{u.startupIdea}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </FadeUp>

                <HR />

                {/* ─────────────── ROADMAP — clearly clickable ─────────────── */}
                <FadeUp delay={340}>
                    {/* trigger button — full width, obvious interactive surface */}
                    <button
                        onClick={() => setRoadmapOpen(v => !v)}
                        className="w-full group flex items-center justify-between gap-4 px-5 py-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] ring-1 ring-white/[0.07] hover:ring-white/[0.13] transition-all duration-200 cursor-pointer"
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            {/* icon */}
                            <div className="shrink-0 size-9 rounded-xl bg-violet-500/15 flex items-center justify-center">
                                <HiChartBar className="size-4 text-violet-400" />
                            </div>
                            <div className="text-left min-w-0">
                                <p className="text-[14px] font-semibold text-white leading-none mb-1">Roadmap 5 Tahun</p>
                                <p className="text-[12px] text-white/35">
                                    {roadmapOpen ? "Tutup roadmap" : "Klik untuk lihat langkah karir kamu →"}
                                </p>
                            </div>
                        </div>
                        {/* chevron with rotation */}
                        <div className={`shrink-0 size-8 rounded-xl bg-white/[0.05] group-hover:bg-white/[0.08] flex items-center justify-center transition-transform duration-300 ${roadmapOpen ? "rotate-180" : ""}`}>
                            <HiChevronDown className="size-4 text-white/40" />
                        </div>
                    </button>

                    {/* roadmap body */}
                    {roadmapOpen && result.skillRoadmap && (
                        <div className="mt-6 ml-2">
                            {Object.entries(result.skillRoadmap).map(([year, skills], i, arr) => (
                                <div key={year} className="flex gap-4">
                                    {/* timeline column */}
                                    <div className="flex flex-col items-center">
                                        <div className="size-6 rounded-full bg-violet-500/20 ring-1 ring-violet-400/25 flex items-center justify-center shrink-0">
                                            <span className="text-[10px] font-bold text-violet-300">{i + 1}</span>
                                        </div>
                                        {i < arr.length - 1 && (
                                            <div className="w-px flex-1 bg-white/[0.06] my-1.5" />
                                        )}
                                    </div>

                                    {/* content */}
                                    <div className={`pb-6 ${i === arr.length - 1 ? "pb-0" : ""}`}>
                                        <p className="text-xs font-semibold text-violet-300 mb-1.5 mt-0.5">
                                            Tahun {i + 1}
                                        </p>
                                        <ul className="space-y-1">
                                            {(Array.isArray(skills) ? skills : []).map((sk, j) => (
                                                <li key={j} className="flex items-start gap-2 text-xs text-white/32 leading-relaxed">
                                                    <span className="size-1 rounded-full bg-white/18 shrink-0 mt-1.5" />
                                                    {sk}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </FadeUp>

                {/* ─────────────── MOTIVATIONAL + RETRY ─────────────── */}
                <FadeUp delay={420}>
                    <div className="mt-16 flex flex-col items-center text-center">
                        {result.motivationalMessage && (
                            <div className="relative max-w-[440px] w-full mb-8 px-6 py-5 rounded-2xl bg-white/[0.03]">
                                {/* left accent bar */}
                                <div className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full bg-primary/40" />

                                <div className="flex gap-3.5 items-start text-left">
                                    <div className="shrink-0 size-8 rounded-full bg-amber-400/10 flex items-center justify-center mt-0.5">
                                        <LuMessageCircleHeart className="size-4 text-amber-300" />
                                    </div>
                                    <p className="text-sm text-white/42 leading-relaxed italic">
                                        "{result.motivationalMessage}"
                                    </p>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={onRetry}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] text-white/38 hover:text-white/65 text-sm font-medium transition-all duration-200 cursor-pointer"
                        >
                            <HiRefresh className="size-4" />
                            Ulangi Tes
                        </button>
                    </div>
                </FadeUp>

            </div>
        </div>
    );
}

function SkillAnimBar({ pct, barClass }) {
    const [w, setW] = useState(0);
    useEffect(() => { const t = setTimeout(() => setW(pct), 750); return () => clearTimeout(t); }, [pct]);
    return (
        <div className={`absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out opacity-100 ${barClass}`}
            style={{ width: `${w}%` }} />
    );
}