import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom/client";
import {
  HiSparkles, HiRefresh, HiCheckCircle, HiChevronDown,
  HiBriefcase, HiAcademicCap, HiLightBulb, HiChartBar,
  HiShoppingBag, HiArrowRight, HiBookOpen,
  HiCode, HiGlobe, HiHeart, HiPencil, HiDownload,
  HiBeaker, HiMusicNote, HiCamera, HiCurrencyDollar,
  HiExternalLink,
} from "react-icons/hi";
import { LuMessageCircleHeart } from "react-icons/lu";
import CareerDetailPage from "../../pages/explore/CareerDetailPage";
import PDFResult from "./PDFResult";
import { FaMoneyBill } from "react-icons/fa";

function getPersonalityIcon(type = "") {
  const t = type.toLowerCase();
  if (/creative|artist|designer|alchemist/.test(t)) return HiPencil;
  if (/tech|developer|digital|builder/.test(t)) return HiCode;
  if (/analyst|strategist|scientist|thinker/.test(t)) return HiBeaker;
  if (/entrepreneur|business|leader|visionary/.test(t)) return HiCurrencyDollar;
  if (/empathetic|healer|helper|caregiver/.test(t)) return HiHeart;
  if (/global|communicator|linguist|connector/.test(t)) return HiGlobe;
  if (/scholar|learner|academic|intellectual/.test(t)) return HiBookOpen;
  if (/musician|music|performer/.test(t)) return HiMusicNote;
  if (/visual|creator|photographer|media/.test(t)) return HiCamera;
  return HiSparkles;
}

// ─── ATOMS ────────────────────────────────────────────────────────────────────
function Bar({ pct, color, trackColor = "bg-neutral-200 dark:bg-white/[0.06]", delay = 0 }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(pct), 350 + delay); return () => clearTimeout(t); }, [pct]);
  return (
    <div className={`h-1 w-full rounded-full overflow-hidden ${trackColor}`}>
      <div className="h-full rounded-full transition-all duration-700 ease-out"
        style={{ width: `${w}%`, background: color }} />
    </div>
  );
}

function FadeUp({ children, delay = 0, className = "" }) {
  const [on, setOn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setOn(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div className={`transition-all duration-500 ease-out ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"} ${className}`}>
      {children}
    </div>
  );
}

function SLabel({ children }) {
  return (
    <p className="text-[10px] font-bold font-accent uppercase tracking-[0.18em] mb-6 text-slate-500 dark:text-white/60">
      {children}
    </p>
  );
}

function Div() {
  return <div className="my-12 h-px bg-neutral-200 dark:bg-white/5" />;
}

function usePDFDownload(result) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    if (downloading) return;
    setDownloading(true);

    const slug = (result.personalityType || "Hasil").replace(/\s+/g, "-");
    const filename = `Edutech-${slug}`;

    const popup = window.open("", "_blank", "width=820,height=920,scrollbars=yes");
    if (!popup) {
      alert("Izinkan popup di browser kamu untuk mengunduh PDF.");
      setDownloading(false);
      return;
    }

    popup.document.write(`<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8"/>
  <title>${filename}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&display=swap" rel="stylesheet"/>
  <style>
    @page { size: A4; margin: 15mm 14mm; }
    @media print {
      html, body { margin: 0; padding: 0; }
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
    body { font-family: 'Montserrat','Segoe UI',sans-serif; background:#fff; margin:0; padding:0; }
  </style>
</head>
<body><div id="root"></div></body>
</html>`);
    popup.document.close();

    popup.onload = () => {
      setTimeout(() => {
        try {
          const root = ReactDOM.createRoot(popup.document.getElementById("root"));
          root.render(<PDFResult result={result} />);
          setTimeout(() => {
            popup.focus();
            popup.print();
            setTimeout(() => { popup.close(); setDownloading(false); }, 1200);
          }, 900);
        } catch (e) {
          console.error(e);
          popup.close();
          setDownloading(false);
        }
      }, 400);
    };
  };

  return { downloading, handleDownload };
}

