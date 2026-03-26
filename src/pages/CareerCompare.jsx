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


function Selector({ selected, onSelect, exclude, label, accentColor }) {
  useEffect(() => {
    document.title = "Edutech - Career Comparison";
  }, []);
  const [open, setOpen] = useState(false);
  const cur = CAREERS.find((c) => c.id === selected);
  const available = CAREERS.filter((c) => c.id !== exclude);

  return (
    <div className="relative w-full">
      <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: COLORS.muted }}>{label}</label>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200"
        style={{
          background: cur ? accentColor.bg : "rgba(255,255,255,0.03)",
          border: `1px solid ${cur ? accentColor.solid : "rgba(255,255,255,0.08)"}`
        }}
      >
        <div className="flex items-center gap-3">
          {cur ? (
            <>
              <cur.icon className="w-5 h-5" style={{ color: accentColor.solid }} />
              <span className="font-semibold text-white">{cur.title}</span>
            </>
          ) : (
            <span className="text-zinc-500">Pilih profesi...</span>
          )}
        </div>
        <HiChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute z-20 top-full mt-2 w-full rounded-xl overflow-hidden shadow-2xl"
            style={{ background: "#1a1a1e", border: "1px solid rgba(255,255,255,0.1)" }}>
            {available.map(c => (
              <button
                key={c.id}
                onClick={() => { onSelect(c.id); setOpen(false); }}
                className="w-full flex items-center gap-3 p-4 hover:bg-white/5 transition-colors text-left"
              >
                <c.icon className="w-5 h-5" style={{ color: accentColor.solid }} />
                <div>
                  <p className="text-white font-medium">{c.title}</p>
                  <p className="text-xs text-zinc-500">{c.tag}</p>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function SalaryBar({ label, value, pct, color }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(pct), 300); return () => clearTimeout(t); }, [pct]);

  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs text-zinc-400">{label}</span>
        <span className="text-xs font-mono text-white">Rp {value}jt</span>
      </div>
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${w}%`, background: color }} />
      </div>
    </div>
  );
}

// ─── MAIN VIEW ─────────────────────────────────────────────────

export default function CareerCompare() {
  const [careerA, setCareerA] = useState("");
  const [careerB, setCareerB] = useState("");

  const A = CAREERS.find((c) => c.id === careerA);
  const B = CAREERS.find((c) => c.id === careerB);

  const handleReset = () => {
    setCareerA("");
    setCareerB("");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-background pb-24 pt-20 px-4" style={{ background: COLORS.bg }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-accent font-black text-white mb-3">Career Comparison</h1>
          <p className="text-zinc-400 max-w-lg text-sm sm:text-[15px] mx-auto">
            Analisis mendalam untuk membantu Anda memilih jalur karir yang tepat.
          </p>
        </div>

        {/* Selectors */}
        <div className="flex flex-col md:flex-row items-stretch md:items-end gap-4 justify-center mb-12">
          <div className="w-full md:w-80">
            <Selector selected={careerA} onSelect={setCareerA} exclude={careerB} label="Profesi A" accentColor={COLORS.careerA} />
          </div>
          <div className="hidden md:flex w-10 h-10 rounded-full bg-white/5 border border-white/10 items-center justify-center text-xs font-bold text-zinc-500 self-center mb-0.5">
            VS
          </div>
          <div className="w-full md:w-80">
            <Selector selected={careerB} onSelect={setCareerB} exclude={careerA} label="Profesi B" accentColor={COLORS.careerB} />
          </div>
        </div>

        {/* Empty State */}
        {!A && !B && (
          <div className="text-center py-20 border border-dashed border-zinc-800 rounded-xl">
            <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mx-auto mb-4">
              <HiBriefcase className="w-8 h-8 text-zinc-700" />
            </div>
            <h3 className="text-white font-bold mb-1">Pilih Dua Profesi</h3>
            <p className="text-zinc-500 text-sm">Data perbandingan akan muncul di sini.</p>
          </div>
        )}

        {/* Result View */}
        {A && B && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

              {/* COLUMN A */}
              <div className="rounded-2xl p-6 space-y-6 transition-all duration-300" style={{ background: COLORS.careerA.bg, border: `1px solid ${COLORS.careerA.highlight}` }}>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl" style={{ background: COLORS.careerA.highlight }}>
                    <A.icon className="w-6 h-6" style={{ color: COLORS.careerA.solid }} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{A.title}</h2>
                    <p className="text-sm text-zinc-400">{A.tag}</p>
                  </div>
                </div>

                {/* Salary */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <HiCurrencyDollar className="w-4 h-4 text-zinc-500" />
                    <span className="text-xs font-bold text-zinc-500 uppercase">Potensi Penghasilan</span>
                  </div>
                  <SalaryBar label="Entry Level" value={A.salary.entry} pct={A.salary.entryPct} color={COLORS.careerA.solid} />
                  <SalaryBar label="Mid Level" value={A.salary.mid} pct={A.salary.midPct} color={COLORS.careerA.solid} />
                  <SalaryBar label="Senior" value={A.salary.senior} pct={A.salary.seniorPct} color={COLORS.careerA.solid} />
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-xl">
                    <p className="text-xs text-zinc-500 mb-1">Demand Industri</p>
                    <p className="text-xl font-bold text-white">{A.demandScore}%</p>
                    <p className="text-xs text-emerald-400">{A.demandLabel}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl">
                    <p className="text-xs text-zinc-500 mb-1">Tingkat Kesulitan</p>
                    <p className={`text-xl font-bold ${DIFFICULTY_MAP[A.difficulty]?.color || "text-white"}`}>
                      {DIFFICULTY_MAP[A.difficulty]?.label || A.difficulty}
                    </p>
                    <p className="text-xs text-zinc-500">{DIFFICULTY_MAP[A.difficulty]?.desc}</p>
                  </div>
                </div>

                {/* Pros & Cons */}
                <div className="space-y-4">
                  <div className="bg-white/5 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2 text-emerald-400">
                      <HiThumbUp className="w-4 h-4" /> <h4 className="text-xs font-bold uppercase">Kelebihan</h4>
                    </div>
                    <ul className="space-y-2">
                      {A.pros.map((p, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                          <HiCheck className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" /> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2 text-rose-400">
                      <HiThumbDown className="w-4 h-4" /> <h4 className="text-xs font-bold uppercase">Tantangan</h4>
                    </div>
                    <ul className="space-y-2">
                      {A.cons.map((c, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                          <HiX className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" /> {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* COLUMN B */}
              <div className="rounded-2xl p-6 space-y-6 transition-all duration-300" style={{ background: COLORS.careerB.bg, border: `1px solid ${COLORS.careerB.highlight}` }}>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl" style={{ background: COLORS.careerB.highlight }}>
                    <B.icon className="w-6 h-6" style={{ color: COLORS.careerB.solid }} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{B.title}</h2>
                    <p className="text-sm text-zinc-400">{B.tag}</p>
                  </div>
                </div>

                {/* Salary */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <HiCurrencyDollar className="w-4 h-4 text-zinc-500" />
                    <span className="text-xs font-bold text-zinc-500 uppercase">Potensi Penghasilan</span>
                  </div>
                  <SalaryBar label="Entry Level" value={B.salary.entry} pct={B.salary.entryPct} color={COLORS.careerB.solid} />
                  <SalaryBar label="Mid Level" value={B.salary.mid} pct={B.salary.midPct} color={COLORS.careerB.solid} />
                  <SalaryBar label="Senior" value={B.salary.senior} pct={B.salary.seniorPct} color={COLORS.careerB.solid} />
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-xl">
                    <p className="text-xs text-zinc-500 mb-1">Demand Industri</p>
                    <p className="text-xl font-bold text-white">{B.demandScore}%</p>
                    <p className="text-xs text-emerald-400">{B.demandLabel}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl">
                    <p className="text-xs text-zinc-500 mb-1">Tingkat Kesulitan</p>
                    <p className={`text-xl font-bold ${DIFFICULTY_MAP[B.difficulty]?.color || "text-white"}`}>
                      {DIFFICULTY_MAP[B.difficulty]?.label || B.difficulty}
                    </p>
                    <p className="text-xs text-zinc-500">{DIFFICULTY_MAP[B.difficulty]?.desc}</p>
                  </div>
                </div>

                {/* Pros & Cons */}
                <div className="space-y-4">
                  <div className="bg-white/5 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2 text-emerald-400">
                      <HiThumbUp className="w-4 h-4" /> <h4 className="text-xs font-bold uppercase">Kelebihan</h4>
                    </div>
                    <ul className="space-y-2">
                      {B.pros.map((p, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                          <HiCheck className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" /> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2 text-rose-400">
                      <HiThumbDown className="w-4 h-4" /> <h4 className="text-xs font-bold uppercase">Tantangan</h4>
                    </div>
                    <ul className="space-y-2">
                      {B.cons.map((c, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                          <HiX className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" /> {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM SECTION: SHARED INFO & ACTION */}
            <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-500/10 rounded text-amber-400 mt-0.5">
                    <HiLightBulb className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Kesimpulan</h4>
                    <p className="text-sm text-zinc-400 max-w-md">
                      Pilih <span style={{ color: COLORS.careerA.solid, fontWeight: 600 }}>{A.title}</span> jika kamu mengutamakan gaji dan tantangan teknis.
                      Pilih <span style={{ color: COLORS.careerB.solid, fontWeight: 600 }}>{B.title}</span> jika kamu lebih menyukai keseimbangan hidup dan kreativitas.
                    </p>
                  </div>
                </div>

                {/* RESET BUTTON */}
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-colors text-sm font-semibold text-white"
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