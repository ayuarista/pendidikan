import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../../context/LanguageContext";
import "./Header.css";

const MENU_HREFS = ["/", "#", "#", "#", "#"];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggle, t } = useLang();
  const menuItems = t.menu.map((label, i) => ({ label, href: MENU_HREFS[i] }));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ── Floating pill wrapper ── */}
      <div className={`navbar-wrapper ${scrolled ? "is-scrolled" : ""}`}>
        <header className="navbar-pill">

          {/* Logo */}
          <Link to="/" className="navbar-logo" aria-label="Homepage">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect width="32" height="32" rx="9" fill="url(#lg)" />
              <path d="M17.6 7L9 18h7l-1.6 7L23 16h-7l1.6-9Z" fill="#fff" />
              <defs>
                <linearGradient id="lg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6d28d9" />
                  <stop offset="1" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
          </Link>

          {/* Desktop navigation */}
          <nav className="navbar-menu" aria-label="Primary navigation">
            {menuItems.map(({ label, href }) => (
              <Link key={label} to={href} className="navbar-menu__item">
                {label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="navbar-actions">
            <button
              type="button"
              className="navbar-lang-toggle"
              onClick={toggle}
              aria-label="Switch language"
            >
              <span className={lang === "en" ? "is-active" : ""}>EN</span>
              <span className="navbar-lang-divider">|</span>
              <span className={lang === "id" ? "is-active" : ""}>ID</span>
            </button>

            <button type="button" className="navbar-cta">
              {t.cta}
            </button>

            <button
              type="button"
              className={`navbar-hamburger ${mobileOpen ? "is-open" : ""}`}
              onClick={() => setMobileOpen((p) => !p)}
              aria-label={mobileOpen ? t.closeMenu : t.openMenu}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </header>
      </div>

      {/* ── Mobile dropdown ── */}
      <nav
        id="mobile-nav"
        className={`navbar-mobile ${mobileOpen ? "is-open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
      >
        {menuItems.map(({ label, href }) => (
          <Link
            key={`mob-${label}`}
            to={href}
            className="navbar-mobile__item"
            onClick={() => setMobileOpen(false)}
          >
            {label}
          </Link>
        ))}
        <div className="navbar-mobile__cta-row">
          <button type="button" className="navbar-cta" onClick={() => setMobileOpen(false)}>
            {t.cta}
          </button>
        </div>
      </nav>
    </>
  );
}