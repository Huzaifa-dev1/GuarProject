import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import "./Productshow.css";

import IMG_GUAR from "../assets/images/roadgrass.png";
import IMG_ALFALFA from "../assets/images/alfalfa.jpg";

const PRODUCTS = [
  {
    name: "Rhodes Grass",
    to: "./product/guar-gum",
    img: IMG_GUAR,
    alt: "Road Grass product",
    blurb: "High-quality Rhodes-Grass derivatives for industrial applications.",
  },
  {
    name: "Alfalfa",
    to: "/product/alfalfa",
    img: IMG_ALFALFA,
    alt: "Alfalfa product",
    blurb: "Nutrient-rich alfalfa, processed with strict quality controls.",
  },
];

// Header fade-up
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// Card slide-in (alternating L/R)
const slideIn = (direction = "left") => ({
  hidden: {
    opacity: 0,
    x: direction === "left" ? -80 : 80,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
});

export default function Productshow() {
  // --- Cinematic scroll-out for the WHOLE section
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 20%"],
  });

  // map progress 0→1 to opacity 0.2→1→0.2 and slight vertical parallax 12→0→-12
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.2]);
  const sectionY = useTransform(scrollYProgress, [0, 0.5, 1], [12, 0, -12]);

  return (
    <motion.section
      ref={sectionRef}
      className="products"
      aria-labelledby="products-heading"
      style={{ opacity: sectionOpacity, y: sectionY }}
    >
      <motion.div
        className="products__inner"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        {/* Header fade-in */}
        <motion.header className="products__head" variants={fadeUp}>
          <h2 id="products-heading" className="products__title">
            Our Products
          </h2>
          <p className="products__subtitle">
            Premium <strong>Rhodes Grass</strong> and alfalfa solutions engineered for performance.
          </p>
        </motion.header>

        {/* Cards */}
        <div className="products__grid">
          {PRODUCTS.map((p, i) => (
            <motion.article
              className="pcard"
              key={p.name}
              variants={slideIn(i % 2 === 0 ? "left" : "right")}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.35 }}
            >
              <div className="pcard__media">
                <img src={p.img} alt={p.alt} loading="lazy" />
                <div className="pcard__overlay" />
                <NavLink
                  to={p.to}
                  className="pcard__cta"
                  aria-label={`View ${p.name}`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M5 12h14M13 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </NavLink>
              </div>

              <div className="pcard__body">
                <h3 className="pcard__title">{p.name}</h3>
                <p className="pcard__blurb">{p.blurb}</p>
                <NavLink to={p.to} className="pcard__link">
                  Learn more
                </NavLink>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
