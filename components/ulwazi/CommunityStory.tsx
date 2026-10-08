"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import StorySection from "@/components/story/StorySection";
import StoryText from "@/components/story/StoryText";
import ScrollReveal from "@/components/story/ScrollReveal";
import {
  GALLERY_CATEGORIES,
  GALLERY_ITEMS,
  SPONSORS,
  type GalleryItem,
} from "./content";

/**
 * COLOUR TOKENS (assumed from your other story sections):
 *   ink   = #291B4F    paper = #F8F8F6    mist = #E8E8E3    teal = #009CA6
 * If your theme differs, find/replace these four names.
 */

const ALL = "All";

/* ------------------------------------------------------------------ */
/* Utilities                                                           */
/* ------------------------------------------------------------------ */

// Tiny local helper. Swap for your project's `cn` if you have one.
type ClassValue = string | false | null | undefined;
const cn = (...classes: ClassValue[]) => classes.filter(Boolean).join(" ");

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal";

/* ------------------------------------------------------------------ */
/* Gallery layout                                                      */
/* ------------------------------------------------------------------ */

/**
 * lg grid is 12 columns:
 *   0       featured, 7 cols, spans two rows
 *   1 and 2 stack beside it, 5 cols each
 *   3+      three per row, 4 cols each
 * Every card uses the same 4/3 ratio so rows stay even.
 */
function cardLayout(index: number) {
  if (index === 0) {
    return {
      span: "sm:col-span-2 lg:col-span-7 lg:row-span-2",
      shape: "aspect-[4/3] lg:aspect-auto lg:min-h-[26rem]",
      sizes: "(min-width: 1024px) 58vw, 100vw",
    };
  }

  if (index <= 2) {
    return {
      span: "lg:col-span-5",
      shape: "aspect-[4/3]",
      sizes: "(min-width: 1024px) 42vw, (min-width: 640px) 50vw, 100vw",
    };
  }

  return {
    span: "lg:col-span-4",
    shape: "aspect-[4/3]",
    sizes: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  };
}

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

function ChapterLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-8 text-xs font-medium uppercase tracking-[0.16em] text-ink/40">
      {children}
    </p>
  );
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "relative cursor-pointer py-1 text-sm font-medium tracking-[-0.01em] transition-colors duration-200",
        "focus-visible:ring-offset-4 focus-visible:ring-offset-paper",
        FOCUS_RING,
        active ? "text-teal" : "text-ink/55 hover:text-ink",
      )}
    >
      {label}

      <span
        aria-hidden="true"
        className={cn(
          "absolute -bottom-1 left-0 h-px bg-teal transition-all duration-300",
          active ? "w-full" : "w-0",
        )}
      />
    </button>
  );
}

