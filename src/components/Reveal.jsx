// src/components/Reveal.jsx
import React from "react";
import { motion } from "framer-motion";

export default function Reveal({
  as = "div",
  variants,
  children,
  once = true,
  amount = 0.35,        // 0..1 of element that must be in view
  className = "",
  initial = "hidden",
  animate = "show",
  ...rest
}) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      variants={variants}
      initial={initial}
      whileInView={animate}
      viewport={{ once, amount }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
