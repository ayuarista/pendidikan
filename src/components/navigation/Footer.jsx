import { Link } from "react-router-dom";
import { useLang } from "../../context/LanguageContext";
import "./Footer.css";
import logoImg from "../../assets/edutech-logos.png";

const LINK_HREFS = [
    ["/", "/ai-career-test", "/career-compare"],
    ["/explore-career", "/explore-education", "/ai-career-test"],
    ["/explore-career", "/explore-education", "/"],
];

const SOCIALS = [
    {
        label: "Instagram",
        href: "#",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
        ),
    },
    {
        label: "Twitter / X",
        href: "#",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
    {
        label: "YouTube",
        href: "#",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
            </svg>
        ),
    },
    {
        label: "LinkedIn",
        href: "#",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
            </svg>
        ),
    },
];

export default function Footer() {
    const year = new Date().getFullYear();
    const { t } = useLang();
    const { footer: ft } = t;
    const columns = Object.entries(ft.columns).map(([title, labels], ci) => ({
        title,
        items: labels.map((label, li) => ({ label, href: LINK_HREFS[ci][li] })),
    }));

    return (
        <footer className="site-footer">
            {/* Top glow line */}
            <div className="site-footer__glow" aria-hidden="true" />

            <div className="site-footer__container">

                {/* Brand column */}
                <div className="site-footer__brand">
                    <Link to="/" className="site-footer__logo-row" aria-label="Back to home">
                        <img src={logoImg} alt="Edutech Logo" className="site-footer__logo-img" />
                    </Link>

                    <p className="site-footer__tagline">{ft.tagline}</p>

                    {/* Newsletter */}
                    <div className="site-footer__newsletter">
                        <input
                            type="email"
                            placeholder={ft.newsletterPlaceholder}
                            className="site-footer__newsletter-input"
                            aria-label={ft.newsletterAriaLabel}
                        />
                        <button type="button" className="site-footer__newsletter-btn">
                            {ft.subscribeBtnLabel}
                        </button>
                    </div>
                </div>

                {/* Link columns */}
                {columns.map(({ title, items }) => (
                    <div key={title} className="site-footer__col">
                        <h4 className="site-footer__col-title">{title}</h4>
                        <ul className="site-footer__col-list">
                            {items.map(({ label, href }) => (
                                <li key={label}>
                                    <Link to={href} className="site-footer__col-link">{label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

            </div>

            {/* Bottom bar */}
            <div className="site-footer__bottom">
                <p className="site-footer__copy">{ft.copyright(year)}</p>
                <div className="site-footer__socials">
                    {SOCIALS.map(({ label, href, icon }) => (
                        <a key={label} href={href} className="site-footer__social-btn" aria-label={label}>
                            {icon}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
