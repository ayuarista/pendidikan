import { useState, useRef, useCallback, useEffect } from "react";
import { HiArrowLeft, HiArrowRight, HiSparkles, HiCheckCircle } from "react-icons/hi";
import { QUESTIONS } from "../../config/aiConfig";

//aa
const TOTAL_BLOCKS = 5;

function groupByBlock() {
  const g = {};
  QUESTIONS.forEach((q) => {
    if (!g[q.block]) g[q.block] = { title: q.blockTitle, questions: [] };
    g[q.block].questions.push(q);
  });
  return g;
}

const categoryConfig = {
  minat: { label: "Minat", color: "violet" },
  kemampuan: { label: "Kemampuan", color: "blue" },
  kepribadian: { label: "Kepribadian", color: "emerald" },
  nilai: { label: "Nilai", color: "amber" },
  default: { label: "Lainnya", color: "rose" },
};

const colorMap = {
  violet: { badge: "text-violet-400 bg-violet-400/10 ring-violet-400/30", dot: "bg-violet-400" },
  blue: { badge: "text-blue-400 bg-blue-400/10 ring-blue-400/30", dot: "bg-blue-400" },
  emerald: { badge: "text-emerald-400 bg-emerald-400/10 ring-emerald-400/30", dot: "bg-emerald-400" },
  amber: { badge: "text-amber-400 bg-amber-400/10 ring-amber-400/30", dot: "bg-amber-400" },
  rose: { badge: "text-rose-400 bg-rose-400/10 ring-rose-400/30", dot: "bg-rose-400" },
};

