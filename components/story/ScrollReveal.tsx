"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  threshold?: number | "some" | "all";
  rootMargin?: string;
  distance?: number;
  duration?: number;
};

const EASE_OUT_CUBIC = [0.215, 0.61, 0.355, 1] as const;

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  once = true,
  threshold = 0.15,
  rootMargin = "0px",
  distance = 32,
  duration = 0.7,
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion() === true;

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: threshold, margin: rootMargin }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration, ease: EASE_OUT_CUBIC, delay: delay / 1000 }
      }
    >
      {children}
    </motion.div>
  );
}