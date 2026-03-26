"use client";

import { Briefcase, Brain, Compass, Goal, Sparkles } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const timelineData = [
    {
        id: 1,
        title: "Minat",
        date: "Tahap 1",
        content: "Identifikasi minat dan gaya belajar untuk menentukan arah awal yang paling relevan.",
        category: "Awal",
        icon: Brain,
        relatedIds: [2],
        status: "completed",
        energy: 92,
    },
    {
        id: 2,
        title: "Eksplorasi",
        date: "Tahap 2",
        content: "Bandingkan beberapa opsi karir dan jurusan berdasarkan data kebutuhan industri.",
        category: "Riset",
        icon: Compass,
        relatedIds: [1, 3],
        status: "completed",
        energy: 85,
    },
    {
        id: 3,
        title: "Rencana",
        date: "Tahap 3",
        content: "Susun roadmap skill, sertifikasi, dan milestone belajar yang realistis.",
        category: "Strategi",
        icon: Goal,
        relatedIds: [2, 4],
        status: "in-progress",
        energy: 64,
    },
    {
        id: 4,
        title: "Aksi",
        date: "Tahap 4",
        content: "Eksekusi langkah belajar terukur sambil mengevaluasi progres secara berkala.",
        category: "Eksekusi",
        icon: Briefcase,
        relatedIds: [3, 5],
        status: "pending",
        energy: 42,
    },
    {
        id: 5,
        title: "Peningkatan",
        date: "Tahap 5",
        content: "Optimalkan portofolio dan kesiapan kerja berdasarkan feedback dan tren terbaru.",
        category: "Optimasi",
        icon: Sparkles,
        relatedIds: [4],
        status: "pending",
        energy: 28,
    },
];

export function RadialOrbitalTimelineDemo() {
    return <RadialOrbitalTimeline timelineData={timelineData} />;
}
