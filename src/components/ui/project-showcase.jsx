"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
    {
        title: "Career Snapshot",
        description: "Peta cepat minat, kekuatan, dan kecocokan lewat jalur karir.",

        link: "/ai-career-test",
        image:
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    },
    {
        title: "Skill Gap Map",
        description: "Visualisasi gap skill untuk target profesi yang kamu pilih.",

        link: "/career-compare",
        image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    },
    {
        title: "Learning Roadmap",
        description: "Roadmap belajar bertahap dari level dasar sampai siap kerja.",

        link: "/explore-education",
        image:
            "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
    },
    {
        title: "Career Matching",
        description: "Bandingkan opsi karir berdasarkan data dan preferensi personal.",

        link: "/explore-career",
        image:
            "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
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
            <h3 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-200">
                Jelajahi Pilihan
            </h3>

            <div
                className="pointer-events-none absolute z-50 overflow-hidden rounded-xl shadow-2xl"
                style={{
                    left: smoothPosition.x + 24,
                    top: smoothPosition.y - 96,
                    opacity: isVisible ? 1 : 0,
                    scale: isVisible ? 1 : 0.8,
                    transition:
                        "opacity 0.25s cubic-bezier(0.4,0,0.2,1), scale 0.25s cubic-bezier(0.4,0,0.2,1)",
                }}
            >
                <div className="relative h-45 w-70 overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-900">
                    {projects.map((project, index) => (
                        <img
                            key={project.title}
                            src={project.image}
                            alt={project.title}
                            className="absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out"
                            style={{
                                opacity: hoveredIndex === index ? 1 : 0,
                                scale: hoveredIndex === index ? 1 : 1.08,
                                filter: hoveredIndex === index ? "none" : "blur(10px)",
                            }}
                        />
                    ))}
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                </div>
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
