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
		<section className="relative px-4 py-8">
			<div className="relative z-1 mx-auto w-full max-w-6xl">
				<div className="text-center">
					<span className="inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-200">
						Mengapa CareerAI?
					</span>
					<h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
						Masalah yang Dihadapi Siswa
						<span className="block text-slate-900 dark:text-white">
							dan Bagaimana Kami Menyelesaikannya
						</span>
					</h2>
					<p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-white/72 md:text-base">
						CareerAI memberi panduan berbasis data agar Anda tahu langkah berikutnya.

					</p>
				</div>

				<div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
					{WHY_CARDS.map(({ title, category, desc, img }) => (
						<article
							key={title}
							className="group overflow-hidden rounded-2xl bg-white p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-slate-50 dark:bg-white/5 dark:hover:bg-white/10"
						>
							<img
								src={img}
								alt={title}
								className="h-50 w-full rounded-xl object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
							/>

							<div className="mt-3">
								<p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-700 transition-colors duration-300 group-hover:text-violet-800 dark:text-violet-200/95 dark:group-hover:text-violet-100">{category}</p>
								<h3 className="mt-1 text-base font-semibold text-slate-900 transition-colors duration-300 dark:text-white">{title}</h3>
								<p className="mt-2 text-sm leading-6 text-slate-600 transition-colors duration-300 group-hover:text-slate-700 dark:text-white/72 dark:group-hover:text-white/88">{desc}</p>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
