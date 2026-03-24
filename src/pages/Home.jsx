import { Link } from "react-router-dom";
import { CAREERS } from "../data/careerData";
import { MAJORS } from "../data/educationData";
import Proses from "../components/HomeSec/Proses";
import WhyCareer from "../components/HomeSec/WhyCareer";

const FEATURES = [
    {
        title: "AI Career Test",
        desc: "Tes minat dan gaya kerja untuk menghasilkan rekomendasi karir yang lebih personal.",
        to: "/ai-career-test",
        action: "Mulai Tes",
    },
    {
        title: "Explore Career",
        desc: "Jelajahi profesi berdasarkan bidang, prospek, rentang gaji, dan level entry.",
        to: "/explore-career",
        action: "Lihat Karir",
    },
    {
        title: "Explore Education",
        desc: "Cari jurusan kuliah, skill yang dipelajari, dan arah karir yang relevan.",
        to: "/explore-education",
        action: "Lihat Jurusan",
    },
    {
        title: "Career Compare",
        desc: "Bandingkan beberapa opsi karir agar keputusan yang diambil lebih objektif.",
        to: "/career-compare",
        action: "Bandingkan",
    },
];

const FEATURE_DETAILS = [
    {
        title: "AI Career Test",
        info: "Mengolah jawabanmu menjadi rekomendasi karir yang lebih personal, bukan sekadar tebak-tebakan minat.",
        points: ["Profil minat dan gaya kerja", "Output rekomendasi terarah", "Bisa diulang kapan saja"],
    },
    {
        title: "Explore Career",
        info: "Database profesi dengan fokus ke realitas lapangan kerja agar kamu paham peluang dan tantangannya.",
        points: ["Rentang gaji dan demand", "Level entry dan tools", "Detail jalur perkembangan"],
    },
    {
        title: "Explore Education",
        info: "Membantu menghubungkan jurusan kuliah dengan skill yang dipelajari dan opsi karir setelah lulus.",
        points: ["Mata kuliah inti", "Durasi studi dan prospek", "Keterkaitan jurusan-karir"],
    },
    {
        title: "Career Compare",
        info: "Menyederhanakan proses memilih dengan membandingkan beberapa opsi secara berdampingan.",
        points: ["Perbandingan lebih objektif", "Melihat plus minus opsi", "Membantu final decision"],
    },
];

