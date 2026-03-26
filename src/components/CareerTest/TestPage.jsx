import { useState, useRef } from "react";
import { HiArrowLeft, HiArrowRight, HiSparkles, HiCheckCircle } from "react-icons/hi";
import { QUESTIONS } from "../../config/aiConfig";

//aa
const TOTAL_BLOCKS = 5;

// Helper untuk grouping soal
function groupByBlock() {
  const g = {};
  QUESTIONS.forEach((q) => {
    if (!g[q.block]) g[q.block] = { title: q.blockTitle, questions: [] };
    g[q.block].questions.push(q);
  });
  return g;
}

// Mapping warna kategori untuk Dark & Light mode
const categoryStyles = {
  minat: {
    dark: "text-blue-400 bg-blue-400/10 border-blue-400/25",
    light: "text-blue-700 bg-blue-100 border-blue-300"
  },
  kemampuan: {
    dark: "text-violet-400 bg-violet-400/10 border-violet-400/25",
    light: "text-violet-700 bg-violet-100 border-violet-300"
  },
  kepribadian: {
    dark: "text-emerald-400 bg-emerald-400/10 border-emerald-400/25",
    light: "text-emerald-700 bg-emerald-100 border-emerald-300"
  },
  nilai: {
    dark: "text-amber-400 bg-amber-400/10 border-amber-400/25",
    light: "text-amber-700 bg-amber-100 border-amber-300"
  },
  default: {
    dark: "text-orange-400 bg-orange-400/10 border-orange-400/25",
    light: "text-orange-700 bg-orange-100 border-orange-300"
  }
};

