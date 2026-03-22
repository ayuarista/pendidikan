import { useEffect } from "react";
import {
  HiArrowLeft, HiLightBulb, HiOfficeBuilding,
  HiStar, HiCheck,
} from "react-icons/hi";

const C = {
  // Backgrounds
  page: "#0d0d0f",
  s1: "#111116",   // surface 1
  s2: "#15151b",   // surface 2
  s3: "#1a1a22",   // surface 3

  // Text
  hi: "#f9fafb",   // high emphasis
  md: "#9ca3af",   // medium
  lo: "#6b7280",   // low / muted
  rule: "rgba(255,255,255,0.05)",

  blue: { solid: "#3b82f6", dim: "rgba(59,130,246,0.10)", border: "rgba(59,130,246,0.20)" },
  violet: { solid: "#8b5cf6", dim: "rgba(139,92,246,0.10)", border: "rgba(139,92,246,0.18)" },
  emerald: { solid: "#10b981", dim: "rgba(16,185,129,0.10)", border: "rgba(16,185,129,0.20)" },
  amber: { solid: "#f59e0b", dim: "rgba(245,158,11,0.10)", border: "rgba(245,158,11,0.20)" },
  rose: { solid: "#f43f5e", dim: "rgba(244,63,94,0.10)", border: "rgba(244,63,94,0.20)" },
};

const IMG = {
  tech: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1400&q=75&fit=crop",
  design: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1400&q=75&fit=crop",
  marketing: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1400&q=75&fit=crop",
  data: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=75&fit=crop",
  content: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1400&q=75&fit=crop",
  business: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=75&fit=crop",
  default: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=75&fit=crop",
};