export default function Home() {
    const topCareers = CAREERS.slice(0, 3);
    const topMajors = MAJORS.slice(0, 3);

    return (
        <main className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 dark:bg-background dark:text-white">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-24 -right-35 h-110 w-110 rounded-full bg-amber-400/30 blur-3xl dark:bg-amber-400/16" />
                <div className="absolute -left-30 top-56 h-90 w-90 rounded-full bg-orange-500/20 blur-3xl dark:bg-orange-500/14" />
            </div>

            <section className="relative px-4 pb-10 pt-28 md:pt-32">
                <div className="mx-auto w-full max-w-6xl">
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-700 dark:text-amber-300">
                        Platform Eksplorasi Karir dan Pendidikan
                    </p>
                    <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white md:text-5xl">
                        Temukan Arah Belajar dan Karirmu dengan Lebih Jelas
                    </h1>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-white/65 md:text-base">
                        Website ini bantu kamu memahami pilihan masa depan lewat kombinasi tes AI,
                        eksplorasi data karir, eksplorasi jurusan, dan perbandingan opsi secara objektif.
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3">
                        <Link
                            to="/ai-career-test"
                            className="inline-flex h-11 items-center justify-center rounded-full bg-linear-to-r from-orange-600 to-amber-500 px-5 text-sm font-medium text-white shadow-lg shadow-orange-700/25 transition hover:-translate-y-0.5"
                        >
                            Mulai AI Career Test
                        </Link>
                        <Link
                            to="/explore-career"
                            className="inline-flex h-11 items-center justify-center rounded-full border border-amber-300 bg-white px-5 text-sm font-medium text-orange-700 transition hover:bg-amber-50 dark:border-white/20 dark:bg-white/5 dark:text-amber-200 dark:hover:bg-white/10"
                        >
                            Eksplorasi Karir
                        </Link>
                    </div>

                    <div className="mt-7 grid grid-cols-1 gap-3 md:grid-cols-3">
                        <article className="rounded-2xl border border-slate-200 bg-white/90 p-4 backdrop-blur dark:border-white/10 dark:bg-white/5">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{CAREERS.length}+</h3>
                            <p className="text-sm text-slate-600 dark:text-white/60">Data profesi</p>
                        </article>
                        <article className="rounded-2xl border border-slate-200 bg-white/90 p-4 backdrop-blur dark:border-white/10 dark:bg-white/5">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{MAJORS.length}+</h3>
                            <p className="text-sm text-slate-600 dark:text-white/60">Data jurusan</p>
                        </article>
                        <article className="rounded-2xl border border-slate-200 bg-white/90 p-4 backdrop-blur dark:border-white/10 dark:bg-white/5">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">4</h3>
                            <p className="text-sm text-slate-600 dark:text-white/60">Fitur utama</p>
                        </article>
                    </div>
                </div>
            </section>

            <section className="px-4 py-6">
                <div className="mx-auto w-full max-w-6xl">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-700 dark:text-amber-300">Fitur Utama</p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
                        Yang Bisa Kamu Lakukan di Website Ini
                    </h2>
                    <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                        {FEATURES.map((item) => (
                            <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
                                <h3 className="text-base font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-white/65">{item.desc}</p>
                                <Link to={item.to} className="mt-4 inline-block text-sm font-medium text-orange-700 hover:text-orange-600 dark:text-amber-300 dark:hover:text-amber-200">
                                    {item.action}
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <WhyCareer />
            <Proses />

            <section className="px-4 py-8">
                <div className="mx-auto w-full max-w-6xl">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-700 dark:text-amber-300">Penjelasan Fitur</p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
                        Apa Fungsi Tiap Fitur dan Kapan Dipakai
                    </h2>
                    <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                        {FEATURE_DETAILS.map((item) => (
                            <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
                                <h3 className="text-base font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-white/65">{item.info}</p>
                                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-white/80">
                                    {item.points.map((point) => (
                                        <li key={point}>{point}</li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-y border-slate-200/70 bg-slate-100/60 px-4 py-8 dark:border-white/5 dark:bg-white/3">
                <div className="mx-auto w-full max-w-6xl">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-700 dark:text-amber-300">Rekomendasi Cepat</p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
                        Mulai dari Pilihan Populer
                    </h2>

                    <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-2">
                        <article className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
                            <header className="flex items-center justify-between gap-3">
                                <h3 className="text-base font-semibold text-slate-900 dark:text-white">Top Karir</h3>
                                <Link to="/explore-career" className="text-sm font-medium text-orange-700 dark:text-amber-300">Lihat semua</Link>
                            </header>
                            <ul className="mt-3 space-y-2">
                                {topCareers.map((career) => (
                                    <li key={career.slug} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-white/10 dark:bg-slate-900/40">
                                        <span className="text-sm text-slate-800 dark:text-white/90">{career.title}</span>
                                        <Link to={`/career/${career.slug}`} className="text-sm font-medium text-orange-700 dark:text-amber-300">Detail</Link>
                                    </li>
                                ))}
                            </ul>
                        </article>

                        <article className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
                            <header className="flex items-center justify-between gap-3">
                                <h3 className="text-base font-semibold text-slate-900 dark:text-white">Top Jurusan</h3>
                                <Link to="/explore-education" className="text-sm font-medium text-orange-700 dark:text-amber-300">Lihat semua</Link>
                            </header>
                            <ul className="mt-3 space-y-2">
                                {topMajors.map((major) => (
                                    <li key={major.slug} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-white/10 dark:bg-slate-900/40">
                                        <span className="text-sm text-slate-800 dark:text-white/90">{major.name}</span>
                                        <Link to={`/education/${major.slug}`} className="text-sm font-medium text-orange-700 dark:text-amber-300">Detail</Link>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    </div>
                </div>
            </section>

            <section className="px-4 py-8">
                <div className="mx-auto w-full max-w-6xl rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white md:text-2xl">Mulai dari Mana?</h2>
                    <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-600 dark:text-white/65">
                        Kalau kamu masih bingung total, mulai dari AI Career Test. Kalau kamu sudah punya beberapa opsi,
                        langsung ke Explore Career atau Explore Education lalu validasi pilihan akhir di Career Compare.
                    </p>
                </div>
            </section>

            <section className="px-4 pb-10">
                <div className="mx-auto w-full max-w-6xl rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white md:text-2xl">Siap Mulai Menentukan Langkah?</h2>
                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-white/65">
                        Gunakan AI Career Test dulu, lalu bandingkan pilihan terbaikmu.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                        <Link
                            to="/ai-career-test"
                            className="inline-flex h-11 items-center justify-center rounded-full bg-linear-to-r from-orange-600 to-amber-500 px-5 text-sm font-medium text-white shadow-lg shadow-orange-700/25 transition hover:-translate-y-0.5"
                        >
                            Mulai Sekarang
                        </Link>
                        <Link
                            to="/career-compare"
                            className="inline-flex h-11 items-center justify-center rounded-full border border-amber-300 bg-white px-5 text-sm font-medium text-orange-700 transition hover:bg-amber-50 dark:border-white/20 dark:bg-white/5 dark:text-amber-200 dark:hover:bg-white/10"
                        >
                            Bandingkan Karir
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}