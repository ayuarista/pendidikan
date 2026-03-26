import { Link } from "react-router-dom";
import { HiArrowLeft, HiHome } from "react-icons/hi2";
import { useEffect } from "react";
import Image404 from "../assets/page404.png";

function PagesNotFound() {
  useEffect(() => {
    document.title = "404 - Halaman Tidak Ditemukan";
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white grid grid-cols-1 lg:grid-cols-2 relative overflow-hidden">
      
      {/* ── KIRI: VISUAL AREA (Hanya terlihat di Desktop/Tablet) ── */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-slate-900/40 relative border-r border-slate-800/50">
        
        {/* Decorative Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Main Image */}
        <div className="relative z-10 p-12 animate-fade-in">
          <img 
            src={Image404} 
            alt="404 Illustration" 
            className="w-full max-w-lg object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Watermark Text */}
        <div className="absolute bottom-10 left-10 text-[150px] font-black text-slate-800/20 select-none pointer-events-none leading-none">
          404
        </div>
      </div>

      {/* ── KANAN: CONTENT AREA ── */}
      <div className="flex flex-col items-center justify-center p-8 sm:p-12 relative z-10">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(#3b82f6 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

        <div className="w-full max-w-md text-center lg:text-left">
          
          {/* Mobile Image (Hanya terlihat di Mobile) */}
          <div className="block lg:hidden mb-8">
            <img 
              src={Image404} 
              alt="404 Illustration" 
              className="w-48 mx-auto drop-shadow-xl"
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-6 uppercase tracking-wider">
            Error 404
          </div>

          {/* Heading */}
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight tracking-tighter">
            Halaman <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Tidak Ditemukan</span>
          </h1>

          {/* Description */}
          <p className="text-slate-400 text-base leading-relaxed mb-10">
            Sepertinya kamu tersesat di ruang angkasa. Halaman yang kamu cari mungkin sudah dihapus, dipindahkan, atau tidak pernah ada sejak awal.
          </p>

          {/* Buttons Group */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Link
              to="/"
              className="hover:cursor-pointer inline-flex items-center justify-center gap-2 p-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 active:scale-95"
            >
              <HiHome className="w-5 h-5" />
              <span className="text-sm">Kembali ke Beranda</span>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 p-3 bg-transparent hover:bg-slate-800 text-slate-300 font-bold rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-200"
            >
              <HiArrowLeft className="w-5 h-5" />
              <span className="text-sm">Halaman Sebelumnya</span>
            </button>
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default PagesNotFound;