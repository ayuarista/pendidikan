import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useLang } from "../../context/LanguageContext";
import "./Header.css";
import ThemeToggle from "../ui/ThemeToggle";
import logoImg from "../../assets/edutech-logos.png";

const MENU_HREFS = [
  "/",
  "/ai-career-test",
  "/career-compare",
  "/explore-career",
  "/explore-education",
];

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1180) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* ── Floating pill wrapper ── */}
      <div className={`navbar-wrapper ${scrolled ? "is-scrolled" : ""}`}>
        <header className="navbar-pill">

          {/* Logo */}
          <Link to="/" className="navbar-logo" aria-label="Homepage">
            <img src={logoImg} alt="CareerAI Logo" className="navbar-logo__img" />
          </Link>

          {/* Desktop navigation */}
          <nav className="navbar-menu" aria-label="Primary navigation">
            {menuItems.map(({ label, href }) => (
              <NavLink
                key={label}
                to={href}
                end={href === "/"}
                className={({ isActive }) => `navbar-menu__item ${isActive ? "is-active" : ""}`}
              >
                {label}
              </NavLink>
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
            <ThemeToggle />

            <Link to="/ai-career-test" className="navbar-cta">
              {t.cta}
            </Link>

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
          <NavLink
            key={`mob-${label}`}
            to={href}
            end={href === "/"}
            className={({ isActive }) => `navbar-mobile__item ${isActive ? "is-active" : ""}`}
            onClick={() => setMobileOpen(false)}
          >
            {label}
          </NavLink>
        ))}
        <div className="navbar-mobile__cta-row">
          <Link to="/ai-career-test" className="navbar-cta" onClick={() => setMobileOpen(false)}>
            {t.cta}
          </Link>
        </div>
      </nav>
    </>
  );
}