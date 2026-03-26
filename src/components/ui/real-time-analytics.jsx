"use client";

import { useEffect, useRef, useState } from "react";

export function RealTimeAnalytics({ className = "" }) {
    const [data, setData] = useState(() => {
        const initial = [];
        for (let i = 0; i < 20; i++) {
            initial.push({
                time: Date.now() - (20 - i) * 1000,
                value: 30 + Math.random() * 40,
            });
        }
        return initial;
    });
    const [hoveredPoint, setHoveredPoint] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const svgRef = useRef(null);

    const maxPoints = 24;
    const width = 800;
    const height = 300;
    const padding = { top: 20, right: 20, bottom: 40, left: 50 };

    useEffect(() => {
        const interval = setInterval(() => {
            setData((prev) => {
                const lastValue = prev[prev.length - 1]?.value ?? 50;
                const newPoint = {
                    time: Date.now(),
                    value: Math.max(10, Math.min(90, lastValue + (Math.random() - 0.5) * 20)),
                };
                return [...prev, newPoint].slice(-maxPoints);
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const getX = (time) => {
        if (data.length < 2) return padding.left;
        const minTime = data[0]?.time || 0;
        const maxTime = data[data.length - 1]?.time || 1;
        const range = maxTime - minTime || 1;
        return padding.left + ((time - minTime) / range) * (width - padding.left - padding.right);
    };

    const getY = (value) => padding.top + (1 - value / 100) * (height - padding.top - padding.bottom);

    const getPath = () => {
        if (data.length < 2) return "";
        return data
            .map((point, i) => {
                const x = getX(point.time);
                const y = getY(point.value);
                return `${i === 0 ? "M" : "L"} ${x},${y}`;
            })
            .join(" ");
    };

    const getAreaPath = () => {
        if (data.length < 2) return "";
        const linePath = getPath();
        const lastX = getX(data[data.length - 1].time);
        const firstX = getX(data[0].time);
        const bottomY = height - padding.bottom;
        return `${linePath} L ${lastX},${bottomY} L ${firstX},${bottomY} Z`;
    };

    const handleMouseMove = (e) => {
        if (!svgRef.current) return;
        const rect = svgRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePos({ x, y });

        let closest = null;
        let minDist = Number.POSITIVE_INFINITY;
        data.forEach((point) => {
            const px = getX(point.time);
            const dist = Math.abs(px - x);
            if (dist < minDist && dist < 30) {
                minDist = dist;
                closest = point;
            }
        });

        setHoveredPoint(closest);
    };

    const currentValue = data[data.length - 1]?.value || 0;
    const avg = (data.reduce((a, b) => a + b.value, 0) / data.length || 0).toFixed(1);
    const peak = Math.max(...data.map((d) => d.value), 0).toFixed(1);

    return (
        <section className={`px-4 py-8 ${className}`}>
            <div className="mx-auto w-full max-w-6xl">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-200">Insight Perkembangan</p>
                        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">Tren Kesiapan Karir</h2>
                        <p className="mt-1 text-sm text-slate-600 dark:text-white/65">Pergerakan skor minat dan kesiapan belajar secara dinamis</p>
                    </div>

                    <div className="inline-flex items-center gap-3 rounded-xl bg-white px-4 py-3 backdrop-blur dark:bg-[rgb(20,20,24)]">
                        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
                        <span className="text-sm text-slate-600 dark:text-white/70">Aktif</span>
                        <span className="text-xl font-bold text-slate-900 dark:text-white">{currentValue.toFixed(1)}%</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_260px] lg:grid-cols-[minmax(0,1fr)_300px]">
                    <div className="relative overflow-hidden rounded-3xl bg-white p-3 backdrop-blur md:p-5 dark:bg-[rgb(20,20,24)]">
                        <svg
                            ref={svgRef}
                            width="100%"
                            height={height}
                            viewBox={`0 0 ${width} ${height}`}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={() => setHoveredPoint(null)}
                            className="cursor-crosshair"
                        >
                            <defs>
                                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#6366f1">
                                        <animate attributeName="stop-color" values="#6366f1;#8b5cf6;#6366f1" dur="3s" repeatCount="indefinite" />
                                    </stop>
                                    <stop offset="50%" stopColor="#8b5cf6">
                                        <animate attributeName="stop-color" values="#8b5cf6;#a855f7;#8b5cf6" dur="3s" repeatCount="indefinite" />
                                    </stop>
                                    <stop offset="100%" stopColor="#a855f7">
                                        <animate attributeName="stop-color" values="#a855f7;#6366f1;#a855f7" dur="3s" repeatCount="indefinite" />
                                    </stop>
                                </linearGradient>
                                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.28" />
                                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                                </linearGradient>
                            </defs>

                            {[0, 25, 50, 75, 100].map((val) => (
                                <g key={val}>
                                    <line x1={padding.left} y1={getY(val)} x2={width - padding.right} y2={getY(val)} stroke="#2c3f63" strokeDasharray="4 6" />
                                    <text x={padding.left - 10} y={getY(val)} fill="#7f93b7" fontSize="12" textAnchor="end" dominantBaseline="middle">
                                        {val}%
                                    </text>
                                </g>
                            ))}

                            <path d={getAreaPath()} fill="url(#areaGradient)" />

                            <path d={getPath()} fill="none" stroke="url(#lineGradient)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 10px rgba(139,92,246,.55))" }} />

                            {data.map((point, i) => (
                                <circle
                                    key={point.time}
                                    cx={getX(point.time)}
                                    cy={getY(point.value)}
                                    r={i === data.length - 1 ? 6 : 3.5}
                                    fill={i === data.length - 1 ? "#a855f7" : "#6366f1"}
                                    style={{
                                        opacity: hoveredPoint?.time === point.time ? 1 : 0.75,
                                        transition: "opacity .2s ease",
                                    }}
                                />
                            ))}

                            {hoveredPoint && (
                                <>
                                    <line
                                        x1={getX(hoveredPoint.time)}
                                        y1={padding.top}
                                        x2={getX(hoveredPoint.time)}
                                        y2={height - padding.bottom}
                                        stroke="#7c3aed"
                                        strokeDasharray="5 6"
                                        opacity="0.65"
                                    />
                                    <circle cx={getX(hoveredPoint.time)} cy={getY(hoveredPoint.value)} r="8" fill="none" stroke="#c084fc" strokeWidth="2" />
                                </>
                            )}
                        </svg>

                        {hoveredPoint && (
                            <div
                                style={{
                                    position: "absolute",
                                    left: mousePos.x,
                                    top: mousePos.y - 46,
                                    transform: "translateX(-50%)",
                                }}
                                className="pointer-events-none z-10 rounded-lg border border-violet-400/25 bg-slate-950/95 px-3 py-2 shadow-lg"
                            >
                                <div className="text-sm font-semibold text-white">{hoveredPoint.value.toFixed(1)}%</div>
                                <div className="text-xs text-white/60">{new Date(hoveredPoint.time).toLocaleTimeString()}</div>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-1">
                        {[
                            { label: "Rata-rata", value: avg, unit: "%" },
                            { label: "Tertinggi", value: peak, unit: "%" },
                            { label: "Jumlah Data", value: data.length.toString(), unit: "" },
                        ].map((stat) => (
                            <article key={stat.label} className="rounded-2xl bg-white px-4 py-5 text-center backdrop-blur dark:bg-[rgb(20,20,24)]">
                                <p className="text-sm text-slate-500 dark:text-white/55">{stat.label}</p>
                                <p className="mt-1 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                                    {stat.value}
                                    <span className="text-2xl">{stat.unit}</span>
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
