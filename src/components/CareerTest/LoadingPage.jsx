import { useState, useEffect } from "react";
import { HiSparkles } from "react-icons/hi";

//aa
const MESSAGES = [
  "Lagi baca profil kamu...",
  "Mencocokkan sama jawaban kamu...",
  "Membuat rekomendasi jurusan...",
  "Menyiapkan hasil rekomendasi...",
  "Hampir selesai nih...",
];

export default function LoadingPage() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % MESSAGES.length), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-8 p-6">
      <style>{`
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes fadeMsg { 0%{opacity:0;transform:translateY(8px)} 20%,80%{opacity:1;transform:translateY(0)} 100%{opacity:0} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.2} }
      `}</style>

      {/* Spinner stack */}
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500"
          style={{ animation: "spin 1s linear infinite" }} />
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-violet-500"
          style={{ animation: "spin 1.4s linear infinite reverse" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <HiSparkles className="w-7 h-7 text-blue-400" />
        </div>
      </div>

      <div className="text-center">
        <p key={idx} className="text-white font-bold text-lg mb-2"
            style={{ animation: "fadeMsg 2s ease both" }}>
            {MESSAGES[idx]}
        </p>
        <p className="text-slate-500 text-sm">Biasanya butuh 5–10 detik ya</p>
      </div>

      {/* Pulse dots */}
      <div className="flex gap-2">
        {[0, 0.3, 0.6].map((d, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-blue-500"
            style={{ animation: `blink 1.2s ease ${d}s infinite` }} />
        ))}
      </div>
    </div>
  );
}