export default function ResultPage({ result, onRetry }) {
  const [roadmapOpen, setRoadmapOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const navigate = useNavigate();
  const { downloading, handleDownload } = usePDFDownload(result);
  const PersonalityIcon = getPersonalityIcon(result.personalityType);

  if (selectedCareer) {
    return (
      <CareerDetailPage
        career={selectedCareer}
        onBack={() => { setSelectedCareer(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
      />
    );
  }

  const handleMajorClick = (majorName) => {
    const slug = majorName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    navigate(`/education/${slug}`);
  };

  return (
    <div className="pt-12 relative min-h-screen antialiased overflow-x-hidden bg-neutral-50 dark:bg-background text-slate-900 dark:text-white transition-colors duration-300">

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 pt-14 pb-24">

        {/* ── HERO ── */}
        <FadeUp delay={60} className="flex flex-col items-center text-center mb-16">
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-xl opacity-50 dark:opacity-50 transition-opacity" />

            <div className="relative w-20 h-20 rounded-full flex items-center justify-center 
                  bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-700">

              <PersonalityIcon className="w-10 h-10 text-orange-500 dark:text-orange-400 transition-colors" />
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold mb-5 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
            <HiCheckCircle className="w-3.5 h-3.5" /> Hasil Analisis AI
          </span>
          <h1 className="font-bold tracking-tight leading-tight mb-3 text-slate-900 dark:text-white"
            style={{ fontSize: "clamp(1.7rem,5vw,2.5rem)", fontFamily: "'Montserrat',sans-serif" }}>
            {result.personalityType}
          </h1>
          <p className="max-w-[440px] text-sm leading-relaxed text-slate-500 dark:text-white/45">
            {result.personalityDescription}
          </p>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* ── KARIR ── */}
          <FadeUp delay={120} className="col-span-2 row-span-2">
            <div className="bg-neutral-100/45 dark:bg-neutral-900/60 p-5 rounded-2xl">
              <SLabel>Peluang Karir Terbaik</SLabel>
              {result.topCareers?.map((c, i) => (
                <div key={i}>
                  <div className="flex gap-5 items-start">
                    <div className={`shrink-0 w-14 h-14 rounded-full flex flex-col items-center justify-center text-center
    ${i === 0
                        ? 'bg-blue-100 dark:bg-blue-500/20'
                        : 'bg-neutral-100 dark:bg-white/5'}`}
                    >
                      <span className={`text-base font-bold leading-none
    ${i === 0
                          ? 'text-blue-600 dark:text-blue-300'
                          : 'text-slate-600 dark:text-white/40'}`}
                      >
                        {c.match}%
                      </span>
                      <span className={`text-[9px] font-medium uppercase mt-0.5
    ${i === 0
                          ? 'text-blue-500 dark:text-blue-400/80'
                          : 'text-slate-400 dark:text-white/30'}`}
                      >
                        cocok
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-base font-semibold text-slate-900 dark:text-white">{c.title}</span>
                        {i === 0 && (
                          <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">
                            Top Pick
                          </span>
                        )}
                      </div>
                      <p className="text-sm leading-relaxed mb-3 text-justify text-slate-500 dark:text-neutral-400">
                        {c.description}
                      </p>
                      <Bar pct={c.match} color={i === 0 ? "#3b82f6" : "#94a3b8"} delay={i * 80} />
                      <div className="flex flex-wrap gap-2 mt-3">
                        {c.avgSalary && (
                          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg inline-flex items-center gap-1 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                            <FaMoneyBill className="w-3 h-3" />
                            {c.avgSalary}
                          </span>
                        )}
                        {c.industryDemand && (
                          <span className="text-[11px] px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-white/5 text-slate-600 dark:text-white/40">
                            Permintaan: {c.industryDemand}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => { setSelectedCareer(c); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className="mt-3 flex items-center gap-1.5 text-xs cursor-pointer transition-colors group/cta text-slate-400 dark:text-white/30 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        Lihat detail karir <HiArrowRight className="w-3 h-3 transition-transform group-hover/cta:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                  {i < (result.topCareers?.length ?? 0) - 1 && (
                    <div className="ml-17 my-8 h-px bg-neutral-200 dark:bg-white/5" />
                  )}
                </div>
              ))}
            </div>
          </FadeUp>
          {/* ── JURUSAN + UMKM ── */}
          <FadeUp delay={240}>
            <div className="grid grid-cols-1 gap-12">
              <div>
                <SLabel>Rekomendasi Jurusan</SLabel>
                <div className="space-y-7">
                  {result.recommendedMajors?.map((m, i) => (
                    <div key={i}>
                      <p className="text-sm font-semibold mb-1 text-slate-900 dark:text-white">{m.name}</p>
                      <p className="text-xs leading-relaxed mb-2.5 text-slate-500 dark:text-white/40">{m.reason}</p>
                      <div className="flex flex-wrap gap-1.5 mb-2.5">
                        {m.universities?.slice(0, 3).map((u, j) => (
                          <span key={j} className="text-[11px] px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300">
                            {u}
                          </span>
                        ))}
                      </div>
                      {/* TOMBOL ARAH KE JURUSAN SPESIFIK */}
                      <button
                        onClick={() => handleMajorClick(m.name)}
                        className="flex items-center gap-1.5 text-[11px] cursor-pointer transition-colors group/edu text-slate-400 dark:text-white/30 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <HiAcademicCap className="w-3.5 h-3.5" />
                        Lihat detail jurusan ini
                        <HiExternalLink className="w-3 h-3 transition-transform group-hover/edu:translate-x-0.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <SLabel>Ide Wirausaha & UMKM</SLabel>
                <div className="space-y-5">
                  {result.umkmOpportunities?.map((u, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 bg-violet-400 dark:bg-violet-400/50" />
                      <div>
                        <p className="text-[13px] font-medium mb-0.5 text-slate-800 dark:text-white/65">{u.sector}</p>
                        <p className="text-xs leading-relaxed text-slate-500 dark:text-white/35">{u.startupIdea}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* ── ROADMAP ── */}
              <FadeUp delay={300}>
                <button
                  onClick={() => setRoadmapOpen(v => !v)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 rounded-2xl cursor-pointer transition-all duration-200 bg-neutral-100/45 dark:bg-white/[0.03] hover:bg-neutral-100 dark:hover:bg-white/[0.06]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-violet-100 dark:bg-violet-500/10">
                      <HiChartBar className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Roadmap 5 tahun</p>
                      <p className="text-xs text-slate-500 dark:text-white/35">
                        {roadmapOpen ? "Tutup" : "Rencana pengembangan skill kamu →"}
                      </p>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-white dark:bg-white/5">
                    <HiChevronDown className={`w-4 h-4 transition-transform duration-300 ${roadmapOpen ? "rotate-180" : ""} text-slate-500 dark:text-white/40`} />
                  </div>
                </button>
                {roadmapOpen && result.skillRoadmap && (
                  <div className="mt-6 pl-2">
                    {Object.entries(result.skillRoadmap).map(([, skills], i, arr) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400">
                            {i + 1}
                          </div>
                          {i < arr.length - 1 && <div className="w-px flex-1 my-1.5 bg-neutral-200 dark:bg-white/5" />}
                        </div>
                        <div className={`pb-6 ${i === arr.length - 1 ? "pb-0" : ""}`}>
                          <p className="text-xs font-semibold mb-2 mt-0.5 text-violet-600 dark:text-violet-400">Tahun {i + 1}</p>
                          <ul className="space-y-1">
                            {(Array.isArray(skills) ? skills : []).map((sk, j) => (
                              <li key={j} className="flex items-start gap-2 text-xs leading-relaxed text-slate-500 dark:text-white/40">
                                <span className="w-1 h-1 rounded-full shrink-0 mt-1.5 bg-slate-400 dark:bg-white/20" />
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

            </div>
          </FadeUp>

        </div>

        {/* ── SKILL GAPS ── */}
        <FadeUp delay={180}>
          <SLabel>Skill yang Perlu Dikembangkan</SLabel>
          <p className="text-sm mb-6 text-slate-500 dark:text-white/38 -mt-4">
            Skill berikut direkomendasikan AI untuk mendukung karir terbaikmu.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.skillGaps?.map((s, i) => (
              <div
                key={i}
                className="group rounded-2xl bg-gray-100/40 dark:bg-white/[0.03] hover:bg-gray-100 dark:hover:bg-white/[0.05] transition-transform duration-300 p-5"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <h4 className="text-slate-900 dark:text-white font-semibold text-base leading-snug">
                    {s.skill}
                  </h4>
                  <span
                    className={`shrink-0 text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-lg ${s.targetLevel === "Penting"
                      ? "bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400"
                      : "bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      }`}
                  >
                    {s.targetLevel}
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <p className="text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
                    {s.howToLearn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

        <Div />

        {/* ── MOTIVASI + ACTIONS ── */}
        <FadeUp delay={360}>
          <div className="flex flex-col items-center text-center">
            {result.motivationalMessage && (
              <div className="relative max-w-[480px] w-full mb-10 px-6 py-5 rounded-xl bg-blue-50 dark:bg-white/[0.03] border-l-4 border-blue-500">
                <div className="flex gap-4 items-start text-left">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-amber-100 dark:bg-amber-500/10">
                    <LuMessageCircleHeart className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <p className="text-sm leading-relaxed italic text-slate-600 dark:text-white/50">
                    "{result.motivationalMessage}"
                  </p>
                </div>
              </div>
            )}

            {/* btn download + ulangi tes */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={onRetry}
                className="group inline-flex items-center gap-2.5 p-4 rounded-xl text-sm font-semibold 
               bg-neutral-100 dark:bg-white/5 
               text-slate-600 dark:text-white/40 
               hover:bg-neutral-200 dark:hover:bg-white/10 
               hover:text-slate-900 dark:hover:text-white 
               transition-all duration-300 active:scale-95"
              >
                <HiRefresh className="w-4 h-4 transition-transform duration-500 group-hover:rotate-180" />
                <span>Ulangi Tes</span>
              </button>

              <button
                onClick={handleDownload}
                disabled={downloading}
                className="inline-flex items-center gap-2 p-4 rounded-xl text-sm font-semibold 
               bg-blue-600 dark:bg-blue-500/20
               text-white dark:text-blue-300 
               hover:bg-blue-700 dark:hover:bg-blue-500/25 
               hover:text-white dark:hover:text-blue-200
               disabled:opacity-50 disabled:cursor-not-allowed
               transition-all duration-300 active:scale-95 group"
              >
                <HiDownload className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
                <span>{downloading ? "Membuka PDF..." : "Download PDF"}</span>
              </button>
            </div>
          </div>
        </FadeUp>

      </div>
    </div>
  );
}