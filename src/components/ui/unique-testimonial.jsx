"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const testimonials = [
    {
        id: 1,
        quote: "Platform ini bikin aku jauh lebih yakin milih arah karir.",
        author: "Nadia Putri",
        role: "Mahasiswi Sistem Informasi",
        avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    },
    {
        id: 2,
        quote: "Rekomendasinya jelas dan membantu aku fokus belajar skill penting.",
        author: "Rizky Pratama",
        role: "Fresh Graduate Teknik Informatika",
        avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    },
    {
        id: 3,
        quote: "Fitur compare-nya ngebantu banget waktu bingung pilih 2 jalur karir.",
        author: "Aulia Rahma",
        role: "Siswa SMA Kelas 12",
        avatar:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    },
];

export function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [displayedQuote, setDisplayedQuote] = useState(testimonials[0].quote);
    const [displayedRole, setDisplayedRole] = useState(testimonials[0].role);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleSelect = (index) => {
        if (index === activeIndex || isAnimating) return;
        setIsAnimating(true);

        setTimeout(() => {
            setDisplayedQuote(testimonials[index].quote);
            setDisplayedRole(testimonials[index].role);
            setActiveIndex(index);
            setTimeout(() => setIsAnimating(false), 350);
        }, 180);
    };

    return (
        <div className="flex w-full flex-col items-start gap-6 py-4">
            <div className="relative px-1">
                <p
                    className={cn(
                        "max-w-2xl text-left text-base leading-relaxed text-slate-800 transition-all duration-300 ease-out dark:text-white/92 md:text-lg",
                        isAnimating ? "scale-[0.99] opacity-0 blur-[1.5px]" : "scale-100 opacity-100 blur-0"
                    )}
                >
                    {displayedQuote}
                </p>
            </div>

            <div className="mt-1 flex flex-col items-start gap-4">
                <p
                    className={cn(
                        "text-[11px] uppercase tracking-[0.2em] text-violet-700 transition-all duration-300 dark:text-violet-200/90",
                        isAnimating ? "translate-y-1 opacity-0" : "translate-y-0 opacity-100"
                    )}
                >
                    {displayedRole}
                </p>

                <div className="flex flex-wrap items-center gap-2">
                    {testimonials.map((testimonial, index) => {
                        const isActive = activeIndex === index;
                        const isHovered = hoveredIndex === index && !isActive;
                        const showName = isActive || isHovered;

                        return (
                            <button
                                key={testimonial.id}
                                type="button"
                                onClick={() => handleSelect(index)}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className={cn(
                                    "relative flex items-center rounded-full transition-all duration-300",
                                    isActive
                                        ? "bg-white text-slate-900 shadow-lg shadow-black/20"
                                        : "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20",
                                    showName ? "gap-2 px-2 py-2 pr-3" : "p-1"
                                )}
                            >
                                <img
                                    src={testimonial.avatar || "/placeholder.svg"}
                                    alt={testimonial.author}
                                    className={cn(
                                        "h-8 w-8 rounded-full object-cover transition-all duration-300",
                                        isActive ? "ring-2 ring-violet-400/40" : "ring-0"
                                    )}
                                />

                                <div
                                    className={cn(
                                        "grid transition-all duration-300",
                                        showName ? "ml-0 grid-cols-[1fr] opacity-100" : "ml-0 grid-cols-[0fr] opacity-0"
                                    )}
                                >
                                    <div className="overflow-hidden">
                                        <span className="block whitespace-nowrap text-sm font-medium">
                                            {testimonial.author}
                                        </span>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
