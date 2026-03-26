import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCareerBySlug, getCareerByTitle, buildFallback } from "../../data/careerData";
import {
  HiArrowLeft, HiLightBulb, HiOfficeBuilding,
} from "react-icons/hi";

// Accent rotation
const TIP_ACCENTS = [
  { solid: "#f59e0b", dim: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.18)" },
  { solid: "#8b5cf6", dim: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.15)" },
  { solid: "#10b981", dim: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.18)" },
];
const TOOL_DOTS = ["#8b5cf6", "#10b981", "#f59e0b", "#f43f5e"];

// ─── ATOMS ────────────────────────────────────────────────────────────────────

function SLabel({ children }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-[0.14em] mb-4 text-neutral-400 dark:text-neutral-500">
      {children}
    </p>
  );
}

function Divider() {
  return <div className="h-px my-8 bg-black/[0.06] dark:bg-white/[0.05]" />;
}

function Chip({ children, color, bg, border }) {
  return (
    <span
      className="inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-lg"
      style={{ color, background: bg, border: `1px solid ${border}` }}
    >
      {children}
    </span>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function CareerDetailPage({ career: careerProp, onBack }) {
  const { slug } = useParams() || {};
  const navigate = useNavigate?.() || null;

  // Follow app-level theme by watching the html "dark" class.
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains("dark"));
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const careerFromProp = careerProp
    ? (getCareerByTitle(careerProp.title) || buildFallback(careerProp))
    : null;
  const careerFromSlug = slug ? getCareerBySlug(slug) : null;
  const d = careerFromProp || careerFromSlug;

  const aiSalary = careerProp?.avgSalary || null;
  const aiDemand = careerProp?.industryDemand || null;
  const aiMatch = careerProp?.match || null;
  const aiDesc = careerProp?.description || null;

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  if (!d) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white dark:bg-[#0d0d0f]">
        <p className="text-neutral-800 dark:text-white font-bold">Profesi tidak ditemukan.</p>
        <button
          onClick={() => navigate?.("/explore-career")}
          className="text-sm px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
        >
          Kembali ke Explore Career
        </button>
      </div>
    );
  }

  const handleBack = () => {
    if (onBack) { onBack(); return; }
    if (navigate) navigate(-1);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#0d0d0f] transition-colors duration-300">

      {/* ── HERO ── */}
      <div className="relative overflow-hidden" style={{ height: 280 }}>
        {/* Hero image + same shadow treatment as Explore Education */}
        {d.img && (
          <div className="absolute inset-0 z-0">
            <img
              src={d.img}
              alt={d.title}
              className="w-full h-full object-cover opacity-30 dark:opacity-20"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
          </div>
        )}

        {/* Fallback gradient if no image */}
        {!d.img && (
          <>
            <div className="absolute inset-0 dark:hidden" style={{ background: `linear-gradient(135deg, ${d.accentColor}12 0%, #f5f5f5 100%)` }} />
            <div className="absolute inset-0 hidden dark:block" style={{ background: `linear-gradient(135deg, ${d.accentColor}18 0%, #0d0d0f 100%)` }} />
          </>
        )}

        {/* Top action row */}
        <div className="absolute top-0 left-0 right-0 z-20 pt-22 md:pt-24">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 flex items-center justify-between">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 rounded-full border border-black/65 bg-black/80 px-5 py-2.5 text-sm font-semibold text-white shadow-sm backdrop-blur-md transition-colors hover:bg-black/90 dark:border-white/65 dark:bg-white/85 dark:text-neutral-900 dark:hover:bg-white"
            >
              <HiArrowLeft className="size-4" />
              Kembali
            </button>

            <div className="flex items-center gap-2">
              {aiMatch && (
                <span
                  className="text-[11px] font-bold px-3 py-1.5 rounded-xl text-violet-300"
                  style={{ background: "rgba(0,0,0,0.40)", backdropFilter: "blur(10px)", border: "1px solid rgba(139,92,246,0.25)" }}
                >
                  {aiMatch}% Cocok
                </span>
              )}
            </div>
          </div>
        </div>

        {/* title */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-6 z-10">
          <div className="max-w-2xl mx-auto">
            <p className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 ${isDark ? "text-white/40" : "text-neutral-600"}`}>
              {d.field}
            </p>
            <h1
              className={`font-accent font-bold leading-tight ${isDark ? "text-white" : "text-neutral-900"}`}
              style={{ fontSize: "clamp(1.75rem,5vw,2.6rem)", letterSpacing: "-0.025em" }}
            >
              {d.title}
            </h1>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-7 pb-24">

        {/* tagline + badges */}
        <div className="mb-8 animate-[fadeUp_.45s_ease_both]">
          <p className="text-base leading-[1.8] mb-5 text-neutral-500 dark:text-neutral-400">
            {d.tagline}
          </p>
          <div className="flex flex-wrap gap-2">
            {(aiSalary || d.salary) && (
              <Chip color="#10b981" bg="rgba(16,185,129,0.08)" border="rgba(16,185,129,0.20)">
                {aiSalary || d.salary}
              </Chip>
            )}
            {(aiDemand || d.demand) && (
              <Chip color="#f59e0b" bg="rgba(245,158,11,0.08)" border="rgba(245,158,11,0.20)">
                Demand {aiDemand || d.demand}
              </Chip>
            )}
            {d.entryLevel && (
              <Chip color="#8b5cf6" bg="rgba(139,92,246,0.08)" border="rgba(139,92,246,0.18)">
                Hambatan Masuk {d.entryLevel}
              </Chip>
            )}
          </div>
        </div>

        <Divider />

        {/* 1. TENTANG */}
        <div className="mb-8">
          <SLabel>Tentang Profesi Ini</SLabel>
          <p className="text-sm leading-[1.85] text-neutral-500 dark:text-neutral-400">
            {d.about}
          </p>
        </div>

        {/* 2. KENAPA COCOK */}
        {aiDesc && (
          <div className="mb-8">
            <SLabel>Kenapa Profesi Ini Cocok Untukmu</SLabel>
            <div className="rounded-2xl px-5 py-4 bg-violet-50 dark:bg-[rgba(139,92,246,0.07)] border border-violet-100 dark:border-[rgba(139,92,246,0.14)]">
              <p className="text-sm leading-[1.85] text-neutral-600 dark:text-neutral-400">{aiDesc}</p>
            </div>
          </div>
        )}

        {/* 3. SEHARI-HARI */}
        <div className="mb-8">
          <SLabel>Yang Dikerjakan Sehari-hari</SLabel>
          <div className="rounded-2xl overflow-hidden bg-white dark:bg-[#111116] border border-black/[0.05] dark:border-transparent">
            {d.daily.map((item, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 px-5 py-4 ${i < d.daily.length - 1 ? "border-b border-black/[0.05] dark:border-white/[0.05]" : ""}`}
              >
                <div
                  className="shrink-0 size-6 rounded-lg flex items-center justify-center text-[11px] font-black mt-0.5"
                  style={{ background: `${d.accentColor}15`, color: d.accentColor }}
                >
                  {i + 1}
                </div>
                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {item.text || item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. TOOLS */}
        <div className="mb-8">
          <SLabel>Tools & Teknologi yang Digunakan</SLabel>
          <div className="grid grid-cols-2 gap-2.5">
            {d.tools.map((tool, i) => (
              <div
                key={i}
                className="rounded-xl px-4 py-4 bg-white dark:bg-[#111116] border border-black/[0.05] dark:border-transparent"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="size-1.5 rounded-full shrink-0"
                    style={{ background: TOOL_DOTS[i % TOOL_DOTS.length] }}
                  />
                  <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                    {tool.name}
                  </p>
                </div>
                <p className="text-[11px] leading-snug pl-3.5 text-neutral-400 dark:text-neutral-500">
                  {tool.use}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. JENJANG KARIR */}
        <div className="mb-8">
          <SLabel>Jenjang Karir & Estimasi Gaji per Bulan</SLabel>
          <div className="relative">
            {/* vertical line */}
            <div
              className="absolute left-[5px] top-4 bottom-4 w-px"
              style={{ background: `linear-gradient(to bottom, ${d.accentColor}60, transparent)` }}
            />
            <div className="space-y-2.5 pl-8">
              {d.path.map((step, i) => (
                <div key={i} className="relative">
                  {/* dot */}
                  <div
                    className="absolute -left-8 top-[15px] size-[11px] rounded-full"
                    style={{
                      background: i === 0 ? d.accentColor : "transparent",
                      border: `2px solid ${i === 0 ? d.accentColor : "#374151"}`,
                      boxShadow: i === 0 ? `0 0 8px ${d.accentColor}45` : "none",
                    }}
                  />
                  <div
                    className={`rounded-xl px-4 py-3.5 flex items-center justify-between gap-3 flex-wrap
                      ${i === 0
                        ? "bg-white dark:bg-transparent border border-black/[0.06] dark:border-transparent"
                        : "bg-white dark:bg-[#111116] border border-black/[0.05] dark:border-transparent"
                      }`}
                    style={i === 0 ? { background: isDark ? `${d.accentColor}10` : `${d.accentColor}08` } : undefined}
                  >
                    <div>
                      <p className="text-sm font-bold text-neutral-800 dark:text-neutral-100">{step.level}</p>
                      <p className="text-[11px] mt-0.5 text-neutral-400 dark:text-neutral-500">{step.dur}</p>
                    </div>
                    <p className="text-sm font-semibold shrink-0 text-emerald-600 dark:text-emerald-400">
                      {step.salary}
                      <span className="text-[10px] font-normal ml-0.5 text-neutral-400">/bln</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 6. LINGKUNGAN KERJA */}
        <div className="mb-8">
          <SLabel>Gambaran Lingkungan Kerja</SLabel>
          <div className="rounded-2xl px-5 py-4 flex items-start gap-3 bg-white dark:bg-[#15151b] border border-black/[0.05] dark:border-transparent">
            <HiOfficeBuilding className="size-4 shrink-0 mt-0.5 text-neutral-400 dark:text-neutral-500" />
            <p className="text-sm leading-[1.85] text-neutral-500 dark:text-neutral-400">{d.env}</p>
          </div>
        </div>

        {/* 7. TIPS */}
        <div className="mb-8">
          <SLabel>Tips untuk Mulai di Bidang Ini</SLabel>
          <div className="space-y-2">
            {d.tips.map((tip, i) => {
              const acc = TIP_ACCENTS[i % TIP_ACCENTS.length];
              return (
                <div
                  key={i}
                  className="rounded-xl px-4 py-4 flex items-start gap-3 bg-white dark:bg-[#111116] border border-black/[0.05] dark:border-transparent"
                  style={{ borderLeft: `3px solid ${acc.solid}` }}
                >
                  <HiLightBulb className="size-4 shrink-0 mt-0.5" style={{ color: acc.solid }} />
                  <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">{tip}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* BACK */}
        <button
          onClick={handleBack}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-medium transition-all
            bg-white hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700
            dark:bg-[#111116] dark:hover:bg-[#15151b] dark:text-neutral-500 dark:hover:text-neutral-200
            border border-black/[0.05] dark:border-transparent"
        >
          <HiArrowLeft className="size-4" />
          Kembali
        </button>
      </div>
    </div>
  );
}