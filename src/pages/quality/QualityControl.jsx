import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./QualityControl.css";

// adjust the path if your images live elsewhere
import QUALITY_HERO from "../../assets/images/Quality.png";

/* Animations for content below the hero */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};
const slide = (dir = "left") => ({
  hidden: { opacity: 0, x: dir === "left" ? -60 : 60 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
});
const list = {
  hidden: { opacity: 1 },
  show:   { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};
const item = {
  hidden: { opacity: 0, y: 10 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45 } }
};

export default function QualityControl() {
  const secRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: secRef,
    offset: ["start 85%", "end 20%"],
  });
  const secOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.2]);
  const secY = useTransform(scrollYProgress, [0, 0.5, 1], [14, 0, -14]);

  return (
    <section className="qc">

      {/* ---------- HERO (100vh) ---------- */}
      <div className="qc-hero" role="img" aria-label="Quality control lab for Road Grass & Alfalfa">
        <img src={QUALITY_HERO} alt="" className="qc-hero__img" loading="eager" />
        <div className="qc-hero__overlay" />
        <div className="qc-hero__content">
          <h1 className="qc-hero__title qc-fadein">
            Quality &amp; Handling — Built In
          </h1>
          <p className="qc-hero__tag qc-fadein" style={{ animationDelay: "0.25s" }}>
            From seed lots to forage bales, every step is traced, tested, and packed to perform.
          </p>
        </div>
      </div>

      {/* ---------- BODY ---------- */}
      <motion.div
        ref={secRef}
        className="qc__inner"
        style={{ opacity: secOpacity, y: secY }}
      >
        {/* Head */}
        <motion.header
          className="qc__head"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 id="qc-title" className="qc__title">Quality, Testing &amp; Logistics</h2>
          <p className="qc__lede">
            How we keep Road Grass seed and Alfalfa forage dependable—batch after batch.
          </p>
          <span className="qc__rule" aria-hidden />
        </motion.header>

        <div className="qc__grid">
          {/* Block 1 */}
          <motion.article
            className="qc__block"
            variants={slide("left")}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <h3 className="qc__sub">Process Safeguards</h3>
            <p className="qc__text">
              From intake to dispatch, each lot follows a traced path with checks that protect purity and performance.
            </p>
            <motion.ul className="qc__list" variants={list} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <motion.li variants={item}><strong>Lot traceability:</strong> seed and forage tagged from field to storage to shipment.</motion.li>
              <motion.li variants={item}><strong>Clean flow:</strong> pre-cleaners, air screens, magnets, safety sieves, and metal detection on seed lines.</motion.li>
              <motion.li variants={item}><strong>Condition control:</strong> moisture meters, aerated silos, and dry, shaded stores to protect germination &amp; color.</motion.li>
              <motion.li variants={item}><strong>Calibrated filling:</strong> semi-automatic packers with weight checks and tamper-evident closures.</motion.li>
            </motion.ul>
          </motion.article>

          {/* Block 2 */}
          <motion.article
            className="qc__block"
            variants={slide("right")}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <h3 className="qc__sub">Lab &amp; Field Testing</h3>
            <p className="qc__text">
              We verify what matters most for roadside cover and forage value using routine lab tests and field sampling.
            </p>
            <motion.ul className="qc__list" variants={list} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <motion.li variants={item}><strong>Seed quality (Road Grass):</strong> germination %, purity %, inert/weed screening, and vigor.</motion.li>
              <motion.li variants={item}><strong>Moisture &amp; stability:</strong> periodic checks to protect shelf life and fast establishment.</motion.li>
              <motion.li variants={item}><strong>Forage metrics (Alfalfa):</strong> crude protein, ADF/NDF and visual grade for leafiness and color.</motion.li>
              <motion.li variants={item}><strong>Documentation:</strong> lot COA with spec results available on request.</motion.li>
            </motion.ul>
          </motion.article>

          {/* Block 3 */}
          <motion.article
            className="qc__block"
            variants={slide("left")}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <h3 className="qc__sub">Packaging &amp; Logistics</h3>
            <p className="qc__text">
              Practical, export-ready packing that travels well and lands ready to use.
            </p>
            <motion.ul className="qc__list" variants={list} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <motion.li variants={item}><strong>Seed:</strong> 5–25 kg laminated bags or bulk sacks with inner liners; palletized &amp; stretch-wrapped.</motion.li>
              <motion.li variants={item}><strong>Alfalfa:</strong> compressed bales or 25 kg pellet bags; UV-safe wrap options for outdoor storage.</motion.li>
              <motion.li variants={item}><strong>Labels:</strong> lot/pack date, net weight, storage notes, and QR link to lot documents.</motion.li>
              <motion.li variants={item}><strong>Dispatch:</strong> sealed trucks/containers; photos &amp; weights shared before departure.</motion.li>
            </motion.ul>
          </motion.article>
        </div>
      </motion.div>
    </section>
  );
}
