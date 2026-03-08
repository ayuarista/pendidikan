import React, { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const navRef = useRef(null);
  const underlineRef = useRef(null);

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navData = [
    { href: "/", label: "Beranda" },
    {
      label: "Tentang Kami",
      
      children: [
        {
          label: "Example 1",
          href: "/tentang-kami"
        },
        {
          label: "Example 2",
          href: "/tentang-kami/fitur"
        },
        {
          label: "Example 3",
          href: "/tentang-kami/core-value"
        },
        {
          label: "Feature",
          children: [
            { href: "/", label: "Example Feature 1" },
            { href: "#", label: "Example Feature 2" },
          ],
        },
      ],
    },
    {
      label: "Programs",
      children: [
        {
          label: "Checking",
          href: "#",
          children: [
            { href: "#", label: "Label 1" },
            { href: "#", label: "Label 2" },
            { href: "#", label: "Label 3" },
          ],
        },
        {
          label: "Checking 2",
        },
      ],
    },
    { href: "#", label: "Testing 1" },
    { href: "#", label: "Testing 2" },
    {
      label: "Label",
      href: "#",
      children: [
        { href: "/", label: "Label 1" },
        { href: "/", label: "Label 2" },
      ],
    }
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Check if current path matches or is child of nav item
  const isNavItemActive = (item) => {
    if (item.href && item.href !== "#" && location.pathname === item.href) {
      return true;
    }
    if (item.children) {
      return item.children.some(child => {
        if (child.href && child.href !== "#" && location.pathname === child.href) return true;
        if (child.children) {
          return child.children.some(sub => sub.href && sub.href !== "#" && location.pathname === sub.href);
        }
        return false;
      });
    }
    return false;
  };

  /* underline slider */
  useEffect(() => {
    if (!navRef.current || !underlineRef.current) return;

    // Find the active nav item
    const activeItem = navData.find(item => isNavItemActive(item));

    if (activeItem) {
      const activeLink = Array.from(navRef.current.querySelectorAll('a')).find(
        link => link.textContent.trim().includes(activeItem.label) &&
          link.closest('.nav-item')
      );

      if (activeLink) {
        const linkRect = activeLink.getBoundingClientRect();
        const navRect = navRef.current.getBoundingClientRect();
        underlineRef.current.style.width = `${linkRect.width}px`;
        underlineRef.current.style.transform = `translateX(${linkRect.left - navRect.left}px)`;
      }
    } else {
      underlineRef.current.style.width = `0px`;
    }
  }, [location]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300
        ${scrolled || mobileOpen ? "bg-white md:shadow-xs" : "bg-transparent"}`}
      >
        <div className="mx-0 md:mx-20 flex h-20 max-w-7xl items-center justify-between px-6">
          <Link to="/">
            <img
              src="https://cdn.iconscout.com/icon/free/png-256/free-google-icon-svg-download-png-189807.png"
              alt="logo"
              className="h-12 md:h-32"
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav
            ref={navRef}
            className={`relative hidden md:flex items-center gap-8 font-medium
            ${scrolled ? "text-black" : "text-white"}`}
          >
            <span
              ref={underlineRef}
              className="absolute -bottom-2 h-[2px] bg-yellow-400 transition-all duration-300"
            />

            {navData.map((item, i) => (
              <NavItem
                key={i}
                item={item}
                scrolled={scrolled}
                isActive={isNavItemActive(item)}
              />
            ))}
          </nav>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden text-2xl z-50 transition-colors duration-300 ${scrolled || mobileOpen ? "text-black" : "text-white"
              }`}
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU - Full Screen Slide */}
      <div
        className={`md:hidden fixed inset-0 bg-white z-40 transition-transform duration-500 ease-in-out ${mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="pt-24 pb-6 px-6 h-full overflow-y-auto">
          <nav className="space-y-1">
            {navData.map((item, i) => (
              <MobileItem
                key={i}
                item={item}
                isActive={isNavItemActive(item)}
                onNavigate={() => setMobileOpen(false)}
              />
            ))}
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30 transition-opacity duration-500"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}

function NavItem({ item, scrolled, isActive }) {
  const hasChild = item.children?.length > 0;

  return (
    <div className="group relative nav-item">
      <NavLink
        to={item.href || "#"}
        className={`relative pb-1 transition flex items-center gap-1 ${isActive ? "nav-active font-semibold" : ""
          }`}
      >
        {item.label}
        {hasChild && <FiChevronDown className="text-xs" />}
      </NavLink>

      {/* SUB MENU */}
      {hasChild && (
        <div
          className="absolute left-0 top-full mt-3 min-w-[220px]
          bg-white rounded-lg shadow-lg py-2
          opacity-0 invisible translate-y-2
          transition-all duration-300
          group-hover:opacity-100 group-hover:visible group-hover:translate-y-0"
        >
          {item.children.map((child, i) => (
            <DropdownItem key={i} item={child} />
          ))}
        </div>
      )}
    </div>
  );
}

function DropdownItem({ item }) {
  const location = useLocation();
  const hasChild = item.children?.length > 0;

  // Check if this item or any of its children are active
  const isItemActive = item.href && item.href !== "#" && item.href === location.pathname;
  const isChildActive = hasChild && item.children.some(child =>
    child.href && child.href !== "#" && child.href === location.pathname
  );

  return (
    <div className="group/item relative">
      <NavLink
        to={item.href || "#"}
        className={`flex justify-between items-center px-4 py-2 text-sm hover:bg-gray-100 ${isItemActive || isChildActive ? "text-black font-semibold" : "text-gray-700"
          }`}
      >
        <span>{item.label}</span>
        {hasChild && <FiChevronDown className="-rotate-90" />}
      </NavLink>

      {hasChild && (
        <div
          className="absolute left-full top-0 ml-1 min-w-[220px]
          bg-white rounded-lg shadow-lg py-2
          opacity-0 invisible translate-x-2
          transition-all duration-300
          group-hover/item:opacity-100 group-hover/item:visible group-hover/item:translate-x-0"
        >
          {item.children.map((sub, i) => {
            const isActive = sub.href && sub.href !== "#" && sub.href === location.pathname;
            return (
              <NavLink
                key={i}
                to={sub.href || "#"}
                className={`block px-4 py-2 text-sm hover:bg-gray-100 ${isActive ? "text-black font-semibold" : "text-gray-700"
                  }`}
              >
                {sub.label}
              </NavLink>
            );
          })}
        </div>
      )}
    </div>
  );
}

function MobileItem({ item, isActive, onNavigate }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const hasChild = item.children?.length > 0;

  if (!hasChild) {
    return (
      <NavLink
        to={item.href}
        onClick={onNavigate}
        className={`block py-4 px-4 rounded-lg text-base font-medium transition-all duration-200 ${isActive
            ? "text-black bg-yellow-50 border-l-4 border-yellow-400"
            : "text-gray-700 hover:bg-gray-50"
          }`}
      >
        {item.label}
      </NavLink>
    );
  }

  return (
    <div className="mb-2">
      {/* Parent Section */}
      <div className={`rounded-lg overflow-hidden ${isActive ? "bg-yellow-50 border-l-4 border-yellow-400" : ""
        }`}>
        <div className="flex items-center">
          <NavLink
            to={item.href}
            onClick={onNavigate}
            className={`flex-1 py-4 px-4 text-base font-medium transition-colors ${isActive ? "text-black" : "text-gray-700"
              }`}
          >
            {item.label}
          </NavLink>

          {/* Toggle button */}
          <button
            onClick={() => setOpen(!open)}
            className="px-4 py-4 hover:bg-gray-100 transition-colors"
          >
            <FiChevronDown
              className={`transition-transform duration-300 text-gray-600 ${open ? "rotate-180" : ""
                }`}
              size={18}
            />
          </button>
        </div>

        {/* Submenu */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}>
          <div className="py-2 px-2 space-y-1 bg-gray-50">
            {item.children.map((child, i) => (
              <MobileSubItem
                key={i}
                item={child}
                location={location}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileSubItem({ item, location, onNavigate }) {
  const [open, setOpen] = useState(false);
  const hasChild = item.children?.length > 0;

  // Check if item or its children are active
  const isActive = item.href && item.href !== "#" && item.href === location.pathname;
  const isChildActive = hasChild && item.children.some(sub =>
    sub.href && sub.href !== "#" && sub.href === location.pathname
  );

  if (!hasChild) {
    return (
      <NavLink
        to={item.href || "#"}
        onClick={onNavigate}
        className={`block py-3 px-4 rounded-md text-sm transition-colors ${isActive
            ? "text-black font-semibold bg-white shadow-sm"
            : "text-gray-600 hover:bg-white hover:text-gray-900"
          }`}
      >
        {item.label}
      </NavLink>
    );
  }

  return (
    <div className="rounded-md overflow-hidden bg-white mb-1">
      {/* Parent link + toggle */}
      <div className="flex items-center">
        <NavLink
          to={item.href || "#"}
          onClick={onNavigate}
          className={`flex-1 py-3 px-4 text-sm transition-colors ${isActive || isChildActive
              ? "text-black font-semibold"
              : "text-gray-600 hover:text-gray-900"
            }`}
        >
          {item.label}
        </NavLink>

        <button
          onClick={() => setOpen(!open)}
          className="px-3 py-3 hover:bg-gray-50 transition-colors"
        >
          <FiChevronDown
            className={`transition-transform duration-300 text-gray-600 ${open ? "rotate-180" : ""
              }`}
            size={16}
          />
        </button>
      </div>

      {/* Third level menu */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}>
        <div className="py-2 px-2 space-y-1 bg-gray-50">
          {item.children.map((sub, i) => {
            const subActive = sub.href && sub.href !== "#" && sub.href === location.pathname;
            return (
              <NavLink
                key={i}
                to={sub.href}
                onClick={onNavigate}
                className={`block py-2 px-4 rounded text-xs transition-colors ${subActive
                    ? "text-black font-semibold bg-yellow-50"
                    : "text-gray-600 hover:bg-white hover:text-gray-900"
                  }`}
              >
                {sub.label}
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}