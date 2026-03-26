// src/data/careerData.js
// Sumber data tunggal untuk ExploreCareer dan CareerDetailPage

// ─── GAMBAR ───────────────────────────────────────────────────────────────────
export const IMG = {
  tech:      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1400&q=75&fit=crop",
  design:    "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1400&q=75&fit=crop",
  marketing: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1400&q=75&fit=crop",
  data:      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=75&fit=crop",
  content:   "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1400&q=75&fit=crop",
  business:  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=75&fit=crop",
  health:    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&q=75&fit=crop",
  education: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1400&q=75&fit=crop",
  finance:   "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1400&q=75&fit=crop",
  culinary:  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=75&fit=crop",
  aviation:  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1400&q=75&fit=crop",
  photo:     "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1400&q=75&fit=crop",
  law:       "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1400&q=75&fit=crop",
  arch:      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1400&q=75&fit=crop",
  social:    "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1400&q=75&fit=crop",
  default:   "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=75&fit=crop",
};

// ─── KATEGORI ─────────────────────────────────────────────────────────────────
export const CATEGORIES = [
  { id: "all",       label: "Semua" },
  { id: "teknologi", label: "Teknologi" },
  { id: "kreatif",   label: "Kreatif & Media" },
  { id: "bisnis",    label: "Bisnis" },
  { id: "sosial",    label: "Sosial & Edukasi" },
  { id: "kesehatan", label: "Kesehatan" },
  { id: "lainnya",   label: "Lainnya" },
];

