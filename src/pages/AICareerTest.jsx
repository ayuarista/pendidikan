import { useState, useEffect } from "react";
import IntroPage from "../components/CareerTest/IntroPage";
import TestPage from "../components/CareerTest/TestPage";
import LoadingPage from "../components/CareerTest/LoadingPage";
import ResultPage from "../components/CareerTest/ResultPage";
import { QUESTIONS, buildAnalysisPrompt } from "../config/aiConfig";
import { analyzeCareerWithAI } from "../services/openRouterService";

export default function AICareerTest() {
    useEffect(() => {
    document.title = "Edutech - AI Career Analysis";
  }, []);
  
  const [step, setStep] = useState("intro"); 
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnswer = (id, value) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  const handleFinish = async () => {
    setStep("loading");
    setError(null);

    const formatted = QUESTIONS.map((q) => {
      const sel = q.options.find((o) => o.value === answers[q.id]);
      return `Q${q.id} [${q.category}]: ${q.question}\nJawab: ${sel?.label || "-"}`;
    }).join("\n\n");

    try {
      const res = await analyzeCareerWithAI(buildAnalysisPrompt(formatted));
      setResult(res);
      setStep("result");
    } catch (e) {
      setError(e.message);
      setStep("test");
    }
  };

  const handleRetry = () => {
    setStep("intro");
    setAnswers({});
    setResult(null);
    setError(null);
  };

  return (
    <>
      {error && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-red-500 text-white text-sm px-5 py-3 rounded-xl shadow-xl max-w-sm text-center">
          ⚠️ {error}
        </div>
      )}

      {step === "intro"   && <IntroPage   onStart={() => setStep("test")} />}
      {step === "test"    && <TestPage    answers={answers} onAnswer={handleAnswer} onFinish={handleFinish} />}
      {step === "loading" && <LoadingPage />}
      {step === "result"  && result && <ResultPage result={result} onRetry={handleRetry} />}
    </>
  );
}