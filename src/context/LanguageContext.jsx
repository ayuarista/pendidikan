import { createContext, useContext, useState } from "react";

const translations = {
    en: {
        menu: ["Home", "AI Career Test", "Career Compare", "Explore Career", "Explore Education"],
        cta: "Start Quest",
        openMenu: "Open menu",
        closeMenu: "Close menu",
        footer: {
            tagline: "A modern education platform preparing the next generation with the best technology.",
            newsletterPlaceholder: "Your email...",
            newsletterAriaLabel: "Subscribe to newsletter",
            subscribeBtnLabel: "Subscribe",
            columns: {
                Platform: ["Home", "AI Career Test", "Career Compare"],
                Explore: ["Explore Career", "Explore Education", "Start Quest"],
                Support: ["Career Paths", "Majors", "Back to Home"],
            },
            copyright: (year) => `© ${year} EduQuest. All rights reserved.`,
        },
    },
    id: {
        menu: ["Beranda", "Tes Karir AI", "Bandingkan Karir", "Jelajahi Karir", "Jelajahi Edukasi"],
        cta: "Mulai Quest",
        openMenu: "Buka menu",
        closeMenu: "Tutup menu",
        footer: {
            tagline: "Platform pendidikan modern untuk mempersiapkan generasi masa depan dengan teknologi terbaik.",
            newsletterPlaceholder: "Email kamu...",
            newsletterAriaLabel: "Daftar newsletter",
            subscribeBtnLabel: "Daftar",
            columns: {
                Platform: ["Beranda", "Tes Karir AI", "Bandingkan Karir"],
                Jelajahi: ["Jelajahi Karir", "Jelajahi Edukasi", "Mulai Quest"],
                Dukungan: ["Jalur Karir", "Jurusan", "Kembali ke Beranda"],
            },
            copyright: (year) => `© ${year} EduQuest. Semua hak dilindungi.`,
        },
    },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState("en");
    const toggle = () => setLang((l) => (l === "en" ? "id" : "en"));
    const t = translations[lang];
    return (
        <LanguageContext.Provider value={{ lang, toggle, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLang() {
    return useContext(LanguageContext);
}
