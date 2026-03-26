import { useState, useEffect } from "react";
import {
  HiChartBar, HiSparkles, HiCheck, HiX,
  HiBriefcase, HiAcademicCap, HiLightBulb,
  HiTrendingUp, HiRefresh, HiCurrencyDollar,
  HiOfficeBuilding, HiChevronDown, HiClock,
  HiScale, HiThumbUp, HiThumbDown, HiInformationCircle
} from "react-icons/hi";
import { CAREERS } from "../data/ComparecareersData";

const COLORS = {
  bg: "#0f0f12",
  text: "#f0f0f0",
  muted: "#8b8b9e",

  careerA: {
    solid: "#818cf8", // Indigo
    bg: "rgba(129, 140, 248, 0.08)",
    highlight: "rgba(129, 140, 248, 0.15)"
  },
  careerB: {
    solid: "#34d399", // Emerald
    bg: "rgba(52, 211, 153, 0.08)",
    highlight: "rgba(52, 211, 153, 0.15)"
  },

  status: {
    pos: "#4ade80",
    neg: "#fb7185",
    neutral: "#fbbf24"
  }
};

const DIFFICULTY_MAP = {
  "Sangat Tinggi": { label: "Sangat Tinggi", desc: "Proses panjang & berat", color: "text-rose-400" },
  "Tinggi": { label: "Tinggi", desc: "Butuh dedikasi ekstra", color: "text-orange-400" },
  "Sedang": { label: "Sedang", desc: "Butuh waktu adaptasi", color: "text-amber-400" },
  "Rendah": { label: "Rendah", desc: "Mudah dipelajari", color: "text-emerald-400" },
};


function Selector({ selected, onSelect, exclude, label, accentColor, isDark }) {
  const [open, setOpen] = useState(false);
  const cur = CAREERS.find((c) => c.id === selected);
  const available = CAREERS.filter((c) => c.id !== exclude);

  return (
    <div className="relative w-full">
      <label
        className="block text-xs font-bold uppercase tracking-widest mb-2"
        style={{ color: isDark ? COLORS.muted : "#64748b" }}
      >
        {label}
      </label>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200"
        style={{
          background: cur
            ? accentColor.bg
            : isDark
              ? "rgba(255,255,255,0.03)"
              : "#ffffff",
          border: isDark
            ? `1px solid ${cur ? accentColor.solid : "rgba(255,255,255,0.08)"}`
            : "none",
        }}
      >
        <div className="flex items-center gap-3">
          {cur ? (
            <>
              <cur.icon className="w-5 h-5" style={{ color: accentColor.solid }} />
              <span className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{cur.title}</span>
            </>
          ) : (
            <span className={isDark ? "text-zinc-500" : "text-slate-500"}>Pilih profesi...</span>
          )}
        </div>
        <HiChevronDown className={`w-5 h-5 ${isDark ? "text-zinc-500" : "text-slate-500"} transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute z-20 top-full mt-2 w-full rounded-xl overflow-hidden shadow-2xl"
            style={{
              background: isDark ? "#1a1a1e" : "#ffffff",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "none",
            }}>
            {available.map(c => (
              <button
                key={c.id}
                onClick={() => { onSelect(c.id); setOpen(false); }}
                className={`w-full flex items-center gap-3 p-4 transition-colors text-left ${isDark ? "hover:bg-white/5" : "hover:bg-violet-50"}`}
              >
                <c.icon className="w-5 h-5" style={{ color: accentColor.solid }} />
                <div>
                  <p className={`font-medium ${isDark ? "text-white" : "text-slate-900"}`}>{c.title}</p>
                  <p className={`text-xs ${isDark ? "text-zinc-500" : "text-slate-500"}`}>{c.tag}</p>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function SalaryBar({ label, value, pct, color, isDark }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(pct), 300); return () => clearTimeout(t); }, [pct]);

  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1.5">
        <span className={`text-xs ${isDark ? "text-zinc-400" : "text-slate-500"}`}>{label}</span>
        <span className={`text-xs font-mono ${isDark ? "text-white" : "text-slate-900"}`}>Rp {value}jt</span>
      </div>
      <div className={`h-1 w-full rounded-full overflow-hidden ${isDark ? "bg-white/5" : "bg-slate-200"}`}>
        <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${w}%`, background: color }} />
      </div>
    </div>
  );
}

