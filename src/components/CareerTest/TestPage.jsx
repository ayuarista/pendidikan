import { useState, useRef } from "react";
import { HiArrowLeft, HiArrowRight, HiSparkles, HiCheckCircle } from "react-icons/hi";
import { QUESTIONS } from "../../config/aiConfig";

const TOTAL_BLOCKS = 5;

function groupByBlock() {
  const g = {};
  QUESTIONS.forEach((q) => {
    if (!g[q.block]) g[q.block] = { title: q.blockTitle, questions: [] };
    g[q.block].questions.push(q);
  });
  return g;
}

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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <style>{`
        .slide-r { animation: slideR .22s ease both }
        .slide-l { animation: slideL .22s ease both }
        @keyframes slideR { from{opacity:0;transform:translateX(28px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideL { from{opacity:0;transform:translateX(-28px)} to{opacity:1;transform:translateX(0)} }
      `}</style>

      {/* ── TOP BAR ── */}
      <div className="pt-30  top-0 backdrop-blur-md border-b border-slate-800/60 px-5 py-3">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">
              Bagian <span className="text-white">{currentBlock}</span>/{TOTAL_BLOCKS}
              <span className="mx-2 text-slate-700">·</span>
              <span className="text-blue-400">{blockData.title}</span>
            </span>
            <span className="text-xs text-slate-600">{totalAnswered}/{totalQuestions} dijawab</span>
          </div>
          {/* Progress */}
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-secondary to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
      {/* QUESTION  */}
      <div className="mt-10 flex items-center justify-center px-5">
        <div className="w-full max-w-2xl">
          <div className={anim === "right" ? "slide-r" : anim === "left" ? "slide-l" : ""}>

            {/* Question number + category */}
            <div className="flex items-center gap-2 mb-5">
              <span className="text-xs font-bold text-slate-600 tabular-nums">
                {String(soalGlobal).padStart(2, "0")}/{totalQuestions}
              </span>
              <div className="w-px h-3 bg-slate-700" />
              <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border"
                style={{
                  color: currentQ.category === "minat" ? "#60a5fa" :
                         currentQ.category === "kemampuan" ? "#a78bfa" :
                         currentQ.category === "kepribadian" ? "#34d399" :
                         currentQ.category === "nilai" ? "#fbbf24" : "#fb923c",
                  background: currentQ.category === "minat" ? "rgba(96,165,250,.1)" :
                              currentQ.category === "kemampuan" ? "rgba(167,139,250,.1)" :
                              currentQ.category === "kepribadian" ? "rgba(52,211,153,.1)" :
                              currentQ.category === "nilai" ? "rgba(251,191,36,.1)" : "rgba(251,146,60,.1)",
                  borderColor: currentQ.category === "minat" ? "rgba(96,165,250,.25)" :
                               currentQ.category === "kemampuan" ? "rgba(167,139,250,.25)" :
                               currentQ.category === "kepribadian" ? "rgba(52,211,153,.25)" :
                               currentQ.category === "nilai" ? "rgba(251,191,36,.25)" : "rgba(251,146,60,.25)",
                }}>
                {currentQ.category}
              </span>
            </div>

            {/* Question text */}
            <h2 className="text-white font-bold mb-6 leading-snug"
              style={{ fontSize: "clamp(1.15rem,3.5vw,1.5rem)" }}>
              {currentQ.question}
            </h2>

            {/* Options — 1 col mobile, 2 col desktop */}
            <div className="grid grid-cols-1 gap-2.5">
              {currentQ.options.map((opt) => {
                const sel = answers[currentQ.id] === opt.value;
                return (
                  <button key={opt.value} onClick={() => onAnswer(currentQ.id, opt.value)}
                    className={`text-left p-4 rounded-xl border-2 transition-all duration-150 group ${
                      sel
                        ? "border-blue-500 bg-blue-500/12 text-white"
                        : "border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-600 hover:text-white hover:bg-slate-900"
                    }`}>
                    <div className="flex items-start gap-3">
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5 transition-all ${
                        sel ? "bg-blue-500 text-white" : "bg-slate-800 text-slate-500 group-hover:bg-slate-700"
                      }`}>{opt.value}</span>
                      <span className="text-sm leading-relaxed flex-1">{opt.label}</span>
                      {sel && <HiCheckCircle className="w-4.5 h-4.5 text-blue-400 flex-shrink-0 mt-0.5" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* NAV BUTTONS */}
          <div className="flex gap-2.5 mt-7">
            {!isFirst && (
              <button onClick={handlePrev}
                className="flex items-center gap-1.5 px-5 py-3 border border-slate-800 text-slate-500 rounded-xl hover:border-slate-600 hover:text-white transition-all text-sm font-medium">
                <HiArrowLeft className="w-4 h-4" /> Balik
              </button>
            )}
            <button onClick={handleNext} disabled={!isAnswered}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                isAnswered
                  ? "bg-blue-500 hover:bg-blue-400 text-white hover:shadow-xl hover:shadow-blue-500/25 active:scale-95"
                  : "bg-slate-900 border border-slate-800 text-slate-700 cursor-not-allowed"
              }`}>
              {isLast ? (<><HiSparkles className="w-4 h-4" /> Analisis dengan AI</>) : (<>Lanjut <HiArrowRight className="w-4 h-4" /></>)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}