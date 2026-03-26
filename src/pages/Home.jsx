import { Link } from "react-router-dom";
import { CheckCircle, GraduationCap, Scale, Sparkles } from "lucide-react";
import { CAREERS } from "../data/careerData";
import { MAJORS } from "../data/educationData";
import Proses from "../components/HomeSec/Proses";
import WhyCareer from "../components/HomeSec/WhyCareer";
import { BentoGridDemo } from "../components/ui/bento-grid-demo";
import { DemoOne } from "../components/ui/demo";
import { FAQSection } from "../components/ui/faqsection";
import { ProjectShowcaseDemo } from "../components/ui/project-showcase-demo";
import { RealTimeAnalytics } from "../components/ui/real-time-analytics";
import { SplineScene } from "../components/ui/splite";
import TestimonialV2 from "../components/ui/testimonial-v2";
import { Testimonials } from "../components/ui/unique-testimonial";

const FEATURES = [
    {
        title: "AI Career Test",
        meta: "Personalisasi",
        desc: "Tes minat dan gaya kerja untuk menghasilkan rekomendasi karir yang lebih personal.",
        to: "/ai-career-test",
        action: "Mulai Tes",
        status: "Tes AI",
        icon: <Sparkles className="h-4 w-4 text-violet-500" />,
    },
    {
        title: "Explore Career",
        meta: "Berbasis Data",
        desc: "Jelajahi profesi berdasarkan bidang, prospek, rentang gaji, dan level entry.",
        to: "/explore-career",
        action: "Lihat Karir",
        status: "Karir",
        icon: <CheckCircle className="h-4 w-4 text-emerald-500" />,
    },
    {
        title: "Explore Education",
        meta: "Jalur Akademik",
        desc: "Cari jurusan kuliah, skill yang dipelajari, dan arah karir yang relevan.",
        to: "/explore-education",
        action: "Lihat Jurusan",
        status: "Jurusan",
        icon: <GraduationCap className="h-4 w-4 text-purple-500" />,
    },
    {
        title: "Career Compare",
        meta: "Bantuan Keputusan",
        desc: "Bandingkan beberapa opsi karir agar keputusan yang diambil lebih objektif.",
        to: "/career-compare",
        action: "Bandingkan",
        status: "Banding",
        icon: <Scale className="h-4 w-4 text-sky-500" />,
    },
];

const FAQS = [
    {
        question: "Mulai dari fitur mana dulu kalau masih bingung?",
        answer: "Mulai dari AI Career Test untuk dapat gambaran awal minat dan gaya kerja, lalu lanjutkan ke Explore Career atau Explore Education sesuai hasil tes.",
    },
    {
        question: "Bedanya Explore Career dan Explore Education apa?",
        answer: "Explore Career fokus pada dunia kerja seperti prospek dan skill, sedangkan Explore Education fokus pada jurusan, materi belajar, dan jalur akademik.",
    },
    {
        question: "Kapan sebaiknya pakai Career Compare?",
        answer: "Gunakan Career Compare saat kamu sudah punya 2-3 opsi dan ingin membandingkan kelebihan tiap pilihan secara objektif sebelum memutuskan.",
    },
    {
        question: "Apakah platform ini cocok untuk siswa dan fresh graduate?",
        answer: "Ya, alurnya dirancang untuk membantu siswa, mahasiswa, dan fresh graduate memahami jalur belajar serta peluang karir secara bertahap.",
    },
    {
        question: "Apakah hasil AI Career Test langsung menentukan karir final?",
        answer: "Tidak. Hasil tes adalah rekomendasi awal untuk eksplorasi. Keputusan akhir tetap perlu divalidasi lewat data karir, jurusan, dan perbandingan opsi.",
    },
    {
        question: "Apakah saya perlu login untuk mencoba fiturnya?",
        answer: "Sebagian fitur bisa dicoba langsung, tetapi login disarankan agar progres eksplorasi dan hasil analisis bisa tersimpan dengan rapi.",
    },
];

const SUPPORT_EMAIL = import.meta.env.VITE_SUPPORT_EMAIL || "support@edutech.id";

function handleFAQEmailClick() {
    const subject = encodeURIComponent("Bantuan Edutech");
    const body = encodeURIComponent("Halo tim Edutech,%0D%0A%0D%0ASaya butuh bantuan terkait:%0D%0A");
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
}

