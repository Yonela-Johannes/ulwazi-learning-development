"use client"
import {
  useScroll,
  type MotionValue,
  type UseScrollOptions,
} from "framer-motion";
import type { RefObject } from "react";

const DEFAULT_OFFSET: UseScrollOptions["offset"] = [
  "start start",
  "end end",
];

export function useStoryProgress(
  target: RefObject<HTMLElement | null>,
  offset: UseScrollOptions["offset"] = DEFAULT_OFFSET,
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target,
    offset,
  });

  return scrollYProgress;
}