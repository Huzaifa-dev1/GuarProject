import { useEffect } from "react";

export default function useAnimations({
  root = null,
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.12,
} = {}) {
  useEffect(() => {
    // 1) Page-load fade
    document.documentElement.classList.add("page-enter");
    const t = requestAnimationFrame(() =>
      document.documentElement.classList.add("page-enter-active")
    );
    // cleanup in case of fast nav
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    // 2) Scroll direction (for optional styling)
    let lastY = window.scrollY;
    const onScroll = () => {
      const dir = window.scrollY > lastY ? "down" : "up";
      document.documentElement.dataset.scrollDir = dir;
      lastY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // 3) IntersectionObserver for [data-anim]
    const els = Array.from(document.querySelectorAll("[data-anim]"));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const el = e.target;
          const once = el.getAttribute("data-anim-once") === "true";
          const delay = parseInt(el.getAttribute("data-anim-delay") || "0", 10);

          if (e.isIntersecting) {
            // in view -> animate in
            if (delay) {
              el.style.transitionDelay = `${delay}ms`;
            }
            el.classList.add("anim-in");
            el.classList.remove("anim-out");
            if (once) {
              io.unobserve(el);
            }
          } else {
            // out of view -> animate out (for scroll up replay)
            el.classList.remove("anim-in");
            el.classList.add("anim-out");
          }
        });
      },
      { root, rootMargin, threshold }
    );

    els.forEach((el) => {
      // Initialize all with .anim-out so they’re hidden before first reveal
      el.classList.add("anim-base", "anim-out");
      io.observe(el);
    });

    return () => io.disconnect();
  }, [root, rootMargin, threshold]);
}