const DB = {
  "ui/ux designer": {
    img: IMG.design, field: "Desain & Teknologi",
    tagline: "Merancang pengalaman digital yang intuitif dan bermakna bagi setiap pengguna.",
    about: "UI/UX Designer memastikan produk digital terasa mudah dan menyenangkan digunakan. Pekerjaannya mencakup riset perilaku pengguna, pembuatan wireframe, prototipe interaktif, hingga desain visual akhir yang diserahkan ke tim engineering untuk dibangun.",
    daily: [
      { text: "Melakukan wawancara dan survei untuk memahami kebutuhan pengguna nyata" },
      { text: "Membuat wireframe, alur navigasi, dan prototipe interaktif" },
      { text: "Menguji desain ke pengguna dan menganalisis hasilnya" },
      { text: "Berkolaborasi dengan Product Manager dan Engineer setiap hari" },
      { text: "Menjaga dan mengembangkan design system produk" },
    ],
    tools: [
      { name: "Figma", use: "Desain UI & prototipe interaktif" },
      { name: "Maze / Hotjar", use: "Uji usabilitas & heatmap pengguna" },
      { name: "Miro", use: "Brainstorming & pemetaan user journey" },
      { name: "Notion", use: "Dokumentasi design system & riset" },
    ],
    path: [
      { level: "Junior Designer", dur: "0–1 tahun", salary: "Rp 4–7 jt", current: true },
      { level: "Mid Designer", dur: "1–3 tahun", salary: "Rp 8–15 jt" },
      { level: "Senior Designer", dur: "3–6 tahun", salary: "Rp 16–30 jt" },
      { level: "Design Lead / Head", dur: "6+ tahun", salary: "Rp 30 jt+" },
    ],
    env: "Mayoritas remote-friendly dengan ritme sprint 2 minggu. Banyak waktu untuk diskusi kolaboratif dengan tim produk, presentasi desain ke stakeholder, dan sesi feedback yang intensif.",
    tips: [
      "Tampilkan proses berpikir di portofolio, bukan hanya tampilan akhir — rekruter ingin tahu cara kamu memecahkan masalah",
      "Pelajari dasar psikologi pengguna dan Gestalt principles untuk membuat keputusan desain yang berargumen kuat",
      "Aktif di Dribbble dan Figma Community untuk mendapat feedback dan membangun network",
    ],
  },

  "software engineer": {
    img: IMG.tech, field: "Rekayasa Perangkat Lunak",
    tagline: "Membangun sistem dan aplikasi yang menjadi tulang punggung dunia digital modern.",
    about: "Software Engineer merancang, menulis, dan memelihara kode yang menjalankan aplikasi dari skala kecil hingga yang digunakan jutaan pengguna. Peran ini menuntut kemampuan berpikir logis dan sistematis, kecepatan belajar teknologi baru, serta kemampuan komunikasi yang baik dalam tim agile.",
    daily: [
      { text: "Menulis kode fitur baru dan melakukan code review bersama tim" },
      { text: "Debugging — menemukan dan memperbaiki bug yang dilaporkan pengguna" },
      { text: "Diskusi teknis untuk perencanaan arsitektur sistem" },
      { text: "Menulis unit test dan dokumentasi teknis agar kode mudah dipelihara" },
      { text: "Daily standup dan sprint planning bersama tim produk" },
    ],
    tools: [
      { name: "VS Code / JetBrains", use: "Editor kode sehari-hari" },
      { name: "Git & GitHub", use: "Version control & kolaborasi kode" },
      { name: "Docker", use: "Containerisasi & environment yang konsisten" },
      { name: "Postman", use: "Pengujian dan eksplorasi API" },
    ],
    path: [
      { level: "Junior Engineer", dur: "0–2 tahun", salary: "Rp 6–10 jt", current: true },
      { level: "Mid Engineer", dur: "2–5 tahun", salary: "Rp 12–25 jt" },
      { level: "Senior Engineer", dur: "5–8 tahun", salary: "Rp 25–50 jt" },
      { level: "Staff / Principal", dur: "8+ tahun", salary: "Rp 50 jt+" },
    ],
    env: "Sangat remote-friendly dengan budaya asynchronous yang tinggi. Bekerja dalam siklus agile dua mingguan, banyak kolaborasi tekstual via komentar kode dan dokumentasi.",
    tips: [
      "Bangun minimal 2–3 proyek pribadi yang bisa diakses publik di GitHub sebagai portofolio konkret",
      "Kuasai satu bahasa pemrograman secara mendalam sebelum melompat ke yang lain — kedalaman lebih dihargai dari pada luasnya",
      "Kontribusi ke open source project kecil untuk membangun reputasi dan pengalaman kolaborasi nyata",
    ],
  },

  "digital marketer": {
    img: IMG.marketing, field: "Pemasaran Digital",
    tagline: "Menghubungkan brand dengan audiens yang tepat, di platform yang tepat, pada waktu yang tepat.",
    about: "Digital Marketer merancang dan mengeksekusi strategi pemasaran di berbagai kanal digital — dari SEO, iklan berbayar, email marketing, hingga media sosial. Peran ini membutuhkan perpaduan kreativitas dalam bercerita dan kemampuan analisis data yang tajam.",
    daily: [
      { text: "Menyusun kalender konten dan strategi kampanye mingguan atau bulanan" },
      { text: "Memantau dan mengoptimalkan performa iklan berbayar secara real-time" },
      { text: "Menganalisis data trafik dan konversi untuk menemukan peluang pertumbuhan" },
      { text: "Melakukan riset kata kunci dan tren untuk konten organik" },
      { text: "Menyiapkan laporan performa untuk klien atau tim internal" },
    ],
    tools: [
      { name: "Google Analytics 4", use: "Analisis trafik & perilaku pengguna" },
      { name: "Meta Ads Manager", use: "Manajemen iklan Facebook & Instagram" },
      { name: "SEMrush / Ahrefs", use: "Riset SEO dan analisis kompetitor" },
      { name: "Mailchimp", use: "Otomasi dan kampanye email marketing" },
    ],
    path: [
      { level: "Marketing Executive", dur: "0–2 tahun", salary: "Rp 3–6 jt", current: true },
      { level: "Marketing Specialist", dur: "2–4 tahun", salary: "Rp 7–15 jt" },
      { level: "Marketing Manager", dur: "4–7 tahun", salary: "Rp 15–30 jt" },
      { level: "Head of Marketing", dur: "7+ tahun", salary: "Rp 30 jt+" },
    ],
    env: "Fleksibel dan dinamis. Ritme kerja mengikuti kalender kampanye yang kadang intens. Banyak koordinasi dengan tim kreatif, desain, dan sales.",
    tips: [
      "Kelola akun media sosial pribadi sebagai laboratorium — coba strategi, lihat hasilnya, pelajari pola",
      "Kuasai Google Ads dan Meta Ads sejak awal karena ini skill yang paling banyak dicari oleh employer",
      "Biasakan berbicara dengan data — presentasikan setiap keputusan dengan angka dan benchmark yang jelas",
    ],
  },

  "data analyst": {
    img: IMG.data, field: "Analisis Data",
    tagline: "Mengubah tumpukan angka menjadi insight yang mendorong keputusan bisnis yang tepat.",
    about: "Data Analyst mengumpulkan, membersihkan, dan menganalisis data untuk membantu perusahaan membuat keputusan berbasis fakta — bukan asumsi. Profesi ini berdiri di persimpangan antara matematika, teknologi, dan kemampuan berkomunikasi insight secara sederhana kepada non-teknis.",
    daily: [
      { text: "Mengekstrak dan membersihkan data dari berbagai sumber menggunakan SQL" },
      { text: "Membangun dan memperbarui dashboard untuk kebutuhan monitoring bisnis" },
      { text: "Menganalisis data untuk menjawab pertanyaan bisnis yang spesifik" },
      { text: "Mempresentasikan insight kepada tim bisnis dengan bahasa yang mudah dipahami" },
      { text: "Berkoordinasi dengan Data Engineer untuk memastikan pipeline data berjalan baik" },
    ],
    tools: [
      { name: "SQL (BigQuery / PostgreSQL)", use: "Kueri dan ekstraksi data utama" },
      { name: "Python — Pandas & Matplotlib", use: "Analisis dan visualisasi data mendalam" },
      { name: "Tableau / Looker Studio", use: "Dashboard interaktif untuk bisnis" },
      { name: "Google Sheets / Excel", use: "Analisis cepat dan laporan ad-hoc" },
    ],
    path: [
      { level: "Junior Analyst", dur: "0–2 tahun", salary: "Rp 5–8 jt", current: true },
      { level: "Data Analyst", dur: "2–4 tahun", salary: "Rp 10–20 jt" },
      { level: "Senior Analyst", dur: "4–7 tahun", salary: "Rp 20–40 jt" },
      { level: "Data Scientist / Lead", dur: "7+ tahun", salary: "Rp 40 jt+" },
    ],
    env: "Banyak waktu bekerja mandiri dengan dataset, diselingi presentasi rutin ke stakeholder. Budaya kerja cenderung terstruktur dan analytical.",
    tips: [
      "Kuasai SQL terlebih dahulu sebelum Python — ini adalah skill yang paling sering digunakan setiap harinya",
      "Latih kemampuan bercerita dengan data: grafik yang bagus tidak cukup jika insight-nya tidak tersampaikan dengan jelas",
      "Buat 2–3 proyek analisis nyata di Kaggle atau GitHub sebagai bukti kemampuan yang bisa dilihat langsung",
    ],
  },

  "content creator": {
    img: IMG.content, field: "Pembuatan Konten Digital",
    tagline: "Membangun audiens yang setia lewat konten yang autentik, konsisten, dan bernilai.",
    about: "Content Creator memproduksi konten yang informatif, menghibur, atau menginspirasi di berbagai platform digital. Profesi ini bukan sekadar membuat video atau postingan — melainkan membangun personal brand yang dipercaya audiens dan bernilai bagi brand yang bekerja sama.",
    daily: [
      { text: "Riset topik, tren, dan pertanyaan yang paling sering dicari audiens target" },
      { text: "Membuat skrip, merekam konten, dan melakukan editing video" },
      { text: "Menjadwalkan dan mempublikasikan konten secara konsisten lintas platform" },
      { text: "Membalas komentar dan berinteraksi aktif dengan komunitas" },
      { text: "Menganalisis metrik — views, watch time, engagement — untuk mengoptimalkan konten berikutnya" },
    ],
    tools: [
      { name: "CapCut / DaVinci Resolve", use: "Editing video untuk semua platform" },
      { name: "Canva", use: "Desain thumbnail, grafis, dan slide" },
      { name: "TubeBuddy / VidIQ", use: "Optimasi judul, tag, dan SEO YouTube" },
      { name: "Meta Creator Studio", use: "Penjadwalan konten & analitik Instagram/Facebook" },
    ],
    path: [
      { level: "Nano Creator (< 10K)", dur: "0–1 tahun", salary: "Rp 1–5 jt", current: true },
      { level: "Micro Creator (10K–100K)", dur: "1–3 tahun", salary: "Rp 5–20 jt" },
      { level: "Mid Creator / KOL", dur: "3–5 tahun", salary: "Rp 20–60 jt" },
      { level: "Macro Creator (1M+)", dur: "5+ tahun", salary: "Rp 60 jt+" },
    ],
    env: "Sangat fleksibel dan mandiri — bisa dari kamar, kafe, atau mana saja. Ritme kerja ditentukan sendiri, namun konsistensi publikasi adalah satu-satunya hal yang tidak bisa dikompromikan.",
    tips: [
      "Pilih satu niche yang spesifik dan stick to it — kreator yang ahli di satu topik tumbuh jauh lebih cepat dari pada yang serba ada",
      "Konsistensi jauh lebih penting dari kualitas produksi di fase awal — upload rutin mengalahkan video sempurna yang jarang keluar",
      "Pelajari cara membaca analytics: konten yang bagus di matamu belum tentu yang paling disukai algoritmanya",
    ],
  },

  "product manager": {
    img: IMG.business, field: "Manajemen Produk",
    tagline: "Menentukan arah produk digital yang digunakan jutaan orang setiap harinya.",
    about: "Product Manager adalah penghubung antara bisnis, teknologi, dan pengguna. Mereka bertanggung jawab mendefinisikan visi produk, memprioritaskan fitur berdasarkan data dan feedback pengguna, serta memastikan seluruh tim — engineering, desain, dan bisnis — bergerak ke arah yang sama.",
    daily: [
      { text: "Melakukan riset pengguna dan menganalisis data perilaku di dalam produk" },
      { text: "Mendefinisikan, menulis, dan memprioritaskan backlog fitur dengan jelas" },
      { text: "Memimpin sprint planning, grooming, dan retrospective bersama tim" },
      { text: "Memantau metrik produk dan memutuskan arah iterasi selanjutnya" },
      { text: "Mempresentasikan roadmap dan progress produk kepada stakeholder senior" },
    ],
    tools: [
      { name: "Jira / Linear", use: "Manajemen backlog dan tracking sprint" },
      { name: "Notion / Confluence", use: "Penulisan PRD dan dokumentasi keputusan" },
      { name: "Mixpanel / Amplitude", use: "Analitik perilaku pengguna di dalam produk" },
      { name: "Miro / FigJam", use: "Workshop ideasi dan pemetaan strategi" },
    ],
    path: [
      { level: "Associate PM", dur: "0–2 tahun", salary: "Rp 8–12 jt", current: true },
      { level: "Product Manager", dur: "2–5 tahun", salary: "Rp 15–30 jt" },
      { level: "Senior PM", dur: "5–8 tahun", salary: "Rp 30–55 jt" },
      { level: "VP Product / CPO", dur: "8+ tahun", salary: "Rp 55 jt+" },
    ],
    env: "Kalender penuh dengan meeting lintas tim. PM adalah titik temu antara engineering, desain, dan bisnis — komunikasi yang jernih dan kemampuan memimpin tanpa otoritas langsung adalah kunci.",
    tips: [
      "Pelajari cara menulis PRD (Product Requirements Document) yang baik — ini adalah skill dasar yang harus dikuasai sejak awal",
      "Bangun intuisi bisnis: selalu tanyakan 'masalah pengguna mana yang ini selesaikan?' sebelum menyetujui sebuah fitur",
      "Mulai dari peran adjacent seperti Business Analyst, UX Researcher, atau bahkan Customer Support untuk membangun fondasi pemahaman produk",
    ],
  },
};