// ─── MAIN VIEW ─────────────────────────────────────────────────

export default function CareerCompare() {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));

  useEffect(() => {
    document.title = "Edutech - Perbandingan Karir";
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains("dark"));
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const [careerA, setCareerA] = useState("");
  const [careerB, setCareerB] = useState("");

  const A = CAREERS.find((c) => c.id === careerA);
  const B = CAREERS.find((c) => c.id === careerB);

  const handleReset = () => {
    setCareerA("");
    setCareerB("");
  };

  return (
    <div
      className="min-h-screen pb-24 pt-28 px-4 transition-colors duration-300"
      style={{ background: isDark ? COLORS.bg : "#fafafa" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-accent font-black mb-3 ${isDark ? "text-white" : "text-neutral-900"}`}>Perbandingan Karir</h1>
          <p className={`max-w-lg text-sm sm:text-[15px] mx-auto ${isDark ? "text-zinc-400" : "text-neutral-500"}`}>
            Analisis mendalam untuk membantu Anda memilih jalur karir yang tepat.
          </p>
        </div>

        {/* Selectors */}
        <div className="flex flex-col md:flex-row items-stretch md:items-end gap-4 justify-center mb-12">
          <div className="w-full md:w-80">
            <Selector selected={careerA} onSelect={setCareerA} exclude={careerB} label="Profesi A" accentColor={COLORS.careerA} isDark={isDark} />
          </div>
          <div className={`hidden md:flex w-10 h-10 rounded-full items-center justify-center text-xs font-bold self-center mb-0.5 ${isDark ? "bg-white/5 border border-white/10 text-zinc-500" : "bg-neutral-100 text-neutral-500"}`}>
            VS
          </div>
          <div className="w-full md:w-80">
            <Selector selected={careerB} onSelect={setCareerB} exclude={careerA} label="Profesi B" accentColor={COLORS.careerB} isDark={isDark} />
          </div>
        </div>

        {/* Empty State */}
        {!A && !B && (
          <div className={`text-center py-20 rounded-xl ${isDark ? "border border-dashed border-zinc-800" : "bg-white"}`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isDark ? "bg-zinc-900" : "bg-neutral-100"}`}>
              <HiBriefcase className={`w-8 h-8 ${isDark ? "text-zinc-700" : "text-neutral-400"}`} />
            </div>
            <h3 className={`font-bold mb-1 ${isDark ? "text-white" : "text-neutral-900"}`}>Pilih Dua Profesi</h3>
            <p className={`text-sm ${isDark ? "text-zinc-500" : "text-neutral-500"}`}>Data perbandingan akan muncul di sini.</p>
          </div>
        )}

        {/* Result View */}
        {A && B && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

              {/* COLUMN A */}
              <div className="rounded-2xl p-6 space-y-6 transition-all duration-300" style={{ background: COLORS.careerA.bg, border: isDark ? `1px solid ${COLORS.careerA.highlight}` : "none" }}>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl" style={{ background: COLORS.careerA.highlight }}>
                    <A.icon className="w-6 h-6" style={{ color: COLORS.careerA.solid }} />
                  </div>
                  <div>
                    <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-neutral-900"}`}>{A.title}</h2>
                    <p className={`text-sm ${isDark ? "text-zinc-400" : "text-neutral-500"}`}>{A.tag}</p>
                  </div>
                </div>

                {/* Salary */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <HiCurrencyDollar className={`w-4 h-4 ${isDark ? "text-zinc-500" : "text-neutral-500"}`} />
                    <span className={`text-xs font-bold uppercase ${isDark ? "text-zinc-500" : "text-neutral-500"}`}>Potensi Penghasilan</span>
                  </div>
                  <SalaryBar label="Entry Level" value={A.salary.entry} pct={A.salary.entryPct} color={COLORS.careerA.solid} isDark={isDark} />
                  <SalaryBar label="Mid Level" value={A.salary.mid} pct={A.salary.midPct} color={COLORS.careerA.solid} isDark={isDark} />
                  <SalaryBar label="Senior" value={A.salary.senior} pct={A.salary.seniorPct} color={COLORS.careerA.solid} isDark={isDark} />
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl ${isDark ? "bg-white/5" : "bg-gray-100/60"}`}>
                    <p className={`text-xs mb-1 ${isDark ? "text-zinc-500" : "text-neutral-500"}`}>Demand Industri</p>
                    <p className={`text-xl font-bold ${isDark ? "text-white" : "text-neutral-900"}`}>{A.demandScore}%</p>
                    <p className="text-xs text-emerald-400">{A.demandLabel}</p>
                  </div>
                  <div className={`p-4 rounded-xl ${isDark ? "bg-white/5" : "bg-gray-100/60"}`}>
                    <p className={`text-xs mb-1 ${isDark ? "text-zinc-500" : "text-neutral-500"}`}>Tingkat Kesulitan</p>
                    <p className={`text-xl font-bold ${DIFFICULTY_MAP[A.difficulty]?.color || "text-white"}`}>
                      {DIFFICULTY_MAP[A.difficulty]?.label || A.difficulty}
                    </p>
                    <p className={`text-xs ${isDark ? "text-zinc-500" : "text-neutral-500"}`}>{DIFFICULTY_MAP[A.difficulty]?.desc}</p>
                  </div>
                </div>

                {/* Pros & Cons */}
                <div className="space-y-4">
                  <div className={`p-4 rounded-xl ${isDark ? "bg-white/5" : "bg-gray-100/60"}`}>
                    <div className="flex items-center gap-2 mb-2 text-emerald-400">
                      <HiThumbUp className="w-4 h-4" /> <h4 className="text-xs font-bold uppercase">Kelebihan</h4>
                    </div>
                    <ul className="space-y-2">
                      {A.pros.map((p, i) => (
                        <li key={i} className={`flex items-start gap-2 text-sm ${isDark ? "text-zinc-300" : "text-neutral-700"}`}>
                          <HiCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`p-4 rounded-xl ${isDark ? "bg-white/5" : "bg-gray-100/60"}`}>
                    <div className="flex items-center gap-2 mb-2 text-rose-400">
                      <HiThumbDown className="w-4 h-4" /> <h4 className="text-xs font-bold uppercase">Tantangan</h4>
                    </div>
                    <ul className="space-y-2">
                      {A.cons.map((c, i) => (
                        <li key={i} className={`flex items-start gap-2 text-sm ${isDark ? "text-zinc-300" : "text-neutral-700"}`}>
                          <HiX className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" /> {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* COLUMN B */}
              <div className="rounded-2xl p-6 space-y-6 transition-all duration-300" style={{ background: COLORS.careerB.bg, border: isDark ? `1px solid ${COLORS.careerB.highlight}` : "none" }}>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl" style={{ background: COLORS.careerB.highlight }}>
                    <B.icon className="w-6 h-6" style={{ color: COLORS.careerB.solid }} />
                  </div>
                  <div>
                    <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-neutral-900"}`}>{B.title}</h2>
                    <p className={`text-sm ${isDark ? "text-zinc-400" : "text-neutral-500"}`}>{B.tag}</p>
                  </div>
                </div>

                {/* Salary */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <HiCurrencyDollar className={`w-4 h-4 ${isDark ? "text-zinc-500" : "text-neutral-500"}`} />
                    <span className={`text-xs font-bold uppercase ${isDark ? "text-zinc-500" : "text-neutral-500"}`}>Potensi Penghasilan</span>
                  </div>
                  <SalaryBar label="Entry Level" value={B.salary.entry} pct={B.salary.entryPct} color={COLORS.careerB.solid} isDark={isDark} />
                  <SalaryBar label="Mid Level" value={B.salary.mid} pct={B.salary.midPct} color={COLORS.careerB.solid} isDark={isDark} />
                  <SalaryBar label="Senior" value={B.salary.senior} pct={B.salary.seniorPct} color={COLORS.careerB.solid} isDark={isDark} />
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl ${isDark ? "bg-white/5" : "bg-gray-100/60"}`}>
                    <p className={`text-xs mb-1 ${isDark ? "text-zinc-500" : "text-neutral-500"}`}>Demand Industri</p>
                    <p className={`text-xl font-bold ${isDark ? "text-white" : "text-neutral-900"}`}>{B.demandScore}%</p>
                    <p className="text-xs text-emerald-400">{B.demandLabel}</p>
                  </div>
                  <div className={`p-4 rounded-xl ${isDark ? "bg-white/5" : "bg-gray-100/60"}`}>
                    <p className={`text-xs mb-1 ${isDark ? "text-zinc-500" : "text-neutral-500"}`}>Tingkat Kesulitan</p>
                    <p className={`text-xl font-bold ${DIFFICULTY_MAP[B.difficulty]?.color || "text-white"}`}>
                      {DIFFICULTY_MAP[B.difficulty]?.label || B.difficulty}
                    </p>
                    <p className={`text-xs ${isDark ? "text-zinc-500" : "text-neutral-500"}`}>{DIFFICULTY_MAP[B.difficulty]?.desc}</p>
                  </div>
                </div>

                {/* Pros & Cons */}
                <div className="space-y-4">
                  <div className={`p-4 rounded-xl ${isDark ? "bg-white/5" : "bg-gray-100/60"}`}>
                    <div className="flex items-center gap-2 mb-2 text-emerald-400">
                      <HiThumbUp className="w-4 h-4" /> <h4 className="text-xs font-bold uppercase">Kelebihan</h4>
                    </div>
                    <ul className="space-y-2">
                      {B.pros.map((p, i) => (
                        <li key={i} className={`flex items-start gap-2 text-sm ${isDark ? "text-zinc-300" : "text-neutral-700"}`}>
                          <HiCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`p-4 rounded-xl ${isDark ? "bg-white/5" : "bg-gray-100/60"}`}>
                    <div className="flex items-center gap-2 mb-2 text-rose-400">
                      <HiThumbDown className="w-4 h-4" /> <h4 className="text-xs font-bold uppercase">Tantangan</h4>
                    </div>
                    <ul className="space-y-2">
                      {B.cons.map((c, i) => (
                        <li key={i} className={`flex items-start gap-2 text-sm ${isDark ? "text-zinc-300" : "text-neutral-700"}`}>
                          <HiX className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" /> {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM SECTION: SHARED INFO & ACTION */}
            <div className={`rounded-2xl p-6 ${isDark ? "bg-zinc-900/50 border border-zinc-800" : "bg-white"}`}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-500/10 rounded text-amber-400 mt-0.5">
                    <HiLightBulb className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className={`font-bold mb-1 ${isDark ? "text-white" : "text-neutral-900"}`}>Kesimpulan</h4>
                    <p className={`text-sm max-w-md ${isDark ? "text-zinc-400" : "text-neutral-500"}`}>
                      Pilih <span style={{ color: COLORS.careerA.solid, fontWeight: 600 }}>{A.title}</span> jika kamu mengutamakan gaji dan tantangan teknis.
                      Pilih <span style={{ color: COLORS.careerB.solid, fontWeight: 600 }}>{B.title}</span> jika kamu lebih menyukai keseimbangan hidup dan kreativitas.
                    </p>
                  </div>
                </div>

                {/* RESET BUTTON */}
                <button
                  onClick={handleReset}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-colors text-sm font-semibold ${isDark ? "bg-zinc-800 hover:bg-zinc-700 text-white" : "bg-neutral-900 hover:bg-neutral-800 text-white"}`}
                >
                  <HiRefresh className="w-4 h-4" />
                  Reset Pilihan
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}