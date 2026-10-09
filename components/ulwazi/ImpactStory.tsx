"use client";

import { Fragment, useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useTransform } from "framer-motion";

import StorySection from "@/components/story/StorySection";
import StoryText from "@/components/story/StoryText";
import { useStoryProgress } from "@/components/story/useStoryProgress";
import { PROGRAMMES_PLANS, PRINCIPLES, ORG_DETAILS } from "./content";

/* ------------------------------------------------------------------ */
/* Tokens                                                              */
/* ------------------------------------------------------------------ */

// Move these into your Tailwind theme (e.g. `plum`, `plum-deep`, `paper`)
// so the whole site shares one source of truth.
const SURFACE = "bg-[#291B4F]";
const SURFACE_DEEP = "bg-[#21163F]";
const TEXT = "text-[#F8F8F6]";

/* ------------------------------------------------------------------ */
/* Utilities                                                           */
/* ------------------------------------------------------------------ */

// Tiny local helper. Swap for your project's `cn` if you have one.
type ClassValue = string | false | null | undefined;
const cn = (...classes: ClassValue[]) => classes.filter(Boolean).join(" ");

type HeadlineLine = readonly { text: string; accent?: boolean }[];

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

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

// Matched to PROGRAMMES_PLANS by index. Better long-term: add a `headline`
// field to each plan in ./content and delete this array.
const PROGRAMME_HEADLINES: readonly (readonly HeadlineLine[])[] = [
  [
    [{ text: "Creating educational" }],
    [{ text: "excellence", accent: true }, { text: " in townships." }],
  ],
  [
    [{ text: "Creating" }],
    [{ text: "opportunities", accent: true }],
    [{ text: "for township youth." }],
  ],
  [
    [{ text: "A place to" }],
    [{ text: "learn without", accent: true }],
    [{ text: "limits." }],
  ],
];

const PRINCIPLES_HEADLINE: readonly HeadlineLine[] = [
  [{ text: "The work is" }],
  [{ text: "built around" }],
  [{ text: "four things.", accent: true }],
];

const PRINCIPLES_INTRO =
  "These principles shape how Ulwazi creates spaces for children to learn, connect, grow and imagine something bigger for themselves.";

const programmes = PROGRAMMES_PLANS.slice(0, PROGRAMME_HEADLINES.length).map(
  (plan, index) => ({ ...plan, headline: PROGRAMME_HEADLINES[index] }),
);

type Programme = (typeof programmes)[number];

/** Programme slides plus the closing principles panel. */
const PANEL_COUNT = programmes.length + 1;

/* ------------------------------------------------------------------ */
/* Shared pieces                                                       */
/* ------------------------------------------------------------------ */

function ChapterLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-xs font-medium uppercase tracking-[0.16em] text-white/40",
        className,
      )}
    >
      {children}
    </p>
  );
}

function ProgrammeImage({
  programme,
  sizes,
  className,
}: {
  programme: Programme;
  sizes: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl",
        SURFACE_DEEP,
        className,
      )}
    >
      <Image
        src={programme.image}
        alt={programme.title}
        fill
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}

function Audience({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-4 border-t border-white/10 pt-5",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal"
      />

      <div>
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-white/40">
          Who it serves
        </p>
        <p className="mt-2 text-base leading-7 text-white/60">{children}</p>
      </div>
    </div>
  );
}

function PrinciplesHeading({ className }: { className: string }) {
  return (
    <h2
      className={cn(
        "font-medium leading-[0.9] tracking-[-0.055em]",
        className,
      )}
    >
      <Headline lines={PRINCIPLES_HEADLINE} />
    </h2>
  );
}

