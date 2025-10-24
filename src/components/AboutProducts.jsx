import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./AboutProducts.css";

/* ------- Minimal variants (same feel as Productshow) ------- */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

const slidePanel = (dir = "left") => ({
  hidden: { opacity: 0, x: dir === "left" ? -80 : 80, scale: 0.96 },
  show: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
});

const listStagger = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { delayChildren: 0.05, staggerChildren: 0.06, when: "beforeChildren" }
  }
};

const itemUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

export default function AboutProducts() {
  /* ---- Section-level cinematic fade/parallax (enter → center → exit) ---- */
  const sectionRef = useRef(null);
  const { scrollYProgress: secProg } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 20%"]
  });
  const sectionOpacity = useTransform(secProg, [0, 0.5, 1], [0.2, 1, 0.2]);
  const sectionY = useTransform(secProg, [0, 0.5, 1], [12, 0, -12]);

  /* ---- Per-panel subtle dim/shift on exit (extra cinematic) ---- */
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const { scrollYProgress: leftProg } = useScroll({
    target: leftRef,
    offset: ["start 85%", "end 15%"]
  });
  const leftOpacity = useTransform(leftProg, [0, 0.5, 1], [0.75, 1, 0.75]);
  const leftY = useTransform(leftProg, [0, 0.5, 1], [8, 0, -8]);

  const { scrollYProgress: rightProg } = useScroll({
    target: rightRef,
    offset: ["start 85%", "end 15%"]
  });
  const rightOpacity = useTransform(rightProg, [0, 0.5, 1], [0.75, 1, 0.75]);
  const rightY = useTransform(rightProg, [0, 0.5, 1], [8, 0, -8]);

  return (
    <motion.section
      ref={sectionRef}
      id="about"
      className="guar-alfalfa-about-section"
      style={{ opacity: sectionOpacity, y: sectionY }}
      aria-labelledby="guar-alfalfa-title"
    >
      <div className="guar-alfalfa-section-inner">
        {/* Title: clean fade-up */}
        <motion.h2
          id="guar-alfalfa-title"
          className="guar-alfalfa-section-title"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 60, damping: 12 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          Road Grass &amp; Alfalfa — Built for Consistent Performance
        </motion.h2>

        {/* Grid: no redundant wrappers; children animate themselves */}
        <div className="guar-alfalfa-content-grid">
          {/* LEFT panel */}
          <motion.article
            ref={leftRef}
            className="guar-alfalfa-panel guar-alfalfa-panel--left"
            variants={slidePanel("left")}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.35 }}
            style={{ opacity: leftOpacity, y: leftY }}
          >
            <motion.h3
              className="guar-alfalfa-panel-title"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
            >
              Our Focus
            </motion.h3>

            <motion.p
              className="guar-alfalfa-panel-text"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
            >
              We specialize in natural <strong>Road Grass</strong> and <strong>Alfalfa</strong> solutions. By pairing
              certified seed selection with climate-fit cultivars and controlled curing/processing, we deliver dependable{" "}
              <em>establishment, nutrition, and consistency</em> across turf, forage, and select industrial uses.
            </motion.p>

            <motion.ul
              className="guar-alfalfa-list"
              variants={listStagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
            >
              <motion.li variants={itemUp}>Seed-to-shipment lot traceability</motion.li>
              <motion.li variants={itemUp}>Tight purity &amp; moisture control</motion.li>
              <motion.li variants={itemUp}>Proven germination &amp; fast establishment for Road Grass</motion.li>
              <motion.li variants={itemUp}>Clean, nutrient-preserving processing for alfalfa</motion.li>
            </motion.ul>
          </motion.article>

          {/* RIGHT panel */}
          <motion.article
            ref={rightRef}
            className="guar-alfalfa-panel guar-alfalfa-panel--right"
            variants={slidePanel("right")}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.35 }}
            style={{ opacity: rightOpacity, y: rightY }}
          >
            <motion.h3
              className="guar-alfalfa-panel-title"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
            >
              Our Commitment
            </motion.h3>

            <motion.p
              className="guar-alfalfa-panel-text"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
            >
              We keep things transparent—clear specs, reliable deliveries, and open communication. Our operations favor{" "}
              <em>resource-efficient, low-waste</em> practices while supporting growers and partners long term, from
              roadside stabilization and erosion control (Road Grass) to high-value forage nutrition (Alfalfa).
            </motion.p>

            {/* Pledges as a light stagger */}
            <motion.div
              className="guar-alfalfa-pledges"
              variants={listStagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
            >
              <motion.div className="pledge" variants={itemUp}>
                <span className="dot" />
                <div>
                  <h4>Transparent Specs</h4>
                  <p>
                    COAs per lot, germination &amp; purity reports, and moisture/protein (RFV/ADF/NDF where applicable).
                  </p>
                </div>
              </motion.div>

              <motion.div className="pledge" variants={itemUp}>
                <span className="dot" />
                <div>
                  <h4>Reliable Logistics</h4>
                  <p>Predictable lead times, shipment tracking, and consistent packaging.</p>
                </div>
              </motion.div>

              <motion.div className="pledge" variants={itemUp}>
                <span className="dot" />
                <div>
                  <h4>Responsible Sourcing</h4>
                  <p>Grower partnerships, region-fit varieties, and smarter input use.</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.article>
        </div>
      </div>
    </motion.section>
  );
}
