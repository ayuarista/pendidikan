import { FAQSection } from "@/components/ui/faqsection";

export default function FAQDemoPage() {
    const faqsLeft = [
        {
            question: "What makes this platform different?",
            answer:
                "Our platform combines AI-driven insights with human-centered design to help you build and scale digital experiences faster than ever.",
        },
        {
            question: "Can I use it for both personal and commercial projects?",
            answer:
                "Absolutely. You can use it freely for your personal projects, startups, or client work as long as you comply with our license terms.",
        },
    ];

    const faqsRight = [
        {
            question: "How often are new updates released?",
            answer:
                "We roll out major updates every quarter, along with smaller improvements and bug fixes on a biweekly basis.",
        },
        {
            question: "Can I integrate it with external APIs?",
            answer:
                "Yes, the system provides REST and GraphQL APIs that make integration with third-party tools and custom workflows easy.",
        },
    ];

    return (
        <main className="min-h-screen bg-background text-foreground">
            <FAQSection
                title="Platform & Product Support"
                subtitle="Frequently Asked Questions"
                description="Everything you need to know about how our platform works, from setup and customization to integrations and updates."
                buttonLabel="See Full Help Center ->"
                faqsLeft={faqsLeft}
                faqsRight={faqsRight}
            />
        </main>
    );
}
