"use client";

import type { ReactNode, RefObject } from "react";

type StickySceneProps = {
  children: ReactNode;
  className?: string;
  top?: string;
  ref?: RefObject<HTMLDivElement | null> | ((node: HTMLDivElement | null) => void);
};

export default function StickyScene({
  children,
  className = "",
  top = "0px",
  ref,
}: StickySceneProps) {
  return (
    <div
      ref={ref}
      className={`sticky flex h-screen w-full items-center justify-center overflow-hidden ${className}`}
      style={{
        top,
        height: `calc(100svh - ${top})`,
      }}
    >
      {children}
    </div>
  );
}
