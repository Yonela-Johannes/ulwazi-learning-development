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
import { STORY_PERSON, STORY_PANELS } from "./content";

const { who, why, vision } = STORY_PANELS;

const SCALE_TO = 0.96;
const DIM_TO = 0.3;

const SHORT = "[@media(max-height:560px)]";


type ClassValue = string | false | null | undefined;
const cn = (...classes: ClassValue[]) => classes.filter(Boolean).join(" ");

type Surface = "light" | "dark";

type HeadlineLine = readonly {
  text: string;
  accent?: boolean;
}[];

const PANEL_BASE =
  "sticky top-0 flex h-svh w-full items-center justify-center overflow-hidden";

type StackPanelProps = {
  index: number;
  /** Number of scroll "steps" the progress value spans (see OurStory). */
  steps: number;
  progress: MotionValue<number>;
  animate: boolean;
  className?: string;
  overlayClassName?: string;
  children: ReactNode;
};

/** Panel that scales back and dims as the next panel slides over it. */
function AnimatedStackPanel({
  index,
  steps,
  progress,
  className,
  overlayClassName = "bg-ink",
  children,
}: Omit<StackPanelProps, "animate">) {
  const range = [index / steps, (index + 1) / steps];

  const scale = useTransform(progress, range, [1, SCALE_TO]);
  const dim = useTransform(progress, range, [0, DIM_TO]);

  return (
    <motion.div
      style={{ scale }}
      className={cn(PANEL_BASE, "will-change-transform", className)}
    >
      <motion.div
        aria-hidden="true"
        style={{ opacity: dim }}
        className={cn(
          "pointer-events-none absolute inset-0 z-20",
          overlayClassName,
        )}
      />
      {children}
    </motion.div>
  );
}

/** Static panel: the last one, or any panel under reduced motion. No hooks run. */
function StackPanel({ animate, ...props }: StackPanelProps) {
  if (animate) return <AnimatedStackPanel {...props} />;

  return (
    <div className={cn(PANEL_BASE, props.className)}>{props.children}</div>
  );
}

function RuleLabel({
  children,
  className,
  ruleClassName = "w-8",
}: {
  children: ReactNode;
  className?: string;
  ruleClassName?: string;
}) {
  return (
    <div className={cn("flex items-center", className)}>
      <span
        aria-hidden="true"
        className={cn("h-px shrink-0 bg-teal", ruleClassName)}
      />
      {children}
    </div>
  );
}

/** Left-ruled pull note. */
function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="mt-9 max-w-xl border-l-2 border-teal pl-5 text-lg leading-8 text-muted sm:text-xl">
      {children}
    </div>
  );
}

