"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useTransform, useReducedMotion } from "framer-motion";

import StorySection from "@/components/story/StorySection";
import StoryText from "@/components/story/StoryText";
import { useStoryProgress } from "@/components/story/useStoryProgress";
import { FOUNDER_CONTENT } from "./content";

export default function FounderStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollYProgress = useStoryProgress(sectionRef);
  const shouldReduceMotion = useReducedMotion();

  // 4 panels
  const n = 4;

  // Panel 0 transform
  const scale0 = useTransform(scrollYProgress, [0 / n, 1 / n], [1, 0.94]);
  const dim0 = useTransform(scrollYProgress, [0 / n, 1 / n], [0, 0.5]);

  // Panel 1 transform
  const scale1 = useTransform(scrollYProgress, [1 / n, 2 / n], [1, 0.94]);
  const dim1 = useTransform(scrollYProgress, [1 / n, 2 / n], [0, 0.5]);

  // Panel 2 transform
  const scale2 = useTransform(scrollYProgress, [2 / n, 3 / n], [1, 0.94]);
  const dim2 = useTransform(scrollYProgress, [2 / n, 3 / n], [0, 0.5]);

  return (
    <StorySection
      ref={sectionRef}
      id="lumka"
      label="Lumka's Story"
      height="400vh"
      className="bg-[#F5F2EA] text-[#151515]"
    >
      {/* Panel 0: Who She Is */}
      <motion.div
        style={shouldReduceMotion ? {} : { scale: scale0 }}
        className="sticky top-0 h-svh w-full overflow-hidden bg-[#F5F2EA] flex items-center justify-center border-b border-[#151515]/10"
      >
        {!shouldReduceMotion && (
          <motion.div
            style={{ opacity: dim0 }}
            className="pointer-events-none absolute inset-0 z-20 bg-[#151515]"
          />
        )}
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 px-6 py-12 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#E7E2D6] shadow-xl">
            <Image
              src={FOUNDER_CONTENT.image}
              alt={FOUNDER_CONTENT.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-top"
            />
          </div>
          <div className="space-y-4">
            <StoryText
              as="h2"
              eyebrow="Leadership & Vision"
              description={FOUNDER_CONTENT.bio[0]}
            >
              Meet Our Founder:
              <br />
              {FOUNDER_CONTENT.name}
            </StoryText>
            <p className="text-xs font-mono uppercase tracking-widest text-[#B9915A]">
              {FOUNDER_CONTENT.role} • {FOUNDER_CONTENT.origin}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Panel 1: Why She Started */}
      <motion.div
        style={shouldReduceMotion ? {} : { scale: scale1 }}
        className="sticky top-0 h-svh w-full overflow-hidden bg-[#F5F2EA] flex items-center justify-center border-b border-[#151515]/10"
      >
        {!shouldReduceMotion && (
          <motion.div
            style={{ opacity: dim1 }}
            className="pointer-events-none absolute inset-0 z-20 bg-[#151515]"
          />
        )}
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 px-6 py-12 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#E7E2D6] shadow-xl order-last lg:order-first">
            <Image
              src="/images/img1.jpg"
              alt="Township children during school holidays"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <StoryText
              as="h2"
              eyebrow="The Township Reality"
              description={FOUNDER_CONTENT.bio[1]}
            >
              Vulnerability
              <br />
              when school
              <br />
              is out.
            </StoryText>
          </div>
        </div>
      </motion.div>

      {/* Panel 2: The Founder Quote Speech Bubble */}
      <motion.div
        style={shouldReduceMotion ? {} : { scale: scale2 }}
        className="sticky top-0 h-svh w-full overflow-hidden bg-[#151515] text-[#F5F2EA] flex items-center justify-center px-6 py-12 sm:px-10 lg:px-16"
      >
        {!shouldReduceMotion && (
          <motion.div
            style={{ opacity: dim2 }}
            className="pointer-events-none absolute inset-0 z-20 bg-black"
          />
        )}
        <div className="relative z-10 mx-auto max-w-4xl text-center space-y-8">
          <p className="text-xs font-mono tracking-[0.24em] text-[#B9915A] uppercase">
            In Her Own Words
          </p>
          <blockquote className="text-2xl sm:text-4xl lg:text-5xl font-medium leading-tight tracking-[-0.03em] text-[#F5F2EA] italic">
            &ldquo;{FOUNDER_CONTENT.quote}&rdquo;
          </blockquote>
          <div className="pt-4 border-t border-[#F5F2EA]/20 max-w-xs mx-auto">
            <p className="text-sm font-semibold text-[#B9915A] uppercase tracking-wider">
              {FOUNDER_CONTENT.name}
            </p>
            <p className="text-xs text-[#F5F2EA]/60 font-mono">
              {FOUNDER_CONTENT.role}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Panel 3: Today & The Vision */}
      <div className="sticky top-0 h-svh w-full overflow-hidden bg-[#F5F2EA] flex items-center justify-center">
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 px-6 py-12 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#E7E2D6] shadow-xl">
            <Image
              src="/images/mainimg.jpg"
              alt="Ulwazi Learning Development in action"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <StoryText
              as="h2"
              eyebrow="The Sanctuary"
              description={FOUNDER_CONTENT.bio[2]}
            >
              A commitment
              <br />
              to hope, safety
              <br />
              & knowledge.
            </StoryText>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#151515]/10">
              {FOUNDER_CONTENT.pillars.map((pillar) => (
                <div
                  key={pillar}
                  className="flex items-center gap-2 text-xs font-medium text-[#151515]/80"
                >
                  <span className="w-2 h-2 rounded-full bg-[#B9915A] shrink-0" />
                  <span>{pillar}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </StorySection>
  );
}