export default function TestPage({ answers, onAnswer, onFinish }) {
  useEffect(() => {
    document.title = "Edutech - AI Career Test";
  }, []);
  const blocks = groupByBlock();
  const [currentBlock, setCurrentBlock] = useState(1);
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [anim, setAnim] = useState(null);
  const isNavigating = useRef(false);

  const blockData = blocks[currentBlock];
  const currentQ = blockData?.questions?.[currentQIdx];

  // Guard: jika data tidak tersedia, jangan render apa-apa
  if (!blockData || !currentQ) return null;

  const isAnswered = !!answers[currentQ.id];
  const isFirst = currentBlock === 1 && currentQIdx === 0;
  const isLast =
    currentBlock === TOTAL_BLOCKS &&
    currentQIdx === blockData.questions.length - 1;

  const totalAnswered = Object.keys(answers).length;
  const totalQuestions = QUESTIONS.length;
  const progress = (totalAnswered / totalQuestions) * 100;
  const soalGlobal = QUESTIONS.findIndex((q) => q.id === currentQ.id) + 1;

  const cat = categoryConfig[currentQ.category] || categoryConfig.default;
  const colors = colorMap[cat.color];

  const slide = (dir, cb) => {
    if (isNavigating.current) return;
    isNavigating.current = true;
    setAnim(dir);
    setTimeout(() => {
      cb();
      setAnim(null);
      isNavigating.current = false;
    }, 240);
  };

  const handleNext = () => {
    if (!isAnswered || isNavigating.current) return;
    if (currentQIdx < blockData.questions.length - 1) {
      slide("right", () => setCurrentQIdx((p) => p + 1));
    } else if (currentBlock < TOTAL_BLOCKS) {
      slide("right", () => {
        setCurrentBlock((p) => p + 1);
        setCurrentQIdx(0);
      });
    } else {
      onFinish();
    }
  };

  const handlePrev = () => {
    if (isNavigating.current) return;
    if (currentQIdx > 0) {
      slide("left", () => setCurrentQIdx((p) => p - 1));
    } else if (currentBlock > 1) {
      slide("left", () => {
        const pb = currentBlock - 1;
        setCurrentBlock(pb);
        setCurrentQIdx(blocks[pb].questions.length - 1);
      });
    }
  };

  const blockSteps = Object.entries(blocks).map(([k, v]) => ({
    key: Number(k),
    title: v.title,
    total: v.questions.length,
    answered: v.questions.filter((q) => answers[q.id]).length,
  }));

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 transition-colors duration-300 selection:bg-violet-500/30">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        
        .test-root { font-family: 'DM Sans', sans-serif; }

        .slide-r { animation: slideR .24s cubic-bezier(.4,0,.2,1) both }
        .slide-l { animation: slideL .24s cubic-bezier(.4,0,.2,1) both }
        @keyframes slideR {
          from { opacity: 0; transform: translateX(32px) scale(.98); }
          to   { opacity: 1; transform: translateX(0)    scale(1); }
        }
        @keyframes slideL {
          from { opacity: 0; transform: translateX(-32px) scale(.98); }
          to   { opacity: 1; transform: translateX(0)     scale(1); }
        }

        .opt-btn {
          position: relative;
          overflow: hidden;
          transition: all .18s ease;
        }
        .opt-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          background: radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(139,92,246,.15) 0%, transparent 70%);
          transition: opacity .3s;
          pointer-events: none;
        }
        .opt-btn:hover::before { opacity: 1; }

        .progress-glow {
          box-shadow: 0 0 12px rgba(139,92,246,.5);
        }
        .dark .card-float {
          box-shadow:
            0 1px 3px rgba(0,0,0,.4),
            0 8px 32px rgba(0,0,0,.3),
            0 0 0 1px rgba(255,255,255,.05);
        }

        .next-btn {
          position: relative;
          overflow: hidden;
        }
        .next-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,.15) 0%, transparent 60%);
          pointer-events: none;
        }
        
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: .6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .pulse-ring {
          animation: pulse-ring 1.4s ease-out infinite;
        }
      `}</style>

      <div className="test-root pt-24 pb-16 px-4 sm:px-6 min-h-screen flex flex-col">

        {/* ── STICKY HEADER ── */}
        <header className=" top-0 left-0 right-0 z-30 bg-neutral-100/80 dark:bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800/60">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-3">

            {/* Block breadcrumb */}
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <span className="font-display text-xs font-bold tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
                  Bagian
                </span>
                <div className="flex items-center gap-1">
                  {blockSteps.map((b) => (
                    <div key={b.key} className="flex items-center gap-1">
                      <div className={`relative w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${b.key === currentBlock
                        ? "bg-violet-500 text-white scale-110"
                        : b.answered === b.total
                          ? "bg-violet-500/20 text-violet-400 dark:text-violet-400"
                          : "bg-neutral-200 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-600"
                        }`}>
                        {b.key}
                        {b.key === currentBlock && (
                          <span className="absolute inset-0 rounded-md bg-violet-500 pulse-ring" />
                        )}
                      </div>
                      {b.key < TOTAL_BLOCKS && (
                        <div className={`w-3 h-px transition-colors ${b.answered === b.total ? "bg-violet-400" : "bg-neutral-300 dark:bg-neutral-700"
                          }`} />
                      )}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-violet-500 dark:text-violet-400 font-semibold ml-1 hidden sm:block">
                  {blockData.title}
                </span>
              </div>
              <span className="text-xs text-neutral-400 dark:text-neutral-600 tabular-nums">
                {totalAnswered}
                <span className="text-neutral-300 dark:text-neutral-700">/</span>
                {totalQuestions} soal
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 progress-glow"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #7c3aed, #8b5cf6, #a78bfa)",
                }}
              />
            </div>
          </div>
        </header>

        {/* ── QUESTION AREA ── */}
        <main className="pt-5 flex-1 flex items-center justify-center">
          <div className="w-full max-w-2xl">

            {/* Card */}
            <div className={`bg-white dark:bg-neutral-900 rounded-2xl sm:rounded-3xl p-5 sm:p-7 card-float transition-colors ${anim === "right" ? "slide-r" : anim === "left" ? "slide-l" : ""
              }`}>

              {/* Category badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ring-1 ${colors.badge}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                  {cat.label}
                </span>
                <span className="text-xs text-neutral-400 dark:text-neutral-600">
                  {soalGlobal} dari {totalQuestions}
                </span>
              </div>

              {/* Question text */}
              <h2 className="font-display font-bold text-neutral-800 dark:text-neutral-50 leading-snug mb-6 transition-colors"
                style={{ fontSize: "clamp(1.1rem, 3.5vw, 1.45rem)" }}>
                {currentQ.question}
              </h2>

              {/* Options */}
              <div className="flex flex-col gap-2">
                {currentQ.options.map((opt, i) => {
                  const sel = answers[currentQ.id] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => onAnswer(currentQ.id, opt.value)}
                      className={`opt-btn text-left p-3.5 sm:p-4 rounded-xl border-2 transition-all duration-150 ${sel
                        ? "border-violet-500 bg-violet-50 dark:bg-violet-500/10 text-violet-900 dark:text-violet-100"
                        : "border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 text-neutral-600 dark:text-neutral-400 hover:border-violet-300 dark:hover:border-violet-500/40 hover:text-neutral-900 dark:hover:text-neutral-200"
                        }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5 transition-all ${sel
                          ? "bg-violet-500 text-white shadow-lg shadow-violet-500/30"
                          : "bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400"
                          }`}>
                          {opt.value}
                        </span>
                        <span className="text-sm sm:text-base leading-relaxed flex-1 font-medium">
                          {opt.label}
                        </span>
                        {sel && (
                          <HiCheckCircle className="w-5 h-5 text-violet-500 flex-shrink-0 mt-0.5 animate-[fadeIn_.15s_ease]" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-2.5 mt-4">
              {!isFirst && (
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-1.5 px-5 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-white dark:hover:bg-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all text-sm font-semibold"
                >
                  <HiArrowLeft className="w-4 h-4" />
                  Balik
                </button>
              )}

              <button
                onClick={handleNext}
                disabled={!isAnswered}
                className={`next-btn flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${isAnswered
                  ? "bg-violet-600 hover:bg-violet-500 active:scale-[.98] text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
                  : "bg-neutral-200 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-600 cursor-not-allowed"
                  }`}
              >
                {isLast ? (
                  <>
                    <HiSparkles className="w-4 h-4" />
                    Analisis dengan AI
                  </>
                ) : (
                  <>
                    Lanjut
                    <HiArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Tip text */}
            {!isAnswered && (
              <p className="text-center text-xs text-neutral-400 dark:text-neutral-600 mt-3 font-medium">
                Pilih salah satu jawaban untuk melanjutkan
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}