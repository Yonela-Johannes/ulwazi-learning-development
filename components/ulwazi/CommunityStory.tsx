"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

import StorySection from "@/components/story/StorySection";
import StoryText from "@/components/story/StoryText";
import ScrollReveal from "@/components/story/ScrollReveal";
import {
  GALLERY_CATEGORIES,
  GALLERY_ITEMS,
  SPONSORS,
  type GalleryItem,
} from "./content";

export default function CommunityStory() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const filteredItems =
    activeCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const currentItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = () => {
    if (!filteredItems.length) return;

    setLightboxIndex((current) => {
      if (current === null) return 0;
      return (current + 1) % filteredItems.length;
    });
  };

  const prevLightbox = () => {
    if (!filteredItems.length) return;

    setLightboxIndex((current) => {
      if (current === null) return 0;
      return (current - 1 + filteredItems.length) % filteredItems.length;
    });
  };

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") nextLightbox();
      if (event.key === "ArrowLeft") prevLightbox();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, filteredItems.length]);

  return (
    <StorySection
      id="community"
      label="Community"
      height="auto"
      className="bg-[#F8F8F6] text-[#291B4F]"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 xl:px-16">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20">
          <ScrollReveal delay={100}>
            <StoryText
              as="h2"
              eyebrow="Community"
              description="A glimpse into the people, places and moments that make the work real."
            >
              Life happens
              <br />
              <span className="text-[#009CA6]">here.</span>
            </StoryText>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={150}>
          <div className="mt-16 flex flex-wrap items-center gap-x-7 gap-y-3 border-y border-[#291B4F]/10 py-5">
            <span className="mr-2 text-xs font-medium uppercase tracking-[0.14em] text-[#291B4F]/35">
              View
            </span>

            {GALLERY_CATEGORIES.map((category) => {
              const active = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category);
                    setLightboxIndex(null);
                  }}
                  className={`relative cursor-pointer py-1 text-sm font-medium tracking-[-0.01em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009CA6] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F8F8F6] ${
                    active
                      ? "text-[#009CA6]"
                      : "text-[#291B4F]/55 hover:text-[#291B4F]"
                  }`}
                >
                  {category}

                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-[#009CA6] transition-all duration-300 ${
                      active ? "w-full" : "w-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-12">
          {filteredItems.map((item, index) => {
            const isFeatured = index === 0;
            const isWide = index === 3 || index === 6;

            return (
              <motion.button
                key={`${item.src}-${index}`}
                type="button"
                initial={
                  shouldReduceMotion
                    ? undefined
                    : {
                        opacity: 0,
                        y: 28,
                      }
                }
                whileInView={
                  shouldReduceMotion
                    ? undefined
                    : {
                        opacity: 1,
                        y: 0,
                      }
                }
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.7,
                  delay: Math.min(index * 0.04, 0.24),
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => openLightbox(index)}
                className={`
                  group relative overflow-hidden bg-[#E8E8E3]
                  text-left focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-[#009CA6]
                  focus-visible:ring-offset-4
                  focus-visible:ring-offset-[#F8F8F6]
                  rounded-2xl
                  ${
                    isFeatured
                      ? "sm:col-span-2 lg:col-span-7 lg:row-span-2"
                      : isWide
                        ? "lg:col-span-5"
                        : "lg:col-span-5"
                  }
                `}
              >
                <div
                  className={`relative w-full ${
                    isFeatured
                      ? "aspect-[4/3] lg:aspect-[1.25/1]"
                      : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes={
                      isFeatured
                        ? "(min-width: 1024px) 58vw, 100vw"
                        : "(min-width: 1024px) 42vw, 50vw"
                    }
                    className="object-cover transition-transform duration-[1200ms] rounded-2xl ease-out group-hover:scale-[1.035]"
                  />

                  <div className="absolute inset-x-0 bottom-0">
                    {/* Gradient for text readability */}
                    <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#291B4F]/90 via-[#291B4F]/55 to-transparent" />

                    <div className="relative p-5 sm:p-6">
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
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-32 border-t border-[#291B4F]/10 pt-20 lg:mt-40 lg:pt-24">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
            <ScrollReveal>
              <div>
                <div className="mb-8 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.16em]">
                  <span className="text-[#291B4F]/40">
                    Partners & champions
                  </span>
                </div>

                <StoryText
                  as="h2"
                  eyebrow="The people behind the work"
                  description="Ulwazi grows through people and organisations who contribute their time, resources, skills and belief in what the organisation is building."
                >
                  It takes
                  <br />
                  <span className="text-[#009CA6]">people.</span>
                </StoryText>
              </div>
            </ScrollReveal>

            <div className="border-t border-[#291B4F]/10">
              {SPONSORS.map((sponsor, index) => (
                <ScrollReveal key={sponsor.name} delay={index * 100}>
                  <article className="grid gap-8 border-b border-[#291B4F]/10 py-10 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-8 lg:gap-12">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-[#E8E8E3] rounded-xl overflow-hidden">
                      <Image
                        src={sponsor.image}
                        alt={sponsor.name}
                        fill
                        sizes="80px"
                        className="object-cover required:rounded-2xl"
                      />
                    </div>

                    <div className="max-w-2xl">
                      {/* Quote */}
                      <blockquote className="text-xl font-medium leading-[1.25] tracking-[-0.025em] text-[#291B4F] sm:text-2xl lg:text-[1.7rem]">
                        “{sponsor.quote}”
                      </blockquote>

                      {/* Attribution */}
                      <div className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="text-sm font-semibold text-[#291B4F]">
                          {sponsor.name}
                        </h3>

                        <span className="text-[#291B4F]/20">/</span>

                        <p className="text-sm text-[#009CA6]">{sponsor.role}</p>
                      </div>

                      <p className="mt-1 text-sm text-[#291B4F]/45">
                        {sponsor.org}
                      </p>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        <ScrollReveal>
          <div className="mt-24 border-t border-[#291B4F]/10 pt-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <p className="max-w-md text-sm leading-6 text-[#291B4F]/45">
                Every photograph represents a moment. Every moment is part of a
                larger story about opportunity, safety and community.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {currentItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#291B4F]/96 p-5 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={currentItem.title}
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-5 top-5 z-20 flex h-11 w-11 cursor-pointer items-center justify-center border border-white/20 text-white transition-colors hover:border-[#009CA6] hover:text-[#009CA6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009CA6] sm:right-8 sm:top-8"
            aria-label="Close image"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Previous */}
          {filteredItems.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                prevLightbox();
              }}
              className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center border border-white/20 text-white transition-colors hover:border-[#009CA6] hover:text-[#009CA6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009CA6] sm:left-8"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Next */}
          {filteredItems.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                nextLightbox();
              }}
              className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center border border-white/20 text-white transition-colors hover:border-[#009CA6] hover:text-[#009CA6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009CA6] sm:right-8"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Image */}
          <div
            className="flex h-full w-full max-w-6xl flex-col items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative h-[68vh] w-full">
              <Image
                src={currentItem.src}
                alt={currentItem.title}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>

            <div className="mt-5 max-w-2xl text-center text-white">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#4DDBDF]">
                {currentItem.category}
              </p>

              <h3 className="mt-2 text-xl font-medium tracking-[-0.02em] sm:text-2xl">
                {currentItem.title}
              </h3>

              {currentItem.desc && (
                <p className="mt-2 text-sm leading-6 text-white/55">
                  {currentItem.desc}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </StorySection>
  );
}