// ─── MASTER DATA ──────────────────────────────────────────────────────────────
// slug = URL path, digunakan di /explore-career/:slug dan /career/:slug
export const CAREERS = [

  // ── TEKNOLOGI ──────────────────────────────────────────────────────────────
  {
    slug: "ui-ux-designer",
    title: "UI/UX Designer",
    category: "teknologi",
    field: "Desain & Teknologi",
    tagline: "Merancang pengalaman digital yang intuitif dan bermakna bagi setiap pengguna.",
    shortDesc: "Memastikan produk digital terasa mudah dan menyenangkan digunakan.",
    salary: "Rp 4–30 jt/bln",
    demand: "Sangat Tinggi",
    entryLevel: "Menengah",
    img: IMG.design,
    accentColor: "#8b5cf6",   // violet
    about: "UI/UX Designer memastikan produk digital terasa mudah dan menyenangkan digunakan. Pekerjaannya mencakup riset perilaku pengguna, pembuatan wireframe, prototipe interaktif, hingga desain visual akhir yang diserahkan ke tim engineering.",
    daily: [
      { text: "Melakukan wawancara dan survei untuk memahami kebutuhan pengguna nyata" },
      { text: "Membuat wireframe, alur navigasi, dan prototipe interaktif" },
      { text: "Menguji desain ke pengguna dan menganalisis hasilnya" },
      { text: "Berkolaborasi dengan Product Manager dan Engineer setiap hari" },
      { text: "Menjaga dan mengembangkan design system produk" },
    ],
    tools: [
      { name: "Figma",         use: "Desain UI & prototipe interaktif" },
      { name: "Maze / Hotjar", use: "Uji usabilitas & heatmap pengguna" },
      { name: "Miro",          use: "Brainstorming & pemetaan user journey" },
      { name: "Notion",        use: "Dokumentasi design system & riset" },
    ],
    path: [
      { level: "Junior Designer",    dur: "0–1 tahun",  salary: "Rp 4–7 jt"  },
      { level: "Mid Designer",       dur: "1–3 tahun",  salary: "Rp 8–15 jt" },
      { level: "Senior Designer",    dur: "3–6 tahun",  salary: "Rp 16–30 jt"},
      { level: "Design Lead / Head", dur: "6+ tahun",   salary: "Rp 30 jt+"  },
    ],
    env: "Mayoritas remote-friendly dengan ritme sprint 2 minggu. Banyak diskusi kolaboratif dengan tim produk dan presentasi desain ke stakeholder.",
    tips: [
      "Tampilkan proses berpikir di portofolio, bukan hanya tampilan akhir",
      "Pelajari dasar psikologi pengguna — bukan hanya estetika visual",
      "Aktif di Dribbble dan Figma Community untuk membangun network",
    ],
  },

  {
    slug: "software-engineer",
    title: "Software Engineer",
    category: "teknologi",
    field: "Rekayasa Perangkat Lunak",
    tagline: "Membangun sistem dan aplikasi yang menjadi tulang punggung dunia digital.",
    shortDesc: "Menulis dan memelihara kode yang menjalankan aplikasi jutaan pengguna.",
    salary: "Rp 6–60 jt/bln",
    demand: "Sangat Tinggi",
    entryLevel: "Tinggi",
    img: IMG.tech,
    accentColor: "#3b82f6",   // blue
    about: "Software Engineer merancang, menulis, dan memelihara kode untuk aplikasi dari skala kecil hingga jutaan pengguna. Peran ini menuntut kemampuan berpikir logis, kecepatan belajar teknologi baru, dan komunikasi yang baik dalam tim agile.",
    daily: [
      { text: "Menulis kode fitur baru dan melakukan code review bersama tim" },
      { text: "Debugging — menemukan dan memperbaiki bug yang dilaporkan" },
      { text: "Diskusi teknis untuk perencanaan arsitektur sistem" },
      { text: "Menulis unit test dan dokumentasi teknis" },
      { text: "Daily standup dan sprint planning bersama tim produk" },
    ],
    tools: [
      { name: "VS Code / JetBrains", use: "Editor kode sehari-hari" },
      { name: "Git & GitHub",        use: "Version control & kolaborasi kode" },
      { name: "Docker",              use: "Containerisasi & konsistensi environment" },
      { name: "Postman",             use: "Pengujian dan eksplorasi API" },
    ],
    path: [
      { level: "Junior Engineer",  dur: "0–2 tahun", salary: "Rp 6–10 jt"  },
      { level: "Mid Engineer",     dur: "2–5 tahun", salary: "Rp 12–25 jt" },
      { level: "Senior Engineer",  dur: "5–8 tahun", salary: "Rp 25–50 jt" },
      { level: "Staff / Principal",dur: "8+ tahun",  salary: "Rp 50 jt+"   },
    ],
    env: "Sangat remote-friendly dengan budaya asynchronous tinggi. Siklus agile dua mingguan, kolaborasi via komentar kode dan dokumentasi.",
    tips: [
      "Bangun 2–3 proyek pribadi yang bisa dilihat publik di GitHub",
      "Kuasai satu bahasa secara mendalam sebelum melompat ke yang lain",
      "Kontribusi ke open source untuk membangun reputasi nyata",
    ],
  },

  {
    slug: "data-analyst",
    title: "Data Analyst",
    category: "teknologi",
    field: "Analisis Data",
    tagline: "Mengubah tumpukan angka menjadi insight yang mendorong keputusan bisnis.",
    shortDesc: "Menganalisis data untuk membantu perusahaan membuat keputusan berbasis fakta.",
    salary: "Rp 5–40 jt/bln",
    demand: "Sangat Tinggi",
    entryLevel: "Menengah",
    img: IMG.data,
    accentColor: "#06b6d4",   // cyan
    about: "Data Analyst mengumpulkan, membersihkan, dan menganalisis data untuk membantu perusahaan membuat keputusan berbasis fakta. Profesi ini berdiri di persimpangan matematika, teknologi, dan kemampuan berkomunikasi insight secara sederhana.",
    daily: [
      { text: "Mengekstrak dan membersihkan data dari berbagai sumber menggunakan SQL" },
      { text: "Membangun dan memperbarui dashboard monitoring bisnis" },
      { text: "Menganalisis data untuk menjawab pertanyaan bisnis spesifik" },
      { text: "Mempresentasikan insight kepada tim bisnis dengan bahasa mudah" },
      { text: "Berkoordinasi dengan Data Engineer untuk pipeline data" },
    ],
    tools: [
      { name: "SQL",                  use: "Kueri dan ekstraksi data utama" },
      { name: "Python — Pandas",      use: "Analisis dan visualisasi mendalam" },
      { name: "Tableau / Looker",     use: "Dashboard interaktif untuk bisnis" },
      { name: "Google Sheets / Excel",use: "Analisis cepat & laporan ad-hoc" },
    ],
    path: [
      { level: "Junior Analyst",       dur: "0–2 tahun", salary: "Rp 5–8 jt"  },
      { level: "Data Analyst",         dur: "2–4 tahun", salary: "Rp 10–20 jt" },
      { level: "Senior Analyst",       dur: "4–7 tahun", salary: "Rp 20–40 jt" },
      { level: "Data Scientist / Lead",dur: "7+ tahun",  salary: "Rp 40 jt+"   },
    ],
    env: "Banyak waktu kerja mandiri dengan dataset, diselingi presentasi rutin ke stakeholder. Budaya kerja terstruktur dan analytical.",
    tips: [
      "Kuasai SQL dulu sebelum Python — paling sering digunakan sehari-hari",
      "Latih kemampuan bercerita dengan data, bukan hanya membuat grafik",
      "Buat proyek analisis nyata di Kaggle atau GitHub",
    ],
  },

  {
    slug: "product-manager",
    title: "Product Manager",
    category: "teknologi",
    field: "Manajemen Produk",
    tagline: "Menentukan arah produk digital yang digunakan jutaan orang setiap harinya.",
    shortDesc: "Menghubungkan bisnis, teknologi, dan pengguna untuk menciptakan produk yang dibutuhkan.",
    salary: "Rp 8–55 jt/bln",
    demand: "Tinggi",
    entryLevel: "Tinggi",
    img: IMG.business,
    accentColor: "#f59e0b",   // amber
    about: "Product Manager mendefinisikan visi produk, memprioritaskan fitur berdasarkan data dan feedback pengguna, serta memastikan tim — engineering, desain, dan bisnis — bergerak ke arah yang sama.",
    daily: [
      { text: "Riset pengguna dan analisis data perilaku di dalam produk" },
      { text: "Mendefinisikan dan memprioritaskan backlog fitur" },
      { text: "Memimpin sprint planning dan retrospective bersama tim" },
      { text: "Memantau metrik produk dan memutuskan arah iterasi" },
      { text: "Mempresentasikan roadmap kepada stakeholder senior" },
    ],
    tools: [
      { name: "Jira / Linear",        use: "Manajemen backlog & sprint" },
      { name: "Notion / Confluence",  use: "Penulisan PRD & dokumentasi" },
      { name: "Mixpanel / Amplitude", use: "Analitik perilaku pengguna" },
      { name: "Miro / FigJam",        use: "Workshop ideasi & strategi" },
    ],
    path: [
      { level: "Associate PM",    dur: "0–2 tahun", salary: "Rp 8–12 jt"  },
      { level: "Product Manager", dur: "2–5 tahun", salary: "Rp 15–30 jt" },
      { level: "Senior PM",       dur: "5–8 tahun", salary: "Rp 30–55 jt" },
      { level: "VP Product / CPO",dur: "8+ tahun",  salary: "Rp 55 jt+"   },
    ],
    env: "Kalender penuh meeting lintas tim. Komunikasi yang jernih dan kepemimpinan tanpa otoritas langsung adalah kunci.",
    tips: [
      "Pelajari cara menulis PRD yang baik — skill dasar yang wajib dikuasai",
      "Selalu tanyakan 'masalah pengguna mana yang ini selesaikan?' sebelum menyetujui fitur",
      "Mulai dari Business Analyst atau UX Researcher untuk membangun fondasi",
    ],
  },

  // ── KREATIF & MEDIA ────────────────────────────────────────────────────────
  {
    slug: "digital-marketer",
    title: "Digital Marketer",
    category: "kreatif",
    field: "Pemasaran Digital",
    tagline: "Menghubungkan brand dengan audiens yang tepat di platform yang tepat.",
    shortDesc: "Merancang dan menjalankan strategi pemasaran di berbagai kanal digital.",
    salary: "Rp 3–30 jt/bln",
    demand: "Tinggi",
    entryLevel: "Rendah",
    img: IMG.marketing,
    accentColor: "#10b981",   // emerald
    about: "Digital Marketer merancang dan mengeksekusi strategi pemasaran di berbagai kanal digital — dari SEO, iklan berbayar, email, hingga media sosial. Peran ini menggabungkan kreativitas bercerita dengan analisis data yang tajam.",
    daily: [
      { text: "Menyusun kalender konten dan strategi kampanye mingguan" },
      { text: "Memantau dan mengoptimalkan performa iklan secara real-time" },
      { text: "Menganalisis data trafik dan konversi untuk peluang pertumbuhan" },
      { text: "Riset kata kunci dan tren untuk konten organik" },
      { text: "Menyiapkan laporan performa untuk klien atau tim internal" },
    ],
    tools: [
      { name: "Google Analytics 4", use: "Analisis trafik & perilaku pengguna" },
      { name: "Meta Ads Manager",   use: "Manajemen iklan Facebook & Instagram" },
      { name: "SEMrush / Ahrefs",   use: "Riset SEO & analisis kompetitor" },
      { name: "Mailchimp",          use: "Otomasi dan kampanye email" },
    ],
    path: [
      { level: "Marketing Executive",  dur: "0–2 tahun", salary: "Rp 3–6 jt"  },
      { level: "Marketing Specialist", dur: "2–4 tahun", salary: "Rp 7–15 jt" },
      { level: "Marketing Manager",    dur: "4–7 tahun", salary: "Rp 15–30 jt"},
      { level: "Head of Marketing",    dur: "7+ tahun",  salary: "Rp 30 jt+"  },
    ],
    env: "Fleksibel dan dinamis. Ritme mengikuti kalender kampanye yang kadang intens. Banyak koordinasi dengan tim kreatif dan sales.",
    tips: [
      "Kelola akun media sosial pribadi sebagai laboratorium strategi",
      "Kuasai Google Ads dan Meta Ads sejak awal — paling dicari employer",
      "Biasakan berbicara dengan data, presentasikan keputusan dengan angka",
    ],
  },

  {
    slug: "content-creator",
    title: "Content Creator",
    category: "kreatif",
    field: "Pembuatan Konten Digital",
    tagline: "Membangun audiens yang setia lewat konten yang autentik dan konsisten.",
    shortDesc: "Memproduksi konten yang menghibur, informatif, atau menginspirasi di platform digital.",
    salary: "Rp 1–100 jt+/bln",
    demand: "Tinggi",
    entryLevel: "Rendah",
    img: IMG.content,
    accentColor: "#f43f5e",   // rose
    about: "Content Creator memproduksi konten di berbagai platform digital. Profesi ini bukan sekadar membuat video — melainkan membangun personal brand yang dipercaya audiens dan bernilai bagi brand yang bekerja sama.",
    daily: [
      { text: "Riset topik dan tren yang paling dicari audiens target" },
      { text: "Membuat skrip, merekam, dan mengedit konten video" },
      { text: "Menjadwalkan dan mempublikasikan konten secara konsisten" },
      { text: "Membalas komentar dan berinteraksi aktif dengan komunitas" },
      { text: "Menganalisis metrik untuk mengoptimalkan konten berikutnya" },
    ],
    tools: [
      { name: "CapCut / DaVinci",   use: "Editing video untuk semua platform" },
      { name: "Canva",              use: "Desain thumbnail, grafis, slide" },
      { name: "TubeBuddy / VidIQ",  use: "Optimasi SEO YouTube" },
      { name: "Meta Creator Studio",use: "Jadwal & analitik konten" },
    ],
    path: [
      { level: "Nano Creator (< 10K)",     dur: "0–1 tahun", salary: "Rp 1–5 jt"   },
      { level: "Micro Creator (10K–100K)", dur: "1–3 tahun", salary: "Rp 5–20 jt"  },
      { level: "Mid Creator / KOL",        dur: "3–5 tahun", salary: "Rp 20–60 jt" },
      { level: "Macro Creator (1M+)",      dur: "5+ tahun",  salary: "Rp 60 jt+"   },
    ],
    env: "Sangat fleksibel dan mandiri. Bisa dari mana saja. Konsistensi publikasi adalah satu-satunya hal yang tidak bisa dikompromikan.",
    tips: [
      "Pilih satu niche spesifik — kreator ahli di satu topik tumbuh jauh lebih cepat",
      "Konsistensi lebih penting dari kualitas produksi di fase awal",
      "Pelajari cara membaca analytics — konten bagus di matamu belum tentu yang disukai algoritma",
    ],
  },

  {
    slug: "fotografer",
    title: "Fotografer",
    category: "kreatif",
    field: "Fotografi & Visual",
    tagline: "Mengabadikan momen dan membangun narasi visual yang berbicara tanpa kata-kata.",
    shortDesc: "Mengambil, mengedit, dan mengkomposisikan foto untuk berbagai kebutuhan.",
    salary: "Rp 3–25 jt/bln",
    demand: "Sedang",
    entryLevel: "Menengah",
    img: IMG.photo,
    accentColor: "#a78bfa",   // violet muda
    about: "Fotografer profesional bekerja untuk berbagai kebutuhan: pernikahan, editorial, produk komersial, jurnalistik, hingga konten media sosial brand. Kunci sukses profesi ini adalah kombinasi mata artistik yang tajam dan pemahaman teknis kamera serta pencahayaan.",
    daily: [
      { text: "Sesi pemotretan sesuai brief klien atau proyek editorial" },
      { text: "Proses seleksi foto terbaik dari ratusan hasil jepretan" },
      { text: "Editing dan retouching di Lightroom atau Photoshop" },
      { text: "Komunikasi dengan klien untuk memahami kebutuhan visual" },
      { text: "Membangun dan memperbarui portofolio online secara rutin" },
    ],
    tools: [
      { name: "Adobe Lightroom",  use: "Editing warna & exposure massal" },
      { name: "Adobe Photoshop",  use: "Retouching dan compositing detail" },
      { name: "Capture One",      use: "Alternatif RAW processing profesional" },
      { name: "Behance / VSCo",   use: "Portofolio online & komunitas kreatif" },
    ],
    path: [
      { level: "Fotografer Freelance",  dur: "0–2 tahun", salary: "Rp 1–5 jt"   },
      { level: "Fotografer Profesional",dur: "2–5 tahun", salary: "Rp 5–15 jt"  },
      { level: "Senior / Brand Photog", dur: "5–10 tahun",salary: "Rp 15–25 jt" },
      { level: "Art Director / Studio", dur: "10+ tahun", salary: "Rp 25 jt+"   },
    ],
    env: "Campuran antara sesi lapangan yang dinamis dan waktu studio yang intens. Jam kerja tidak menentu, terutama untuk wedding photography.",
    tips: [
      "Spesialisasikan diri di satu niche dulu — produk, pernikahan, atau editorial",
      "Investasi pada kemampuan editing sama pentingnya dengan kemampuan memotret",
      "Bangun relasi dengan stylist, makeup artist, dan event organizer",
    ],
  },

  // ── BISNIS ──────────────────────────────────────────────────────────────────
  {
    slug: "akuntan",
    title: "Akuntan",
    category: "bisnis",
    field: "Keuangan & Akuntansi",
    tagline: "Menjaga kesehatan finansial organisasi lewat pencatatan dan analisis yang akurat.",
    shortDesc: "Mengelola laporan keuangan, pajak, dan audit untuk berbagai jenis organisasi.",
    salary: "Rp 5–40 jt/bln",
    demand: "Tinggi",
    entryLevel: "Menengah",
    img: IMG.finance,
    accentColor: "#34d399",   // emerald muda
    about: "Akuntan bertugas memastikan catatan keuangan organisasi akurat, lengkap, dan sesuai regulasi. Profesi ini relevan di hampir semua industri — dari UMKM hingga perusahaan multinasional — karena setiap entitas bisnis membutuhkan pengelolaan keuangan yang sehat.",
    daily: [
      { text: "Mencatat dan mengelola transaksi keuangan harian" },
      { text: "Menyusun laporan keuangan bulanan dan tahunan" },
      { text: "Menghitung dan melaporkan kewajiban pajak" },
      { text: "Melakukan rekonsiliasi akun dan audit internal" },
      { text: "Berkoordinasi dengan tim operasional untuk validasi data" },
    ],
    tools: [
      { name: "SAP / Oracle",    use: "ERP untuk perusahaan besar" },
      { name: "MYOB / Accurate", use: "Akuntansi untuk UKM Indonesia" },
      { name: "Microsoft Excel", use: "Analisis dan laporan keuangan" },
      { name: "e-SPT / e-Filing",use: "Pelaporan pajak digital" },
    ],
    path: [
      { level: "Staf Akuntansi",    dur: "0–2 tahun", salary: "Rp 5–8 jt"  },
      { level: "Senior Akuntan",    dur: "2–5 tahun", salary: "Rp 9–18 jt" },
      { level: "Manajer Keuangan",  dur: "5–10 tahun",salary: "Rp 18–35 jt"},
      { level: "CFO / Direktur",    dur: "10+ tahun", salary: "Rp 40 jt+"  },
    ],
    env: "Lingkungan kerja formal dan terstruktur. Puncak kesibukan biasanya terjadi di akhir bulan, akhir kuartal, dan menjelang pelaporan pajak.",
    tips: [
      "Sertifikasi Brevet A & B untuk perpajakan sangat meningkatkan nilai jualmu",
      "Kuasai minimal satu software akuntansi yang umum dipakai di Indonesia",
      "Gabung di KAP (Kantor Akuntan Publik) di awal karir untuk pengalaman audit yang luas",
    ],
  },

  {
    slug: "pengusaha-umkm",
    title: "Pengusaha UMKM",
    category: "bisnis",
    field: "Kewirausahaan",
    tagline: "Membangun usaha dari nol dan menjadi solusi nyata bagi komunitas sekitar.",
    shortDesc: "Merintis dan mengelola bisnis mandiri dengan dampak langsung di ekonomi lokal.",
    salary: "Rp 3–50 jt+/bln",
    demand: "Sangat Tinggi",
    entryLevel: "Rendah",
    img: IMG.business,
    accentColor: "#fb923c",   // orange
    about: "Pengusaha UMKM membangun bisnis dari ide menjadi entitas yang menghasilkan nilai nyata. Di Indonesia, UMKM menyumbang lebih dari 60% PDB nasional — ini bukan hanya pilihan karir, tapi juga kontribusi langsung pada perekonomian lokal.",
    daily: [
      { text: "Mengelola operasional bisnis: produksi, stok, dan pengiriman" },
      { text: "Mengembangkan strategi penjualan dan pemasaran digital" },
      { text: "Mengelola keuangan dan arus kas bisnis" },
      { text: "Membangun hubungan dengan supplier dan pelanggan setia" },
      { text: "Menganalisis data penjualan untuk keputusan bisnis" },
    ],
    tools: [
      { name: "Tokopedia / Shopee",  use: "Platform jualan online terbesar" },
      { name: "Canva",               use: "Desain konten promosi mandiri" },
      { name: "WhatsApp Business",   use: "Komunikasi dan CRM sederhana" },
      { name: "BukuWarung / Moka",   use: "Pencatatan keuangan UMKM" },
    ],
    path: [
      { level: "Usaha Rintisan",   dur: "0–2 tahun",  salary: "Rp 1–5 jt"  },
      { level: "Usaha Berkembang", dur: "2–5 tahun",  salary: "Rp 5–20 jt" },
      { level: "UMKM Mapan",       dur: "5–10 tahun", salary: "Rp 20–50 jt"},
      { level: "Scale-up / Ekspansi",dur: "10+ tahun",salary: "Rp 50 jt+"  },
    ],
    env: "Sangat mandiri dan dinamis. Tidak ada atasan langsung — kamu yang menjadi pengambil keputusan tertinggi. Tantangan dan kepuasan datang dari hal yang sama.",
    tips: [
      "Mulai kecil tapi validasi dulu: pastikan ada yang mau membeli sebelum produksi massal",
      "Manfaatkan platform digital sejak awal — UMKM yang online tumbuh 2x lebih cepat",
      "Bergabung dengan komunitas pengusaha muda untuk belajar dari yang sudah jalan",
    ],
  },

  // ── SOSIAL & EDUKASI ───────────────────────────────────────────────────────
  {
    slug: "guru",
    title: "Guru / Pendidik",
    category: "sosial",
    field: "Pendidikan",
    tagline: "Membentuk generasi berikutnya dengan ilmu, nilai, dan teladan nyata.",
    shortDesc: "Mendidik dan membimbing siswa untuk tumbuh menjadi individu yang berkarakter.",
    salary: "Rp 3–15 jt/bln",
    demand: "Sangat Tinggi",
    entryLevel: "Menengah",
    img: IMG.education,
    accentColor: "#f59e0b",   // amber
    about: "Guru bukan hanya pengajar — mereka adalah arsitek karakter generasi penerus bangsa. Di era digital ini, peran guru semakin strategis karena mereka harus mampu menggabungkan metode pembelajaran modern dengan nilai-nilai fundamental yang abadi.",
    daily: [
      { text: "Menyiapkan rencana pembelajaran dan materi yang menarik" },
      { text: "Mengajar di kelas dengan metode yang interaktif dan kontekstual" },
      { text: "Menilai dan memberikan feedback konstruktif pada pekerjaan siswa" },
      { text: "Berkomunikasi dengan orang tua mengenai perkembangan anak" },
      { text: "Mengikuti pelatihan dan mengembangkan metode pengajaran" },
    ],
    tools: [
      { name: "Google Classroom",  use: "Manajemen tugas & komunikasi kelas" },
      { name: "Canva for Education",use: "Desain materi presentasi menarik" },
      { name: "Quiziz / Kahoot",   use: "Evaluasi interaktif yang menyenangkan" },
      { name: "YouTube / Podcast", use: "Sumber bahan ajar digital" },
    ],
    path: [
      { level: "Guru Muda",         dur: "0–3 tahun",  salary: "Rp 3–5 jt"  },
      { level: "Guru Tetap",        dur: "3–8 tahun",  salary: "Rp 5–10 jt" },
      { level: "Guru Senior / BK",  dur: "8–15 tahun", salary: "Rp 8–15 jt" },
      { level: "Kepala Sekolah",    dur: "15+ tahun",  salary: "Rp 15 jt+"  },
    ],
    env: "Dinamis dan penuh interaksi manusia. Tantangan terbesar adalah mempertahankan semangat mengajar di tengah administrasi yang banyak.",
    tips: [
      "Pelajari metode pembelajaran aktif seperti project-based learning",
      "Bangun koneksi antar guru untuk berbagi materi dan strategi mengajar",
      "Manfaatkan platform seperti Ruangguru dan Zenius untuk referensi konten",
    ],
  },

  {
    slug: "psikolog",
    title: "Psikolog",
    category: "sosial",
    field: "Kesehatan Mental & Konseling",
    tagline: "Membantu individu memahami diri dan menemukan jalan keluar dari tekanan hidup.",
    shortDesc: "Menilai dan memberikan intervensi psikologis untuk kesejahteraan mental klien.",
    salary: "Rp 5–30 jt/bln",
    demand: "Sangat Tinggi",
    entryLevel: "Tinggi",
    img: IMG.social,
    accentColor: "#a78bfa",   // violet
    about: "Psikolog membantu individu memahami pola pikir, emosi, dan perilaku mereka, serta memberikan intervensi berbasis bukti untuk meningkatkan kualitas hidup. Di Indonesia, kesadaran kesehatan mental yang meningkat pesat membuat profesi ini sangat dibutuhkan.",
    daily: [
      { text: "Melakukan sesi konseling atau psikoterapi dengan klien" },
      { text: "Administrasi dan interpretasi tes psikologi" },
      { text: "Menulis laporan psikologis dan rekomendasi intervensi" },
      { text: "Konsultasi dengan psikiater untuk kasus kompleks" },
      { text: "Mengikuti supervisi dan pengembangan kompetensi profesional" },
    ],
    tools: [
      { name: "WAIS / MMPI",     use: "Alat tes psikologi terstandar" },
      { name: "Zoom / Meet",     use: "Sesi konseling online" },
      { name: "Notion",          use: "Pencatatan case notes yang terstruktur" },
      { name: "Betterhelp / Riliv", use: "Platform konseling digital" },
    ],
    path: [
      { level: "Psikolog Magang",     dur: "0–2 tahun",  salary: "Rp 3–6 jt"  },
      { level: "Psikolog Klinis",     dur: "2–5 tahun",  salary: "Rp 8–18 jt" },
      { level: "Psikolog Senior",     dur: "5–10 tahun", salary: "Rp 15–30 jt"},
      { level: "Direktur / Konsultan",dur: "10+ tahun",  salary: "Rp 30 jt+"  },
    ],
    env: "Membutuhkan empati yang besar dan kemampuan menjaga batas profesional. Sering kali emosionally demanding — self-care adalah bagian dari profesionalisme.",
    tips: [
      "Wajib memiliki SIPP (Surat Izin Praktik Psikolog) sebelum praktik mandiri",
      "Lakukan supervisi rutin terutama di 3 tahun pertama praktik",
      "Jaga kesehatan mentalmu sendiri — psikolog yang burnout tidak bisa menolong klien dengan optimal",
    ],
  },

  // ── KESEHATAN ──────────────────────────────────────────────────────────────
  {
    slug: "dokter",
    title: "Dokter",
    category: "kesehatan",
    field: "Kedokteran",
    tagline: "Menjaga, memulihkan, dan meningkatkan kesehatan masyarakat setiap harinya.",
    shortDesc: "Mendiagnosis dan mengobati penyakit untuk menjaga kesehatan pasien.",
    salary: "Rp 8–80 jt/bln",
    demand: "Sangat Tinggi",
    entryLevel: "Tinggi",
    img: IMG.health,
    accentColor: "#2dd4bf",   // teal
    about: "Dokter adalah garda terdepan layanan kesehatan. Mereka mendiagnosis kondisi medis, meresepkan pengobatan, dan memberikan edukasi kesehatan kepada pasien. Jalur karir dokter panjang tapi memberikan dampak nyata dan langsung pada kehidupan orang banyak.",
    daily: [
      { text: "Memeriksa pasien dan melakukan anamnesis yang menyeluruh" },
      { text: "Menginterpretasikan hasil pemeriksaan laboratorium dan radiologi" },
      { text: "Mendiagnosis kondisi dan menyusun rencana tata laksana" },
      { text: "Menulis resep dan mengedukasi pasien mengenai kondisi mereka" },
      { text: "Mengikuti case conference dan update pengetahuan medis terbaru" },
    ],
    tools: [
      { name: "SIMRS",           use: "Sistem informasi manajemen rumah sakit" },
      { name: "PubMed / UpToDate",use: "Referensi klinis berbasis bukti" },
      { name: "EKG / USG",       use: "Alat diagnostik standar" },
      { name: "PCARE BPJS",      use: "Sistem pencatatan layanan primer" },
    ],
    path: [
      { level: "Dokter Internship", dur: "1 tahun",    salary: "Rp 3–5 jt"   },
      { level: "Dokter Umum",       dur: "2–5 tahun",  salary: "Rp 8–20 jt"  },
      { level: "PPDS / Spesialis",  dur: "4–5 tahun",  salary: "Rp 15–40 jt" },
      { level: "Spesialis Senior",  dur: "10+ tahun",  salary: "Rp 40–80 jt" },
    ],
    env: "Lingkungan kerja yang sangat dinamis dan penuh tekanan. Empati, ketahanan mental, dan kemampuan membuat keputusan cepat adalah modal utama.",
    tips: [
      "Pilih spesialisasi berdasarkan passion — kamu akan menjalaninya puluhan tahun",
      "Bangun relasi yang baik dengan pasien — kepercayaan adalah aset terbesar dokter",
      "Ikuti webinar dan jurnal medis terbaru secara rutin untuk tetap update",
    ],
  },

  {
    slug: "perawat",
    title: "Perawat",
    category: "kesehatan",
    field: "Keperawatan",
    tagline: "Merawat pasien dengan penuh dedikasi dan menjadi jembatan antara pasien dan dokter.",
    shortDesc: "Memberikan perawatan langsung dan dukungan kepada pasien di berbagai fasilitas kesehatan.",
    salary: "Rp 4–20 jt/bln",
    demand: "Sangat Tinggi",
    entryLevel: "Menengah",
    img: IMG.health,
    accentColor: "#67e8f9",   // sky
    about: "Perawat adalah tulang punggung layanan kesehatan yang berinteraksi paling lama dan paling dekat dengan pasien. Profesi ini menuntut kombinasi kompetensi klinis yang solid dengan empati dan komunikasi yang tulus.",
    daily: [
      { text: "Melakukan pengkajian kondisi pasien secara berkala" },
      { text: "Memberikan obat dan tindakan keperawatan sesuai instruksi dokter" },
      { text: "Mendokumentasikan perkembangan kondisi pasien di rekam medis" },
      { text: "Memberikan edukasi kesehatan kepada pasien dan keluarga" },
      { text: "Berkoordinasi dengan tim medis multidisiplin" },
    ],
    tools: [
      { name: "SIMRS",          use: "Sistem rekam medis digital" },
      { name: "Infusion pump",  use: "Alat pemberian cairan intravena" },
      { name: "Pulse oximeter", use: "Monitor saturasi oksigen pasien" },
      { name: "SOAP Notes",     use: "Format standar dokumentasi keperawatan" },
    ],
    path: [
      { level: "Perawat Fresh Graduate", dur: "0–2 tahun",  salary: "Rp 4–6 jt"  },
      { level: "Perawat Klinisi",        dur: "2–5 tahun",  salary: "Rp 6–12 jt" },
      { level: "Perawat Spesialis",      dur: "5–10 tahun", salary: "Rp 10–20 jt"},
      { level: "Manajer Keperawatan",    dur: "10+ tahun",  salary: "Rp 15–25 jt"},
    ],
    env: "Lingkungan fisik dan emosional yang intens. Sistem shift — termasuk malam dan akhir pekan — adalah bagian dari profesi ini.",
    tips: [
      "Dapatkan STR (Surat Tanda Registrasi) segera setelah lulus untuk mulai praktik",
      "Pertimbangkan spesialisasi seperti ICU, onkologi, atau pediatrik untuk karir lebih fokus",
      "Perawat Indonesia sangat dibutuhkan di luar negeri — pertimbangkan sertifikasi internasional",
    ],
  },

  // ── LAINNYA ────────────────────────────────────────────────────────────────
  {
    slug: "chef",
    title: "Chef / Koki Profesional",
    category: "lainnya",
    field: "Kuliner & Gastronomi",
    tagline: "Menciptakan pengalaman rasa yang tak terlupakan lewat keahlian memasak yang terlatih.",
    shortDesc: "Merancang menu dan memimpin dapur untuk menghadirkan masakan berkualitas tinggi.",
    salary: "Rp 4–35 jt/bln",
    demand: "Tinggi",
    entryLevel: "Menengah",
    img: IMG.culinary,
    accentColor: "#fb923c",   // orange
    about: "Chef profesional bukan sekadar memasak — mereka adalah seniman, pemimpin tim, dan manajer operasional dapur sekaligus. Di era food content yang meledak, peluang chef semakin luas melampaui restoran tradisional.",
    daily: [
      { text: "Menyiapkan dan memasak hidangan sesuai standar resep" },
      { text: "Mengawasi kualitas bahan baku dan menjaga kesegaran stok" },
      { text: "Memimpin dan melatih tim junior di dapur" },
      { text: "Bereksperimen dengan menu baru dan teknik memasak" },
      { text: "Menjaga kebersihan dan standar higienis dapur" },
    ],
    tools: [
      { name: "Peralatan dapur profesional", use: "Eksekusi masakan berkualitas tinggi" },
      { name: "Recipe Management Software",  use: "Standarisasi resep & food cost" },
      { name: "Instagram / TikTok",          use: "Promosi dan personal branding chef" },
      { name: "HACCP",                       use: "Sistem keamanan pangan internasional" },
    ],
    path: [
      { level: "Commis Chef",   dur: "0–2 tahun",  salary: "Rp 3–5 jt"  },
      { level: "Demi Chef",     dur: "2–4 tahun",  salary: "Rp 5–10 jt" },
      { level: "Sous Chef",     dur: "4–8 tahun",  salary: "Rp 10–20 jt"},
      { level: "Executive Chef",dur: "8+ tahun",   salary: "Rp 20–35 jt"},
    ],
    env: "Lingkungan dapur yang panas, cepat, dan membutuhkan koordinasi tinggi. Jam kerja panjang terutama di akhir pekan dan hari libur.",
    tips: [
      "Magang di restoran berbintang atau hotel bintang 5 untuk pengalaman standar internasional",
      "Dokumentasikan masakanmu di media sosial — personal brand chef sangat bernilai saat ini",
      "Pelajari food costing sejak awal jika ingin membuka usaha sendiri suatu hari",
    ],
  },

  {
    slug: "arsitek",
    title: "Arsitek",
    category: "lainnya",
    field: "Arsitektur & Desain Bangunan",
    tagline: "Merancang ruang yang fungsional, estetis, dan berkelanjutan untuk kehidupan manusia.",
    shortDesc: "Merancang bangunan dan ruang yang memenuhi kebutuhan fungsional sekaligus estetika.",
    salary: "Rp 5–40 jt/bln",
    demand: "Sedang",
    entryLevel: "Tinggi",
    img: IMG.arch,
    accentColor: "#94a3b8",   // slate
    about: "Arsitek merancang bangunan dengan mempertimbangkan fungsi, estetika, keamanan, dan keberlanjutan lingkungan. Di Indonesia yang terus berkembang, arsitek memiliki peran penting dalam membentuk wajah kota dan kualitas hidup masyarakat.",
    daily: [
      { text: "Membuat konsep desain dan sketsa awal bangunan" },
      { text: "Mengembangkan gambar kerja teknis yang detail" },
      { text: "Koordinasi dengan klien, kontraktor, dan konsultan struktur" },
      { text: "Pengawasan pelaksanaan konstruksi di lapangan" },
      { text: "Menyesuaikan desain dengan regulasi bangunan setempat" },
    ],
    tools: [
      { name: "AutoCAD",         use: "Gambar teknis 2D standar industri" },
      { name: "SketchUp / Revit",use: "Modeling 3D dan BIM" },
      { name: "Adobe Photoshop", use: "Rendering dan visualisasi desain" },
      { name: "Lumion",          use: "Rendering arsitektur photorealistic" },
    ],
    path: [
      { level: "Junior Arsitek",    dur: "0–3 tahun",  salary: "Rp 4–7 jt"  },
      { level: "Arsitek",           dur: "3–7 tahun",  salary: "Rp 8–20 jt" },
      { level: "Arsitek Senior",    dur: "7–12 tahun", salary: "Rp 18–35 jt"},
      { level: "Principal / Mitra", dur: "12+ tahun",  salary: "Rp 35 jt+"  },
    ],
    env: "Kombinasi antara pekerjaan kantor yang intensif dan kunjungan lapangan. Proyek besar bisa berlangsung bertahun-tahun dengan koordinasi yang kompleks.",
    tips: [
      "Wajib memiliki IAI (Ikatan Arsitek Indonesia) membership untuk praktik formal",
      "Kuasai Revit dan BIM — ini sudah menjadi standar global yang banyak diminta",
      "Bangun portofolio proyek sejak kuliah — bahkan proyek akademis bisa sangat mengesankan",
    ],
  },

  {
    slug: "pilot",
    title: "Pilot",
    category: "lainnya",
    field: "Penerbangan",
    tagline: "Membawa penumpang melintasi langit dengan aman, tepat waktu, dan penuh tanggung jawab.",
    shortDesc: "Menerbangkan pesawat komersial dengan standar keselamatan tertinggi.",
    salary: "Rp 15–80 jt/bln",
    demand: "Tinggi",
    entryLevel: "Tinggi",
    img: IMG.aviation,
    accentColor: "#60a5fa",   // blue muda
    about: "Pilot komersial bertanggung jawab atas keselamatan ratusan penumpang dalam setiap penerbangan. Profesi ini menuntut latihan intensif yang panjang dan mahal, tapi menawarkan gaji yang sangat kompetitif dan karir yang bergengsi.",
    daily: [
      { text: "Pengecekan pre-flight yang menyeluruh sebelum setiap penerbangan" },
      { text: "Briefing dengan co-pilot dan kru kabin mengenai rute dan kondisi cuaca" },
      { text: "Menerbangkan pesawat sesuai prosedur standar operasi" },
      { text: "Mengambil keputusan cepat dalam situasi darurat" },
      { text: "Mengisi logbook dan laporan penerbangan pascamisi" },
    ],
    tools: [
      { name: "Flight Management System", use: "Navigasi dan autopilot modern" },
      { name: "ATIS / NOTAM",             use: "Informasi cuaca dan keselamatan udara" },
      { name: "Simulator",                use: "Latihan prosedur darurat yang rutin" },
      { name: "EFB (Tablet)",             use: "Pengganti manual penerbangan digital" },
    ],
    path: [
      { level: "Private Pilot License",    dur: "1–2 tahun",  salary: "Belum komersial" },
      { level: "First Officer",            dur: "2–8 tahun",  salary: "Rp 15–25 jt"   },
      { level: "Captain (Narrow Body)",    dur: "8–15 tahun", salary: "Rp 30–55 jt"   },
      { level: "Captain (Wide Body)",      dur: "15+ tahun",  salary: "Rp 55–80 jt"   },
    ],
    env: "Jadwal tidak menentu dengan banyak perjalanan antar kota atau internasional. Tuntutan fisik dan mental yang tinggi, tapi juga waktu istirahat yang terjadwal.",
    tips: [
      "Investasi lisensi CPL bisa mencapai Rp 500 juta–1 M — riset beasiswa maskapai sejak jauh hari",
      "Jaga kesehatan fisik dan mental secara serius — medical check rutin adalah persyaratan wajib",
      "Magang di ground handling atau ATC bisa memberi perspektif berharga sebelum terbang",
    ],
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
export function getCareerBySlug(slug) {
  return CAREERS.find(c => c.slug === slug) || null;
}

export function getCareerByTitle(title) {
  const key = title?.toLowerCase().trim();
  return CAREERS.find(c => c.title.toLowerCase() === key) || null;
}

// Fallback untuk profesi dari AI yang tidak ada di database
export function buildFallback(career) {
  const t = career.title?.toLowerCase() || "";
  const img =
    /developer|programmer|engineer|backend|frontend|fullstack|cloud|devops|mobile/.test(t) ? IMG.tech
    : /designer|ux|ui|visual|graphic|creative/.test(t) ? IMG.design
    : /data|scientist|machine learning|analytics/.test(t) ? IMG.data
    : /marketing|growth|seo|sem|ads|brand|campaign/.test(t) ? IMG.marketing
    : /content|creator|writer|copywriter|journalist/.test(t) ? IMG.content
    : /manager|director|lead|head|ceo|cto|vp/.test(t) ? IMG.business
    : /dokter|nurse|medis|farmasi|kesehatan/.test(t) ? IMG.health
    : /chef|masak|kuliner|restoran/.test(t) ? IMG.culinary
    : IMG.default;

  return {
    slug: t.replace(/\s+/g, "-"),
    title: career.title,
    field: career.title,
    accentColor: "#8b5cf6",
    img,
    tagline: "Profesi yang berkembang pesat di era transformasi digital Indonesia.",
    about: `Sebagai ${career.title}, kamu memegang peran penting dalam ekosistem yang terus tumbuh. Profesi ini menggabungkan keahlian teknis dengan kemampuan berpikir strategis dan komunikasi lintas tim yang efektif.`,
    daily: [
      { text: "Merencanakan dan mengeksekusi tugas inti sesuai bidang keahlian" },
      { text: "Berkolaborasi aktif dengan tim dan stakeholder lintas departemen" },
      { text: "Mengidentifikasi masalah dan merancang solusi yang tepat sasaran" },
      { text: "Mendokumentasikan proses dan hasil kerja secara sistematis" },
      { text: "Mengikuti perkembangan industri dan terus mengasah skill" },
    ],
    tools: [
      { name: "Google Workspace", use: "Kolaborasi dokumen & produktivitas" },
      { name: "Slack / Teams",    use: "Komunikasi tim sehari-hari" },
      { name: "Notion / Trello",  use: "Manajemen proyek & tugas" },
      { name: "Zoom / Meet",      use: "Rapat virtual & presentasi" },
    ],
    path: [
      { level: "Junior",        dur: "0–2 tahun", salary: "Rp 4–8 jt"  },
      { level: "Mid-Level",     dur: "2–5 tahun", salary: career.avgSalary || "Rp 10–20 jt" },
      { level: "Senior",        dur: "5–8 tahun", salary: "Rp 20–40 jt" },
      { level: "Lead / Manager",dur: "8+ tahun",  salary: "Rp 40 jt+"   },
    ],
    env: "Lingkungan kerja modern yang mendukung remote atau hybrid dengan ritme kerja adaptif.",
    tips: [
      "Bangun portofolio nyata yang membuktikan kemampuanmu — bukan sekadar daftar skill",
      "Bergabung dengan komunitas profesional untuk memperluas koneksi dan referensi kerja",
      "Sertifikasi dari lembaga yang diakui industri akan membuat profilmu lebih menonjol",
    ],
  };
}