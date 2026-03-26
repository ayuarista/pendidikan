import { UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";

const reviews = [
    {
        name: "Raka",
        username: "@raka12",
        body: "AI Career Test-nya bikin aku lebih yakin milih jalur yang cocok sama minatku.",
    },
    {
        name: "Nadia",
        username: "@nadiastudy",
        body: "Explore Career ngebantu banget karena datanya detail dan gampang dipahami.",
    },
    {
        name: "Fikri",
        username: "@fikriwork",
        body: "Fitur compare itu paling kepake pas aku bingung antara dua opsi karir.",
    },
    {
        name: "Salsa",
        username: "@salsaedu",
        body: "Explore Education kasih gambaran jurusan dan skill yang dibutuhin secara jelas.",
    },
    {
        name: "Dimas",
        username: "@dimasdev",
        body: "UI-nya enak dipakai, jadi proses cari info karir kerasa ringan.",
    },
    {
        name: "Alya",
        username: "@alyafuture",
        body: "Dari tes sampai compare alurnya jelas, jadi aku ga bingung mulai dari mana.",
    },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

function ReviewCard({ name, username, body }) {
    return (
        <figure
            className={cn(
                "relative w-72 cursor-pointer overflow-hidden rounded-xl border border-violet-200/25 bg-white/8 p-4",
                "transition-colors duration-300 hover:bg-white/12 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10",
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/20 text-violet-200">
                    <UserRound className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                    <figcaption className="text-sm font-semibold text-white">{name}</figcaption>
                    <p className="text-xs font-medium text-white/55">{username}</p>
                </div>
            </div>
            <blockquote className="mt-3 text-sm leading-6 text-white/75">{body}</blockquote>
        </figure>
    );
}

function MarqueeDemo() {
    return (
        <div className="group relative flex w-full flex-col items-center justify-center gap-3 overflow-hidden [--duration:26s] [--gap:0.75rem]">
            <Marquee pauseOnHover>
                {firstRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <Marquee reverse pauseOnHover>
                {secondRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-linear-to-r from-[#0a0618] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-linear-to-l from-[#0a0618] to-transparent" />
        </div>
    );
}

export { MarqueeDemo };
