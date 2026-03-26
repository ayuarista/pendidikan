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
import EducationDetailPage from "../../pages/explore/EducationDetailPage";

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

function getAvatarUrl(type) {
  const seed = type.replace(/\s+/g, "-");
  return `https://api.dicebear.com/6.x/avataaars/svg?seed=${seed}&backgroundColor=ede9fe`;
}

// ─── UI ATOMS ────────────────────────────────────────────────────────────────
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
  return (
    <div className={`transition-all duration-500 ease-out ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"} ${className}`}>
      {children}
    </div>
  );
}

function SLabel({ children }) {
  return <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-6 text-slate-500 dark:text-white/60">{children}</p>;
}

function Div() {
  return <div className="my-12 h-px bg-neutral-200 dark:bg-white/5" />;
}

// ─── PDF PRINT COMPONENT ─────────────────────────────────────────────────────
function PrintStyles() {
  return (
    <style>{`
      @media print {
        /* Reset & Base */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Montserrat', 'Segoe UI', system-ui, -apple-system, sans-serif;
          background: white;
          padding: 0;
          margin: 0;
        }
        
        /* Container utama print */
        .print-container {
          max-width: 794px;
          margin: 0 auto;
          padding: 60px 60px;
          background: white;
          color: #0f172a;
        }
        
        /* Header */
        .print-header {
          margin-bottom: 36px;
          padding-bottom: 24px;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .print-badge {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #7c3aed;
          margin-bottom: 12px;
        }
        
        .print-title {
          font-size: 32px;
          font-weight: 900;
          margin: 8px 0 12px;
          color: #0f172a;
          line-height: 1.2;
        }
        
        .print-description {
          font-size: 14px;
          line-height: 1.6;
          color: #64748b;
          max-width: 600px;
        }
        
        /* Section Label */
        .print-section-label {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #94a3b8;
          margin: 32px 0 16px 0;
        }
        
        /* Career Items */
        .print-career-item {
          display: flex;
          gap: 20px;
          margin-bottom: 24px;
        }
        
        .print-match-badge {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #ede9fe;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .print-match-percent {
          font-size: 16px;
          font-weight: 800;
          color: #7c3aed;
          line-height: 1;
        }
        
        .print-match-label {
          font-size: 8px;
          font-weight: 500;
          color: #7c3aed;
          margin-top: 2px;
        }
        
        .print-career-content {
          flex: 1;
        }
        
        .print-career-title {
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 6px;
        }
        
        .print-career-desc {
          font-size: 13px;
          line-height: 1.5;
          color: #64748b;
          margin-bottom: 10px;
        }
        
        .print-career-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        
        .print-salary-tag {
          font-size: 11px;
          font-weight: 600;
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          padding: 4px 10px;
          border-radius: 6px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        
        .print-demand-tag {
          font-size: 11px;
          background: #f1f5f9;
          color: #64748b;
          padding: 4px 10px;
          border-radius: 6px;
        }
        
        /* Skill Grid */
        .print-skill-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        
        .print-skill-card {
          background: #f8fafc;
          padding: 16px;
          border-radius: 12px;
        }
        
        .print-skill-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        
        .print-skill-name {
          font-size: 14px;
          font-weight: 700;
          color: #0f172a;
        }
        
        .print-skill-level {
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 20px;
        }
        
        .print-skill-desc {
          font-size: 12px;
          line-height: 1.5;
          color: #64748b;
        }
        
        /* Major Items */
        .print-major-item {
          margin-bottom: 20px;
        }
        
        .print-major-name {
          font-size: 15px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 6px;
        }
        
        .print-major-reason {
          font-size: 12px;
          line-height: 1.5;
          color: #64748b;
          margin-bottom: 8px;
        }
        
        .print-uni-tag {
          font-size: 10px;
          background: #ede9fe;
          color: #6d28d9;
          padding: 4px 10px;
          border-radius: 6px;
          display: inline-block;
          margin-right: 8px;
          margin-bottom: 4px;
        }
        
        /* UMKM Items */
        .print-umkm-item {
          margin-bottom: 16px;
        }
        
        .print-umkm-sector {
          font-size: 14px;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 4px;
        }
        
        .print-umkm-idea {
          font-size: 12px;
          line-height: 1.5;
          color: #64748b;
        }
        
        /* Roadmap */
        .print-roadmap-container {
          display: flex;
          gap: 12px;
        }
        
        .print-roadmap-year {
          flex: 1;
          background: #f8fafc;
          border-radius: 12px;
          padding: 14px;
        }
        
        .print-year-number {
          width: 28px;
          height: 28px;
          background: #7c3aed;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 800;
          margin-bottom: 12px;
        }
        
        .print-year-title {
          font-size: 11px;
          font-weight: 700;
          color: #7c3aed;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        
        .print-roadmap-skill {
          font-size: 10px;
          color: #4b5563;
          margin-bottom: 6px;
          padding-left: 12px;
          position: relative;
        }
        
        .print-roadmap-skill::before {
          content: "•";
          position: absolute;
          left: 0;
          color: #7c3aed;
        }
        
        /* Footer */
        .print-footer {
          margin-top: 48px;
          padding-top: 24px;
          border-top: 1px solid #e2e8f0;
        }
        
        .print-message {
          font-size: 13px;
          font-style: italic;
          color: #5b21b6;
          background: #ede9fe;
          padding: 16px 20px;
          border-radius: 12px;
          margin-bottom: 24px;
          text-align: center;
        }
        
        .print-credit {
          font-size: 9px;
          color: #94a3b8;
          text-align: center;
        }
        
        .print-divider {
          height: 1px;
          background: #e2e8f0;
          margin: 32px 0;
        }
        
        /* Hide non-print elements */
        .no-print {
          display: none;
        }
        
        /* Ensure proper page breaks */
        .print-page-break {
          page-break-before: avoid;
          page-break-after: avoid;
        }
      }
    `}</style>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function ResultPage({ result, onRetry }) {
  const [roadmapOpen, setRoadmapOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const navigate = useNavigate();

  const avatarUrl = getAvatarUrl(result?.personalityType || "default");

  const isDataReady =
    result &&
    result.personalityType &&
    Array.isArray(result.topCareers) &&
    result.topCareers.length > 0;

  const handleDownloadPDF = () => {
    if (downloading) return;
    setDownloading(true);

    try {
      // Buat hidden div untuk print
      const printDiv = document.createElement('div');
      printDiv.style.position = 'fixed';
      printDiv.style.top = '-9999px';
      printDiv.style.left = '-9999px';
      printDiv.innerHTML = `
        <div class="print-container">
          <!-- Header -->
          <div class="print-header">
            <div class="print-badge">AI CAREER TEST · EDUTECH</div>
            <h1 class="print-title">${escapeHtml(result.personalityType)}</h1>
            <div class="print-description">${escapeHtml(result.personalityDescription)}</div>
          </div>

          <!-- Careers -->
          <div class="print-section-label">Peluang Karir Terbaik</div>
          ${result.topCareers?.map(career => `
            <div class="print-career-item">
              <div class="print-match-badge">
                <div class="print-match-percent">${career.match}%</div>
                <div class="print-match-label">cocok</div>
              </div>
              <div class="print-career-content">
                <div class="print-career-title">${escapeHtml(career.title)}</div>
                <div class="print-career-desc">${escapeHtml(career.description)}</div>
                <div class="print-career-tags">
                  ${career.avgSalary ? `<span class="print-salary-tag">${escapeHtml(career.avgSalary)}</span>` : ''}
                  ${career.industryDemand ? `<span class="print-demand-tag">Prospek kerja: ${escapeHtml(career.industryDemand)}</span>` : ''}
                </div>
              </div>
            </div>
          `).join('')}

          <div class="print-divider"></div>

          <!-- Skills -->
          <div class="print-section-label">Skill yang Perlu Dikembangkan</div>
          <div class="print-skill-grid">
            ${result.skillGaps?.map(skill => `
              <div class="print-skill-card">
                <div class="print-skill-header">
                  <div class="print-skill-name">${escapeHtml(skill.skill)}</div>
                  <div class="print-skill-level" style="background: ${skill.targetLevel === 'Penting' ? '#fee2e2' : '#fef3c7'}; color: ${skill.targetLevel === 'Penting' ? '#b91c1c' : '#b45309'}">
                    ${escapeHtml(skill.targetLevel)}
                  </div>
                </div>
                <div class="print-skill-desc">${escapeHtml(skill.howToLearn)}</div>
              </div>
            `).join('')}
          </div>

          <div class="print-divider"></div>

          <!-- Majors -->
          <div class="print-section-label">Rekomendasi Jurusan Kuliah</div>
          ${result.recommendedMajors?.map(major => `
            <div class="print-major-item">
              <div class="print-major-name">${escapeHtml(major.name)}</div>
              <div class="print-major-reason">${escapeHtml(major.reason)}</div>
              <div>
                ${major.universities?.slice(0, 3).map(uni => `<span class="print-uni-tag">${escapeHtml(uni)}</span>`).join('')}
              </div>
            </div>
          `).join('')}

          <div class="print-divider"></div>

          <!-- UMKM -->
          <div class="print-section-label">Ide Wirausaha & UMKM</div>
          ${result.umkmOpportunities?.map(item => `
            <div class="print-umkm-item">
              <div class="print-umkm-sector">${escapeHtml(item.sector)}</div>
              <div class="print-umkm-idea">${escapeHtml(item.startupIdea)}</div>
            </div>
          `).join('')}

          <div class="print-divider"></div>

          <!-- Roadmap -->
          <div class="print-section-label">Rencana Pengembangan Skill (5 Tahun)</div>
          <div class="print-roadmap-container">
            ${Object.entries(result.skillRoadmap || {}).map(([year, skills], idx) => `
              <div class="print-roadmap-year">
                <div class="print-year-number">${idx + 1}</div>
                <div class="print-year-title">Tahun ${idx + 1}</div>
                ${(Array.isArray(skills) ? skills : []).slice(0, 4).map(skill => `
                  <div class="print-roadmap-skill">${escapeHtml(skill)}</div>
                `).join('')}
              </div>
            `).join('')}
          </div>

          <!-- Footer -->
          <div class="print-footer">
            ${result.motivationalMessage ? `
              <div class="print-message">
                "${escapeHtml(result.motivationalMessage)}"
              </div>
            ` : ''}
            <div class="print-credit">
              Dibuat oleh Edutech AI Career Test · ${new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })}
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(printDiv);

      // Buka jendela print
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Edutech - ${result.personalityType}</title>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
          <style>
            /* Copy all print styles here */
            ${getPrintStyles()}
          </style>
        </head>
        <body>
          ${printDiv.innerHTML}
        </body>
        </html>
      `);
      
      printWindow.document.close();
      
      // Tunggu font dan gambar load
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          setTimeout(() => {
            printWindow.close();
            document.body.removeChild(printDiv);
            setDownloading(false);
          }, 500);
        }, 500);
      };
      
    } catch (err) {
      console.error("PDF Error:", err);
      alert("Gagal membuat PDF: " + err.message);
      setDownloading(false);
    }
  };

  // Helper function untuk escape HTML
  const escapeHtml = (text) => {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  // Function untuk mendapatkan print styles
  const getPrintStyles = () => {
    return `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: 'Montserrat', 'Segoe UI', system-ui, -apple-system, sans-serif;
        background: white;
        padding: 0;
        margin: 0;
      }
      
      .print-container {
        max-width: 794px;
        margin: 0 auto;
        padding: 60px 60px;
        background: white;
        color: #0f172a;
      }
      
      .print-header {
        margin-bottom: 36px;
        padding-bottom: 24px;
        border-bottom: 1px solid #e2e8f0;
      }
      
      .print-badge {
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 1.5px;
        color: #7c3aed;
        margin-bottom: 12px;
      }
      
      .print-title {
        font-size: 32px;
        font-weight: 900;
        margin: 8px 0 12px;
        color: #0f172a;
        line-height: 1.2;
      }
      
      .print-description {
        font-size: 14px;
        line-height: 1.6;
        color: #64748b;
        max-width: 600px;
      }
      
      .print-section-label {
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        color: #94a3b8;
        margin: 32px 0 16px 0;
      }
      
      .print-career-item {
        display: flex;
        gap: 20px;
        margin-bottom: 24px;
      }
      
      .print-match-badge {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: #ede9fe;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      
      .print-match-percent {
        font-size: 16px;
        font-weight: 800;
        color: #7c3aed;
        line-height: 1;
      }
      
      .print-match-label {
        font-size: 8px;
        font-weight: 500;
        color: #7c3aed;
        margin-top: 2px;
      }
      
      .print-career-content {
        flex: 1;
      }
      
      .print-career-title {
        font-size: 16px;
        font-weight: 700;
        color: #0f172a;
        margin-bottom: 6px;
      }
      
      .print-career-desc {
        font-size: 13px;
        line-height: 1.5;
        color: #64748b;
        margin-bottom: 10px;
      }
      
      .print-career-tags {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      
      .print-salary-tag {
        font-size: 11px;
        font-weight: 600;
        background: rgba(16, 185, 129, 0.1);
        color: #10b981;
        padding: 4px 10px;
        border-radius: 6px;
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      
      .print-demand-tag {
        font-size: 11px;
        background: #f1f5f9;
        color: #64748b;
        padding: 4px 10px;
        border-radius: 6px;
      }
      
      .print-skill-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }
      
      .print-skill-card {
        background: #f8fafc;
        padding: 16px;
        border-radius: 12px;
      }
      
      .print-skill-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }
      
      .print-skill-name {
        font-size: 14px;
        font-weight: 700;
        color: #0f172a;
      }
      
      .print-skill-level {
        font-size: 9px;
        font-weight: 700;
        text-transform: uppercase;
        padding: 4px 10px;
        border-radius: 20px;
      }
      
      .print-skill-desc {
        font-size: 12px;
        line-height: 1.5;
        color: #64748b;
      }
      
      .print-major-item {
        margin-bottom: 20px;
      }
      
      .print-major-name {
        font-size: 15px;
        font-weight: 700;
        color: #0f172a;
        margin-bottom: 6px;
      }
      
      .print-major-reason {
        font-size: 12px;
        line-height: 1.5;
        color: #64748b;
        margin-bottom: 8px;
      }
      
      .print-uni-tag {
        font-size: 10px;
        background: #ede9fe;
        color: #6d28d9;
        padding: 4px 10px;
        border-radius: 6px;
        display: inline-block;
        margin-right: 8px;
        margin-bottom: 4px;
      }
      
      .print-umkm-item {
        margin-bottom: 16px;
      }
      
      .print-umkm-sector {
        font-size: 14px;
        font-weight: 600;
        color: #0f172a;
        margin-bottom: 4px;
      }
      
      .print-umkm-idea {
        font-size: 12px;
        line-height: 1.5;
        color: #64748b;
      }
      
      .print-roadmap-container {
        display: flex;
        gap: 12px;
      }
      
      .print-roadmap-year {
        flex: 1;
        background: #f8fafc;
        border-radius: 12px;
        padding: 14px;
      }
      
      .print-year-number {
        width: 28px;
        height: 28px;
        background: #7c3aed;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 800;
        margin-bottom: 12px;
      }
      
      .print-year-title {
        font-size: 11px;
        font-weight: 700;
        color: #7c3aed;
        text-transform: uppercase;
        margin-bottom: 10px;
      }
      
      .print-roadmap-skill {
        font-size: 10px;
        color: #4b5563;
        margin-bottom: 6px;
        padding-left: 12px;
        position: relative;
      }
      
      .print-roadmap-skill::before {
        content: "•";
        position: absolute;
        left: 0;
        color: #7c3aed;
      }
      
      .print-footer {
        margin-top: 48px;
        padding-top: 24px;
        border-top: 1px solid #e2e8f0;
      }
      
      .print-message {
        font-size: 13px;
        font-style: italic;
        color: #5b21b6;
        background: #ede9fe;
        padding: 16px 20px;
        border-radius: 12px;
        margin-bottom: 24px;
        text-align: center;
      }
      
      .print-credit {
        font-size: 9px;
        color: #94a3b8;
        text-align: center;
      }
      
      .print-divider {
        height: 1px;
        background: #e2e8f0;
        margin: 32px 0;
      }
      
      @media print {
        @page {
          size: A4;
          margin: 0;
        }
        body {
          margin: 0;
          padding: 0;
        }
      }
    `;
  };

  if (!isDataReady) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-neutral-50 dark:bg-background text-slate-900 dark:text-white">
        <HiSparkles className="w-8 h-8 text-violet-500 animate-pulse" />
        <p className="text-sm font-medium text-slate-500 dark:text-white/40">
          Data tidak tersedia. Silakan ulangi tes.
        </p>
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-neutral-100 dark:bg-white/5 text-slate-600 dark:text-white/40 hover:bg-neutral-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
        >
          <HiRefresh className="w-4 h-4" /> Ulangi Tes
        </button>
      </div>
    );
  }

  if (selectedCareer) {
    return (
      <CareerDetailPage
        career={selectedCareer}
        onBack={() => {
          setSelectedCareer(null);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    );
  }

  if (selectedMajor) {
    return (
      <EducationDetailPage
        major={selectedMajor}
        onBack={() => {
          setSelectedMajor(null);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    );
  }

  const handleMajorClick = (m) => {
    setSelectedMajor(m);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="pt-12 relative min-h-screen antialiased overflow-x-hidden bg-neutral-50 dark:bg-background text-slate-900 dark:text-white transition-colors duration-300">

      {/* WEB VIEW */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-5 lg:px-8 pt-10 sm:pt-14 pb-24">

        {/* HERO */}
        <FadeUp delay={60} className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full blur-xl opacity-50 transition-opacity" style={{ background: "rgba(124,58,237,0.2)" }} />
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-white dark:border-neutral-800 shadow-lg">
              <img
                src={avatarUrl}
                alt={result.personalityType}
                className="w-full h-full object-cover bg-violet-100 dark:bg-violet-900/30"
              />
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold mb-4 sm:mb-5 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
            <HiCheckCircle className="w-3.5 h-3.5" /> Hasil Analisis AI
          </span>
          <h1
            className="font-bold tracking-tight leading-tight mb-3 text-slate-900 dark:text-white"
            style={{ fontSize: "clamp(1.4rem, 5vw, 2.5rem)" }}
          >
            {result.personalityType}
          </h1>
          <p className="max-w-[440px] text-sm leading-relaxed text-slate-500 dark:text-white/45 px-2">
            {result.personalityDescription}
          </p>
        </FadeUp>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-12 sm:mb-16">

          {/* Karir — col-span-2 */}
          <FadeUp delay={120} className="md:col-span-2">
            <div className="bg-neutral-100/45 dark:bg-neutral-900/60 p-4 sm:p-5 rounded-2xl">
              <SLabel>Peluang Karir Terbaik</SLabel>
              {result.topCareers?.map((c, i) => (
                <div key={i} className="mb-6">
                  <div className="flex gap-3 sm:gap-5 items-start">
                    <div className={`shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex flex-col items-center justify-center text-center ${i === 0 ? "bg-violet-100 dark:bg-violet-500/20" : "bg-neutral-100 dark:bg-white/5"}`}>
                      <span className={`text-sm sm:text-base font-bold leading-none ${i === 0 ? "text-violet-600 dark:text-violet-300" : "text-slate-600 dark:text-white/40"}`}>
                        {c.match}%
                      </span>
                      <span className={`text-[9px] font-medium uppercase mt-0.5 ${i === 0 ? "text-violet-500" : "text-slate-400"}`}>
                        cocok
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">{c.title}</span>
                        {i === 0 && (
                          <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">
                            Top Pick
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed mb-3 text-justify text-slate-500 dark:text-neutral-400">
                        {c.description}
                      </p>
                      <Bar pct={c.match} color={i === 0 ? "#7c3aed" : "#94a3b8"} delay={i * 80} />
                      <div className="flex flex-wrap gap-2 mt-3">
                        {c.avgSalary && (
                          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg inline-flex items-center gap-1 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                            <FaMoneyBill className="w-3 h-3" />{c.avgSalary}
                          </span>
                        )}
                        {c.industryDemand && (
                          <span className="text-[11px] px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-white/5 text-slate-600 dark:text-white/40">
                            Prospek kerja: {c.industryDemand}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => { setSelectedCareer(c); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className="mt-3 flex items-center gap-1.5 text-xs cursor-pointer transition-colors group/cta text-slate-400 dark:text-white/30 hover:text-violet-600 dark:hover:text-violet-400"
                      >
                        Lihat detail karir <HiArrowRight className="w-3 h-3 transition-transform group-hover/cta:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                  {i < (result.topCareers?.length ?? 0) - 1 && (
                    <div className="mt-6 h-px bg-neutral-200 dark:bg-white/5" />
                  )}
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Sidebar */}
          <FadeUp delay={240}>
            <div className="grid grid-cols-1 gap-10 sm:gap-12">

              {/* Jurusan */}
              <div>
                <SLabel>Rekomendasi Jurusan</SLabel>
                <div className="space-y-6 sm:space-y-7">
                  {result.recommendedMajors?.map((m, i) => (
                    <div key={i}>
                      <p className="text-sm font-semibold mb-1 text-slate-900 dark:text-white">{m.name}</p>
                      <p className="text-xs leading-relaxed mb-2.5 text-slate-500 dark:text-white/40">{m.reason}</p>
                      <div className="flex flex-wrap gap-1.5 mb-2.5">
                        {m.universities?.slice(0, 3).map((u, j) => (
                          <span key={j} className="text-[11px] px-2 py-0.5 rounded-md bg-violet-100 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300">
                            {u}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => handleMajorClick(m)}
                        className="flex items-center gap-1.5 text-[11px] cursor-pointer transition-colors group/edu text-slate-400 dark:text-white/30 hover:text-violet-600 dark:hover:text-violet-400"
                      >
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

              {/* Roadmap Accordion */}
              <FadeUp delay={300}>
                <button
                  onClick={() => setRoadmapOpen((v) => !v)}
                  className="w-full flex items-center justify-between gap-4 px-4 sm:px-5 py-4 rounded-2xl cursor-pointer transition-all duration-200 bg-neutral-100/45 dark:bg-white/[0.03] hover:bg-neutral-100 dark:hover:bg-white/[0.06]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-violet-100 dark:bg-violet-500/10">
                      <HiChartBar className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Roadmap 5 tahun</p>
                      <p className="text-xs text-slate-500 dark:text-white/35">
                        {roadmapOpen ? "Tutup" : "Rencana Pengembangan Skill →"}
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

        {/* Skill Gaps */}
        <FadeUp delay={180}>
          <SLabel>Skill yang Perlu Dikembangkan</SLabel>
          <p className="text-xs sm:text-sm mb-6 text-slate-500 dark:text-white/38 -mt-4">
            Skill berikut direkomendasikan AI untuk mendukung karir terbaikmu.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {result.skillGaps?.map((s, i) => (
              <div
                key={i}
                className="group rounded-2xl transition-colors duration-200 p-4 sm:p-5 bg-gray-100/40 dark:bg-white/[0.03] hover:bg-gray-100 dark:hover:bg-white/[0.05]"
              >
                <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4">
                  <h4 className="text-slate-900 dark:text-white font-semibold text-sm sm:text-base leading-snug">{s.skill}</h4>
                  <span className={`shrink-0 text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-lg ${s.targetLevel === "Penting" ? "bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400" : "bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400"}`}>
                    {s.targetLevel}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">{s.howToLearn}</p>
              </div>
            ))}
          </div>
        </FadeUp>

        <Div />

        {/* Footer & Actions */}
        <FadeUp delay={360}>
          <div className="flex flex-col items-center text-center">
            {result.motivationalMessage && (
              <div className="relative max-w-[480px] w-full mb-10 px-5 sm:px-6 py-4 sm:py-5 rounded-xl bg-violet-50 dark:bg-white/[0.03] border-l-4 border-violet-500">
                <div className="flex gap-3 sm:gap-4 items-start text-left">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-violet-100 dark:bg-violet-500/10">
                    <LuMessageCircleHeart className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed italic text-slate-600 dark:text-white/50">
                    "{result.motivationalMessage}"
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={onRetry}
                className="group inline-flex items-center gap-2.5 p-4 rounded-xl text-sm font-semibold bg-neutral-100 dark:bg-white/5 text-slate-600 dark:text-white/40 hover:bg-neutral-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <HiRefresh className="w-4 h-4 transition-transform duration-500 group-hover:rotate-180" /> Ulangi Tes
              </button>
              <button
                onClick={handleDownloadPDF}
                disabled={downloading}
                className="inline-flex items-center gap-2 p-4 rounded-xl text-sm font-semibold bg-violet-600 dark:bg-violet-500/20 text-white dark:text-violet-300 hover:bg-violet-700 dark:hover:bg-violet-500/25 hover:text-white dark:hover:text-violet-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 active:scale-95 group cursor-pointer"
              >
                <HiDownload className={`w-4 h-4 transition-transform duration-300 ${downloading ? "animate-bounce" : "group-hover:translate-y-0.5"}`} />
                {downloading ? "Membuat hasil analisi..." : "Cetak hasil analisis"}
              </button>
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}