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
      className={`fixed bottom-6 right-6 z-1200 h-11 w-11 rounded-full text-white shadow-lg shadow-orange-700/20 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
        visible
          ? "translate-y-0 opacity-100 hover:shadow-xl hover:shadow-orange-600/45"
          : "pointer-events-none translate-y-4 opacity-0"
      } bg-linear-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600`}
    >
      <LuChevronUp className="mx-auto h-5 w-5" />
    </button>
  );
}
