import { createContext, useContext, useState } from "react";

const translations = {
    en: {
        menu: ["Home", "Career Test", "Results", "Roadmap", "About"],
        cta: "Start Quest",
        openMenu: "Open menu",
        closeMenu: "Close menu",
        footer: {
            tagline: "A modern education platform preparing the next generation with the best technology.",
            newsletterPlaceholder: "Your email...",
            newsletterAriaLabel: "Subscribe to newsletter",
            subscribeBtnLabel: "Subscribe",
            columns: {
                Platform: ["Home", "About Us", "Programs"],
                Explore: ["Games", "Curriculum", "Community"],
                Support: ["Contact", "FAQ", "Privacy Policy"],
            },
            copyright: (year) => `© ${year} EduQuest. All rights reserved.`,
        },
    },
    id: {
        menu: ["Beranda", "Tes Karir", "Hasil", "Peta Jalan", "Tentang"],
        cta: "Mulai Quest",
        openMenu: "Buka menu",
        closeMenu: "Tutup menu",
        footer: {
            tagline: "Platform pendidikan modern untuk mempersiapkan generasi masa depan dengan teknologi terbaik.",
            newsletterPlaceholder: "Email kamu...",
            newsletterAriaLabel: "Daftar newsletter",
            subscribeBtnLabel: "Daftar",
            columns: {
                Platform: ["Beranda", "Tentang Kami", "Program"],
                Jelajahi: ["Games", "Kurikulum", "Komunitas"],
                Dukungan: ["Kontak", "FAQ", "Kebijakan Privasi"],
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
