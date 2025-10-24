// src/hooks/Framer.js
export const fadeIn = (delay = 0, duration = 0.6) => ({
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration, delay, ease: [0.22, 1, 0.36, 1] } }
});

export const slideIn = (dir = "up", delay = 0, distance = 40, duration = 0.6) => {
  const axis = (dir === "left" || dir === "right") ? "x" : "y";
  const from = (dir === "left" || dir === "up") ? distance : -distance;
  return {
    hidden: { opacity: 0, [axis]: from },
    show:   { opacity: 1, [axis]: 0, transition: { duration, delay, ease: [0.22, 1, 0.36, 1] } }
  };
};

export const zoomIn = (delay = 0, duration = 0.55, from = 0.96) => ({
  hidden: { opacity: 0, scale: from },
  show:   { opacity: 1, scale: 1, transition: { duration, delay, ease: [0.22, 1, 0.36, 1] } }
});

export const containerStagger = (delayChildren = 0.1, stagger = 0.08) => ({
  hidden: { opacity: 1 }, // keep container visible
  show:   {
    opacity: 1,
    transition: { delayChildren, staggerChildren: stagger, when: "beforeChildren" }
  }
});
