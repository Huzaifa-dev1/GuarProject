import React, { useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";
import "./GuarGum.css";
import IMG_GUAR from "../../assets/images/road3d.png";   // Rhodes Grass image
import useDeviceTilt from "../../hooks/useDeviceTilt";

/* ---------- Animation variants ---------- */
const pageFade = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 1.1, ease: [0.25, 1, 0.35, 1] } }
};
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] } }
};
const slideIn = (dir = "left", d = 90) => ({
  hidden: { opacity: 0, x: dir === "left" ? -d : dir === "right" ? d : 0, scale: 0.98 },
  show:   { opacity: 1, x: 0, scale: 1, transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] } }
});
const containerStagger = (delay = 0.12, stagger = 0.12) => ({
  hidden: { opacity: 1 },
  show:   { opacity: 1, transition: { delayChildren: delay, staggerChildren: stagger, when: "beforeChildren" } }
});

export default function GuarGum() {
  /* ===== background film only ===== */
  const pageRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ["start 85%", "end 20%"] });
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.14, 0]);

  /* ===== tilt logic ===== */
  const cardRef = useRef(null);
  const [motionEnabled, setMotionEnabled] = useState(false);
  const device = useDeviceTilt(motionEnabled);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const onMove = (e) => {
    const r = cardRef.current?.getBoundingClientRect(); if (!r) return;
    mouseX.set(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)));
    mouseY.set(Math.max(0, Math.min(1, (e.clientY - r.top)  / r.height)));
  };
  const onLeave = () => { mouseX.set(0.5); mouseY.set(0.5); };

  const isTouch = typeof window !== "undefined" ? matchMedia("(pointer: coarse)").matches : false;

  const devXNorm = useMemo(() => {
    const g = device.gamma;
    const n = (Math.max(-45, Math.min(45, g)) + 45) / 90;
    return Number.isFinite(n) ? n : 0.5;
  }, [device.gamma]);

  const devYNorm = useMemo(() => {
    const b = device.beta;
    return Number.isFinite(b) ? (Math.max(-30, Math.min(30, b)) + 30) / 60 : 0.5;
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

  // Rhodes Grass specs data
  const specs = [
    { grade: "Rhodes-Pro",    germ: "≥ 85% (typical)", purity: "≥ 95%", moisture: "≤ 12%", notes: "Fast establishment; excellent erosion control" },
    { grade: "Rhodes-Std",    germ: "≥ 80% (typical)", purity: "≥ 95%", moisture: "≤ 12%", notes: "Heat, drought & salinity tolerant roadside cover" },
    { grade: "Hay-Select",    germ: "≥ 85% (typical)", purity: "≥ 98%", moisture: "≤ 12%", notes: "Cut for hay; leafy growth and good regrowth" },
    { grade: "Pasture-Blend", germ: "≥ 80% (typical)", purity: "≥ 95%", moisture: "≤ 12%", notes: "Reliable pasture stand; grazing & ground cover" }
  ];

  return (
    <motion.main
      ref={pageRef}
      className="guar-page"
      variants={pageFade}
      initial="hidden"
      animate="show"          /* 👈 hero shows immediately */
    >
      <motion.div className="page-glow" style={{ opacity: glowOpacity }} aria-hidden />

      {/* ===== HERO (no whileInView on hero) ===== */}
      <section className="guar-hero">
        <motion.div
          className="gh__text"
          variants={containerStagger(0.12, 0.12)}
          initial="hidden"
          animate="show"
        >
          <motion.h1 className="gh__title" variants={fadeUp}>
            Rhodes Grass <span className="muted">(Seed)</span>
          </motion.h1>
          <motion.p className="gh__blurb" variants={fadeUp}>
            Rhodes Grass is a fast-establishing warm-season perennial used to quickly cover
            bare soil, protect shoulders and slopes, and reduce erosion. Its fibrous roots
            knit soil, improve dust control, and create a clean green cover along highways,
            embankments, parks, and open areas. It’s also valued as hay and pasture thanks to
            its leafy growth and strong regrowth after cutting or grazing.
          </motion.p>
        </motion.div>

        <motion.div
          className="gh__media-wrap"
          variants={slideIn("right", 100)}
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
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
          >
            <img
              src={IMG_GUAR}
              alt="Rhodes Grass seed for erosion control and roadside stabilization"
              loading="eager"
            />
            <span className="tilt-glare" />
            <span className="tilt-shadow" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== BELOW THE FOLD (still whileInView) ===== */}
      <motion.section
        className="guar-uses"
        variants={containerStagger(0.14, 0.14)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
      >
        <motion.h2 className="center-head" variants={fadeUp}>
          Where You See Rhodes Grass
        </motion.h2>

        <div className="uses-grid">
          <motion.div className="uses-left" variants={slideIn("left", 80)}>
            <h3>Roads &amp; Public Works</h3>
            <ul>
              <li>Stabilizes shoulders, banks, drains and embankments</li>
              <li>Helps prevent washouts and surface erosion after rain</li>
              <li>Fast green cover on new works and disturbed soils</li>
            </ul>

            <h3>Parks, Estates &amp; Open Areas</h3>
            <ul>
              <li>Low-maintenance cover for verges, berms and medians</li>
              <li>Good dust control on dry, open sites</li>
            </ul>

            <h3>Hay &amp; Pasture</h3>
            <ul>
              <li>Leafy forage; suitable for haymaking and grazing</li>
              <li>Quick regrowth; tolerant of heat, drought and salinity</li>
            </ul>
          </motion.div>

          <motion.aside className="uses-note" variants={slideIn("right", 80)}>
            <p>
              Rhodes Grass (<em>Chloris gayana</em>) spreads by stolons, forms a dense, binding
              root mass, and establishes rapidly—ideal for erosion control and traffic-side
              rehabilitation in warm climates.
            </p>
          </motion.aside>
        </div>
      </motion.section>

      <motion.section
        className="guar-specs"
        variants={containerStagger(0.14, 0.14)}
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
              variants={slideIn(i % 2 === 0 ? "left" : "right", 70)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.3 }}
            >
              <header><span className="badge">{s.grade}</span></header>
              <ul>
                <li><strong>Germination (lab):</strong> {s.germ}</li>
                <li><strong>Purity:</strong> {s.purity}</li>
                <li><strong>Moisture:</strong> {s.moisture}</li>
                <li><strong>Notes:</strong> {s.notes}</li>
              </ul>
              <footer>
                Typical attributes: fast establishment, strong soil binding, and
                tolerance to heat, drought and salinity when properly sown and managed.
              </footer>
            </motion.article>
          ))}
        </div>
      </motion.section>
    </motion.main>
  );
}
