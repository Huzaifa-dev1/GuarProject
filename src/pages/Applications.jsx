import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./Applications.css";

// Images
import IMG_SPROUTS   from "../assets/images/sprouts.png";
import IMG_COSMETICS from "../assets/images/cosmetics.png";
import IMG_WELLNESS  from "../assets/images/wellness.png";
import IMG_ANIMALS   from "../assets/images/animals.png";
import IMG_RECYCLE   from "../assets/images/recycle.png";
import IMG_BIOFUEL   from "../assets/images/biofuel.png";
import IMG_ALFALFA   from "../assets/images/rhoesanimal.png";
import IMG_SOIL      from "../assets/images/soil.png";

const APPLICATIONS = [
  {
    title: "Human Food / Dietary",
    img: IMG_SPROUTS,
    alt: "Alfalfa sprouts for food",
    blurb:
      "Alfalfa sprouts in salads & sandwiches. Leaf powder/tablets/tea often used as supplements rich in vitamins and antioxidants.",
  },
  {
    title: "Cosmetics / Skin Care",
    img: IMG_COSMETICS,
    alt: "Natural cosmetic ingredient",
    blurb:
      "Alfalfa extracts may support skin recovery in creams and gels. Used in natural formulations for gentle care.",
  },
  {
    title: "Health & Wellness",
    img: IMG_WELLNESS,
    alt: "Wellness applications",
    blurb:
      "Used in herbal practice for potential cholesterol support, blood-sugar balance, and anti-inflammatory effects.",
  },
  {
    title: "High-Quality Livestock Feed",
    img: IMG_ANIMALS,
    alt: "Livestock feed",
    blurb:
      "Alfalfa hay/silage for dairy cows, beef cattle, horses, sheep, and goats. High protein with digestible fiber.",
  },
  {
    title: "Mulch",
    img: IMG_RECYCLE,
    alt: "Mulch application",
    blurb:
      "Clippings used as garden mulch to protect soil, keep moisture, and help suppress weeds.",
  },
  {
    title: "Biofuel / Bioproducts",
    img: IMG_BIOFUEL,
    alt: "Biofuel and bioproducts",
    blurb:
      "Biomass fractionation: leaves for feed/supplements; stems for gasification or fermentation into biofuels and chemicals.",
  },
  {
    title: "Forage / Pasture",
    img: IMG_ALFALFA,
    alt: "Forage and pasture",
    blurb:
      "Rhodes Grass and Alfalfa used for grazing or hay — reliable stands, good recovery, suitable for warm regions.",
  },
  {
    title: "Soil Improvement / Cover Crop",
    img: IMG_SOIL,
    alt: "Soil improvement",
    blurb:
      "As a cover crop, improves soil structure, water infiltration, and fertility; can help reduce certain pests like nematodes.",
  },
];

const slideIn = (dir = "left") => ({
  hidden: { opacity: 0, x: dir === "left" ? -80 : 80, scale: 0.98 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
});

export default function Applications() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 20%"],
  });
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.2]);
  const sectionY = useTransform(scrollYProgress, [0, 0.5, 1], [12, 0, -12]);

  // detect touch devices (for Chrome mobile)
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      className="apps-page"
      aria-labelledby="apps-title"
      style={{ opacity: sectionOpacity, y: sectionY }}
    >
      <div className="apps-inner">
        <header className="apps-head">
          <h2 id="apps-title" className="apps-title">Applications</h2>
          <p className="apps-sub">Nine real-world uses for Rhodes Grass &amp; Alfalfa</p>
          <span className="apps-rule" aria-hidden />
        </header>

        <div className="apps-grid">
          {APPLICATIONS.map((a, i) => (
            <motion.article
              key={a.title}
              className={`appcard ${isTouch ? "touch-mode" : ""}`}
              variants={slideIn(i % 2 === 0 ? "left" : "right")}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.35 }}
              onClick={(e) => {
                if (!isTouch) return;
                const card = e.currentTarget;
                card.classList.toggle("active");
              }}
            >
              <div className="appcard__media">
                <img
                  src={a.img}
                  alt={a.alt}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 820px) 100vw, 50vw"
                />
                <div className="appcard__overlay">
                  <div className="appcard__overlay-box">
                    <p>{a.blurb}</p>
                  </div>
                </div>
              </div>

              <footer className="appcard__caption">
                <h3 className="appcard__title">{a.title}</h3>
              </footer>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
