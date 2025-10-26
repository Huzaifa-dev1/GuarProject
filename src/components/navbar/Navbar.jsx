import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

const MENU = [
  { label: "HOME", to: "/" },
  {
    label: "INTRODUCTION",
    to: "/introduction",
    children: [
      { label: "Company Introduction", to: "/introduction/company" },
      { label: "Kamar Group of Industries", to: "/introduction/ag-group" },
      { label: "CEO Message", to: "/introduction/ceo-message" },
    ],
  },
  {
    label: "PRODUCT",
    to: "/product",
    children: [
      { label: "Rhodes Grass", to: "/product/guar-gum" },
      { label: "AlfaLfa", to: "/product/alfalfa" },
    ],
  },
  { label: "APPLICATIONS", to: "/applications" },
  {
    label: "QUALITY MANAGEMENT",
    to: "/quality",
    children: [
      { label: "Quality Control", to: "/quality/quality-control" },
      { label: "Certifications", to: "/quality/certifications" },
    ],
  },
  { label: "CONTACT", to: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openIdx, setOpenIdx] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState({});
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("ag-theme");
    if (stored) return stored;
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  const [overHero, setOverHero] = useState(false);
  const wrapRef = useRef(null);

  // Ensure viewport meta tag is set correctly
  useEffect(() => {
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.name = 'viewport';
      document.head.appendChild(viewport);
    }
    viewport.content = 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes';
  }, []);

  // Theme
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("ag-theme", theme);
  }, [theme]);

  // Add shadow when scrolled
  useEffect(() => {
    const onScroll = () => {
      wrapRef.current?.classList.toggle("nav--scrolled", window.scrollY > 2);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Transparent only over hero
  useEffect(() => {
    const navEl = wrapRef.current;
    const hero = document.querySelector("#hero");
    if (!navEl || !hero) return;

    const navHeight = navEl.offsetHeight;

    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver(
        (entries) => {
          for (const e of entries) setOverHero(e.isIntersecting);
        },
        { rootMargin: `-${navHeight}px 0px 0px 0px`, threshold: 0 }
      );

      let sentinel = hero.querySelector('[data-nav-sentinel="true"]');
      if (!sentinel) {
        sentinel = document.createElement("div");
        sentinel.setAttribute("data-nav-sentinel", "true");
        Object.assign(sentinel.style, {
          position: "absolute",
          top: "0",
          left: "0",
          width: "1px",
          height: "1px",
          pointerEvents: "none",
        });
        if (!hero.style.position) hero.style.position = "relative";
        hero.prepend(sentinel);
      }
      obs.observe(sentinel);
      return () => obs.disconnect();
    }

    // Fallback for very old browsers
    const onFallback = () => {
      const rect = hero.getBoundingClientRect();
      const isOver = rect.top <= navHeight && rect.bottom >= 0;
      setOverHero(isOver);
    };
    onFallback();
    window.addEventListener("scroll", onFallback, { passive: true });
    window.addEventListener("resize", onFallback, { passive: true });
    return () => {
      window.removeEventListener("scroll", onFallback);
      window.removeEventListener("resize", onFallback);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [window.location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Toggles
  const toggleMobile = () => setMobileOpen((s) => !s);
  const toggleMobileDropdown = (key) =>
    setMobileDropdown((s) => ({ ...s, [key]: !s[key] }));
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileDropdown({});
  };

  return (
    <header
      ref={wrapRef}
      className={`nav ${overHero ? "nav--over-hero" : ""}`}
      role="banner"
    >
      <div className="nav__inner">
        {/* Brand */}
        <Link 
          to="/" 
          className="nav__brand" 
          aria-label="AG Group home"
          onClick={closeMobileMenu}
        >
          QAMAR GRP
        </Link>

        {/* Desktop menu */}
        <nav className="nav__menu" aria-label="Primary">
          {MENU.map((item, i) => {
            const hasChildren = Array.isArray(item.children);
            const isOpen = openIdx === i;
            return (
              <div
                key={item.label}
                className={`nav__item ${hasChildren ? "has-children" : ""} ${
                  isOpen ? "is-open" : ""
                }`}
                onMouseEnter={() => hasChildren && setOpenIdx(i)}
                onMouseLeave={() => hasChildren && setOpenIdx(null)}
              >
                <NavLink 
                  to={item.to} 
                  className={({ isActive }) => 
                    `nav__link ${isActive ? "active" : ""}`
                  }
                >
                  <span className="nav__text">{item.label}</span>
                  {hasChildren && (
                    <svg
                      className="nav__caret"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M7 10l5 5 5-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </NavLink>

                {hasChildren && (
                  <div className="nav__dropdown" role="menu">
                    {item.children.map((sub) => (
                      <NavLink 
                        key={sub.to} 
                        to={sub.to} 
                        className={({ isActive }) => 
                          `nav__dd-link ${isActive ? "active" : ""}`
                        }
                      >
                        {sub.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right controls */}
        <div className="nav__controls">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            type="button"
          >
            <span className="theme-toggle__label">DARK</span>
            <span className={`theme-toggle__switch ${theme}`} aria-hidden="true" />
            <span className="theme-toggle__label">LIGHT</span>
          </button>

          <button
            className={`nav__burger ${mobileOpen ? "is-active" : ""}`}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={toggleMobile}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`nav__mobile ${mobileOpen ? "open" : ""}`}
        role="navigation"
        aria-label="Mobile"
        aria-hidden={!mobileOpen}
      >
        {MENU.map((item) => {
          const hasChildren = Array.isArray(item.children);
          const key = item.label;
          return (
            <div className="mitem" key={key}>
              <div className="mitem__head">
                <NavLink
                  to={item.to}
                  className={({ isActive }) => 
                    `mitem__link ${isActive ? "active" : ""}`
                  }
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </NavLink>

                {hasChildren && (
                  <button
                    className={`mitem__toggle ${
                      mobileDropdown[key] ? "open" : ""
                    }`}
                    aria-expanded={!!mobileDropdown[key]}
                    aria-label={`Toggle ${item.label} submenu`}
                    onClick={() => toggleMobileDropdown(key)}
                    type="button"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M7 10l5 5 5-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {hasChildren && (
                <div
                  className={`mitem__body ${mobileDropdown[key] ? "open" : ""}`}
                >
                  {item.children.map((sub) => (
                    <NavLink
                      key={sub.to}
                      to={sub.to}
                      className={({ isActive }) => 
                        `mitem__sublink ${isActive ? "active" : ""}`
                      }
                      onClick={closeMobileMenu}
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </header>
  );
}