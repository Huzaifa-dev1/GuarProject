import React from "react";
import { motion } from "framer-motion";
import "./Ceo.css";

/* replace with your actual image paths */
import CEO_IMG from "../../assets/images/CEO.png";
import CFO_IMG from "../../assets/images/cofounder.png";

/* ---- slow, smooth variants (>= 1s) ---- */
const containerStagger = (delay = 0.14, stagger = 0.14) => ({
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { delayChildren: delay, staggerChildren: stagger, when: "beforeChildren" },
  },
});
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] } },
};
const slideIn = (dir = "left", d = 110) => ({
  hidden: { opacity: 0, x: dir === "left" ? -d : d, y: 0, scale: 0.985 },
  show:   { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
});

export default function CeoMessage() {
  return (
    <section className="leaders" aria-labelledby="leaders-title">
      <div className="leaders__inner">

        {/* Section Title */}
        <motion.header
          className="leaders__head"
          variants={containerStagger(0.12, 0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.5 }}
        >
          <motion.p className="eyebrow" variants={fadeUp}>Leadership Messages</motion.p>
          <motion.h2 id="leaders-title" className="title" variants={fadeUp}>
            From the Founder & the Co-Founder
          </motion.h2>
          <motion.span className="rule" variants={fadeUp} aria-hidden />
        </motion.header>

        {/* ===== Block 1: CEO (text left, image right) ===== */}
        <motion.section
          className="leader-row"
          variants={containerStagger(0.16, 0.16)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.45 }}
        >
          <motion.div className="leader-col leader-col--text" variants={slideIn("left", 120)}>
            <h3 className="leader-name">
              Hassaan Ghaffar <span className="role">, FOUNDER &amp; CEO</span>
            </h3>

            <div className="leader-copy">
              <p>
                AGGI is an establishment based on originality—whether it’s the originality of the
                product or the company. Because we, as a company, believe that it is better to
                fail in originality than to succeed in imitation.
              </p>
              <p>
                AGGI is currently operating a guar processing plant to get guar gum, guar splits,
                and guar meal. We intend to warmly facilitate our domestic as well as international
                clientele by increasing our exports.
              </p>
              <p>
                AGGI is solely established and designed with the intention of practically benefiting
                the economy, business, and humanity by allowing better living standards for all.
              </p>
              <p>
                “What one does is what counts.” AGGI truly and sincerely intends to do responsible
                business in order to make our intentions come true.
              </p>
            </div>
          </motion.div>

          <motion.figure className="leader-col leader-col--media" variants={slideIn("right", 120)}>
            <img src={CEO_IMG} alt="Hassaan Ghaffar — Founder & CEO" loading="lazy" />
          </motion.figure>
        </motion.section>

        {/* ===== Block 2: Co-Founder & CFO (same layout) ===== */}
        <motion.section
          className="leader-row"
          variants={containerStagger(0.16, 0.16)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.45 }}
        >
          <motion.div className="leader-col leader-col--text" variants={slideIn("left", 120)}>
            <h3 className="leader-name">
              Zawjah Hassaan <span className="role">, CO-FOUNDER &amp; CFO</span>
            </h3>

            <div className="leader-copy">
              <p>
                Finance is the backbone of any business and financial freedom is only available to
                those who learn about it and work for it.
              </p>
              <p>
                Therefore, AGGI aims to develop such strategies which are not only healthy for an
                effective growth of our business but also high-profit-yielding for our clients and
                overall economy.
              </p>
            </div>
          </motion.div>

          <motion.figure className="leader-col leader-col--media" variants={slideIn("right", 120)}>
            <img src={CFO_IMG} alt="Zawjah Hassaan — Co-Founder & CFO" loading="lazy" />
          </motion.figure>
        </motion.section>
      </div>
    </section>
  );
}
