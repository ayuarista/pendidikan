"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import ringkasanKarierLight from "../../assets/ringkasankarir-light.jpeg";
import ringkasanKarierDark from "../../assets/ringkasankarir-dark.jpeg";
import kesenjanganLight from "../../assets/kesenjangan-light.png";
import kesenjanganDark from "../../assets/kesenjangan-dark.png";
import petaJalanBelajarLight from "../../assets/petajalanbelajar-light.png";
import petaJalanBelajarDark from "../../assets/petajalanbelajar-dark.png";
import pencocokanKarierLight from "../../assets/pencocokankarir-light.png";
import pencocokanKarierDark from "../../assets/pencocokankarir-dark.png";

const projects = [
    {
        title: "Ringkasan Karier",
        description: "Peta cepat minat, kekuatan, dan kecocokan lewat jalur karir.",

        link: "/ai-career-test",
        imageLight: ringkasanKarierLight,
        imageDark: ringkasanKarierDark,
    },
    {
        title: "Peta Kesenjangan Skill",
        description: "Visualisasi gap skill untuk target profesi yang kamu pilih.",

        link: "/career-compare",
        imageLight: kesenjanganLight,
        imageDark: kesenjanganDark,
    },
    {
        title: "Peta Jalan Belajar",
        description: "Roadmap belajar bertahap dari level dasar sampai siap kerja.",

        link: "/explore-education",
        imageLight: petaJalanBelajarLight,
        imageDark: petaJalanBelajarDark,
    },
    {
        title: "Pencocokan Karier",
        description: "Bandingkan opsi karir berdasarkan data dan preferensi personal.",

        link: "/explore-career",
        imageLight: pencocokanKarierLight,
        imageDark: pencocokanKarierDark,
    },
];

export function ProjectShowcase() {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        const lerp = (start, end, factor) => start + (end - start) * factor;

        const animate = () => {
            setSmoothPosition((prev) => ({
                x: lerp(prev.x, mousePosition.x, 0.15),
                y: lerp(prev.y, mousePosition.y, 0.15),
            }));
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [mousePosition]);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
        setIsVisible(true);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
        setIsVisible(false);
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative mx-auto w-full max-w-2xl px-2 py-3 lg:py-8"
        >
            <h3 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400 dark:text-white/25">
                Jelajahi Pilihan
            </h3>

            <div
                className="pointer-events-none absolute z-50"
                style={{
                    left: smoothPosition.x + 24,
                    top: smoothPosition.y - 96,
                    opacity: isVisible ? 1 : 0,
                    scale: isVisible ? 1 : 0.8,
                    transition:
                        "opacity 0.25s cubic-bezier(0.4,0,0.2,1), scale 0.25s cubic-bezier(0.4,0,0.2,1)",
                }}
            >
                {hoveredIndex !== null && (
                    <div className="rounded-xl border border-slate-300/45 bg-white p-1 dark:border-[rgba(255,255,255,0.12)] dark:bg-[rgb(20,20,24)]">
                        <img
                            src={projects[hoveredIndex].imageLight}
                            alt={projects[hoveredIndex].title}
                            className="block max-h-70 w-auto max-w-105 rounded-lg object-contain dark:hidden"
                        />
                        <img
                            src={projects[hoveredIndex].imageDark}
                            alt={projects[hoveredIndex].title}
                            className="hidden max-h-70 w-auto max-w-105 rounded-lg object-contain dark:block"
                        />
                    </div>
                )}
            </div>

            <div className="space-y-0">
                {projects.map((project, index) => (
                    <a
                        key={project.title}
                        href={project.link}
                        className="group block"
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="relative border-t border-slate-300/45 py-4 transition-all duration-300 ease-out dark:border-[rgba(255,255,255,0.06)]">
                            <div
                                className={`
                                    absolute inset-0 -mx-3 rounded-lg bg-slate-100 px-3 dark:bg-[rgb(20,20,24)]
                  transition-all duration-300 ease-out
                  ${hoveredIndex === index ? "scale-100 opacity-100" : "scale-95 opacity-0"}
                `}
                            />

                            <div className="relative flex items-start justify-between gap-3">
                                <div className="min-w-0 flex-1">
                                    <div className="inline-flex items-center gap-2">
                                        <h4 className="text-base font-medium tracking-tight text-slate-900 dark:text-white md:text-lg">
                                            <span className="relative">
                                                {project.title}
                                                <span
                                                    className={`
                            absolute -bottom-0.5 left-0 h-px bg-slate-900 dark:bg-white
                            transition-all duration-300 ease-out
                            ${hoveredIndex === index ? "w-full" : "w-0"}
                          `}
                                                />
                                            </span>
                                        </h4>

                                        <ArrowUpRight
                                            className={`
                        h-4 w-4 text-slate-500 dark:text-white/70
                        transition-all duration-300 ease-out
                        ${hoveredIndex === index
                                                    ? "translate-x-0 translate-y-0 opacity-100"
                                                    : "-translate-x-2 translate-y-2 opacity-0"
                                                }
                      `}
                                        />
                                    </div>

                                    <p
                                        className={`
                      mt-1 text-sm leading-relaxed transition-all duration-300 ease-out
                      ${hoveredIndex === index ? "text-slate-700 dark:text-white/75" : "text-slate-500 dark:text-white/60"}
                    `}
                                    >
                                        {project.description}
                                    </p>
                                </div>

                                <span
                                    className={`
                    text-xs font-mono tabular-nums text-slate-500 dark:text-white/55
                    transition-all duration-300 ease-out
                    ${hoveredIndex === index ? "text-slate-700 dark:text-white/75" : ""}
                  `}
                                >
                                    {project.year}
                                </span>
                            </div>
                        </div>
                    </a>
                ))}

                <div className="border-t border-slate-300/45 dark:border-[rgba(255,255,255,0.06)]" />
            </div>
        </section>
    );
}
