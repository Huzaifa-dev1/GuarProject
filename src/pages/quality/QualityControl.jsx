import React from "react";
import { motion } from "framer-motion";
import "./QualityControl.css";
import QUALITY_HERO from "../../assets/images/Quality.png";

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export default function QualityControl() {
  return (
    <section className="qc">
      <div
        className="qc-hero"
        role="img"
        aria-label="Quality control lab for Rhodes Grass & Alfalfa"
      >
        <img src={QUALITY_HERO} alt="" className="qc-hero__img" />
        <div className="qc-hero__overlay" />

        {/* centered shell to keep content aligned on all sizes */}
        <div className="qc-shell">
          <div className="qc-hero__content qc-hero--split">
            {/* LEFT */}
            <motion.div
              className="qc-hero__left"
              variants={fade}
              initial="hidden"
              animate="show"
            >
              <p className="qc-eyebrow">Every Batch Verified</p>
              <h1 className="qc-hero__title">Quality &amp; Handling — Built In</h1>
              <p className="qc-hero__tag">
                From Rhodes-Grass seed lots to Alfalfa forage, each step is tested and trusted.
              </p>

              <ul className="qc-badges">
                <li>Purity</li>
                <li>Germination</li>
                <li>Protein</li>
                <li>Moisture</li>
              </ul>
            </motion.div>

            {/* RIGHT (compact cards) */}
            <motion.div
              className="qc-hero__right"
              variants={fade}
              initial="hidden"
              animate="show"
            >
              <div className="qc-card small">
                <h3 className="qc-card__title">Lab Testing</h3>
                <p className="qc-mini">
                  Verified for germination, moisture, and nutritional value before export.
                </p>
              </div>

              <div className="qc-card small">
                <h3 className="qc-card__title">Packaging</h3>
                <p className="qc-mini">
                  Clean, sealed bags and UV-safe wraps ensure long shelf life and freshness.
                </p>
              </div>
            </motion.div>
          </div>

          {/* INLINE METRICS (always inside flow) */}
          <motion.ul className="qc-stats" variants={fade} initial="hidden" animate="show">
            <li><span>98%</span> Purity</li>
            <li><span>85%</span> Germination</li>
            <li><span>≤12%</span> Moisture</li>
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
