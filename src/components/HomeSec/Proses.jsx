import { useEffect, useState } from "react";

const PROCESS_IMAGE =
	"https://images.unsplash.com/photo-1513258496099-48168024aec0?w=1200&q=80&fit=crop";

const PROCESS_STEPS = [
	{
		id: 1,
		num: "01",
		title: "Ikuti Tes Karir AI",
		desc: "Jawab pertanyaan singkat untuk memetakan minat dan potensi Anda.",
		color: "#f59e0b",
		fullDesc:
			"Tes ini membaca pola jawaban Anda untuk memberi gambaran awal yang akurat tentang arah karir yang cocok.",
		benefits: ["Analisis personal", "Pertanyaan adaptif", "Hasil cepat", "Arah awal karir"],
	},
	{
		id: 2,
		num: "02",
		title: "Dapatkan Rekomendasi Karir",
		desc: "Lihat daftar karir yang paling relevan berdasarkan hasil tes Anda.",
		color: "#f59e0b",
		fullDesc:
			"Setiap rekomendasi dilengkapi alasan singkat agar Anda tahu kenapa karir tersebut cocok untuk Anda.",
		benefits: ["Rekomendasi terurut", "Alasan kecocokan", "Ringkasan prospek", "Lebih mudah memilih"],
	},
	{
		id: 3,
		num: "03",
		title: "Analisis Celah Keterampilan",
		desc: "Bandingkan skill Anda saat ini dengan kebutuhan karir tujuan.",
		color: "#f59e0b",
		fullDesc:
			"Anda akan melihat skill yang perlu dikejar dulu, supaya proses belajar lebih fokus dan tidak membingungkan.",
		benefits: ["Cek skill saat ini", "Prioritas belajar", "Arah pengembangan", "Belajar lebih fokus"],
	},
	{
		id: 4,
		num: "04",
		title: "Buat Peta Jalan 5 Tahun",
		desc: "Susun langkah bertahap dari sekarang sampai siap masuk dunia kerja.",
		color: "#f59e0b",
		fullDesc:
			"Roadmap ini membantu Anda bergerak konsisten dengan target yang jelas di setiap tahap perjalanan.",
		benefits: ["Rencana bertahap", "Target realistis", "Timeline belajar", "Siap kerja lebih cepat"],
	},
];

export default function Proses() {
	const [activeSteps, setActiveSteps] = useState([]);
	const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 768);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleStepClick = (index) => {
		const isGroup1 = index < 2;

		if (isMobile) {
			if (activeSteps.includes(index)) {
				setActiveSteps(activeSteps.filter((i) => i !== index));
			} else {
				setActiveSteps([index]);
			}
			return;
		}

		if (activeSteps.includes(index)) {
			setActiveSteps(activeSteps.filter((i) => i !== index));
			return;
		}

		const newGroup = isGroup1 ? "group1" : "group2";
		const oldGroup = activeSteps.length > 0 ? (activeSteps[0] < 2 ? "group1" : "group2") : null;

		if (oldGroup !== newGroup) {
			setActiveSteps([index]);
		} else {
			setActiveSteps([index]);
		}
	};

	const isHidden = (index) => {
		if (isMobile) return false;
		if (activeSteps.length === 0) return false;
		const activeGroup = activeSteps[0] < 2 ? "group1" : "group2";
		const itemGroup = index < 2 ? "group1" : "group2";
		return activeGroup !== itemGroup;
	};

	return (
		<section className="relative border-y border-slate-200/70 bg-slate-100/60 px-4 py-12 dark:border-white/5 dark:bg-white/3">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-amber-400/20 blur-3xl dark:bg-amber-400/10"
			/>
			<div className="relative z-10 mx-auto w-full max-w-6xl">
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
					<div className="order-2 lg:order-1">
						<div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-white/5">
							<img
								src={PROCESS_IMAGE}
								alt="Ilustrasi proses pengembangan karir"
								className="h-auto w-full rounded-2xl object-cover"
								loading="lazy"
							/>
						</div>
					</div>

					<div className="order-1 lg:order-2">
						<p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-700 dark:text-amber-300">Proses</p>
						<h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
							Cara <span className="bg-linear-to-r from-orange-600 to-amber-400 bg-clip-text text-transparent">Kerjanya</span>
						</h2>
						<p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/65 md:text-base">
							Empat langkah ringkas untuk bantu Anda memilih arah belajar dan karir.
						</p>

						<div className="mt-5 space-y-3">
							{PROCESS_STEPS.map((step, index) => (
								<article
									key={step.id}
									onClick={() => handleStepClick(index)}
									className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
										isHidden(index) ? "hidden" : ""
									} ${
										activeSteps.includes(index)
											? "border-amber-300 bg-linear-to-r from-amber-50 to-orange-50 shadow-md dark:border-amber-400/40 dark:from-orange-900/25 dark:to-amber-900/10"
											: "cursor-pointer border-slate-200 bg-white hover:border-amber-300 hover:bg-amber-50/60 dark:border-white/10 dark:bg-white/5 dark:hover:border-amber-300/35 dark:hover:bg-white/10"
									}`}
								>
									<div className="flex items-start gap-4 p-5 pb-4">
										<div
											className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-base font-bold"
											style={{
												background: `linear-gradient(135deg, ${step.color}33 0%, ${step.color}14 100%)`,
												color: step.color,
												border: `1px solid ${step.color}55`,
											}}
										>
											{step.num}
										</div>

										<div className="min-w-0 flex-1">
											<h3 className="text-base font-semibold text-slate-900 transition-colors dark:text-white dark:group-hover:text-amber-200">
												{step.title}
											</h3>
											<p className="mt-1 text-sm text-slate-600 dark:text-white/60">{step.desc}</p>
										</div>

										<div
											className={`flex h-6 w-6 shrink-0 items-center justify-center text-slate-500 transition-transform dark:text-white/60 ${
												activeSteps.includes(index) ? "rotate-180" : ""
											}`}
										>
											<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
												<polyline points="6 9 12 15 18 9" />
											</svg>
										</div>
									</div>

									<div className={`grid transition-all duration-300 ease-in-out ${activeSteps.includes(index) ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
										<div className="overflow-hidden">
											<div className="border-t border-slate-200 px-5 pb-5 pt-4 dark:border-white/10">
												<p className="text-sm leading-7 text-slate-600 dark:text-white/65">{step.fullDesc}</p>
												<p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-orange-700 dark:text-amber-300">Fitur Utama</p>
												<ul className="mt-2 space-y-2">
													{step.benefits.map((benefit) => (
														<li key={benefit} className="flex items-start gap-2 text-sm text-slate-700 dark:text-white/80">
															<span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[10px] font-bold text-orange-700 dark:bg-amber-500/20 dark:text-amber-200">
																✓
															</span>
															{benefit}
														</li>
													))}
												</ul>
												<button
													type="button"
													className="mt-4 inline-flex h-10 items-center justify-center rounded-lg bg-linear-to-r from-orange-600 to-amber-500 px-4 text-sm font-semibold text-white shadow-md shadow-orange-700/25 transition hover:-translate-y-0.5"
												>
													Lihat Detail
												</button>
											</div>
										</div>
									</div>
								</article>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
