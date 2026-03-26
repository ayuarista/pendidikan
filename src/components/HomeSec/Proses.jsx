import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CinematicHeroDemo from "../ui/cinematic-landing-hero-demo";
import { LuCheck } from "react-icons/lu";

const PROCESS_STEPS = [
	{
		id: 1,
		num: "01",
		title: "Ikuti Tes Karir AI",
		desc: "Jawab 15 pertanyaan singkat untuk memetakan minat, gaya kerja, dan potensi kamu di masa depan.",
		color: "#8b5cf6",
		to: "/ai-career-test",
		fullDesc:
			"Mulai dari AI Career Test untuk dapat baseline personal sebelum eksplorasi karir dan jurusan lebih jauh.",
		benefits: ["15 soal terstruktur", "Analisis personal berbasis AI", "Hasil langsung", "Arah awal yang jelas"],
	},
	{
		id: 2,
		num: "02",
		title: "Eksplorasi Detail Karir",
		desc: "Buka Explore Career untuk cek opsi profesi, prospek kerja, dan gambaran jalur karir.",
		color: "#8b5cf6",
		to: "/explore-career",
		fullDesc:
			"Di tahap ini kamu validasi hasil tes dengan data karir nyata supaya pilihanmu tidak sekadar feeling.",
		benefits: ["Daftar profesi relevan", "Arah skill yang dibutuhkan", "Gambaran prospek", "Referensi pengembangan diri"],
	},
	{
		id: 3,
		num: "03",
		title: "Cocokkan dengan Jurusan",
		desc: "Lanjut ke Explore Education untuk melihat jurusan  dengan target karirmu.",
		color: "#8b5cf6",
		to: "/explore-education",
		fullDesc:
			"Kamu bisa memahami mata kuliah, skill inti, dan jalur akademik agar rencana belajar lebih realistis.",
		benefits: ["Mapping jurusan ke karir", "Info skill yang dipelajari", "Arah kuliah lebih tepat", "Minim salah jurusan"],
	},
	{
		id: 4,
		num: "04",
		title: "Bandingkan Opsi Final",
		desc: "Gunakan Career Compare untuk memilih opsi terbaik berdasarkan pertimbangan yang objektif.",
		color: "#8b5cf6",
		to: "/career-compare",
		fullDesc:
			"Tahap penutup untuk memantapkan keputusan sebelum kamu fokus menjalankan rencana karir dan pendidikan.",
		benefits: ["Bandingkan beberapa jalur", "Lihat plus-minus tiap opsi", "Ambil keputusan lebih yakin", "Eksekusi rencana lebih mantap"],
	},
];

