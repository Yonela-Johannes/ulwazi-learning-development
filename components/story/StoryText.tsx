import type { ReactNode } from "react";

type StoryTextProps = {
  eyebrow?: string;
  children: ReactNode;
  description?: ReactNode;
  className?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  size?: "lg" | "md";
};

const headingSizes = {
  lg: "text-4xl sm:text-6xl lg:text-8xl",
  md: "text-3xl sm:text-5xl lg:text-6xl",
};

export default function StoryText({
  eyebrow,
  children,
  description,
  className = "",
  align = "left",
  as: Heading = "h2",
  size = "lg",
}: StoryTextProps) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex max-w-3xl flex-col gap-6 ${alignment} ${className}`}>
      {eyebrow && (
        <p className="text-xs font-medium uppercase tracking-[0.24em] opacity-70">
          {eyebrow}
        </p>
      )}

      <Heading
        className={`text-balance font-medium leading-[0.95] tracking-[-0.04em] ${headingSizes[size]}`}
      >
        {children}
      </Heading>

      {description && (
        <div className="max-w-xl text-base leading-7 opacity-70 sm:text-lg">
          {description}
        </div>
      )}
    </div>
  );
}
