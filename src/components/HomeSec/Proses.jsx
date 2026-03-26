import { useEffect, useState } from "react";
import CinematicHeroDemo from "../ui/cinematic-landing-hero-demo";

const PROCESS_STEPS = [
	{
		id: 1,
		num: "01",
		title: "Ikuti Tes Karir AI",
		desc: "Jawab pertanyaan singkat untuk memetakan minat dan potensi Anda.",
		color: "#8b5cf6",
		fullDesc:
			"Tes ini membaca pola jawaban Anda untuk memberi gambaran awal yang akurat tentang arah karir yang cocok.",
		benefits: ["Analisis personal", "Pertanyaan adaptif", "Hasil cepat", "Arah awal karir"],
	},
	{
		id: 2,
		num: "02",
		title: "Dapatkan Rekomendasi Karir",
		desc: "Lihat daftar karir yang paling relevan berdasarkan hasil tes Anda.",
		color: "#8b5cf6",
		fullDesc:
			"Setiap rekomendasi dilengkapi alasan singkat agar Anda tahu kenapa karir tersebut cocok untuk Anda.",
		benefits: ["Rekomendasi terurut", "Alasan kecocokan", "Ringkasan prospek", "Lebih mudah memilih"],
	},
	{
		id: 3,
		num: "03",
		title: "Analisis Celah Keterampilan",
		desc: "Bandingkan skill Anda saat ini dengan kebutuhan karir tujuan.",
		color: "#8b5cf6",
		fullDesc:
			"Anda akan melihat skill yang perlu dikejar dulu, supaya proses belajar lebih fokus dan tidak membingungkan.",
		benefits: ["Cek skill saat ini", "Prioritas belajar", "Arah pengembangan", "Belajar lebih fokus"],
	},
	{
		id: 4,
		num: "04",
		title: "Buat Peta Jalan 5 Tahun",
		desc: "Susun langkah bertahap dari sekarang sampai siap masuk dunia kerja.",
		color: "#8b5cf6",
		fullDesc:
			"Roadmap ini membantu Anda bergerak konsisten dengan target yang jelas di setiap tahap perjalanan.",
		benefits: ["Rencana bertahap", "Target realistis", "Timeline belajar", "Siap kerja lebih cepat"],
	},
];

export default function Proses() {
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
										<span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-violet-300 bg-transparent text-[10px] font-bold text-violet-700 dark:border-white/20 dark:text-violet-200">
											v
										</span>
										{benefit}
									</li>
								))}
							</ul>
							<button
								type="button"
								className="mt-4 inline-flex h-10 items-center justify-center rounded-full border border-violet-300/60 bg-transparent px-5 text-sm font-medium text-violet-700 transition hover:border-violet-500 hover:text-violet-800 dark:border-violet-300/40 dark:text-violet-200 dark:hover:border-violet-200/70 dark:hover:text-white"
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
						<p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-200">Proses</p>
						<h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
							Alur Penggunaan
						</h2>
						<p className="text-sm leading-7 text-slate-600 dark:text-white/65 md:text-base">
							Empat langkah singkat dari tes awal hingga rekomendasi karir.
						</p>

						<div className="space-y-3">
							{PROCESS_STEPS.map((step, index) => renderStepCard(step, index))}
						</div>

						<div className="overflow-visible">
							<div className="h-125 w-full">
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
								<p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-200">Proses</p>
								<h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
									Alur Penggunaan
								</h2>
								<p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/65 md:text-base">
									Empat langkah singkat dari tes awal hingga rekomendasi karir.
								</p>
							</div>

							<div className="mt-4 overflow-visible">
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