function GalleryCard({
  item,
  index,
  reduceMotion,
  onOpen,
}: {
  item: GalleryItem;
  index: number;
  reduceMotion: boolean;
  onOpen: (index: number, opener: HTMLElement) => void;
}) {
  const { span, shape, sizes } = cardLayout(index);

  return (
    <motion.button
      type="button"
      initial={reduceMotion ? undefined : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay: Math.min(index * 0.04, 0.24),
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={(event) => onOpen(index, event.currentTarget)}
      className={cn(
        "group flex overflow-hidden rounded-2xl bg-mist text-left",
        "focus-visible:ring-offset-4 focus-visible:ring-offset-paper",
        FOCUS_RING,
        span,
      )}
    >
      <div className={cn("relative w-full", shape)}>
        {/* Empty alt: the caption below already names the photo. */}
        <Image
          src={item.src}
          alt=""
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[1200ms] ease-out motion-safe:group-hover:scale-[1.035]"
        />

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/55 to-transparent p-5 pt-20 sm:p-6 sm:pt-24">
          <p className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-[#4DDBDF]">
            {item.category}
          </p>

          <h3 className="max-w-xl text-lg font-medium leading-tight tracking-[-0.02em] text-white sm:text-xl">
            {item.title}
          </h3>

          {item.desc && (
            <p className="mt-2 max-w-lg text-sm leading-5 text-white/70">
              {item.desc}
            </p>
          )}
        </div>
      </div>
    </motion.button>
  );
}

function LightboxButton({
  label,
  className,
  onClick,
  children,
}: {
  label: string;
  className: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "absolute z-20 flex cursor-pointer items-center justify-center border border-white/20 text-white transition-colors hover:border-teal hover:text-teal",
        FOCUS_RING,
        className,
      )}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Lightbox                                                            */
/* ------------------------------------------------------------------ */

type LightboxProps = {
  item: GalleryItem;
  index: number;
  total: number;
  onClose: () => void;
  onStep: (delta: 1 | -1) => void;
};

function Lightbox({ item, index, total, onClose, onStep }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  // Lock page scroll (restoring whatever was there) and move focus inside.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>("button")?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Keyboard: Esc closes, arrows navigate, Tab stays inside the dialog.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") return onClose();
      if (event.key === "ArrowRight") return onStep(1);
      if (event.key === "ArrowLeft") return onStep(-1);
      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      const focusable = dialog?.querySelectorAll<HTMLElement>(
        "button:not([disabled])",
      );
      if (!dialog || !focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (!dialog.contains(active)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onStep]);

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-5 sm:p-8"
    >
      {/* Backdrop: clicking anywhere outside the photo or caption closes. */}
      <div aria-hidden="true" className="absolute inset-0" onClick={onClose} />

      {/* Close comes first in DOM order so it receives initial focus. */}
      <LightboxButton
        label="Close image"
        onClick={onClose}
        className="right-5 top-5 h-11 w-11 sm:right-8 sm:top-8"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </LightboxButton>

      {total > 1 && (
        <>
          <LightboxButton
            label="Previous image"
            onClick={() => onStep(-1)}
            className="left-4 top-1/2 h-12 w-12 -translate-y-1/2 sm:left-8"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </LightboxButton>

          <LightboxButton
            label="Next image"
            onClick={() => onStep(1)}
            className="right-4 top-1/2 h-12 w-12 -translate-y-1/2 sm:right-8"
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </LightboxButton>
        </>
      )}

      <div className="pointer-events-none relative flex h-full w-full max-w-6xl flex-col items-center justify-center pt-12 sm:pt-0">
        {/* Empty alt: the caption below names the photo. */}
        <div className="relative min-h-0 w-full flex-1">
          <Image
            src={item.src}
            alt=""
            fill
            sizes="90vw"
            className="object-contain"
          />
        </div>

        <div
          aria-live="polite"
          className="pointer-events-auto mt-5 max-w-2xl shrink-0 text-center text-white"
        >
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#4DDBDF]">
            {item.category}
          </p>

          <h3
            id={titleId}
            className="mt-2 text-xl font-medium tracking-[-0.02em] sm:text-2xl"
          >
            {item.title}
          </h3>

          {item.desc && (
            <p className="mt-2 text-sm leading-6 text-white/55">{item.desc}</p>
          )}

          {total > 1 && (
            <p className="mt-4 text-xs text-white/40">
              {index + 1} / {total}
            </p>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function CommunityStory() {
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const reduceMotion = Boolean(useReducedMotion());

  const filteredItems = useMemo(
    () =>
      activeCategory === ALL
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  const total = filteredItems.length;
  const currentItem =
    lightboxIndex !== null ? (filteredItems[lightboxIndex] ?? null) : null;

  const openLightbox = useCallback((index: number, opener: HTMLElement) => {
    openerRef.current = opener;
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    openerRef.current?.focus(); // hand focus back to the photo that was opened
  }, []);

  const stepLightbox = useCallback(
    (delta: 1 | -1) => {
      if (total === 0) return;
      setLightboxIndex((current) =>
        current === null ? current : (current + delta + total) % total,
      );
    },
    [total],
  );

  return (
    <StorySection
      id="community"
      label="Community"
      height="auto"
      className="bg-paper text-ink"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 xl:px-16">
        {/* Gallery intro */}
        <ScrollReveal delay={100}>
          <div className="max-w-2xl">
            <StoryText
              as="h2"
              eyebrow="Community"
              description="A glimpse into the people, places and moments that make the work real."
            >
              Life happens
              <br />
              <span className="text-teal">here.</span>
            </StoryText>
          </div>
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal delay={150}>
          <div
            role="group"
            aria-label="Filter photos by category"
            className="mt-16 flex flex-wrap items-center gap-x-7 gap-y-3 border-y border-ink/10 py-5"
          >
            <span
              aria-hidden="true"
              className="mr-2 text-xs font-medium uppercase tracking-[0.14em] text-ink/35"
            >
              View
            </span>

            {GALLERY_CATEGORIES.map((category) => (
              <FilterButton
                key={category}
                label={category}
                active={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              />
            ))}
          </div>
        </ScrollReveal>

        <p className="sr-only" aria-live="polite">
          Showing {total} {total === 1 ? "photo" : "photos"}
        </p>

        {/* Gallery */}
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-12">
          {filteredItems.map((item, index) => (
            <GalleryCard
              key={item.src}
              item={item}
              index={index}
              reduceMotion={reduceMotion}
              onOpen={openLightbox}
            />
          ))}
        </div>

        {/* Partners */}
        <div className="mt-32 border-t border-ink/10 pt-20 lg:mt-40 lg:pt-24">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
            <ScrollReveal>
              <div>
                <ChapterLabel>Partners &amp; champions</ChapterLabel>

                <StoryText
                  as="h2"
                  eyebrow="The people behind the work"
                  description="Ulwazi grows through people and organisations who contribute their time, resources, skills and belief in what the organisation is building."
                >
                  It takes
                  <br />
                  <span className="text-teal">people.</span>
                </StoryText>
              </div>
            </ScrollReveal>

            <div className="border-t border-ink/10">
              {SPONSORS.map((sponsor, index) => (
                <ScrollReveal
                  key={sponsor.name}
                  delay={Math.min(index * 100, 300)}
                >
                  <article className="grid gap-8 border-b border-ink/10 py-10 sm:grid-cols-[auto_1fr] sm:items-start lg:gap-12">
                    {/* Empty alt: the attribution below already names them. */}
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-mist">
                      <Image
                        src={sponsor.image}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    <figure className="max-w-2xl">
                      <blockquote className="text-xl font-medium leading-[1.25] tracking-[-0.025em] text-ink sm:text-2xl lg:text-[1.7rem]">
                        <span aria-hidden="true">“</span>
                        {sponsor.quote}
                        <span aria-hidden="true">”</span>
                      </blockquote>

                      <figcaption className="mt-7">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
                          <span className="font-semibold text-ink">
                            {sponsor.name}
                          </span>
                          <span aria-hidden="true" className="text-ink/20">
                            /
                          </span>
                          <span className="text-teal">{sponsor.role}</span>
                        </div>

                        <p className="mt-1 text-sm text-ink/45">
                          {sponsor.org}
                        </p>
                      </figcaption>
                    </figure>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* Closing note */}
        <ScrollReveal>
          <div className="mt-24 border-t border-ink/10 pt-8">
            <p className="max-w-md text-sm leading-6 text-ink/45">
              Every photograph represents a moment. Every moment is part of a
              larger story about opportunity, safety and community.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {currentItem && (
        <Lightbox
          item={currentItem}
          index={lightboxIndex as number}
          total={total}
          onClose={closeLightbox}
          onStep={stepLightbox}
        />
      )}
    </StorySection>
  );
}