function PrincipleList({ layout }: { layout: "grid" | "list" }) {
  const isGrid = layout === "grid";

  return (
    <div
      className={cn(
        "border-t border-white/15",
        isGrid && "grid sm:grid-cols-2",
      )}
    >
      {PRINCIPLES.map((item) => (
        <div
          key={item.number}
          className={cn(
            "border-b border-white/15",
            // Odd items hug the left edge, even items get a column gutter.
            isGrid ? "py-8 sm:odd:pr-6 sm:even:pl-6" : "py-7",
          )}
        >
          <h3
            className={cn(
              "font-medium",
              TEXT,
              isGrid
                ? "text-2xl tracking-[-0.03em] sm:text-3xl"
                : "text-xl tracking-[-0.025em]",
            )}
          >
            {item.title}
          </h3>

          <p
            className={cn(
              "text-white/55",
              isGrid
                ? "mt-3 max-w-sm text-base leading-7"
                : "mt-2 text-sm leading-6",
            )}
          >
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}

function CoreQuote({ className }: { className: string }) {
  return (
    <blockquote className={cn("border-l-2 border-teal", className)}>
      {/* Marks are decorative; the blockquote already conveys the quotation. */}
      <span aria-hidden="true">“</span>
      {ORG_DETAILS.coreQuote}
      <span aria-hidden="true">”</span>
    </blockquote>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop: horizontal track                                           */
/* ------------------------------------------------------------------ */

function DesktopProgrammeSlide({ programme }: { programme: Programme }) {
  return (
    <div
      className={cn(
        "relative flex h-full min-w-0 flex-1 items-center border-r border-white/10",
        SURFACE,
      )}
    >
      <div className="mx-auto grid w-full max-w-[1550px] grid-cols-[0.95fr_1.05fr] items-center gap-16 px-12 py-12 xl:gap-24 xl:px-20">
        <ProgrammeImage
          programme={programme}
          sizes="48vw"
          className="h-[min(62svh,640px)]"
        />

        <div className="max-w-2xl">
          <ChapterLabel className="mb-8">{programme.title}</ChapterLabel>

          <StoryText
            as="h2"
            eyebrow={programme.subtitle}
            description={programme.description}
            className={TEXT}
          >
            <Headline lines={programme.headline} />
          </StoryText>

          <Audience className="mt-10 max-w-xl">{programme.audience}</Audience>
        </div>
      </div>
    </div>
  );
}

function DesktopPrinciplesSlide() {
  return (
    <div
      className={cn(
        "relative flex h-full min-w-0 flex-1 items-center",
        SURFACE,
        TEXT,
      )}
    >
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-[0.8fr_1.2fr] items-start gap-24 px-20 py-12">
        <div>
          <ChapterLabel className="mb-8">Core purpose</ChapterLabel>

          <PrinciplesHeading className="max-w-xl text-[clamp(3rem,5vw,5.8rem)]" />

          <p className="mt-8 max-w-md text-lg leading-7 text-white/60">
            {PRINCIPLES_INTRO}
          </p>
        </div>

        <div>
          <PrincipleList layout="grid" />

          <CoreQuote className="mt-10 max-w-2xl pl-6 text-xl leading-8 text-white/75" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile / tablet (and reduced motion): stacked story                 */
/* ------------------------------------------------------------------ */

function StackedProgramme({ programme }: { programme: Programme }) {
  return (
    <article className="border-t border-white/10 py-16 first:border-t-0 first:pt-0">
      <ChapterLabel className="mb-7">{programme.title}</ChapterLabel>

      <ProgrammeImage
        programme={programme}
        sizes="(min-width: 768px) 720px, 100vw"
        className="aspect-[4/3]"
      />

      <div className="mt-9">
        <StoryText
          as="h2"
          eyebrow={programme.subtitle}
          description={programme.description}
          className={TEXT}
        >
          <Headline lines={programme.headline} />
        </StoryText>

        <Audience className="mt-8">{programme.audience}</Audience>
      </div>
    </article>
  );
}

function StackedPrinciples() {
  return (
    <article className="border-t border-white/10 pt-16">
      <ChapterLabel className="mb-7">Core purpose</ChapterLabel>

      <PrinciplesHeading className="text-[clamp(2.7rem,10vw,4.5rem)]" />

      <p className="mt-7 max-w-xl text-base leading-7 text-white/60">
        {PRINCIPLES_INTRO}
      </p>

      <div className="mt-10">
        <PrincipleList layout="list" />
      </div>

      <CoreQuote className="mt-9 pl-5 text-base leading-7 text-white/70" />
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function ImpactStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollYProgress = useStoryProgress(sectionRef);
  const reduceMotion = useReducedMotion();

  // The track is PANEL_COUNT viewports wide. Translating by a percentage of
  // the track's own width means the final panel lands exactly in view, with
  // no hard-coded vw values to keep in sync.
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${((PANEL_COUNT - 1) / PANEL_COUNT) * 100}%`],
  );

  // Without motion the horizontal track can't be scrolled, so panels 2+ would
  // be unreachable. Reduced-motion users get the stacked layout at all sizes.
  const stacked = Boolean(reduceMotion);

  return (
    <StorySection
      ref={sectionRef}
      id="ulwazi"
      label="The Work"
      height={stacked ? "auto" : `${PANEL_COUNT * 100}vh`}
      className={cn(SURFACE, TEXT)}
    >
      {/* Desktop horizontal story */}
      <div
        className={cn(
          "sticky top-0 hidden h-svh overflow-hidden",
          !stacked && "lg:block",
        )}
      >
        <motion.div
          style={{
            width: `${PANEL_COUNT * 100}%`,
            ...(stacked ? {} : { x }),
          }}
          className="flex h-full will-change-transform"
        >
          {programmes.map((programme) => (
            <DesktopProgrammeSlide
              key={programme.title}
              programme={programme}
            />
          ))}

          <DesktopPrinciplesSlide />
        </motion.div>
      </div>

      {/* Mobile / tablet story */}
      <div
        className={cn(
          SURFACE,
          TEXT,
          "px-6 py-24 sm:px-10",
          !stacked && "lg:hidden",
        )}
      >
        <div className="mx-auto max-w-3xl">
          {programmes.map((programme) => (
            <StackedProgramme key={programme.title} programme={programme} />
          ))}

          <StackedPrinciples />
        </div>
      </div>
    </StorySection>
  );
}