function getStatusClass(status) {
    const key = (status || "active").toLowerCase();

    if (key === "tes ai") {
        return "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-400/25";
    }

    if (key === "karir") {
        return "bg-sky-100 text-sky-700 ring-1 ring-sky-200 dark:bg-sky-500/15 dark:text-sky-300 dark:ring-sky-400/25";
    }

    if (key === "banding") {
        return "bg-violet-100 text-violet-700 ring-1 ring-violet-200 dark:bg-violet-500/15 dark:text-violet-300 dark:ring-violet-400/25";
    }

    if (key === "jurusan") {
        return "bg-amber-100 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-400/25";
    }

    return "bg-black/5 text-gray-600 ring-1 ring-black/10 dark:bg-white/10 dark:text-gray-300 dark:ring-white/15";
}

export default function Home() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-neutral-50 text-neutral-900 [&_h1]:font-accent [&_h2]:font-accent dark:bg-background dark:text-white">
            <section className="relative px-4 pb-10 pt-24 md:pt-30">
                <DemoOne />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-slate-200/75 via-sky-100/35 to-indigo-100/12 dark:from-[#05020f]/95 dark:via-[#140a2e]/70 dark:to-[#1a1140]/18" />
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-24 -right-35 h-110 w-110 rounded-full bg-violet-500/22 blur-3xl dark:bg-violet-500/28" />
                    <div className="absolute -left-30 top-56 h-90 w-90 rounded-full bg-fuchsia-500/15 blur-3xl dark:bg-fuchsia-500/20" />
                </div>
                <div className="relative z-10 mx-auto w-full max-w-6xl">
                    <div>
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400 dark:text-white/25">
                            Platform Eksplorasi Karir dan Pendidikan
                        </p>
                        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white md:text-5xl">
                            Temukan Arah Belajar dan Karirmu dengan Lebih Jelas
                        </h1>
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-700 dark:text-white/75 md:text-base">
                            Website ini bantu kamu memahami pilihan masa depan lewat kombinasi tes AI,
                            eksplorasi data karir, eksplorasi jurusan, dan perbandingan opsi secara objektif.
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2">
                            <article className="w-fit min-w-34 rounded-xl border border-slate-200/75 bg-white/62 px-2 py-2 ring-1 ring-slate-900/4 backdrop-blur-sm dark:border-white/10 dark:bg-white/4 dark:ring-0">
                                <p className="text-base font-semibold text-slate-800 dark:text-white/90">200+</p>
                                <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500 dark:text-white/55">Data profesi</p>
                            </article>
                            <article className="w-fit min-w-34 rounded-xl border border-slate-200/75 bg-white/62 px-2 py-2 ring-1 ring-slate-900/4 backdrop-blur-sm dark:border-white/10 dark:bg-white/4 dark:ring-0">
                                <p className="text-base font-semibold text-slate-800 dark:text-white/90">180+</p>
                                <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500 dark:text-white/55">Data jurusan</p>
                            </article>
                            <article className="w-fit min-w-34 rounded-xl border border-slate-200/75 bg-white/62 px-2 py-2 ring-1 ring-slate-900/4 backdrop-blur-sm dark:border-white/10 dark:bg-white/4 dark:ring-0">
                                <p className="text-base font-semibold text-slate-800 dark:text-white/90">4</p>
                                <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500 dark:text-white/55">Fitur utama</p>
                            </article>
                        </div>

                        <div className="mt-7 flex flex-wrap gap-3">
                            <Link
                                to="/ai-career-test"
                                className="inline-flex h-11 items-center justify-center rounded-full bg-linear-to-r from-violet-600 to-fuchsia-500 px-5 text-sm font-medium text-white shadow-lg shadow-violet-900/35 transition hover:-translate-y-0.5"
                            >
                                Mulai AI Career Test
                            </Link>
                            <Link
                                to="/explore-career"
                                className="inline-flex h-11 items-center justify-center rounded-full border border-violet-300/45 bg-white/70 px-5 text-sm font-medium text-violet-700 transition hover:bg-violet-100 dark:border-white/20 dark:bg-white/5 dark:text-violet-100 dark:hover:bg-white/10"
                            >
                                Eksplorasi Karir
                            </Link>
                        </div>

                        <div className="mt-4 max-w-3xl">
                            <Testimonials />
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-4 py-6">
                <div className="mx-auto w-full max-w-6xl">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400 dark:text-white/25">Fitur Utama</p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
                        Yang Bisa Kamu Lakukan di Website Ini
                    </h2>
                    <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                        {FEATURES.map((item) => (
                            <article
                                key={item.title}
                                className="group relative overflow-hidden rounded-xl bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 dark:bg-black"
                            >
                                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-size-[4px_4px] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)]" />
                                </div>

                                <div className="relative flex h-full min-h-52 flex-col space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/5 dark:bg-white/10">
                                            {item.icon}
                                        </div>
                                        <span className={`rounded-lg px-2 py-1 text-xs font-semibold backdrop-blur-sm ${getStatusClass(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-[15px] font-medium tracking-tight text-gray-900 dark:text-gray-100">
                                            {item.title}
                                            <span className="ml-2 text-xs font-normal text-gray-500 dark:text-gray-400">{item.meta}</span>
                                        </h3>
                                        <p className="text-sm leading-snug font-[425] text-gray-600 dark:text-gray-300">{item.desc}</p>
                                    </div>

                                    <div className="mt-auto flex items-center justify-end gap-2 pt-2">
                                        <Link
                                            to={item.to}
                                            className="text-xs text-gray-500 opacity-80 transition-all group-hover:opacity-100 group-hover:text-violet-700 dark:text-gray-400 dark:group-hover:text-violet-300"
                                        >
                                            {item.action} -&gt;
                                        </Link>
                                    </div>
                                </div>

                                <div className="absolute inset-0 -z-10 rounded-xl bg-linear-to-br from-transparent via-gray-100/50 to-transparent p-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:via-white/10" />
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <WhyCareer />
            <RealTimeAnalytics />
            <Proses />

            <section className="px-4 py-8">
                <div className="mx-auto w-full max-w-6xl">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400 dark:text-white/25">Panduan Pakai</p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
                        Pilih Fitur Berdasarkan Kondisi Kamu Sekarang
                    </h2>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-white/70">
                        Bagian ini fokus ke skenario penggunaan, jadi kamu bisa langsung tahu fitur mana yang dipakai duluan.
                    </p>
                    <div className="mt-4">
                        <BentoGridDemo />
                    </div>
                </div>
            </section>

            <section className="border-y border-slate-300/40 bg-white px-4 py-8 dark:border-[rgba(255,255,255,0.06)] dark:bg-[rgb(20,20,24)]">
                <div className="mx-auto w-full max-w-6xl">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400 dark:text-white/25">Rekomendasi Cepat</p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
                        Mulai dari Pilihan Populer
                    </h2>

                    <div className="mt-5 grid grid-cols-1 items-start gap-5 lg:grid-cols-[0.95fr_1.05fr]">
                        <ProjectShowcaseDemo />

                        <div className="relative lg:-mt-16 xl:-mt-25">
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -right-24 top-1/2 z-0 h-96 w-96 -translate-y-1/2 rounded-full bg-linear-to-br from-violet-700/45 via-violet-500/35 to-violet-300/22 blur-[130px]"
                            />
                            <div className="overflow-hidden rounded-3xl p-2">
                                <div className="h-125 w-full rounded-2xl lg:h-130">
                                    <SplineScene
                                        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                                        className="h-full w-full scale-[0.95] transform-gpu md:scale-[1.2]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <FAQSection
                title="Pertanyaan yang Sering Ditanyakan"
                subtitle="FAQ"
                description="Jawaban singkat untuk pertanyaan yang paling sering muncul sebelum mulai eksplorasi."
                buttonLabel="Kirim email"
                onButtonClick={handleFAQEmailClick}
                faqsLeft={FAQS.slice(0, 3)}
                faqsRight={FAQS.slice(3)}
            />

            <TestimonialV2 />

            {/* <section className="px-4 pb-10">
                <div className="mx-auto w-full max-w-6xl rounded-2xl border border-violet-200/20 bg-white/10 p-5 backdrop-blur dark:border-white/10 dark:bg-white/5">
                    <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">Siap Mulai Menentukan Langkah?</h2>
                    <p className="mt-2 text-sm leading-7 text-white/70">
                        Gunakan AI Career Test dulu, lalu bandingkan pilihan terbaikmu.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                        <Link
                            to="/ai-career-test"
                            className="inline-flex h-11 items-center justify-center rounded-full bg-linear-to-r from-violet-600 to-fuchsia-500 px-5 text-sm font-medium text-white shadow-lg shadow-violet-900/35 transition hover:-translate-y-0.5"
                        >
                            Mulai Sekarang
                        </Link>
                        <Link
                            to="/career-compare"
                            className="inline-flex h-11 items-center justify-center rounded-full border border-violet-300/45 bg-white/10 px-5 text-sm font-medium text-violet-100 transition hover:bg-violet-400/20 dark:border-white/20 dark:bg-white/5 dark:text-violet-100 dark:hover:bg-white/10"
                        >
                            Bandingkan Karir
                        </Link>
                    </div>
                </div>
            </section> */}
        </main>
    );
}