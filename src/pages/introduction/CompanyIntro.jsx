import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./CompanyIntro.css";

/* ================================
   Animation Variants
   ================================ */
const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.18,
      when: "beforeChildren",
    },
  },
};

const fadeDown = {
  hidden: { opacity: 0, y: -30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1,
      ease: [0.25, 1, 0.35, 1],
    },
  },
};

const ruleAnim = {
  hidden: { opacity: 0, scaleX: 0, originX: 0 },
  show: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.9, ease: [0.25, 1, 0.35, 1] },
  },
};

export default function CompanyIntro() {
  // Section-level cinematic scroll fade-out
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 20%"],
  });

  // smooth opacity + vertical shift mapping
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.2]);
  const sectionY = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);

  return (
    <motion.section
      ref={sectionRef}
      className="company-intro"
      aria-labelledby="company-intro-title"
      style={{ opacity: sectionOpacity, y: sectionY }}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
    >
      <div className="ci__inner">
        {/* Header */}
        <motion.header className="ci__head" variants={fadeDown}>
          <h2 id="company-intro-title" className="ci__title">
            Qamar Group
          </h2>
          <p className="ci__tagline">
            Origin, Growth, and Commitment to Quality
          </p>
        </motion.header>

        <motion.hr className="ci__rule" variants={ruleAnim} />

        {/* Origin */}
        <motion.section className="ci__block" variants={fadeDown}>
          <h3 className="ci__sub">Our Origin</h3>
          <p className="ci__text">
            <strong>Qamar Group (QGRP)</strong> is rooted in Southern Punjab,
            a region recognized for rich agriculture and extensive cultivation of{" "}
            <strong>Rhodes Grass</strong> and <strong>Alfalfa</strong>. Core cultivating areas include{" "}
            <em>Muzaffargarh, Taunsa Shareef, Layyah, Bhakkar, and Mianwali</em>.
          </p>
        </motion.section>

        <motion.hr className="ci__rule" variants={ruleAnim} />

        {/* Heritage */}
        <motion.section className="ci__block" variants={fadeDown}>
          <h3 className="ci__sub">Family Heritage</h3>
          <p className="ci__text">
            The seed-trading enterprise began with the <strong>Qamar family</strong> in
            the 1950s, initially focused on <strong>Rhodes Grass</strong> and{" "}
            {/* <strong>Alfalfa</strong> seed trade. It was led by{" "}
            <strong>Ch. Rahim Ud Din (Late)</strong>, grandfather of Qamar Group’s
            current CEO, whose vision centered on growth and prosperity for the
            Rhodes Grass &amp; Alfalfa sector. */}
          </p>
        </motion.section>

        <motion.hr className="ci__rule" variants={ruleAnim} />

        {/* Expansion */}
        <motion.section className="ci__block" variants={fadeDown}>
          <h3 className="ci__sub">Expansion &amp; Manufacturing</h3>
          <p className="ci__text">
            Building on a diversified group portfolio—construction, carriage
            services, oil mill, and bitumen trading—the Group established{" "}
            <strong>Qamar Group (QGRP)</strong>, the region’s first dedicated
            seed/forage processing unit for <strong>Rhodes Grass</strong> and{" "}
            <strong>Alfalfa</strong>. Today, QGRP serves export and domestic markets
            with:
          </p>
          <motion.ul
            className="ci__list"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.li variants={fadeDown}>Rhodes Grass – Certified Seed</motion.li>
            <motion.li variants={fadeDown}>Alfalfa – Hay, Meal, &amp; Pellets</motion.li>
            <motion.li variants={fadeDown}>Rhodes Grass &amp; Alfalfa Forage Blends</motion.li>
          </motion.ul>
        </motion.section>

        <motion.hr className="ci__rule" variants={ruleAnim} />

        {/* Promise */}
        <motion.section className="ci__block" variants={fadeDown}>
          <h3 className="ci__sub">Our Promise</h3>
          <p className="ci__text">
            We pursue the highest standards in production, packaging, and supply,
            with a consistent focus on cost-effectiveness and on-time delivery.
            Our goal is to serve international and domestic customers with
            dependable quality and long-term value across Rhodes Grass and Alfalfa lines.
          </p>
          <motion.ul
            className="ci__bullets"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.li variants={fadeDown}>Process discipline and documented QA/QC</motion.li>
            <motion.li variants={fadeDown}>Efficient operations and reliable logistics</motion.li>
            <motion.li variants={fadeDown}>Customer-first communication and support</motion.li>
          </motion.ul>
        </motion.section>
      </div>
    </motion.section>
  );
}
