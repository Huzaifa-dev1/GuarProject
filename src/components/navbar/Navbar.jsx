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
    
      { label: "AG Group of Industries", to: "/introduction/ag-group" },
      { label: "CEO Message", to: "/introduction/ceo-message" },
    ],
  },
  {
    label: "PRODUCT",
    to: "/product",
    children: [
      { label: "Road Grass", to: "/product/guar-gum" },
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
  const [theme, setTheme] = useState(
    localStorage.getItem("ag-theme") ||
      (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
  );

  const [overHero, setOverHero] = useState(false);
  const wrapRef = useRef(null);

  /* -------------------- Theme Handling -------------------- */
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("ag-theme", theme);
  }, [theme]);

  /* -------------------- Shadow when Scrolled -------------------- */
  useEffect(() => {
    const onScroll = () => {
      wrapRef.current?.classList.toggle("nav--scrolled", window.scrollY > 2);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* -------------------- Transparent only over Hero -------------------- */
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
        sentinel.style.position = "absolute";
        sentinel.style.top = "0";
        sentinel.style.left = "0";
        sentinel.style.width = "1px";
        sentinel.style.height = "1px";
        hero.style.position = hero.style.position || "relative";
        hero.prepend(sentinel);
      }
      obs.observe(sentinel);
      return () => obs.disconnect();
    }

    // fallback
    const onFallback = () => {
      const rect = hero.getBoundingClientRect();
      const isOver = rect.top <= navHeight && rect.bottom >= 0;
      setOverHero(isOver);
    };
    onFallback();
    window.addEventListener("scroll", onFallback);
    window.addEventListener("resize", onFallback);
    return () => {
      window.removeEventListener("scroll", onFallback);
      window.removeEventListener("resize", onFallback);
    };
  }, []);

  /* -------------------- Toggles -------------------- */
  const toggleMobile = () => setMobileOpen((s) => !s);
  const toggleMobileDropdown = (key) =>
    setMobileDropdown((s) => ({ ...s, [key]: !s[key] }));
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <header
      ref={wrapRef}
      className={`nav ${overHero ? "nav--over-hero" : ""}`}
    >
      <div className="nav__inner">
        {/* Brand */}
        <Link to="/" className="nav__brand">
          AG GROUP
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
                <NavLink to={item.to} className="nav__link">
                  <span className="nav__text">{item.label}</span>
                  {hasChildren && (
                    <svg
                      className="nav__caret"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
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
                      <NavLink key={sub.to} to={sub.to} className="nav__dd-link">
                        {sub.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right side controls */}
        <div className="nav__controls">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <span className="theme-toggle__label">DARK</span>
            <span className={`theme-toggle__switch ${theme}`} />
            <span className="theme-toggle__label">LIGHT</span>
          </button>

          <button
            className={`nav__burger ${mobileOpen ? "is-active" : ""}`}
            aria-expanded={mobileOpen}
            aria-label="Open menu"
            onClick={toggleMobile}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`nav__mobile ${mobileOpen ? "open" : ""}`}>
        {MENU.map((item) => {
          const hasChildren = Array.isArray(item.children);
          const key = item.label;
          return (
            <div className="mitem" key={key}>
              <div className="mitem__head">
                <NavLink
                  to={item.to}
                  className="mitem__link"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </NavLink>

                {hasChildren && (
                  <button
                    className={`mitem__toggle ${
                      mobileDropdown[key] ? "open" : ""
                    }`}
                    onClick={() => toggleMobileDropdown(key)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24">
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
                  className={`mitem__body ${
                    mobileDropdown[key] ? "open" : ""
                  }`}
                >
                  {item.children.map((sub) => (
                    <NavLink
                      key={sub.to}
                      to={sub.to}
                      className="mitem__sublink"
                      onClick={() => setMobileOpen(false)}
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
