import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiSparkles, HiRefresh, HiCheckCircle, HiChevronDown,
  HiBriefcase, HiAcademicCap, HiLightBulb, HiChartBar,
  HiShoppingBag, HiArrowRight, HiBookOpen, HiDownload,
  HiCode, HiGlobe, HiHeart, HiPencil,
  HiBeaker, HiMusicNote, HiCamera, HiCurrencyDollar,
  HiExternalLink,
} from "react-icons/hi";
import { LuMessageCircleHeart } from "react-icons/lu";
import { FaMoneyBill } from "react-icons/fa";
import CareerDetailPage from "../../pages/explore/CareerDetailPage";

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

// Helper untuk generate Avatar URL (DiceBear Avataaars)
function getAvatarUrl(type) {
  const seed = type.replace(/\s+/g, "-");
  // Style: avataaars (flat illustration), background: solid soft color
  return `https://api.dicebear.com/6.x/avataaars/svg?seed=${seed}&backgroundColor=ffdfbf`;
}

// ─── UI ATOMS (WEB) ───────────────────────────────────────────────────────────
function Bar({ pct, color, trackColor = "bg-neutral-200 dark:bg-white/[0.06]", delay = 0 }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(pct), 350 + delay); return () => clearTimeout(t); }, [pct]);
  return (
    <div className={`h-1 w-full rounded-full overflow-hidden ${trackColor}`}>
      <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${w}%`, background: color }} />
    </div>
  );
}

function FadeUp({ children, delay = 0, className = "" }) {
  const [on, setOn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setOn(true), delay); return () => clearTimeout(t); }, [delay]);
  return <div className={`transition-all duration-500 ease-out ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"} ${className}`}>{children}</div>;
}

function SLabel({ children }) {
  return <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-6 text-slate-500 dark:text-white/60">{children}</p>;
}

function Div() {
  return <div className="my-12 h-px bg-neutral-200 dark:bg-white/5" />;
}

const pdfStyles = {
  container: { 
    width: "794px", // A4 width at 96 DPI
    background: "#ffffff", 
    padding: "60px 60px", // Margin lebih besar
    boxSizing: "border-box", 
    fontFamily: "'Montserrat', 'Segoe UI', sans-serif",
    color: "#0f172a"
  },
  header: { 
    borderBottom: "3px solid #3b82f6", 
    paddingBottom: "24px", 
    marginBottom: "36px" 
  },
  title: { 
    fontSize: "32px", 
    fontWeight: "900", 
    margin: "8px 0 12px", 
    color: "#0f172a" 
  },
  sectionLabel: { 
    fontSize: "10px", 
    fontWeight: "700", 
    textTransform: "uppercase", 
    letterSpacing: "0.15em", 
    color: "#94a3b8", 
    marginBottom: "16px" 
  },
  divider: { 
    height: "1px", 
    background: "#e2e8f0", 
    margin: "32px 0" 
  },
  grid2: { 
    display: "grid", 
    gridTemplateColumns: "1fr 1fr", 
    gap: "16px" 
  }
};

function PdfHeader({ result }) {
  return (
    <div style={pdfStyles.header}>
      <p style={{ fontSize: "10px", color: "#3b82f6", fontWeight: "700", letterSpacing: "0.1em" }}>
        AI CAREER TEST · EDUTECH
      </p>
      <h1 style={pdfStyles.title}>{result.personalityType}</h1>
      <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.6", maxWidth: "600px" }}>
        {result.personalityDescription}
      </p>
    </div>
  );
}

