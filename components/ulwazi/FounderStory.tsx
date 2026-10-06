"use client";

import { Fragment, useRef, type ReactNode } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";

import StorySection from "@/components/story/StorySection";
import StoryText from "@/components/story/StoryText";
import { useStoryProgress } from "@/components/story/useStoryProgress";
import {
  FOUNDER_CONTENT,
  FOUNDER_PANELS,
  type HeadlineLine,
} from "./content";

  const { who, why, words, vision } = FOUNDER_PANELS;

const PANEL_COUNT = 4;

const SCALE_TO = 0.95;
const DIM_TO = 0.35;


type StackPanelProps = {
  index: number;
  progress: MotionValue<number>;
  isLast?: boolean;
  className?: string;
  overlayClassName?: string;
  children: ReactNode;
};

function StackPanel({
  index,
  progress,
  isLast = false,
  className = "",
  overlayClassName = "bg-ink",
  children,
}: StackPanelProps) {
  const reduceMotion = useReducedMotion();
  const range = [index / PANEL_COUNT, (index + 1) / PANEL_COUNT];

  const scale = useTransform(progress, range, [1, SCALE_TO]);
  const dim = useTransform(progress, range, [0, DIM_TO]);
  const animate = !reduceMotion && !isLast;

  return (
    <motion.div
      style={animate ? { scale } : undefined}
      className={`sticky top-0 flex h-svh w-full items-center justify-center overflow-hidden ${className}`}
    >
      {animate && (
        <motion.div
          aria-hidden
          style={{ opacity: dim }}
          className={`pointer-events-none absolute inset-0 z-20 ${overlayClassName}`}
        />
      )}
      {children}
    </motion.div>
  );
}

function Headline({ lines }: { lines: readonly HeadlineLine[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line.map((seg, j) =>
            seg.accent ? (
              <span key={j} className="text-teal">
                {seg.text}
              </span>
            ) : (
              <Fragment key={j}>{seg.text}</Fragment>
            ),
          )}
        </Fragment>
      ))}
    </>
  );
}

type PanelImageProps = {
  src: string;
  alt: string;
  caption: string;
  priority?: boolean;
  className?: string;
};

