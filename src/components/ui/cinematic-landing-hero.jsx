"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

const INJECTED_STYLES = `
  .iphone-bezel {
        background-color: #e5e7eb;
    box-shadow:
            inset 0 0 0 2px #94a3b8,
                        inset 0 0 0 7px #cbd5e1;
    transform-style: preserve-3d;
  }

    .dark .iphone-bezel {
        background-color: #111;
        box-shadow:
            inset 0 0 0 2px #52525b,
                        inset 0 0 0 7px #000;
    }

  .hardware-btn {
        background: linear-gradient(90deg, #cbd5e1 0%, #94a3b8 100%);
    box-shadow:
            -1px 0 4px rgba(15, 23, 42, 0.2),
            inset -1px 0 1px rgba(255, 255, 255, 0.65),
            inset 1px 0 1px rgba(15, 23, 42, 0.25);
        border-left: 1px solid rgba(255, 255, 255, 0.55);
    }

    .dark .hardware-btn {
        background: linear-gradient(90deg, #404040 0%, #171717 100%);
        box-shadow:
            -2px 0 5px rgba(0, 0, 0, 0.8),
            inset -1px 0 1px rgba(255, 255, 255, 0.15),
            inset 1px 0 2px rgba(0, 0, 0, 0.8);
        border-left: 1px solid rgba(255, 255, 255, 0.05);
  }

  .screen-glare {
        background: linear-gradient(110deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0) 45%);
    }

    .dark .screen-glare {
        background: linear-gradient(110deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 45%);
  }

  .widget-depth {
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(241, 245, 249, 0.85) 100%);
    box-shadow:
            0 8px 18px rgba(15, 23, 42, 0.14),
            inset 0 1px 1px rgba(255, 255, 255, 0.75),
            inset 0 -1px 1px rgba(148, 163, 184, 0.3);
        border: 1px solid rgba(148, 163, 184, 0.35);
    }

    .dark .widget-depth {
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%);
        box-shadow:
            0 10px 20px rgba(0, 0, 0, 0.3),
            inset 0 1px 1px rgba(255, 255, 255, 0.05),
            inset 0 -1px 1px rgba(0, 0, 0, 0.5);
        border: 1px solid rgba(255, 255, 255, 0.03);
  }

  .progress-ring {
    transform: rotate(-90deg);
    transform-origin: center;
    stroke-dasharray: 402;
    stroke-dashoffset: 90;
    stroke-linecap: round;
  }
`;

export function CinematicHero({ className, ...props }) {
    const phoneRef = useRef(null);

    useEffect(() => {
        if (!phoneRef.current) return;

        gsap.fromTo(
            phoneRef.current,
            { y: 35, autoAlpha: 0, rotateY: -12, rotateX: 8, scale: 0.92 },
            { y: 0, autoAlpha: 1, rotateY: 0, rotateX: 0, scale: 1, duration: 1.2, ease: "power3.out" },
        );
    }, []);

    return (
        <div className={cn("relative flex h-full w-full items-center justify-center overflow-visible", className)} {...props}>
            <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />

            <div ref={phoneRef} className="relative h-145 w-70 max-w-full scale-[0.72] sm:scale-[0.8] md:scale-[0.84] lg:scale-[0.94]">
                <div className="iphone-bezel relative flex h-full w-full rounded-[3rem]">
                    <div className="hardware-btn absolute top-30 -left-0.75 z-0 h-6.25 w-0.75 rounded-l-md" aria-hidden="true" />
                    <div className="hardware-btn absolute top-40 -left-0.75 z-0 h-11.25 w-0.75 rounded-l-md" aria-hidden="true" />
                    <div className="hardware-btn absolute top-55 -left-0.75 z-0 h-11.25 w-0.75 rounded-l-md" aria-hidden="true" />
                    <div className="hardware-btn absolute top-42.5 -right-0.75 z-0 h-17.5 w-0.75 scale-x-[-1] rounded-r-md" aria-hidden="true" />

                    <div className="absolute inset-1.75 z-10 overflow-hidden rounded-[2.5rem] bg-[#f8fbff] text-slate-900 shadow-[inset_0_0_12px_rgba(148,163,184,0.35)] dark:bg-[#050914] dark:text-white dark:shadow-[inset_0_0_15px_rgba(0,0,0,1)]">
                        <div className="screen-glare pointer-events-none absolute inset-0 z-40" aria-hidden="true" />

                        <div className="absolute top-1.25 left-1/2 z-50 flex h-7 w-25 -translate-x-1/2 items-center justify-end rounded-full bg-slate-300 px-3 shadow-[inset_0_-1px_2px_rgba(148,163,184,0.35)] dark:bg-black dark:shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)]">
                            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                        </div>

                        <div className="relative flex h-full flex-col px-5 pt-12 pb-8">
                            <div className="mb-8 flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="mb-1 text-[10px] font-bold tracking-widest text-slate-500 uppercase dark:text-neutral-400">ANALISIS AI</span>
                                    <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Cara Kerja</span>
                                </div>
                                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white dark:border-white/10 dark:bg-white/5">
                                    {/* Step-by-step/process icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-blue-600 dark:text-blue-300">
                                        <path d="M4 17h4v-2H4v-2h4v-2H4V9h4V7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4v-2H4v-2zm6-10v2h8v2h-8v2h8v2h-8v2h8v2h-8v2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-8z" fill="currentColor" />
                                    </svg>
                                </div>
                            </div>

                            <div className="relative mx-auto mb-8 flex h-44 w-44 items-center justify-center drop-shadow-[0_10px_18px_rgba(148,163,184,0.35)] dark:drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]">
                                <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
                                    <circle cx="88" cy="88" r="64" fill="none" stroke="rgba(148,163,184,0.3)" strokeWidth="12" />
                                    <circle className="progress-ring" cx="88" cy="88" r="64" fill="none" stroke="#3b82f6" strokeWidth="12" />
                                </svg>
                                <div className="z-10 flex flex-col items-center text-center">
                                    <span className="text-4xl font-extrabold tracking-tighter text-slate-900 dark:text-white">4 </span>
                                    <span className="mt-0.5 text-[8px] font-bold tracking-widest text-blue-700/65 uppercase dark:text-blue-200/50">Alur kerja</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="widget-depth flex items-center rounded-2xl p-3">
                                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-linear-to-br from-blue-500/20 to-blue-600/5 shadow-inner">
                                        <svg className="h-4 w-4 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <div className="mb-2 h-2 w-20 rounded-full bg-slate-300 dark:bg-neutral-300" />
                                        <div className="h-1.5 w-12 rounded-full bg-slate-500 dark:bg-neutral-600" />
                                    </div>
                                </div>

                                <div className="widget-depth flex items-center rounded-2xl p-3">
                                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/20 bg-linear-to-br from-emerald-500/20 to-emerald-600/5 shadow-inner">
                                        <svg className="h-4 w-4 text-emerald-500 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <div className="mb-2 h-2 w-16 rounded-full bg-slate-300 dark:bg-neutral-300" />
                                        <div className="h-1.5 w-24 rounded-full bg-slate-500 dark:bg-neutral-600" />
                                    </div>
                                </div>
                            </div>

                            <div className="absolute bottom-2 left-1/2 h-1 w-30 -translate-x-1/2 rounded-full bg-slate-400/60 dark:bg-white/20" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
