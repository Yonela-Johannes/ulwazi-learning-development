"use client";

import type { ReactNode, RefObject } from "react";

type StorySectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  height?: string;
  label?: string;
  ref?: RefObject<HTMLElement | null> | ((node: HTMLElement | null) => void);
};

export default function StorySection({
  id,
  children,
  className = "",
  height = "300vh",
  label,
  ref,
}: StorySectionProps) {
  return (
    <section
      ref={ref}
      id={id}
      aria-label={label}
      className={`relative w-full ${className}`}
      style={{ minHeight: height }}
    >
      {children}
    </section>
  );
}