// ─── FALLBACK ─────────────────────────────────────────────────────────────────
function fallback(career) {
  const t = career.title.toLowerCase();
  const img =
    /developer|programmer|engineer|backend|frontend|fullstack|cloud|devops|mobile/.test(t) ? IMG.tech
      : /designer|ux|ui|visual|graphic|creative/.test(t) ? IMG.design
        : /data|scientist|machine learning|analytics|intelligence/.test(t) ? IMG.data
          : /marketing|growth|seo|sem|ads|brand|campaign/.test(t) ? IMG.marketing
            : /content|creator|writer|copywriter|journalist|editor/.test(t) ? IMG.content
              : /manager|director|lead|head|ceo|coo|cto|vp/.test(t) ? IMG.business
                : IMG.default;

  return {
    img, field: career.title,
    tagline: "Profesi yang berkembang pesat di era transformasi digital Indonesia.",
    about: `Sebagai ${career.title}, kamu memegang peran penting dalam ekosistem digital yang terus tumbuh. Profesi ini menggabungkan keahlian teknis dengan kemampuan berpikir strategis dan komunikasi lintas tim yang efektif.`,
    daily: [
      { text: "Merencanakan dan mengeksekusi tugas inti sesuai bidang keahlian" },
      { text: "Berkolaborasi aktif dengan tim dan stakeholder lintas departemen" },
      { text: "Mengidentifikasi masalah dan merancang solusi yang tepat sasaran" },
      { text: "Mendokumentasikan proses dan hasil kerja secara sistematis" },
      { text: "Mengikuti perkembangan industri dan terus mengasah skill" },
    ],
    tools: [
      { name: "Google Workspace", use: "Kolaborasi dokumen & produktivitas" },
      { name: "Slack / Teams", use: "Komunikasi tim sehari-hari" },
      { name: "Notion / Trello", use: "Manajemen proyek & tugas" },
      { name: "Zoom / Meet", use: "Rapat virtual & presentasi" },
    ],
    path: [
      { level: "Junior", dur: "0–2 tahun", salary: "Rp 4–8 jt", current: true },
      { level: "Mid-Level", dur: "2–5 tahun", salary: career.avgSalary || "Rp 10–20 jt" },
      { level: "Senior", dur: "5–8 tahun", salary: "Rp 20–40 jt" },
      { level: "Lead / Manager", dur: "8+ tahun", salary: "Rp 40 jt+" },
    ],
    env: "Lingkungan kerja modern yang mendukung remote atau hybrid. Budaya kolaboratif dengan ritme kerja yang terstruktur namun adaptif terhadap kebutuhan proyek.",
    tips: [
      `Bangun portofolio nyata yang membuktikan kemampuanmu — bukan sekadar daftar skill di CV`,
      "Bergabung dengan komunitas profesional di bidang ini untuk memperluas koneksi dan referensi kerja",
      "Sertifikasi dari lembaga yang diakui industri akan membuat profilmu lebih menonjol di mata rekruter",
    ],
  };
}

