// src/pages/EducationDetailPage.jsx
// Route: /education/:slug
// Juga bisa via props: <EducationDetailPage major={obj} onBack={fn} />

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMajorBySlug, DEMAND_LEVEL } from "../data/educationData";
import { HiArrowLeft, HiLightBulb, HiBriefcase } from "react-icons/hi";

const TIP_COLORS = ["#f59e0b", "#8b5cf6", "#10b981"];

export default function EducationDetailPage({ major: majorProp, onBack }) {
    const { slug } = useParams() || {};
    const navigate  = useNavigate?.() || null;

    const d      = majorProp || getMajorBySlug(slug);
    const demand = d ? (DEMAND_LEVEL[d.demand] || DEMAND_LEVEL["Sedang"]) : null;

    useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

    const handleBack = () => { if (onBack) { onBack(); return; } navigate?.(-1); };

    if (!d) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4
                bg-neutral-50 dark:bg-background">
                <p className="font-bold text-neutral-900 dark:text-white">Jurusan tidak ditemukan.</p>
                <button onClick={() => navigate?.("/explore-education")}
                    className="text-sm px-4 py-2 rounded-lg
                        bg-white dark:bg-white/[0.05]
                        text-neutral-500 dark:text-white/40">
                    Kembali ke Explore Education
                </button>
            </div>
        );
    }

    // ── Section label ──────────────────────────────────────────────────────────
    const SLabel = ({ children }) => (
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] mb-4
            text-neutral-400 dark:text-white/25">
            {children}
        </p>
    );

    const Divider = () => (
        <div className="h-px my-8
            bg-neutral-200 dark:bg-white/[0.05]" />
    );

    return (
        <div className="min-h-screen
            bg-neutral-50 dark:bg-background
            text-neutral-900 dark:text-white">

            <style>{`
                @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
                .fu{animation:fadeUp .45s ease both}
                .fu1{animation:fadeUp .45s ease .06s both}
                .fu2{animation:fadeUp .45s ease .12s both}
                .fu3{animation:fadeUp .45s ease .18s both}
                .fu4{animation:fadeUp .45s ease .24s both}
                .fu5{animation:fadeUp .45s ease .30s both}
            `}</style>

            {/* ── Hero ── */}
            <div className="relative overflow-hidden" style={{ height: 240 }}>
                {/* Light mode hero bg */}
                <div className="absolute inset-0 dark:hidden"
                    style={{ background: `linear-gradient(135deg, ${d.accentColor}15 0%, #f5f5f5 100%)` }} />
                {/* Dark mode hero bg */}
                <div className="absolute inset-0 hidden dark:block"
                    style={{ background: `linear-gradient(135deg, ${d.accentColor}20 0%, #0d0d0f 100%)` }} />
                {/* Bottom fade */}
                <div className="absolute inset-0 dark:hidden"
                    style={{ background: "linear-gradient(to bottom, transparent 40%, #f5f5f5 100%)" }} />
                <div className="absolute inset-0 hidden dark:block"
                    style={{ background: "linear-gradient(to bottom, transparent 40%, #0d0d0f 100%)" }} />

                {/* Nav */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                    <button onClick={handleBack}
                        className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-xl
                            transition-all backdrop-blur-md cursor-pointer
                            bg-white/70 dark:bg-black/40
                            text-neutral-600 dark:text-white/50
                            hover:text-neutral-900 dark:hover:text-white">
                        <HiArrowLeft className="size-4" /> Kembali
                    </button>
                    <span className="text-[11px] font-bold px-3 py-1.5 rounded-xl
                        bg-white/70 dark:bg-black/40 backdrop-blur-md"
                        style={{ color: d.accentColor }}>
                        {d.degree}
                    </span>
                </div>

                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 px-5 pb-6">
                    <div className="max-w-2xl mx-auto">
                        <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5
                            text-neutral-400 dark:text-white/30">
                            {d.category}
                        </p>
                        <h1 className="font-black leading-tight text-neutral-900 dark:text-white"
                            style={{ fontSize: "clamp(1.8rem,5vw,2.8rem)", letterSpacing: "-0.025em" }}>
                            {d.name}
                        </h1>
                    </div>
                </div>
            </div>

            {/* ── Body ── */}
            <div className="max-w-2xl mx-auto px-4 pt-6 pb-24">

                {/* Tagline + badges */}
                <div className="fu mb-7">
                    <p className="text-sm leading-[1.8] mb-4
                        text-neutral-500 dark:text-white/40">
                        {d.shortDesc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {demand && (
                            <span className="inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-lg"
                                style={{ color: demand.color, background: demand.bg }}>
                                Prospek {d.demand}
                            </span>
                        )}
                        <span className="inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-lg
                            bg-neutral-100 dark:bg-white/[0.06]
                            text-neutral-500 dark:text-white/40">
                            {d.duration}
                        </span>
                        {d.salaryRange && (
                            <span className="inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-lg"
                                style={{ color: "#10b981", background: "rgba(16,185,129,0.10)" }}>
                                {d.salaryRange}
                            </span>
                        )}
                    </div>
                </div>

                <Divider />

                {/* About */}
                <div className="fu1 mb-8">
                    <SLabel>Tentang Jurusan Ini</SLabel>
                    <p className="text-sm leading-[1.85]
                        text-neutral-600 dark:text-white/40">
                        {d.about}
                    </p>
                </div>

                {/* Mata kuliah */}
                <div className="fu2 mb-8">
                    <SLabel>Mata Kuliah Utama</SLabel>
                    <div className="rounded-2xl overflow-hidden
                        bg-white dark:bg-white/[0.03]">
                        {d.subjects.map((sub, i) => (
                            <div key={i} className="flex items-center gap-4 px-5 py-3.5"
                                style={{ borderBottom: i < d.subjects.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
                                <div className="size-5 rounded-md flex items-center justify-center shrink-0 text-[10px] font-black"
                                    style={{ background: `${d.accentColor}18`, color: d.accentColor }}>
                                    {i + 1}
                                </div>
                                <span className="text-sm
                                    text-neutral-700 dark:text-white/55">
                                    {sub}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skills */}
                <div className="fu3 mb-8">
                    <SLabel>Skill yang Dipelajari</SLabel>
                    <div className="flex flex-wrap gap-2">
                        {d.skills.map((s, i) => (
                            <span key={i} className="text-xs font-semibold px-3 py-1.5 rounded-lg
                                bg-white dark:bg-white/[0.05]
                                text-neutral-600 dark:text-white/45">
                                {s}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Prospek karir */}
                <div className="fu3 mb-8">
                    <SLabel>Prospek Karir Setelah Lulus</SLabel>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {d.careers.map((c, i) => (
                            <div key={i} className="flex items-center gap-2.5 px-4 py-3 rounded-xl
                                bg-white dark:bg-white/[0.03]">
                                <HiBriefcase className="size-3.5 shrink-0" style={{ color: d.accentColor }} />
                                <span className="text-xs
                                    text-neutral-700 dark:text-white/50">
                                    {c}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Universitas */}
                {d.universities?.length > 0 && (
                    <div className="fu4 mb-8">
                        <SLabel>Universitas yang Menyediakan</SLabel>
                        <div className="flex flex-wrap gap-2">
                            {d.universities.map((u, i) => (
                                <span key={i} className="text-xs font-semibold px-3 py-1.5 rounded-lg
                                    bg-white dark:bg-white/[0.05]
                                    text-neutral-600 dark:text-white/45">
                                    {u}
                                </span>
                            ))}
                        </div>
                        <p className="text-[11px] mt-3
                            text-neutral-400 dark:text-white/25">
                            * Hanya sebagian contoh. Masih banyak universitas lain yang membuka jurusan ini.
                        </p>
                    </div>
                )}

                {/* Tips */}
                <div className="fu5 mb-8">
                    <SLabel>Tips Memilih & Masuk Jurusan Ini</SLabel>
                    <div className="space-y-2">
                        {[
                            `Pastikan kamu memang tertarik dengan mata kuliah inti — ${d.subjects[0]} dan ${d.subjects[1]} adalah fondasi utama yang akan banyak kamu temui.`,
                            `Cari tahu akreditasi program studi di universitas pilihanmu — akreditasi Unggul membuka lebih banyak peluang karir.`,
                            `Ikuti komunitas mahasiswa jurusan ini di media sosial untuk mendapat gambaran nyata kehidupan perkuliahannya.`,
                        ].map((tip, i) => (
                            <div key={i} className="rounded-xl px-4 py-4 flex items-start gap-3
                                bg-white dark:bg-white/[0.03]"
                                style={{ borderLeft: `3px solid ${TIP_COLORS[i]}` }}>
                                <HiLightBulb className="size-4 shrink-0 mt-0.5"
                                    style={{ color: TIP_COLORS[i] }} />
                                <p className="text-sm leading-relaxed
                                    text-neutral-600 dark:text-white/40">
                                    {tip}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Back */}
                <button onClick={handleBack}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl
                        text-sm font-medium transition-all cursor-pointer
                        bg-white dark:bg-white/[0.04]
                        text-neutral-400 dark:text-white/30
                        hover:text-neutral-900 dark:hover:text-white">
                    <HiArrowLeft className="size-4" /> Kembali
                </button>
            </div>
        </div>
    );
}