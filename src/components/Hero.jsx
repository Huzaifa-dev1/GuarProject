import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Hero.css";
import HOMEVID from "../assets/vids/Homee.mp4";

export default function Hero() {
  // Respect reduced-motion
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) document.documentElement.classList.add("reduced-motion");
    return () => document.documentElement.classList.remove("reduced-motion");
  }, []);

  // ✅ Mobile 100vh fix fallback (for browsers without dvh/svh)
  useEffect(() => {
    const setVH = () => {
      document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
    };
    setVH();
    window.addEventListener("resize", setVH);
    window.addEventListener("orientationchange", setVH);
    return () => {
      window.removeEventListener("resize", setVH);
      window.removeEventListener("orientationchange", setVH);
    };
  }, []);

  const scrollToLearn = () => {
    const el = document.querySelector("#introduction") || document.querySelector("#learn-more");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="hero" aria-label="AG Group hero">
      <video
        className="hero__video"
        src={HOMEVID}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="hero__overlay" />
      <div className="hero__content">
        <h1 className="hero__title">
          CULTIVATING <span>NATURE </span>Elevating Standards
        </h1>
        <NavLink to="/introduction/ag-group" className="hero__cta" role="button">
          Learn more
        </NavLink>
      </div>
    </section>
  );
}