function PanelImage({
  src,
  alt,
  caption,
  priority = false,
  className = "",
}: PanelImageProps) {
  return (
    <div
      className={`relative aspect-[4/5] max-h-[42svh] w-full overflow-hidden bg-mist lg:max-h-none ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 42vw, 100vw"
        className="object-cover object-center rounded-2xl"
        priority={priority}
      />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/45 to-transparent" />
      <div className="absolute bottom-5 left-5 text-sm font-medium text-white">
        {caption}
      </div>
    </div>
  );
}

type PanelCounterProps = {
  index: number;
  label: string;
  tone?: "dark" | "light";
};

function PanelCounter({ index, label, tone = "dark" }: PanelCounterProps) {
  const text = tone === "dark" ? "text-ink/35" : "text-paper/35";
  const rule = tone === "dark" ? "bg-teal/50" : "bg-teal/60";

  return (
    <div
      aria-hidden
      className={`absolute bottom-7 left-6 hidden items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] sm:flex lg:left-16 ${text}`}
    >
      <span className={`h-px w-8 ${rule}`} />
      <span>{label}</span>
    </div>
  );
}

function SplitLayout({
  imageSide,
  children,
}: {
  imageSide: "left" | "right";
  children: ReactNode;
}) {
  const columns =
    imageSide === "left"
      ? "lg:grid-cols-[0.85fr_1.15fr]"
      : "lg:grid-cols-[1.15fr_0.85fr]";

  return (
    <div
      className={`relative z-10 mx-auto grid w-full max-w-[1500px] items-center gap-6 px-6 py-10 sm:px-10 sm:py-16 lg:gap-20 lg:px-16 ${columns}`}
    >
      {children}
    </div>
  );
}

export default function FounderStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollYProgress = useStoryProgress(sectionRef);

  const lightPanel = "bg-paper";
  const dividedLightPanel = `${lightPanel} border-b border-ink/10`;

  return (
    <StorySection
      ref={sectionRef}
      id="lumka"
      label="Lumka's Story"
      height={`${PANEL_COUNT * 100}vh`}
      className="bg-paper text-ink"
    >
      {/* PANEL 01 — WHO SHE IS */}
      <StackPanel
        index={0}
        progress={scrollYProgress}
        className={dividedLightPanel}
      >
        <SplitLayout imageSide="left">
          <PanelImage
            src={FOUNDER_CONTENT.image}
            alt={FOUNDER_CONTENT.name}
            caption={FOUNDER_CONTENT.name}
            priority
          />

          <div className="max-w-2xl">
            <StoryText
              as="h2"
              eyebrow={who.eyebrow}
              description={FOUNDER_CONTENT.bio[0]}
            >
              <Headline lines={who.headline} />
            </StoryText>

            <div className="mt-8 flex items-center gap-3 text-sm text-muted">
              <span className="h-px w-8 bg-teal" />
              <span>
                {FOUNDER_CONTENT.role} · {FOUNDER_CONTENT.origin}
              </span>
            </div>
          </div>
        </SplitLayout>

        <PanelCounter index={0} label={who.counter} />
      </StackPanel>

      {/* PANEL 02 — WHY SHE STARTED */}
      <StackPanel
        index={1}
        progress={scrollYProgress}
        className={dividedLightPanel}
      >
        <SplitLayout imageSide="right">
          <PanelImage
            src={why.image.src}
            alt={why.image.alt}
            caption={why.image.caption}
            className="lg:order-2"
          />

          <div className="max-w-2xl lg:order-1">
            <StoryText
              as="h2"
              eyebrow={why.eyebrow}
              description={FOUNDER_CONTENT.bio[1]}
            >
              <Headline lines={why.headline} />
            </StoryText>

            <div className="mt-9 max-w-md border-l-2 border-teal pl-5 text-base leading-7 text-muted sm:text-lg">
              {why.callout}
            </div>
          </div>
        </SplitLayout>

        <PanelCounter index={1} label={why.counter} />
      </StackPanel>

      {/* PANEL 03 — HER WORDS */}
      <StackPanel
        index={2}
        progress={scrollYProgress}
        overlayClassName="bg-ink-deep"
        className="bg-ink px-6 py-10 text-paper sm:px-10 sm:py-16 lg:px-16"
      >
        <figure className="relative z-10 mx-auto w-full max-w-[1100px]">
          <div className="mb-10 flex items-center gap-4 text-sm font-medium uppercase tracking-[0.16em] text-teal">
            <span className="h-px w-10 bg-teal" />
            <span>{words.eyebrow}</span>
          </div>

          <blockquote className="max-w-5xl text-[clamp(2.5rem,5vw,5.5rem)] font-medium leading-[0.94] tracking-[-0.055em]">
            <p>“{FOUNDER_CONTENT.quote}”</p>
          </blockquote>

          <figcaption className="mt-12 flex items-center gap-4">
            <div aria-hidden className="h-px w-10 bg-teal" />
            <div>
              <p className="text-base font-semibold text-paper">
                {FOUNDER_CONTENT.name}
              </p>
              <p className="mt-1 text-sm text-paper/55">
                {FOUNDER_CONTENT.role}
              </p>
            </div>
          </figcaption>
        </figure>

        <PanelCounter index={2} label={words.counter} tone="light" />
      </StackPanel>

      <StackPanel
        index={3}
        progress={scrollYProgress}
        isLast
        className={lightPanel}
      >
        <SplitLayout imageSide="left">
          <PanelImage
            src={vision.image.src}
            alt={vision.image.alt}
            caption={vision.image.caption}
          />

          <div className="max-w-2xl">
            <StoryText
              as="h2"
              eyebrow={vision.eyebrow}
              description={FOUNDER_CONTENT.bio[2]}
            >
              <Headline lines={vision.headline} />
            </StoryText>
          </div>
        </SplitLayout>

        <PanelCounter index={3} label={vision.counter} />
      </StackPanel>
    </StorySection>
  );
}