function getData(career) {
  const key = career.title.toLowerCase().trim();
  return DB[key] || fallback(career);
}

function Chip({ children, color }) {
  return (
    <span className="inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-lg"
      style={{ color: color.solid, background: color.dim, border: `1px solid ${color.border}` }}>
      {children}
    </span>
  );
}

function Divider() {
  return <div className="h-px my-8" style={{ background: C.rule }} />;
}

function SectionLabel({ children }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-[0.12em] mb-4" style={{ color: C.lo }}>
      {children}
    </p>
  );
}

export default function CareerDetailPage({ career, onBack }) {
  const d = getData(career);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  return (
    <div className="min-h-screen" style={{ background: C.page }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .fu { animation: fadeUp .45s ease both; }
        .fu-1 { animation: fadeUp .45s ease .06s both; }
        .fu-2 { animation: fadeUp .45s ease .12s both; }
        .fu-3 { animation: fadeUp .45s ease .18s both; }
        .fu-4 { animation: fadeUp .45s ease .24s both; }
        .fu-5 { animation: fadeUp .45s ease .30s both; }
        .fu-6 { animation: fadeUp .45s ease .36s both; }
      `}</style>

      {/* ── HERO ── */}
      <div className="relative w-full overflow-hidden" style={{ height: "280px" }}>
        <img src={d.img} alt={career.title}
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.28) saturate(0.7)" }} />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(13,13,15,0) 0%, rgba(13,13,15,0.7) 70%, #0d0d0f 100%)" }} />

        {/* Back */}
        <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
          <button onClick={onBack}
            className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg transition-all"
            style={{ color: C.md, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}
            onMouseEnter={e => e.currentTarget.style.color = C.hi}
            onMouseLeave={e => e.currentTarget.style.color = C.md}>
            <HiArrowLeft className="w-4 h-4" />
            Kembali
          </button>

          {/* {career.match && (
            <span className="text-[11px] font-bold px-3 py-1.5 rounded-lg"
              style={{ color: C.violet.solid, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)", border: `1px solid ${C.violet.border}` }}>
              {career.match}% Cocok
            </span>
          )} */}
        </div>

        {/* Title overlay — di hero */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-1.5" style={{ color: C.lo }}>
              {d.field}
            </p>
            <h1 className="text-white font-black leading-tight"
              style={{ fontSize: "clamp(1.7rem,5vw,2.6rem)", letterSpacing: "-0.025em" }}>
              {career.title}
            </h1>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-4xl mx-auto px-4 pt-6 pb-24">

        {/* Tagline + badges */}
        <div className="fu mb-8">
          <p className="text-base leading-relaxed mb-4" style={{ color: C.md }}>
            {d.tagline}
          </p>
          <div className="flex flex-wrap gap-2">
            {career.match && (
              <span className="text-[11px] font-bold px-3 py-1.5 rounded-lg"
                style={{ color: C.violet.solid, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)", border: `1px solid ${C.violet.border}` }}>
                {career.match}% Cocok
              </span>
            )}
            {career.avgSalary && <Chip color={C.emerald}>{career.avgSalary}</Chip>}
            {career.industryDemand && <Chip color={C.amber}>Permintaan pasar: {career.industryDemand}</Chip>}
          </div>
        </div>

        <Divider />

        {/* ── 1. TENTANG ── */}
        <div className="fu-1 mb-8">
          <SectionLabel>Tentang Profesi Ini</SectionLabel>
          <p className="text-sm leading-[1.8]" style={{ color: C.md }}>
            {d.about}
          </p>
        </div>

        {/* ── 2. SEHARI-HARI ── */}
        <div className="fu-2 mb-8">
          <SectionLabel>Yang Dikerjakan Sehari-hari</SectionLabel>
          <div className="rounded-2xl overflow-hidden" style={{ background: C.s2 }}>
            {d.daily.map((item, i) => (
              <div key={i}
                className="flex items-start gap-4 px-5 py-4"
                style={{ borderBottom: i < d.daily.length - 1 ? `1px solid ${C.rule}` : "none" }}>
                {/* Nomor dengan aksen */}
                <div className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-black mt-0.5"
                  style={{ background: C.blue.dim, color: C.blue.solid }}>
                  {i + 1}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: C.md }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 3. TOOLS ── */}
        <div className="fu-3 mb-8">
          <SectionLabel>Tools & Teknologi yang Digunakan</SectionLabel>
          <div className="grid grid-cols-2 gap-2">
            {d.tools.map((tool, i) => (
              <div key={i} className="rounded-xl px-4 py-4"
                style={{ background: C.s2 }}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: [C.blue.solid, C.violet.solid, C.emerald.solid, C.amber.solid][i % 4] }} />
                  <p className="text-sm font-semibold" style={{ color: C.hi }}>{tool.name}</p>
                </div>
                <p className="text-[11px] leading-snug pl-3.5" style={{ color: C.lo }}>{tool.use}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 4. JENJANG KARIR ── */}
        <div className="fu-4 mb-8">
          <SectionLabel>Jenjang Karir & Estimasi Gaji per Bulan</SectionLabel>

          <div className="relative">
            <div className="absolute left-[0.30rem] top-3 bottom-3 w-px"
              style={{ background: `linear-gradient(to bottom, ${C.blue.solid}, transparent)` }} />

            <div className="space-y-3 pl-8">
              {d.path.map((step, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-8 top-[14px] w-[11px] h-[11px] rounded-full border-2"
                    style={{
                      background: i === 0 ? C.blue.solid : C.page,
                      borderColor: i === 0 ? C.blue.solid : C.lo,
                    }} />

                  <div className="rounded-xl px-4 py-3.5 flex items-center justify-between gap-3"
                    style={{
                      background: i === 0 ? C.blue.dim : C.s2,
                      border: i === 0 ? `1px solid ${C.blue.border}` : "none",
                    }}>
                    <div>
                      <p className="text-sm font-bold" style={{ color: i === 0 ? C.hi : C.hi }}>
                        {step.level}
                      </p>
                      <p className="text-[11px] mt-0.5" style={{ color: C.lo }}>{step.dur}</p>
                    </div>
                    <p className="text-sm font-semibold flex-shrink-0"
                      style={{ color: C.emerald.solid }}>
                      {step.salary}
                      <span className="text-[10px] font-normal ml-0.5" style={{ color: C.lo }}>/bulan</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 5. LINGKUNGAN KERJA ── */}
        <div className="fu-5 mb-8">
          <SectionLabel>Gambaran Lingkungan Kerja</SectionLabel>
          <div className="rounded-2xl px-5 py-4 flex items-start gap-3"
            style={{ background: C.s3, border: `1px solid ${C.rule}` }}>
            <HiOfficeBuilding className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: C.lo }} />
            <p className="text-sm leading-[1.8]" style={{ color: C.md }}>{d.env}</p>
          </div>
        </div>

        {/* ── 6. TIPS ── */}
        <div className="fu-5 mb-8">
          <SectionLabel>Tips untuk Mulai di Bidang Ini</SectionLabel>
          <div className="space-y-2">
            {d.tips.map((tip, i) => (
              <div key={i} className="rounded-xl px-4 py-4 flex items-start gap-3"
                style={{
                  background: C.s2,
                  borderLeft: `3px solid ${[C.amber.solid, C.violet.solid, C.emerald.solid][i % 3]}`,
                }}>
                <HiLightBulb className="w-4 h-4 flex-shrink-0 mt-0.5"
                  style={{ color: [C.amber.solid, C.violet.solid, C.emerald.solid][i % 3] }} />
                <p className="text-sm leading-relaxed" style={{ color: C.md }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {career.description && (
          <div className="fu-6 mb-8">
            <SectionLabel>Kenapa Profesi Ini Cocok Untukmu</SectionLabel>
            <div className="rounded-2xl px-5 py-5"
              style={{ background: C.violet.dim, border: `1px solid ${C.violet.border}` }}>
              <p className="text-sm leading-[1.8]" style={{ color: C.md }}>
                {career.description}
              </p>
            </div>
          </div>
        )}

        {/* ── BACK BUTTON ── */}
        <button onClick={onBack}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-medium transition-all"
          style={{ background: C.s2, color: C.lo }}
          onMouseEnter={e => { e.currentTarget.style.background = C.s3; e.currentTarget.style.color = C.hi; }}
          onMouseLeave={e => { e.currentTarget.style.background = C.s2; e.currentTarget.style.color = C.lo; }}>
          <HiArrowLeft className="w-4 h-4" />
          Kembali ke Hasil Analisis
        </button>
      </div>
    </div>
  );
}