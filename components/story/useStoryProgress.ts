"use client";

import { useScroll, type UseScrollOptions } from "framer-motion";
import type { RefObject } from "react";

export function useStoryProgress(
  target: RefObject<HTMLElement | null>,
  offset: UseScrollOptions["offset"] = ["start start", "end end"]
) {
  const { scrollYProgress } = useScroll({
    target,
    offset,
  });

  return scrollYProgress;
}
