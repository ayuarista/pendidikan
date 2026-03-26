import React from "react";
import { motion as Motion } from "framer-motion";

const testimonials = [
    {
        text: "AI Career Test membantu saya menemukan arah belajar yang lebih jelas dan sesuai kepribadian.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Briana Patton",
        role: "Mahasiswa",
    },
    {
        text: "Explore Career bikin riset profesi jadi cepat karena datanya ringkas dan relevan.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Bilal Ahmed",
        role: "Fresh Graduate",
    },
    {
        text: "Explore Education membantu saya memilih jurusan yang nyambung ke target karir.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Saman Malik",
        role: "Siswa Kelas 12",
    },
    {
        text: "Career Compare sangat kepake saat harus memilih di antara dua jalur karir.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Omar Raza",
        role: "Career Switcher",
    },
    {
        text: "Tampilannya bersih, alurnya jelas, jadi saya tidak bingung harus mulai dari mana.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Zainab Hussain",
        role: "Pelajar",
    },
    {
        text: "Platform ini menghemat waktu ketika mencari kombinasi jurusan dan opsi profesi.",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Aliza Khan",
        role: "Orang Tua",
    },
    {
        text: "Insight dari fitur AI bikin keputusan terasa lebih percaya diri dan terarah.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Farhan Siddiqui",
        role: "Junior Developer",
    },
    {
        text: "Saya suka karena bisa eksplorasi karir dulu baru validasi lewat compare.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Sana Sheikh",
        role: "Mahasiswa Semester 4",
    },
    {
        text: "Satu halaman ini sudah cukup membantu memahami opsi masa depan secara objektif.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Hassan Ali",
        role: "Peserta Bootcamp",
    },
];

const firstColumn = testimonials.slice(0, 2);
const secondColumn = testimonials.slice(2, 4);
const thirdColumn = testimonials.slice(4, 6);

function TestimonialsColumn({ className, testimonials, duration = 10 }) {
    return (
        <div className={className}>
            <Motion.ul
                animate={{
                    translateY: "-50%",
                }}
                transition={{
                    duration,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
                className="m-0 flex list-none flex-col gap-6 bg-transparent p-0 pb-6 transition-colors duration-300"
            >
                {new Array(2).fill(0).map((_, index) => (
                    <React.Fragment key={index}>
                        {testimonials.map(({ text, image, name, role }, i) => (
                            <Motion.li
                                key={`${index}-${i}`}
                                aria-hidden={index === 1 ? "true" : "false"}
                                tabIndex={index === 1 ? -1 : 0}
                                whileHover={{
                                    scale: 1.03,
                                    y: -8,
                                    transition: { type: "spring", stiffness: 400, damping: 17 },
                                }}
                                whileFocus={{
                                    scale: 1.03,
                                    y: -8,
                                    transition: { type: "spring", stiffness: 400, damping: 17 },
                                }}
                                className="group w-full max-w-xs cursor-default select-none rounded-3xl bg-white p-8 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-400/30 dark:bg-[rgb(20,20,24)]"
                            >
                                <blockquote className="m-0 p-0">
                                    <p className="m-0 leading-relaxed text-slate-600 transition-colors duration-300 dark:text-neutral-400">
                                        {text}
                                    </p>
                                    <footer className="mt-6 flex items-center gap-3">
                                        <img
                                            width={40}
                                            height={40}
                                            src={image}
                                            alt={`Avatar of ${name}`}
                                            className="h-10 w-10 rounded-full object-cover ring-2 ring-neutral-100 transition-all duration-300 ease-in-out group-hover:ring-violet-400/30 dark:ring-neutral-800"
                                        />
                                        <div className="flex flex-col">
                                            <cite className="not-italic leading-5 font-semibold tracking-tight text-slate-900 transition-colors duration-300 dark:text-white">
                                                {name}
                                            </cite>
                                            <span className="mt-0.5 text-sm leading-5 tracking-tight text-neutral-500 transition-colors duration-300 dark:text-neutral-500">
                                                {role}
                                            </span>
                                        </div>
                                    </footer>
                                </blockquote>
                            </Motion.li>
                        ))}
                    </React.Fragment>
                ))}
            </Motion.ul>
        </div>
    );
}

export default function TestimonialV2() {
    return (
        <section aria-labelledby="testimonials-heading" className="relative overflow-hidden bg-transparent py-8">
            <Motion.div
                initial={{ opacity: 0, y: 50, rotate: -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                    opacity: { duration: 0.8 },
                }}
                className="mx-auto z-10 w-full max-w-6xl px-4"
            >
                <div className="mb-8 flex flex-col items-center text-center">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-200">
                        Testimoni
                    </p>

                    <h2
                        id="testimonials-heading"
                        className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl"
                    >
                        Apa Kata Pengguna Kami
                    </h2>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-white/70">
                        Lihat bagaimana pengguna menggunakan platform ini untuk menyusun pilihan belajar dan karir.
                    </p>
                </div>

                <div
                    className="mt-10 flex max-h-150 justify-center gap-6 overflow-hidden mask-[linear-gradient(to_bottom,transparent,black_6%,black_94%,transparent)]"
                    role="region"
                    aria-label="Scrolling Testimonials"
                >
                    <TestimonialsColumn testimonials={firstColumn} duration={15} />
                    <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
                    <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
                </div>
            </Motion.div>
        </section>
    );
}