function Headline({ lines }: { lines: readonly HeadlineLine[] }) {
  return (
    <>
      {lines.map((line, lineIndex) => (
        <Fragment key={lineIndex}>
          {lineIndex > 0 && <br />}

          {line.map((segment, segmentIndex) =>
            segment.accent ? (
              <span key={segmentIndex} className="text-teal">
                {segment.text}
              </span>
            ) : (
              <Fragment key={segmentIndex}>{segment.text}</Fragment>
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
  className,
}: PanelImageProps) {
  return (
    <div
      className={cn(
        "relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-mist",
        "max-h-[44svh] sm:max-h-[52svh] lg:max-h-[78svh]",
        `${SHORT}:max-h-[34svh]`,
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 42vw, 90vw"
        className="object-cover object-center"
        priority={priority}
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink/55 to-transparent"
      />

      <div className="absolute bottom-5 left-5 right-5">
        <p className="text-sm font-semibold text-white sm:text-base">
          {caption}
        </p>
      </div>
    </div>
  );
}

/** `surface` is the panel background: "light" panels get dark text and vice versa. */
function PanelCounter({
  index,
  label,
  surface = "light",
}: {
  index: number;
  label: string;
  surface?: Surface;
}) {
  const isLight = surface === "light";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute bottom-7 left-6 hidden items-center gap-3 text-sm font-bold tracking-[0.06em] sm:flex lg:left-16",
        isLight ? "text-ink/45" : "text-paper/55",
      )}
    >
      <span className={cn("h-px w-8", isLight ? "bg-teal/60" : "bg-teal/70")} />
      <span>
        {String(index + 1).padStart(2, "0")} · {label}
      </span>
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
  return (
    <div
      className={cn(
        "relative z-10 mx-auto grid w-full max-w-[1500px] items-center gap-8",
        "px-6 py-10 sm:px-10 sm:py-16 lg:gap-20 lg:px-16",
        `${SHORT}:py-6`,
        imageSide === "left"
          ? "lg:grid-cols-[0.85fr_1.15fr]"
          : "lg:grid-cols-[1.15fr_0.85fr]",
      )}
    >
      {children}
    </div>
  );
}


type PanelDef = {
  key: string;
  counter: string;
  surface: Surface;
  className: string;
  overlayClassName?: string;
  content: ReactNode;
};

const LIGHT_PANEL = "bg-paper text-ink";
const DIVIDED_LIGHT_PANEL = cn(LIGHT_PANEL, "border-b border-ink/10");

/**
 * Add, remove or reorder panels here. The section height, scroll ranges,
 * counters and "last panel" behaviour all derive from this array.
 */
const PANELS: readonly PanelDef[] = [
  {
    key: "who",
    counter: who.counter,
    surface: "light",
    className: DIVIDED_LIGHT_PANEL,
    content: (
      <SplitLayout imageSide="left">
        <PanelImage
          src={STORY_PERSON.image}
          alt={`${STORY_PERSON.name} — ${STORY_PERSON.role}`}
          caption={STORY_PERSON.name}
          priority
        />

        <div className="max-w-2xl">
          <StoryText
            as="h2"
            eyebrow={who.eyebrow}
            description={STORY_PERSON.bio[0]}
          >
            <Headline lines={who.headline} />
          </StoryText>

          <RuleLabel
            className={cn(
              "mt-8 flex-wrap gap-3 text-base text-muted sm:text-lg",
              `${SHORT}:mt-4`,
            )}
          >
            <span className="font-semibold">{STORY_PERSON.role}</span>
            <span aria-hidden="true">·</span>
            <span>{STORY_PERSON.origin}</span>
          </RuleLabel>
        </div>
      </SplitLayout>
    ),
  },
  {
    key: "why",
    counter: why.counter,
    surface: "light",
    className: DIVIDED_LIGHT_PANEL,
    content: (
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
            description={STORY_PERSON.bio[1]}
          >
            <Headline lines={why.headline} />
          </StoryText>

          <Callout>{why.callout}</Callout>
        </div>
      </SplitLayout>
    ),
  },
  {
    key: "vision",
    counter: vision.counter,
    surface: "light",
    className: LIGHT_PANEL,
    content: (
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
            description={STORY_PERSON.bio[2]}
          >
            <Headline lines={vision.headline} />
          </StoryText>
        </div>
      </SplitLayout>
    ),
  },
];


export default function OurStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollYProgress = useStoryProgress(sectionRef);
  const reduceMotion = useReducedMotion();

  const panelCount = PANELS.length;

  const steps = Math.max(1, panelCount - 1);

  return (
    <StorySection
      ref={sectionRef}
      id="our-story"
      label="Our Story"
      height={`${panelCount * 100}vh`}
      className="bg-paper text-ink"
    >
      {PANELS.map((panel, index) => {
        const isLast = index === panelCount - 1;

        return (
          <StackPanel
            key={panel.key}
            index={index}
            steps={steps}
            progress={scrollYProgress}
            animate={!reduceMotion && !isLast}
            className={panel.className}
            overlayClassName={panel.overlayClassName}
          >
            {panel.content}

            <PanelCounter
              index={index}
              label={panel.counter}
              surface={panel.surface}
            />
          </StackPanel>
        );
      })}
    </StorySection>
  );
}