function PdfCareerSection({ careers }) {
  return (
    <div style={{ marginBottom: "40px" }}>
      <p style={pdfStyles.sectionLabel}>Peluang Karir Terbaik</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {careers?.map((c, i) => (
          <div key={i} style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
            {/* Circle Percentage */}
            <div style={{
              minWidth: "48px", height: "48px", borderRadius: "50%", border: "2px solid #e2e8f0",
              display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",
              background: i === 0 ? "#eff6ff" : "#f8fafc"
            }}>
              <span style={{ fontSize: "14px", fontWeight: "800", color: i === 0 ? "#3b82f6" : "#64748b" }}>{c.match}%</span>
            </div>
            {/* Content */}
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <span style={{ fontWeight: "700", fontSize: "15px" }}>{c.title}</span>
                {i === 0 && <span style={{ fontSize: "9px", fontWeight: "700", color: "#d97706", background: "#fffbeb", padding: "2px 6px", borderRadius: "4px" }}>TOP PICK</span>}
              </div>
              <p style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.5", marginBottom: "8px" }}>{c.description}</p>
              <div style={{ display: "flex", gap: "8px" }}>
                {c.avgSalary && <span style={{ fontSize: "11px", fontWeight: "600", color: "#10b981", background: "rgba(16,185,129,0.1)", padding: "2px 8px", borderRadius: "4px" }}>{c.avgSalary}</span>}
                {c.industryDemand && <span style={{ fontSize: "11px", color: "#64748b", background: "#f1f5f9", padding: "2px 8px", borderRadius: "4px" }}>Demand: {c.industryDemand}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PdfSkillSection({ skills }) {
  return (
    <div style={{ marginBottom: "40px" }}>
      <p style={pdfStyles.sectionLabel}>Skill yang Perlu Dikembangkan</p>
      <div style={pdfStyles.grid2}>
        {skills?.map((s, i) => (
          <div key={i} style={{ background: "#f8fafc", padding: "16px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontWeight: "700", fontSize: "13px" }}>{s.skill}</span>
              <span style={{ 
                fontSize: "9px", fontWeight: "700", textTransform: "uppercase", padding: "2px 6px", borderRadius: "4px",
                background: s.targetLevel === "Penting" ? "#fee2e2" : "#fef3c7",
                color: s.targetLevel === "Penting" ? "#b91c1c" : "#b45309"
              }}>
                {s.targetLevel}
              </span>
            </div>
            <p style={{ fontSize: "12px", color: "#64748b", lineHeight: "1.5" }}>{s.howToLearn}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PdfMajorSection({ majors }) {
  return (
    <div style={{ marginBottom: "40px" }}>
      <p style={pdfStyles.sectionLabel}>Rekomendasi Jurusan Kuliah</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {majors?.map((m, i) => (
          <div key={i}>
            <p style={{ fontWeight: "700", marginBottom: "4px" }}>{m.name}</p>
            <p style={{ fontSize: "12px", color: "#64748b", lineHeight: "1.5", marginBottom: "6px" }}>{m.reason}</p>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {m.universities?.slice(0, 2).map((u, j) => (
                <span key={j} style={{ fontSize: "10px", background: "#eff6ff", color: "#1d4ed8", padding: "2px 6px", borderRadius: "4px" }}>{u}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PdfUmkmSection({ items }) {
  return (
    <div style={{ marginBottom: "40px" }}>
      <p style={pdfStyles.sectionLabel}>Ide Wirausaha & UMKM</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {items?.map((u, i) => (
          <div key={i}>
            <p style={{ fontWeight: "600", marginBottom: "2px", color: "#1f2937" }}>{u.sector}</p>
            <p style={{ fontSize: "12px", color: "#64748b", lineHeight: "1.5" }}>{u.startupIdea}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PdfRoadmapSection({ roadmap }) {
  if (!roadmap) return null;
  const entries = Object.entries(roadmap);
  
  return (
    <div style={{ marginBottom: "40px" }}>
      <p style={pdfStyles.sectionLabel}>Rencana Pengembangan Skill (5 Tahun)</p>
      <div style={{ display: "flex", gap: "12px" }}>
        {entries.map(([, skills], i) => (
          <div key={i} style={{ flex: 1, background: "#f8fafc", borderRadius: "12px", padding: "12px", border: "1px solid #e2e8f0" }}>
            <div style={{ width: "24px", height: "24px", background: "#8b5cf6", color: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "12px", marginBottom: "8px" }}>
              {i + 1}
            </div>
            <p style={{ fontSize: "10px", fontWeight: "700", color: "#8b5cf6", marginBottom: "6px", textTransform: "uppercase" }}>Tahun {i + 1}</p>
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {(Array.isArray(skills) ? skills : []).map((sk, j) => (
                <li key={j} style={{ fontSize: "10px", color: "#4b5563", marginBottom: "3px", paddingLeft: "8px", position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, top: "5px", width: "3px", height: "3px", borderRadius: "50%", background: "#8b5cf6", display: "inline-block" }} />
                  {sk}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function PdfFooter({ message }) {
  return (
    <div style={{ marginTop: "20px" }}>
      {message && (
        <div style={{ background: "#eff6ff", borderLeft: "4px solid #3b82f6", padding: "16px", borderRadius: "4px" }}>
          <p style={{ fontSize: "12px", color: "#1e40af", fontStyle: "italic", margin: 0 }}>"{message}"</p>
        </div>
      )}
      <p style={{ marginTop: "40px", fontSize: "9px", color: "#94a3b8", textAlign: "center" }}>
        Dibuat oleh Edutech AI Career Test · {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })}
      </p>
    </div>
  );
}

// ─── PDF DOWNLOAD HOOK ───────────────────────────────────────────────
function usePDFDownload(result) {
  const [downloading, setDownloading] = useState(false);
  const printRef = useRef(null);

  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);

    try {
      const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
        import("jspdf"),
        import("html2canvas"),
      ]);

      const element = printRef.current;
      if (!element) return;

      // Jadikan visible untuk capture
      element.style.display = "block";
      element.style.position = "fixed"; // Fixed agar tidak mengganggu flow
      element.style.top = "0";
      element.style.left = "-9999px"; // Sembunyikan horizontal

      // Tunggu render
      await new Promise(r => setTimeout(r, 500));

      const canvas = await html2canvas(element, {
        scale: 2, // High res
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        windowWidth: 794 // Paksa lebar canvas sesuai container
      });

      // Sembunyikan kembali
      element.style.display = "none";

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      // Logic Multi-halaman
      let yOffset = 0;
      while (yOffset < imgHeight) {
        if (yOffset > 0) pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, -yOffset, imgWidth, imgHeight);
        yOffset += pdfHeight;
      }

      const slug = (result.personalityType || "Hasil").replace(/\s+/g, "-");
      pdf.save(`Edutech-${slug}.pdf`);

    } catch (err) {
      console.error(err);
      alert("Gagal membuat PDF.");
    } finally {
      setDownloading(false);
    }
  };

  return { downloading, handleDownload, printRef };
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────
export default function ResultPage({ result, onRetry }) {
  const [roadmapOpen, setRoadmapOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const navigate = useNavigate();
  const { downloading, handleDownload, printRef } = usePDFDownload(result);
  
  const PersonalityIcon = getPersonalityIcon(result.personalityType);
  const avatarUrl = getAvatarUrl(result.personalityType || "default");

  if (selectedCareer) {
    return <CareerDetailPage career={selectedCareer} onBack={() => { setSelectedCareer(null); window.scrollTo({ top: 0, behavior: "smooth" }); }} />;
  }

  const handleMajorClick = (majorName) => {
    const slug = majorName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    navigate(`/education/${slug}`);
  };

  return (
    <div className="pt-12 relative min-h-screen antialiased overflow-x-hidden bg-neutral-50 dark:bg-background text-slate-900 dark:text-white transition-colors duration-300">

      {/* CONTAINER UNTUK PDF (HIDDEN DI WEB) */}
      <div ref={printRef} style={{ display: "none" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&display=swap');
        `}</style>
        <div style={pdfStyles.container}>
          <PdfHeader result={result} />
          <PdfCareerSection careers={result.topCareers} />
          <div style={pdfStyles.divider} />
          <PdfSkillSection skills={result.skillGaps} />
          <div style={pdfStyles.divider} />
          <PdfMajorSection majors={result.recommendedMajors} />
          <div style={pdfStyles.divider} />
          <PdfUmkmSection items={result.umkmOpportunities} />
          <div style={pdfStyles.divider} />
          <PdfRoadmapSection roadmap={result.skillRoadmap} />
          <PdfFooter message={result.motivationalMessage} />
        </div>
      </div>

      {/* TAMPILAN WEB (NORMAL) */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 pt-14 pb-24">

        {/* HERO - DENGAN AVATAR */}
        <FadeUp delay={60} className="flex flex-col items-center text-center mb-16">
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-xl opacity-50 transition-opacity" />
            
            {/* AVATAR IMAGE (WEB ONLY) */}
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-neutral-800 shadow-lg">
              <img src={avatarUrl} alt={result.personalityType} className="w-full h-full object-cover bg-neutral-200 dark:bg-neutral-700" />
            </div>
          </div>
          
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold mb-5 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
            <HiCheckCircle className="w-3.5 h-3.5" /> Hasil Analisis AI
          </span>
          <h1 className="font-bold tracking-tight leading-tight mb-3 text-slate-900 dark:text-white" style={{ fontSize: "clamp(1.7rem,5vw,2.5rem)" }}>
            {result.personalityType}
          </h1>
          <p className="max-w-[440px] text-sm leading-relaxed text-slate-500 dark:text-white/45">
            {result.personalityDescription}
          </p>
        </FadeUp>

        {/* KONTEN WEB SEPERTI SEBELUMNYA... */}
        {/* (Saya ringkas pemanggilannya agar tidak memenuhi ruang, strukturnya sama persis dengan kode kamu yang lama) */}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Karir */}
          <FadeUp delay={120} className="col-span-2 row-span-2">
            <div className="bg-neutral-100/45 dark:bg-neutral-900/60 p-5 rounded-2xl">
              <SLabel>Peluang Karir Terbaik</SLabel>
              {result.topCareers?.map((c, i) => (
                <div key={i} className="mb-6">
                  <div className="flex gap-5 items-start">
                    <div className={`shrink-0 w-14 h-14 rounded-full flex flex-col items-center justify-center text-center ${i === 0 ? 'bg-blue-100 dark:bg-blue-500/20' : 'bg-neutral-100 dark:bg-white/5'}`}>
                      <span className={`text-base font-bold leading-none ${i === 0 ? 'text-blue-600 dark:text-blue-300' : 'text-slate-600 dark:text-white/40'}`}>{c.match}%</span>
                      <span className={`text-[9px] font-medium uppercase mt-0.5 ${i === 0 ? 'text-blue-500' : 'text-slate-400'}`}>cocok</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-base font-semibold text-slate-900 dark:text-white">{c.title}</span>
                        {i === 0 && <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">Top Pick</span>}
                      </div>
                      <p className="text-sm leading-relaxed mb-3 text-justify text-slate-500 dark:text-neutral-400">{c.description}</p>
                      <Bar pct={c.match} color={i === 0 ? "#3b82f6" : "#94a3b8"} delay={i * 80} />
                      <div className="flex flex-wrap gap-2 mt-3">
                        {c.avgSalary && <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg inline-flex items-center gap-1 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"><FaMoneyBill className="w-3 h-3" />{c.avgSalary}</span>}
                        {c.industryDemand && <span className="text-[11px] px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-white/5 text-slate-600 dark:text-white/40">Prospek kerja: {c.industryDemand}</span>}
                      </div>
                      <button onClick={() => { setSelectedCareer(c); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="mt-3 flex items-center gap-1.5 text-xs cursor-pointer transition-colors group/cta text-slate-400 dark:text-white/30 hover:text-blue-600 dark:hover:text-blue-400">
                        Lihat detail karir <HiArrowRight className="w-3 h-3 transition-transform group-hover/cta:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                  {i < (result.topCareers?.length ?? 0) - 1 && <div className="ml-17 my-6 h-px bg-neutral-200 dark:bg-white/5" />}
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Sidebar (Jurusan, UMKM, Roadmap) - Singkatnya saya tulis struktur ringkasnya */}
          <FadeUp delay={240}>
            <div className="grid grid-cols-1 gap-12">
              
              {/* Jurusan */}
              <div>
                <SLabel>Rekomendasi Jurusan</SLabel>
                <div className="space-y-7">
                  {result.recommendedMajors?.map((m, i) => (
                    <div key={i}>
                      <p className="text-sm font-semibold mb-1 text-slate-900 dark:text-white">{m.name}</p>
                      <p className="text-xs leading-relaxed mb-2.5 text-slate-500 dark:text-white/40">{m.reason}</p>
                      <div className="flex flex-wrap gap-1.5 mb-2.5">
                        {m.universities?.slice(0, 3).map((u, j) => <span key={j} className="text-[11px] px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300">{u}</span>)}
                      </div>
                      <button onClick={() => handleMajorClick(m.name)} className="flex items-center gap-1.5 text-[11px] cursor-pointer transition-colors group/edu text-slate-400 dark:text-white/30 hover:text-blue-600 dark:hover:text-blue-400">
                        <HiAcademicCap className="w-3.5 h-3.5" /> Lihat detail jurusan ini <HiExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* UMKM */}
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

              {/* Roadmap Web (Accordion) */}
              <FadeUp delay={300}>
                <button onClick={() => setRoadmapOpen(v => !v)} className="w-full flex items-center justify-between gap-4 px-5 py-4 rounded-2xl cursor-pointer transition-all duration-200 bg-neutral-100/45 dark:bg-white/[0.03] hover:bg-neutral-100 dark:hover:bg-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-violet-100 dark:bg-violet-500/10"><HiChartBar className="w-4 h-4 text-violet-600 dark:text-violet-400" /></div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Roadmap 5 tahun</p>
                      <p className="text-xs text-slate-500 dark:text-white/35">{roadmapOpen ? "Tutup" : "Klik untuk lihat rencana karir →"}</p>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-white dark:bg-white/5"><HiChevronDown className={`w-4 h-4 transition-transform duration-300 ${roadmapOpen ? "rotate-180" : ""} text-slate-500 dark:text-white/40`} /></div>
                </button>
                {roadmapOpen && result.skillRoadmap && (
                  <div className="mt-6 pl-2">
                    {Object.entries(result.skillRoadmap).map(([, skills], i, arr) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400">{i + 1}</div>
                          {i < arr.length - 1 && <div className="w-px flex-1 my-1.5 bg-neutral-200 dark:bg-white/5" />}
                        </div>
                        <div className={`pb-6 ${i === arr.length - 1 ? "pb-0" : ""}`}>
                          <p className="text-xs font-semibold mb-2 mt-0.5 text-violet-600 dark:text-violet-400">Tahun {i + 1}</p>
                          <ul className="space-y-1">
                            {(Array.isArray(skills) ? skills : []).map((sk, j) => (
                              <li key={j} className="flex items-start gap-2 text-xs leading-relaxed text-slate-500 dark:text-white/40"><span className="w-1 h-1 rounded-full shrink-0 mt-1.5 bg-slate-400 dark:bg-white/20" />{sk}</li>
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

        {/* Skill Gaps Web */}
        <FadeUp delay={180}>
          <SLabel>Skill yang Perlu Dikembangkan</SLabel>
          <p className="text-sm mb-6 text-slate-500 dark:text-white/38 -mt-4">Skill berikut direkomendasikan AI untuk mendukung karir terbaikmu.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.skillGaps?.map((s, i) => (
              <div key={i} className="group rounded-2xl transition-colors duration-200 p-5 bg-gray-100/40 dark:bg-white/[0.03] hover:bg-gray-100 dark:hover:bg-white/[0.05]">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <h4 className="text-slate-900 dark:text-white font-semibold text-base leading-snug">{s.skill}</h4>
                  <span className={`shrink-0 text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-lg ${s.targetLevel === "Penting" ? "bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400" : "bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400"}`}>{s.targetLevel}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">{s.howToLearn}</p>
              </div>
            ))}
          </div>
        </FadeUp>

        <Div />

        {/* Footer & Actions */}
        <FadeUp delay={360}>
          <div className="flex flex-col items-center text-center">
            {result.motivationalMessage && (
              <div className="relative max-w-[480px] w-full mb-10 px-6 py-5 rounded-xl bg-blue-50 dark:bg-white/[0.03] border-l-4 border-blue-500">
                <div className="flex gap-4 items-start text-left">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-amber-100 dark:bg-amber-500/10"><LuMessageCircleHeart className="w-4 h-4 text-amber-600 dark:text-amber-400" /></div>
                  <p className="text-sm leading-relaxed italic text-slate-600 dark:text-white/50">"{result.motivationalMessage}"</p>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button onClick={onRetry} className="group inline-flex items-center gap-2.5 p-4 rounded-xl text-sm font-semibold bg-neutral-100 dark:bg-white/5 text-slate-600 dark:text-white/40 hover:bg-neutral-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-all duration-300 active:scale-95 cursor-pointer">
                <HiRefresh className="w-4 h-4 transition-transform duration-500 group-hover:rotate-180" /> Ulangi Tes
              </button>
              <button onClick={handleDownload} disabled={downloading} className="inline-flex items-center gap-2 p-4 rounded-xl text-sm font-semibold bg-blue-600 dark:bg-blue-500/20 text-white dark:text-blue-300 hover:bg-blue-700 dark:hover:bg-blue-500/25 hover:text-white dark:hover:text-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 active:scale-95 group cursor-pointer">
                <HiDownload className={`w-4 h-4 transition-transform duration-300 ${downloading ? "animate-bounce" : "group-hover:translate-y-0.5"}`} />
                {downloading ? "Membuat PDF..." : "Download PDF"}
              </button>
            </div>
          </div>
        </FadeUp>

      </div>
    </div>
  );
}