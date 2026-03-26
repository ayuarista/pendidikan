import { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getMajorBySlug, getMajorByName, buildMajorFallback, DEMAND_LEVEL } from "../../data/educationData"; // Adjust path as needed
import { HiArrowLeft, HiLightBulb, HiBriefcase } from "react-icons/hi";

const TIP_COLORS = ["#f59e0b", "#8b5cf6", "#10b981"];

// ─── Atoms ────────────────────────────────────────────────────────────────────
const SLabel = ({ children }) => (
  <p className="text-[10px] font-bold uppercase tracking-[0.14em] mb-3 text-neutral-400 dark:text-white/30">
    {children}
  </p>
);

const Divider = () => (
  <div className="h-px my-6 bg-neutral-200 dark:bg-white/[0.06]" />
);

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function EducationDetailPage({ major: majorProp, onBack }) {
  const { slug } = useParams() || {};
  const navigate = useNavigate?.() || null;
  const location = useLocation?.() || null;
  const locationState = location?.state || {};
  const fallbackSource = majorProp || locationState.majorFallback || null;

  // 1. Coba dari DB via slug
  // 2. Kalau ada majorProp (dari AI test), coba cari di DB by name dulu
  // 3. Kalau tidak ketemu di DB tapi ada majorProp → buildMajorFallback
  // 4. Kalau tidak ada sama sekali → null (tampil not found)
  const fromDb = getMajorBySlug(slug) || (fallbackSource ? getMajorByName(fallbackSource.name) : null);
  const d = fromDb || (fallbackSource ? buildMajorFallback(fallbackSource) : null);

  const demand = d ? (DEMAND_LEVEL[d.demand] || DEMAND_LEVEL["Sedang"]) : null;

  useEffect(() => {
    const prevTitle = document.title;
    if (d?.name) {
      document.title = `${d.name} | Karir AI`;
    } else {
      document.title = "Detail Jurusan | Karir AI";
    }

    // Cleanup: restore title on unmount
    return () => { document.title = prevTitle; };
  }, [d]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  // ─── Navigation Logic ──────────────────────────────────────────────────────
  const handleBack = () => {
    if (onBack) { onBack(); return; }

    // Baca dari sessionStorage sebagai fallback kalau state hilang
    const from = location?.state?.from || sessionStorage.getItem("edu_detail_from");
    sessionStorage.removeItem("edu_detail_from"); // cleanup

    if (from === "ai-career-test") {
      navigate(-1);
    } else {
      navigate("/explore-education");
    }
  };

  if (!d) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5 px-4
        bg-neutral-50 dark:bg-background">

        <style>{`
          @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
          .fu { animation: fadeUp .4s ease both; }
        `}</style>

        <div className="fu text-center">
          {/* icon */}
          <div className="size-14 rounded-2xl mx-auto mb-5 flex items-center justify-center
            bg-neutral-100 dark:bg-white/[0.04]">
            <HiBriefcase className="size-6 text-neutral-300 dark:text-white/15" />
          </div>

          <h2 className="text-lg font-bold mb-2 text-neutral-900 dark:text-white">
            Jurusan tidak ditemukan
          </h2>
          <p className="text-sm text-neutral-500 dark:text-white/35 mb-1 max-w-xs mx-auto leading-relaxed">
            Jurusan yang kamu cari belum tersedia di database kami, atau nama jurusan tidak cocok.
          </p>
          {slug && (
            <p className="text-xs text-neutral-400 dark:text-white/25 mb-6 font-mono">
              Slug: "{slug}"
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleBack}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
                cursor-pointer transition-colors
                bg-neutral-100 dark:bg-white/[0.05]
                text-neutral-600 dark:text-white/45
                hover:bg-neutral-200 dark:hover:bg-white/[0.09]
                hover:text-neutral-900 dark:hover:text-white"
            >

              <HiArrowLeft className="size-4" />
              Kembali
            </button>
            <button
              onClick={() => navigate?.("/explore-education")}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
                cursor-pointer transition-colors
                bg-neutral-900 dark:bg-white/[0.07]
                text-white dark:text-white/70
                hover:bg-neutral-700 dark:hover:bg-white/[0.11]"
            >
              Lihat semua jurusan
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-background text-neutral-900 dark:text-white">

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .fu  { animation: fadeUp .45s ease both; }
        .fu1 { animation: fadeUp .45s .06s ease both; }
        .fu2 { animation: fadeUp .45s .12s ease both; }
        .fu3 { animation: fadeUp .45s .18s ease both; }
        .fu4 { animation: fadeUp .45s .24s ease both; }
        .fu5 { animation: fadeUp .45s .30s ease both; }
      `}</style>

      {/* ── Hero ── */}
      <div className="relative overflow-hidden" style={{ height: 280 }}>
        {/* Hero Image */}
        {d.img && (
          <div className="absolute inset-0 z-0">
            <img
              src={d.img}
              alt={d.name}
              className="w-full h-full object-cover opacity-30 dark:opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>
        )}

        {/* Fallback gradient if no image */}
        {!d.img && (
          <>
            <div className="absolute inset-0 dark:hidden" style={{ background: `linear-gradient(135deg, ${d.accentColor}12 0%, #f5f5f5 100%)` }} />
            <div className="absolute inset-0 hidden dark:block" style={{ background: `linear-gradient(135deg, ${d.accentColor}18 0%, #0d0d0f 100%)` }} />
          </>
        )}

        {/* nav */}
        <div className="absolute top-0 left-0 right-0 z-20 pt-22 md:pt-24">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 flex items-center justify-between">
            <button
              onClick={handleBack}
              className="hover:cursor-pointer inline-flex items-center gap-1.5 rounded-full border border-black/65 bg-black/80 px-5 py-2.5 text-sm font-semibold text-white shadow-sm backdrop-blur-md transition-colors hover:bg-black/90 dark:border-white/65 dark:bg-white/85 dark:text-neutral-900 dark:hover:bg-white"
            >
              <HiArrowLeft className="size-4" /> Kembali
            </button>
            <span
              className="text-[11px] font-bold px-3 py-1.5 rounded-xl bg-white/80 dark:bg-black/50 backdrop-blur-md"
              style={{ color: d.accentColor }}
            >
              {d.degree}
            </span>
          </div>
        </div>

        {/* title */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-6 z-10">
          <div className="max-w-3xl mx-auto">
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5 text-neutral-200 dark:text-white/40">
              {d.category}
            </p>
            <h1
              className="font-bold leading-tight text-neutral-900 dark:text-white"
              style={{ fontSize: "clamp(1.8rem,5vw,2.8rem)", letterSpacing: "-0.025em" }}
            >
              {d.name}
            </h1>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-24">

        {/* tagline + badges */}
        <div className="fu mb-6">
          <p className="text-sm leading-relaxed mb-4 text-neutral-600 dark:text-white/50">
            {d.shortDesc}
          </p>
          <div className="flex flex-wrap gap-2">
            {demand && (

              <div
                className="inline-flex items-center text-[11px]"
              >
                <p className="text-neutral-400 dark:text-neutral-400">Prospek kerja:</p>
                <span className="font-semibold px-2.5 py-1 rounded-lg ml-1" style={{ color: demand.color, background: demand.bg }}>

                  {d.demand}
                </span>
              </div>
            )}
            {d.salaryRange && (
              <span
                className="inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-lg"
                style={{ color: "#10b981", background: "rgba(16,185,129,0.10)" }}
              >
                {d.salaryRange}
              </span>
            )}
          </div>
        </div>

        <Divider />

        {/* about */}
        <div className="fu1 mb-8">
          <SLabel>Tentang Jurusan Ini</SLabel>
          <p className="text-sm leading-relaxed text-neutral-600 dark:text-white/45">
            {d.about}
          </p>
        </div>

        {/* mata kuliah */}
        <div className="fu2 mb-8">
          <SLabel>Mata Kuliah Utama</SLabel>
          <div className="rounded-2xl overflow-hidden bg-white dark:bg-white/[0.03] border border-neutral-100 dark:border-white/[0.04]">
            {d.subjects.map((sub, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-4 py-3"
                style={{ borderBottom: i < d.subjects.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none" }}
              >
                <div
                  className="size-6 rounded-lg flex items-center justify-center shrink-0 text-[10px] font-bold border border-neutral-100 dark:border-white/[0.05]"
                  style={{ background: `${d.accentColor}10`, color: d.accentColor }}
                >
                  {i + 1}
                </div>
                <span className="text-sm text-neutral-700 dark:text-white/60">{sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* skills */}
        <div className="fu3 mb-8">
          <SLabel>Skill yang Dipelajari</SLabel>
          <div className="flex flex-wrap gap-2">
            {d.skills.map((s, i) => (
              <span
                key={i}
                className="text-xs font-medium px-3 py-1.5 rounded-lg border border-neutral-100 dark:border-white/[0.05] bg-neutral-50 dark:bg-white/[0.03] text-neutral-600 dark:text-white/50"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* prospek karir */}
        <div className="fu3 mb-8">
          <SLabel>Prospek Karir Setelah Lulus</SLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {d.careers.map((c, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-neutral-100 dark:border-white/[0.04] bg-white dark:bg-white/[0.02]"
              >
                <HiBriefcase className="size-3.5 shrink-0" style={{ color: d.accentColor }} />
                <span className="text-xs text-neutral-700 dark:text-white/60">{c}</span>
              </div>
            ))}
          </div>
        </div>

        {/* universitas */}
        {d.universities?.length > 0 && (
          <div className="fu4 mb-8">
            <SLabel>Universitas yang Menyediakan</SLabel>
            <div className="flex flex-wrap gap-2">
              {d.universities.map((u, i) => (
                <span
                  key={i}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg border border-neutral-100 dark:border-white/[0.05] bg-neutral-50 dark:bg-white/[0.03] text-neutral-600 dark:text-white/50"
                >
                  {u}
                </span>
              ))}
            </div>
            <p className="text-[11px] mt-3 text-neutral-400 dark:text-white/25">
              * Hanya sebagian contoh. Masih banyak universitas lain yang membuka jurusan ini.
            </p>
          </div>
        )}

        {/* tips */}
        <div className="fu5 mb-8">
          <SLabel>Tips Memilih & Masuk Jurusan Ini</SLabel>
          <div className="space-y-2">
            {(d.tips || [
              `Pastikan kamu memang tertarik dengan mata kuliah inti — ${d.subjects?.[0]} dan ${d.subjects?.[1]} adalah fondasi utama.`,
              `Cari tahu akreditasi program studi di universitas pilihanmu — akreditasi Unggul membuka lebih banyak peluang.`,
              `Ikuti komunitas mahasiswa jurusan ini di media sosial untuk gambaran nyata kehidupan perkuliahan.`,
            ]).map((tip, i) => (
              <div
                key={i}
                className="rounded-xl px-4 py-3.5 flex items-start gap-3 bg-white dark:bg-white/[0.03] border border-neutral-100 dark:border-white/[0.04]"
                style={{ borderLeft: `3px solid ${TIP_COLORS[i % TIP_COLORS.length]}` }}
              >
                <HiLightBulb
                  className="size-4 shrink-0 mt-0.5"
                  style={{ color: TIP_COLORS[i % TIP_COLORS.length] }}
                />
                <p className="text-sm leading-relaxed text-neutral-600 dark:text-white/45">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* back button */}
        <button
          onClick={handleBack}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl
            text-sm font-medium transition-all cursor-pointer
            bg-white dark:bg-white/[0.04] border border-neutral-100 dark:border-white/[0.05]
            text-neutral-400 dark:text-white/40
            hover:text-neutral-900 dark:hover:text-white hover:border-neutral-200 dark:hover:border-white/[0.1]"
        >
          <HiArrowLeft className="size-4" /> Kembali
        </button>
      </div>
    </div>
  );
}