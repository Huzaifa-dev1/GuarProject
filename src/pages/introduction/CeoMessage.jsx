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
  show: { opacity: 1, y: 0, transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] } },
};
const slideIn = (dir = "left", d = 110) => ({
  hidden: { opacity: 0, x: dir === "left" ? -d : d, y: 0, scale: 0.985 },
  show: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
});

export default function CeoMessage() {
  return (
    <section className="leaders" aria-labelledby="leaders-title">
      <div className="leaders__inner">

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
              JUNAID QAMAR <span className="role">, FOUNDER &amp; CEO</span>
            </h3>

            <div className="leader-copy">
              <p>
                MJA GROUP is an establishment based on originality—whether it’s the originality of the
                product or the company. Because we, as a company, believe that it is better to
                fail in originality than to succeed in imitation.
              </p>
              <p>
                MJA GROUP is currently operating in the export of Alfalfa and Rhodes grass,
                serving both domestic and international clientele with high-quality agricultural products.
                We aim to continuously expand our export operations and strengthen our global presence.
              </p>
              <p>
                MJA GROUP is solely established and designed with the intention of practically benefiting
                the economy, business, and humanity by allowing better living standards for all.
              </p>
              <p>
                “What one does is what counts.” MJA GROUP truly and sincerely intends to do responsible
                business in order to make our intentions come true.
              </p>
            </div>
          </motion.div>

          <motion.figure className="leader-col leader-col--media" variants={slideIn("right", 120)}>
            <img src={CEO_IMG} alt="Junaid Qamar — Founder & CEO" loading="lazy" />
          </motion.figure>
        </motion.section>

      </div>
    </section>
  );
}
