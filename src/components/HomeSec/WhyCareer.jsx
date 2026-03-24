const WHY_CARDS = [
	{
		title: "Temukan Minat Anda",
		category: "Penilaian Diri",
		desc: "Penilaian AI memetakan minat, kepribadian, dan kecenderungan Anda ke pilihan karir yang relevan.",
		img: "https://images.unsplash.com/photo-1601342630314-8427c38bf5e6?q=80&w=691&auto=format&fit=crop",
	},
	{
		title: "Analisis Keterampilan Anda",
		category: "Penanda Aras Keterampilan",
		desc: "Sistem kami membandingkan kemampuan Anda dengan kebutuhan industri, lalu menyorot area pengembangan utama.",
		img: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?q=80&w=1102&auto=format&fit=crop",
	},
	{
		title: "Rencanakan Karir Masa Depan",
		category: "Peta Jalan Karir",
		desc: "Dapatkan roadmap 5 tahun yang berisi milestone, rekomendasi aksi, dan langkah konkret yang bisa langsung dijalankan.",
		img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1170&auto=format&fit=crop",
	},
];

export default function WhyCareer() {
	return (
		<section className="relative px-4 py-16 sm:py-20 lg:px-18 lg:py-24">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute left-1/2 top-0 h-125 w-125 -translate-x-1/2 rounded-full blur-3xl"
				style={{ background: "radial-gradient(circle, rgba(234,88,12,0.12) 0%, transparent 70%)" }}
			/>

			<div className="relative z-1 mx-auto max-w-300">
				<div className="mb-12 text-center sm:mb-16">
					  <span className="inline-block rounded-full border border-orange-500/30 bg-orange-500/8 px-4 py-1 text-[11px] font-bold uppercase tracking-widest text-orange-600 dark:text-amber-300">
						Mengapa CareerAI?
					</span>
					<h2 className="mt-4 text-[clamp(24px,3.2vw,38px)] font-extrabold leading-[1.15] tracking-[-0.8px] text-slate-900 dark:text-white">
						Masalah yang Dihadapi Siswa
						<br />
						<span className="bg-linear-to-r from-orange-600 to-amber-400 bg-clip-text text-transparent">- dan Bagaimana Kami Menyelesaikannya</span>
					</h2>
					<p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-gray-400">
						Lebih dari 70% siswa memilih jurusan tanpa rencana karir yang jelas. CareerAI menjembatani celah itu
						dengan panduan berbasis data, sehingga Anda selalu tahu langkah berikutnya.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
					{WHY_CARDS.map(({ title, category, desc, img }) => (
						<div key={title} className="group relative h-100 cursor-default overflow-hidden rounded-3xl">
							<img
								src={img}
								alt=""
								aria-hidden="true"
								className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-linear-to-t from-black/35 via-black/10 to-transparent dark:from-black/50 dark:via-black/20" />
							<div className="absolute inset-0 bg-orange-700/0 transition-all duration-300 group-hover:bg-orange-700/10" />

							<div className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-orange-700 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-linear-to-r group-hover:from-orange-600 group-hover:to-amber-500 group-hover:text-white dark:border-white/10 dark:bg-[#1a1a1f] dark:text-white">
								<svg
									className="absolute opacity-100 transition-all duration-300 group-hover:rotate-45 group-hover:opacity-0"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2.2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M7 17L17 7" />
									<path d="M7 7h10v10" />
								</svg>
								<svg
									className="absolute -rotate-45 opacity-0 transition-all duration-300 group-hover:rotate-0 group-hover:opacity-100"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2.2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M5 12h14" />
									<path d="M13 6l6 6-6 6" />
								</svg>
							</div>

							<div className="absolute bottom-4 left-4 right-4 rounded-[26px] border border-slate-200/80 bg-white/85 p-5 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-[#1a1a1f]/90 dark:backdrop-blur-sm">
								<h3 className="text-lg font-bold leading-tight text-slate-900 dark:text-white">{title}</h3>
								<p className="mt-0.5 text-sm text-slate-500 dark:text-gray-400">{category}</p>

								<div className="grid grid-rows-[0fr] opacity-0 transition-all duration-300 ease-in-out group-hover:grid-rows-[1fr] group-hover:opacity-100">
									<div className="overflow-hidden">
										<p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-gray-300">"{desc}"</p>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