export default function Proses() {
	const navigate = useNavigate();
	const [mobileOpenSteps, setMobileOpenSteps] = useState([]);
	const [desktopOpenLeft, setDesktopOpenLeft] = useState(0);
	const [desktopOpenRight, setDesktopOpenRight] = useState(3);
	const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 768);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleStepClick = (index) => {
		if (isMobile) {
			if (mobileOpenSteps.includes(index)) {
				setMobileOpenSteps(mobileOpenSteps.filter((i) => i !== index));
			} else {
				setMobileOpenSteps([...mobileOpenSteps, index]);
			}
			return;
		}

		if (index < 2) {
			setDesktopOpenLeft(index);
		} else {
			setDesktopOpenRight(index);
		}
	};

	const isStepOpen = (index) => {
		if (isMobile) return mobileOpenSteps.includes(index);
		if (index < 2) return desktopOpenLeft === index;
		return desktopOpenRight === index;
	};

	const renderStepCard = (step, index) => {
		const isOpen = isStepOpen(index);

		return (
			<article
				key={step.id}
				data-aos="fade-up"
				data-aos-delay={120 + index * 70}
				onClick={() => handleStepClick(index)}
				className={`overflow-hidden rounded-2xl transition-all duration-300 ${isOpen
					? "border-transparent bg-white dark:border-[rgba(255,255,255,0.06)] dark:bg-[rgb(20,20,24)]"
					: "cursor-pointer border-transparent bg-white hover:bg-slate-50 dark:border-[rgba(255,255,255,0.06)] dark:bg-[rgb(20,20,24)] dark:hover:border-[rgba(255,255,255,0.12)] dark:hover:bg-[rgb(24,24,30)]"
					}`}
			>
				<div className="flex items-start gap-4 p-5 pb-4">
					<div
						className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-base font-bold text-white/95 transition-colors duration-300 dark:bg-black/25"
					>
						{step.num}
					</div>

					<div className="min-w-0 flex-1">
						<h3 className="text-base font-semibold text-slate-900 transition-colors dark:text-white dark:group-hover:text-violet-200">
							{step.title}
						</h3>
						<p className="mt-1 text-sm text-slate-600 dark:text-white/60">{step.desc}</p>
					</div>

					<div
						className={`flex h-6 w-6 shrink-0 items-center justify-center text-slate-500 transition-transform dark:text-white/60 ${isOpen ? "rotate-180" : ""
							}`}
					>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<polyline points="6 9 12 15 18 9" />
						</svg>
					</div>
				</div>

				<div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
					<div className="overflow-hidden">
						<div className="border-t border-slate-200/70 px-5 pb-5 pt-4 dark:border-[rgba(255,255,255,0.06)]">
							<p className="text-sm leading-7 text-slate-600 dark:text-white/65">{step.fullDesc}</p>
							<p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-slate-900 dark:text-white">Fitur Utama</p>
							<ul className="mt-2 space-y-2">
								{step.benefits.map((benefit) => (
									<li key={benefit} className="flex items-start gap-2 text-sm text-slate-700 dark:text-white/80">
										<span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-violet-300 bg-transparent text-violet-700 dark:border-white/20 dark:text-violet-200">
											<LuCheck className="h-2.5 w-2.5" />
										</span>
										{benefit}
									</li>
								))}
							</ul>
							<button
								type="button"
								onClick={(e) => {
									e.stopPropagation();
									navigate(step.to);
								}}
								className="mt-4 inline-flex h-9 cursor-pointer items-center justify-center rounded-full bg-slate-900 px-4 text-xs font-medium text-white transition-colors hover:bg-black dark:bg-white dark:text-slate-900 dark:hover:bg-neutral-200"
							>
								Lihat Detail
							</button>
						</div>
					</div>
				</div>
			</article>
		);
	};

	return (
		<section className="relative border-y border-violet-200/20 bg-transparent px-4 py-12 dark:border-white/5 dark:bg-transparent">
			<div className="relative z-10 mx-auto w-full max-w-6xl">
				{isMobile ? (
					<div className="space-y-5">
						<p data-aos="fade-up" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400 dark:text-white/25">Proses</p>
						<h2 data-aos="fade-up" data-aos-delay="80" className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
							Alur Penggunaan
						</h2>
						<p data-aos="fade-up" data-aos-delay="120" className="text-sm leading-7 text-slate-600 dark:text-white/65 md:text-base">
							Empat langkah singkat dari tes awal hingga rekomendasi karir.
						</p>

						<div className="space-y-3">
							{PROCESS_STEPS.map((step, index) => renderStepCard(step, index))}
						</div>

						<div data-aos="fade-up" data-aos-delay="180" className="mb-15 overflow-visible">
							<div className="h-125 w-full pt-30">
								<CinematicHeroDemo />
							</div>
						</div>
					</div>
				) : (
					<div className="grid grid-cols-3 items-start gap-5 lg:gap-7">
						<div className="space-y-3 pt-28">
							{PROCESS_STEPS.slice(0, 2).map((step, idx) => renderStepCard(step, idx))}
						</div>

						<div>
							<div className="text-center">
								<p data-aos="fade-up" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400 dark:text-white/25">Proses</p>
								<h2 data-aos="fade-up" data-aos-delay="80" className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
									Alur Penggunaan
								</h2>
								<p data-aos="fade-up" data-aos-delay="120" className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/65 md:text-base">
									Empat langkah singkat dari tes awal hingga rekomendasi karir.
								</p>
							</div>

							<div data-aos="fade-up" data-aos-delay="180" className="mt-4 overflow-visible">
								<div className="h-125 w-full lg:h-140">
									<CinematicHeroDemo />
								</div>
							</div>
						</div>

						<div className="space-y-3 pt-28">
							{PROCESS_STEPS.slice(2, 4).map((step, idx) => renderStepCard(step, idx + 2))}
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
