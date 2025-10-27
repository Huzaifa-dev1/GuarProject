import React, { useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";
import "./Alfalfa.css";
import IMG_ALFALFA from "../../assets/images/alfa3d.png";
import useDeviceTilt from "../../hooks/useDeviceTilt";

/* ---------- Animation variants ---------- */
const pageFade = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 1.25, ease: [0.25, 1, 0.35, 1] } }
};
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }
};
const slideIn = (dir = "left", d = 110) => ({
  hidden: { opacity: 0, x: dir === "left" ? -d : dir === "right" ? d : 0, scale: 0.98 },
  show:   { opacity: 1, x: 0, scale: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }
});
const containerStagger = (delay = 0.16, stagger = 0.14) => ({
  hidden: { opacity: 1 },
  show:   { opacity: 1, transition: { delayChildren: delay, staggerChildren: stagger, when: "beforeChildren" } }
});

export default function Alfalfa() {
  /* ===== background film only ===== */
  const pageRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ["start 85%","end 20%"] });
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.14, 0]); // dim only

  /* ===== tilt logic ===== */
  const cardRef = useRef(null);
  const [motionEnabled, setMotionEnabled] = useState(false);
  const device = useDeviceTilt(motionEnabled);
  const isTouch = typeof window !== "undefined" ? matchMedia("(pointer: coarse)").matches : false;

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const onMove = (e) => {
    const r = cardRef.current?.getBoundingClientRect(); if (!r) return;
    mouseX.set(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width )));
    mouseY.set(Math.max(0, Math.min(1, (e.clientY - r.top ) / r.height)));
  };
  const onLeave = () => { mouseX.set(0.5); mouseY.set(0.5); };

  const devXNorm = useMemo(() => {
    const g = device.gamma;
    const n = (Math.max(-45, Math.min(45, g)) + 45) / 90;
    return Number.isFinite(n) ? n : 0.5;
  }, [device.gamma]);

  const devYNorm = useMemo(() => {
    const b = device.beta;
    const n = (Math.max(-30, Math.min(30, b)) + 30) / 60;
    return Number.isFinite(n) ? n : 0.5;
  }, [device.beta]);

  const srcX = isTouch && device.ok ? devXNorm : mouseX;
  const srcY = isTouch && device.ok ? devYNorm : mouseY;

  const rotateX = useTransform(srcY, [0, 1], [12, -12]);
  const rotateY = useTransform(srcX, [0, 1], [-18, 18]);
  const glareX  = useTransform(srcX, v => `${(typeof v === "number" ? v : v.get?.() || .5) * 100}%`);
  const glareY  = useTransform(srcY, v => `${(typeof v === "number" ? v : v.get?.() || .5) * 100}%`);

  const requestMotion = async () => {
    try {
      if (typeof DeviceOrientationEvent !== "undefined" &&
          typeof DeviceOrientationEvent.requestPermission === "function") {
        const res = await DeviceOrientationEvent.requestPermission();
        if (res === "granted") setMotionEnabled(true);
      } else setMotionEnabled(true);
    } catch {}
  };

  /* ===== copy data ===== */
  const qualityHighlights = [
    "Soft texture for easy chewability",
    "Fresh greenish color",
    "Moisture: ≥ 12%",
    "Export-quality selection"
  ];
  const specs = [
    { grade: "Premium Meal",  protein: "≥ 18%",  moisture: "≥ 12%", fiber: "≤ 28%", ash: "≤ 10%" },
    { grade: "Standard Meal", protein: "16–18%", moisture: "≥ 12%", fiber: "≤ 32%", ash: "≤ 11%" },
    { grade: "Pellet 6 mm",   protein: "≥ 17%",  moisture: "≥ 12%", fiber: "≤ 30%", ash: "≤ 11%" },
    { grade: "Pellet 8 mm",   protein: "≥ 16%",  moisture: "≥ 12%", fiber: "≤ 32%", ash: "≤ 12%" },
  ];

  return (
    <motion.main
      ref={pageRef}
      className="alf-page"
      variants={pageFade}
      initial="hidden"
      animate="show"          /* 👈 hero shows immediately */
    >
      <motion.div className="page-glow" style={{ opacity: glowOpacity }} aria-hidden />

      {/* ===== HERO (no whileInView on hero) ===== */}
      <section className="alf-hero">
        <motion.div
          className="ah__text"
          variants={containerStagger(0.16, 0.14)}
          initial="hidden"
          animate="show"
        >
          <motion.h1 className="ah__title" variants={fadeUp}>
            Alfalfa-Hay <span className="muted"></span>
          </motion.h1>

          <motion.p className="ah__blurb" variants={fadeUp}>
            Export-quality alfalfa with a soft feel and fresh greenish color. Formulated for
            dependable nutrition and flow, with batch-checked moisture (≥ 12%) and screened
            particles for clean mixing and consistent performance.
          </motion.p>

          <motion.ul className="ah__highlights" variants={fadeUp}>
            {qualityHighlights.map((q) => (<li key={q}>{q}</li>))}
          </motion.ul>
        </motion.div>

        <motion.div
          className="ah__media-wrap"
          variants={slideIn("right", 120)}
          initial="hidden"
          animate="show"
        >
          {!device.ok && isTouch && (
            <button className="motion-btn" type="button" onClick={requestMotion}>
              Enable Motion
            </button>
          )}

          <motion.div
            ref={cardRef}
            className="tilt-card"
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ rotateX, rotateY, "--glare-x": glareX, "--glare-y": glareY }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 110, damping: 16 }}
          >
            <img src={IMG_ALFALFA} alt="Export-quality soft, greenish alfalfa" loading="eager" />
            <span className="tilt-glare" />
            <span className="tilt-shadow" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== BELOW THE FOLD (still whileInView) ===== */}
      <motion.section
        className="alf-uses"
        variants={containerStagger(0.18, 0.16)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
      >
        <motion.h2 className="center-head" variants={fadeUp}>
          Where Alfalfa Adds Value
        </motion.h2>

        <div className="uses-grid">
          <motion.div className="uses-left" variants={slideIn("left", 100)}>
            <h3>Dairy &amp; Beef</h3>
            <ul>
              <li>Soft texture supports intake and chewability</li>
              <li>Greenish color and aroma for better palatability</li>
              <li>Stable moisture (≥ 12%) for consistent formulations</li>
            </ul>

            <h3>Poultry &amp; Small Ruminants</h3>
            <ul>
              <li>Natural colorants and reliable fiber</li>
              <li>Blend-ready for goat/sheep grower feeds</li>
            </ul>

            <h3>Export Programs</h3>
            <ul>
              <li>Export-grade selection and packing</li>
              <li>Screened lots for uniform particle size</li>
            </ul>
          </motion.div>

          <motion.aside className="uses-note" variants={slideIn("right", 100)}>
            <p>
              Each lot is selected for its soft feel, clean green appearance, and export-grade
              presentation—aiming for consistent feed performance across rations.
            </p>
          </motion.aside>
        </div>
      </motion.section>

      <motion.section
        className="alf-specs"
        variants={containerStagger(0.18, 0.16)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
      >
        <motion.h2 className="center-head" variants={fadeUp}>
          Specifications (Typical Ranges)
        </motion.h2>

        <div className="specs-grid">
          {specs.map((s, i) => (
            <motion.article
              key={s.grade}
              className="spec-card"
              variants={slideIn(i % 2 === 0 ? "left" : "right", 90)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.3 }}
            >
              <header><span className="badge">{s.grade}</span></header>
              <ul>
                <li><strong>Crude Protein:</strong> {s.protein}</li>
                <li><strong>Moisture:</strong> {s.moisture}</li>
                <li><strong>Crude Fiber:</strong> {s.fiber}</li>
                <li><strong>Ash:</strong> {s.ash}</li>
              </ul>
              <footer>Export-quality lots; screened for color, moisture, and uniform flow.</footer>
            </motion.article>
          ))}
        </div>
      </motion.section>
    </motion.main>
  );
}
