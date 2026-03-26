"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function FAQSection({
    title = "Product & Account Help",
    subtitle = "Frequently Asked Questions",
    description = "Get instant answers to the most common questions about your account, product setup, and updates.",
    buttonLabel = "Browse All FAQs ->",
    onButtonClick,
    faqsLeft,
    faqsRight,
    className,
}) {
    const allFaqs = [...(faqsLeft || []), ...(faqsRight || [])];

    return (
        <section className={cn("w-full px-4 py-12", className)}>
            <div className="mx-auto w-full max-w-6xl rounded-3xl bg-white p-5 backdrop-blur-xl md:p-8 dark:bg-[#0f172a]/70">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-[0.92fr_1.08fr] md:gap-10">
                    <div className="flex h-full flex-col">
                        <p className="inline-flex w-fit self-start items-center rounded-full px-3 py-1 text-[11px] font-medium tracking-[0.06em] text-neutral-400 dark:text-white/25">
                            {subtitle}
                        </p>
                        <h2 className="mt-5 text-3xl leading-[1.02] font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">{title}</h2>
                        <p className="mt-4 max-w-md text-sm leading-7 text-slate-600 dark:text-gray-400">{description}</p>

                        <div className="relative mt-8 hidden overflow-hidden rounded-2xl bg-slate-50 p-5 md:mt-auto md:block dark:bg-linear-to-br dark:from-black dark:via-zinc-950 dark:to-zinc-900">
                            <h3 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Masih punya pertanyaan?</h3>
                            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600 dark:text-gray-400">
                                Belum menemukan jawaban yang kamu cari? Kirim email ke kami dan tim kami akan segera membantu secepat mungkin.
                            </p>
                            <Button
                                variant="default"
                                className="mt-5 rounded-full bg-[#7c3aed] px-5 text-white transition-colors duration-300 hover:bg-[#8b5cf6]"
                                onClick={onButtonClick}
                            >
                                {buttonLabel}
                            </Button>
                        </div>
                    </div>

                    <Accordion type="single" collapsible className="space-y-3">
                        {allFaqs.map((faq, i) => (
                            <AccordionItem
                                key={faq.question}
                                value={`item-${i}`}
                                className="rounded-xl bg-white px-4 transition-all duration-300 data-[state=open]:bg-slate-50 dark:bg-black/45 dark:data-[state=open]:bg-black/40"
                            >
                                <AccordionTrigger className="py-4 text-sm font-medium text-slate-900 hover:no-underline dark:text-white md:text-base">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-sm leading-7 text-slate-600 dark:text-gray-400">
                                    <div className="min-h-10">{faq.answer}</div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <div className="relative overflow-hidden rounded-2xl bg-slate-50 p-5 md:hidden dark:bg-linear-to-br dark:from-black dark:via-zinc-950 dark:to-zinc-900">
                        <h3 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Masih punya pertanyaan?</h3>
                        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600 dark:text-gray-400">
                            Belum menemukan jawaban yang kamu cari? Kirim email ke kami dan tim kami akan segera membantu secepat mungkin.
                        </p>
                        <Button
                            variant="default"
                            className="mt-5 rounded-full bg-[#7c3aed] px-5 text-white transition-colors duration-300 hover:bg-[#8b5cf6]"
                            onClick={onButtonClick}
                        >
                            {buttonLabel}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export { FAQSection };
