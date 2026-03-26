import {
    CheckCircle,
    Globe,
    TrendingUp,
    GraduationCap,
} from "lucide-react";
import { BentoGrid } from "@/components/ui/bento-grid";

const itemsSample = [
    {
        title: "Masih Bingung Total",
        meta: "Mulai Di Sini",
        description: "Mulai dari AI Career Test untuk dapat gambaran awal minat, gaya kerja, dan arah karir yang paling cocok.",
        icon: <TrendingUp className="h-4 w-4 text-blue-500" />,
        status: "Tes AI",
        tags: ["Langkah 1", "Wajib"],
        colSpan: 2,
        hasPersistentHover: true,
        cta: "Mulai dari Tes ->",
        to: "/ai-career-test",
    },
    {
        title: "Sudah Punya Opsi Karir",
        meta: "Validasi Data",
        description: "Pakai Explore Career untuk cek prospek, rentang gaji, kebutuhan skill, dan realita lapangan kerja.",
        icon: <CheckCircle className="h-4 w-4 text-emerald-500" />,
        status: "Karir",
        tags: ["Langkah 2", "Karir"],
        cta: "Cek Karir ->",
        to: "/explore-career",
    },
    {
        title: "Mau Cocokkan Jurusan",
        meta: "Jalur Belajar",
        description: "Pakai Explore Education kalau kamu ingin tahu jurusan mana yang paling nyambung ke target karirmu.",
        icon: <GraduationCap className="h-4 w-4 text-purple-500" />,
        status: "Jurusan",
        tags: ["Langkah 3", "Pendidikan"],
        colSpan: 1,
        cta: "Cek Jurusan ->",
        to: "/explore-education",
    },
    {
        title: "Finalisasi Keputusan",
        meta: "Final Check",
        description: "Gunakan Career Compare di tahap akhir untuk membandingkan opsi terakhir secara objektif sebelum memilih.",
        icon: <Globe className="h-4 w-4 text-sky-500" />,
        status: "Banding",
        tags: ["Langkah 4", "Decision"],
        colSpan: 2,
        cta: "Final Compare ->",
        to: "/career-compare",
    },
];

function BentoGridDemo() {
    return <BentoGrid items={itemsSample} />;
}

export { BentoGridDemo };
