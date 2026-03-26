import { useState, useEffect } from "react";
import { LuMoonStar, LuSunMedium } from "react-icons/lu";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Jika tersimpan dark ATAU system prefer dark, aktifkan dark mode
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 flex items-center justify-center rounded-full 
                 bg-slate-200 dark:bg-slate-800 
                 border border-slate-300 dark:border-slate-700 
                 hover:border-amber-500 
                 transition-all duration-300 group"
      aria-label={isDark ? "Dark mode active" : "Light mode active"}
      title={isDark ? "Dark mode" : "Light mode"}
    >
      {/* Sun icon for light mode */}
      <LuSunMedium
        className={`absolute w-5 h-5 text-amber-500 transition-all duration-300 
          ${!isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-0"}`}
      />
      
      {/* Moon icon for dark mode */}
      <LuMoonStar
        className={`absolute w-5 h-5 text-amber-300 transition-all duration-300 
          ${isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"}`}
      />
    </button>
  );
}