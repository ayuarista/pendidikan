import { useEffect, useState } from "react";
import { LuChevronUp } from "react-icons/lu";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 260);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      className={`fixed bottom-6 right-6 z-1200 h-11 w-11 rounded-full bg-slate-900 text-white shadow-lg shadow-black/20 transition-all duration-300 hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:bg-white dark:text-slate-900 dark:shadow-black/30 dark:hover:bg-neutral-200 dark:focus-visible:ring-white/70 ${visible
          ? "translate-y-0 opacity-100 hover:shadow-xl"
          : "pointer-events-none translate-y-4 opacity-0"
        }`}
    >
      <LuChevronUp className="mx-auto h-5 w-5" />
    </button>
  );
}