export default function TestPage({ answers, onAnswer, onFinish }) {
  const blocks = groupByBlock();
  const [currentBlock, setCurrentBlock] = useState(1);
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [anim, setAnim] = useState(null); // "right" | "left" | null

  const blockData = blocks[currentBlock];
  const currentQ = blockData.questions[currentQIdx];
  const isAnswered = !!answers[currentQ.id];
  const isFirst = currentBlock === 1 && currentQIdx === 0;
  const isLast = currentBlock === TOTAL_BLOCKS && currentQIdx === blockData.questions.length - 1;

  const totalAnswered = Object.keys(answers).length;
  const totalQuestions = QUESTIONS.length;
  const progress = (totalAnswered / totalQuestions) * 100;

  const slide = (dir, cb) => {
    setAnim(dir);
    setTimeout(() => { cb(); setAnim(null); }, 220);
  };

  const handleNext = () => {
    if (!isAnswered) return;
    if (currentQIdx < blockData.questions.length - 1) {
      slide("right", () => setCurrentQIdx((p) => p + 1));
    } else if (currentBlock < TOTAL_BLOCKS) {
      slide("right", () => { setCurrentBlock((p) => p + 1); setCurrentQIdx(0); });
    } else {
      onFinish();
    }
  };

  const handlePrev = () => {
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

  const soalGlobal = QUESTIONS.findIndex((q) => q.id === currentQ.id) + 1;
  
  // Ambil style kategori
  const catStyle = categoryStyles[currentQ.category] || categoryStyles.default;

  return (
    // Main Container: Dark = slate-950, Light = neutral-50
    <div className="pt-30 min-h-screen dark:bg-slate-950 bg-neutral-50 flex flex-col transition-colors duration-300">
      <style>{`
        .slide-r { animation: slideR .22s ease both }
        .slide-l { animation: slideL .22s ease both }
        @keyframes slideR { from{opacity:0;transform:translateX(28px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideL { from{opacity:0;transform:translateX(-28px)} to{opacity:1;transform:translateX(0)} }
      `}</style>

      {/* ── TOP BAR ── */}
      <div className="sticky top-0 z-20 backdrop-blur-md px-5 py-3 transition-colors">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold dark:text-slate-400 text-slate-500">
              Bagian <span className="dark:text-white text-slate-900 font-bold">{currentBlock}</span>/{TOTAL_BLOCKS}
              <span className="mx-2 dark:text-slate-700 text-slate-300">·</span>
              <span className="dark:text-blue-400 text-blue-600">{blockData.title}</span>
            </span>
            <span className="text-xs dark:text-slate-600 text-slate-400">{totalAnswered}/{totalQuestions} dijawab</span>
          </div>
          {/* Progress Bar */}
          <div className="h-1 dark:bg-slate-800 bg-neutral-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* QUESTION CONTAINER */}
      <div className="flex-1 flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-2xl">
          <div className={anim === "right" ? "slide-r" : anim === "left" ? "slide-l" : ""}>

            {/* Question Number + Category Badge */}
            <div className="flex items-center gap-2 mb-5">
              <span className="text-xs font-bold dark:text-slate-600 text-slate-400 tabular-nums">
                {String(soalGlobal).padStart(2, "0")}/{totalQuestions}
              </span>
              <div className="w-px h-3 dark:bg-slate-700 bg-slate-300" />
              <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${catStyle.dark} ${catStyle.light}`}>
                {currentQ.category}
              </span>
            </div>

            {/* Question Text */}
            <h2 className="dark:text-white text-slate-900 font-bold mb-6 leading-snug transition-colors"
              style={{ fontSize: "clamp(1.15rem,3.5vw,1.5rem)" }}>
              {currentQ.question}
            </h2>

            {/* Options Grid */}
            <div className="grid grid-cols-1 gap-2.5">
              {currentQ.options.map((opt) => {
                const sel = answers[currentQ.id] === opt.value;
                return (
                  <button key={opt.value} onClick={() => onAnswer(currentQ.id, opt.value)}
                    className={`text-left p-4 rounded-xl border-2 transition-all duration-150 group ${
                      sel
                        ? "border-blue-500 dark:bg-blue-500/15 bg-blue-50 dark:text-white text-blue-900"
                        : "dark:border-slate-800 border-neutral-200 dark:bg-slate-900/40 bg-white dark:text-slate-400 text-slate-600 dark:hover:border-slate-600 hover:border-neutral-300 dark:hover:text-white hover:text-slate-900 dark:hover:bg-slate-900 hover:bg-neutral-50"
                    }`}>
                    <div className="flex items-start gap-3">
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5 transition-all ${
                        sel 
                          ? "bg-blue-500 text-white" 
                          : "dark:bg-slate-800 bg-neutral-100 dark:text-slate-500 text-slate-500 group-hover:dark:bg-slate-700 group-hover:bg-neutral-200"
                      }`}>{opt.value}</span>
                      <span className="text-sm leading-relaxed flex-1">{opt.label}</span>
                      {sel && <HiCheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* NAVIGATION BUTTONS */}
          <div className="flex gap-2.5 mt-7">
            {!isFirst && (
              <button onClick={handlePrev}
                className="flex items-center gap-1.5 px-5 py-3 dark:border-slate-800 border-neutral-200 dark:text-slate-500 text-slate-600 rounded-xl dark:hover:border-slate-600 hover:border-neutral-300 dark:hover:text-white hover:text-slate-900 transition-all text-sm font-medium bg-transparent dark:bg-transparent hover:bg-neutral-100 dark:hover:bg-slate-800">
                <HiArrowLeft className="w-4 h-4" /> Balik
              </button>
            )}
            <button onClick={handleNext} disabled={!isAnswered}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                isAnswered
                  ? "bg-blue-600 hover:bg-blue-500 text-white hover:shadow-xl hover:shadow-blue-500/25 active:scale-95"
                  : "dark:bg-slate-900 bg-neutral-100 dark:border-slate-800 border border-neutral-200 dark:text-slate-700 text-slate-400 cursor-not-allowed"
              }`}>
              {isLast ? (<><HiSparkles className="w-4 h-4" /> Analisis dengan AI</>) : (<>Lanjut <HiArrowRight className="w-4 h-4" /></>)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}