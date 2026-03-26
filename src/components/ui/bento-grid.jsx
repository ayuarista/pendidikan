"use client";

import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

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

    if (key === "beta") {
        return "bg-fuchsia-100 text-fuchsia-700 ring-1 ring-fuchsia-200 dark:bg-fuchsia-500/15 dark:text-fuchsia-300 dark:ring-fuchsia-400/25";
    }

    return "bg-black/5 text-gray-600 ring-1 ring-black/10 dark:bg-white/10 dark:text-gray-300 dark:ring-white/15";
}

const defaultItems = [
    {
        title: "AI Career Test",
        meta: "Personalisasi",
        description: "Tes minat dan gaya kerja berbasis AI untuk memetakan arah karir yang paling cocok.",
        icon: null,
        status: "Tes AI",
        tags: ["AI", "Assessment", "Insight"],
        colSpan: 2,
        hasPersistentHover: true,
        cta: "Mulai Tes ->",
        to: "/ai-career-test",
    },
    {
        title: "Explore Career",
        meta: "Berbasis Data",
        description: "Jelajahi profesi berdasarkan prospek, rentang gaji, tools, dan level entry.",
        icon: null,
        status: "Karir",
        tags: ["Career", "Market"],
        cta: "Lihat Karir ->",
        to: "/explore-career",
    },
    {
        title: "Explore Education",
        meta: "Jalur Akademik",
        description: "Temukan jurusan, materi inti, dan hubungan langsung ke opsi karir masa depan.",
        icon: null,
        status: "Jurusan",
        tags: ["Major", "Skill", "Path"],
        colSpan: 2,
        cta: "Lihat Jurusan ->",
        to: "/explore-education",
    },
    {
        title: "Career Compare",
        meta: "Bantuan Keputusan",
        description: "Bandingkan beberapa opsi karir berdampingan agar keputusan lebih objektif.",
        icon: null,
        status: "Banding",
        tags: ["Compare", "Decision"],
        cta: "Bandingkan ->",
        to: "/career-compare",
    },
];

function BentoGrid({ items = defaultItems }) {
    return (
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 p-1 md:grid-cols-3">
            {items.map((item) => {
                const cardClassName = cn(
                    "group relative overflow-hidden rounded-xl bg-white p-4 transition-all duration-300 will-change-transform dark:bg-black will-change-transform",
                    "hover:-translate-y-0.5",
                    item.colSpan === 2 ? "md:col-span-2" : "col-span-1",
                    item.hasPersistentHover && "-translate-y-0.5",
                    item.to && "cursor-pointer",
                );

                const content = (
                    <>
                        <div
                            className={cn(
                                "absolute inset-0 transition-opacity duration-300",
                                item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                            )}
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-size-[4px_4px] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)]" />
                        </div>

                        <div className="relative flex flex-col space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/5 transition-all duration-300 group-hover:bg-linear-to-br dark:bg-white/10">
                                    {item.icon || <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">AI</span>}
                                </div>
                                <span
                                    className={cn(
                                        "rounded-lg px-2 py-1 text-xs font-semibold backdrop-blur-sm transition-colors duration-300",
                                        getStatusClass(item.status),
                                    )}
                                >
                                    {item.status || "Karir"}
                                </span>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-[15px] font-medium tracking-tight text-gray-900 dark:text-gray-100">
                                    {item.title}
                                    <span className="ml-2 text-xs font-normal text-gray-500 dark:text-gray-400">{item.meta}</span>
                                </h3>
                                <p className="text-sm leading-snug font-[425] text-gray-600 dark:text-gray-300">{item.description}</p>
                            </div>

                            <div className="mt-2 flex items-center justify-between">
                                <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                                    {item.tags?.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-md bg-black/5 px-2 py-1 backdrop-blur-sm transition-all duration-200 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                                <span className="text-xs text-gray-500 opacity-0 transition-all group-hover:opacity-100 group-hover:text-violet-700 dark:text-gray-400 dark:group-hover:text-violet-300">
                                    {item.cta || "Explore ->"}
                                </span>
                            </div>
                        </div>

                        <div
                            className={cn(
                                "absolute inset-0 -z-10 rounded-xl bg-linear-to-br from-transparent via-gray-100/50 to-transparent p-px transition-opacity duration-300 dark:via-white/10",
                                item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                            )}
                        />
                    </>
                );

                if (item.to) {
                    return (
                        <Link key={item.title} to={item.to} className={cardClassName}>
                            {content}
                        </Link>
                    );
                }

                return (
                    <div key={item.title} className={cardClassName}>
                        {content}
                    </div>
                );
            })}
        </div>
    );
}

export { BentoGrid };
