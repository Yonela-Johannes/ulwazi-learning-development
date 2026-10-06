"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useTransform, useReducedMotion } from "framer-motion";

import StorySection from "@/components/story/StorySection";
import StoryText from "@/components/story/StoryText";
import { useStoryProgress } from "@/components/story/useStoryProgress";
import { PROGRAMMES_PLANS, PRINCIPLES, ORG_DETAILS } from "./content";

export default function ImpactStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollYProgress = useStoryProgress(sectionRef);
  const shouldReduceMotion = useReducedMotion();

  // 4 slides in horizontal run
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-300vw"]);

  return (
    <StorySection
      ref={sectionRef}
      id="ulwazi"
      label="The Work"
      height="400vh"
      className="bg-[#151515] text-[#F5F2EA]"
    >
      {/* Desktop Pinned Horizontal Run (lg and above, unless reduced motion) */}
      <div className="hidden lg:block sticky top-0 h-svh overflow-hidden">
        <motion.div
          style={shouldReduceMotion ? {} : { x }}
          className="flex h-full w-max"
        >
          {/* Slide 1: OUR START */}
          <div className="h-full w-[100vw] shrink-0 flex items-center justify-center px-16 py-12 border-r border-[#F5F2EA]/10">
            <div className="mx-auto grid max-w-6xl grid-cols-2 items-center gap-16">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#222]">
                <Image
                  src={PROGRAMMES_PLANS[0].image}
                  alt={PROGRAMMES_PLANS[0].title}
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
              <div className="space-y-6">
                <p className="text-xs font-mono tracking-[0.24em] text-[#B9915A] uppercase">
                  01 / 04 • {PROGRAMMES_PLANS[0].title}
                </p>
                <StoryText
                  as="h2"
                  eyebrow={PROGRAMMES_PLANS[0].subtitle}
                  description={PROGRAMMES_PLANS[0].description}
                >
                  Creating educational
                  <br />
                  excellence in townships.
                </StoryText>
                <div className="pt-4 border-t border-[#F5F2EA]/10 text-xs font-mono text-[#F5F2EA]/60">
                  Target Audience: {PROGRAMMES_PLANS[0].audience}
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2: OUR MISSION */}
          <div className="h-full w-[100vw] shrink-0 flex items-center justify-center px-16 py-12 border-r border-[#F5F2EA]/10">
            <div className="mx-auto grid max-w-6xl grid-cols-2 items-center gap-16">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#222]">
                <Image
                  src={PROGRAMMES_PLANS[1].image}
                  alt={PROGRAMMES_PLANS[1].title}
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
              <div className="space-y-6">
                <p className="text-xs font-mono tracking-[0.24em] text-[#B9915A] uppercase">
                  02 / 04 • {PROGRAMMES_PLANS[1].title}
                </p>
                <StoryText
                  as="h2"
                  eyebrow={PROGRAMMES_PLANS[1].subtitle}
                  description={PROGRAMMES_PLANS[1].description}
                >
                  Life-changing
                  <br />
                  opportunities for
                  <br />
                  township youth.
                </StoryText>
                <div className="pt-4 border-t border-[#F5F2EA]/10 text-xs font-mono text-[#F5F2EA]/60">
                  Target Audience: {PROGRAMMES_PLANS[1].audience}
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3: OUR VISION */}
          <div className="h-full w-[100vw] shrink-0 flex items-center justify-center px-16 py-12 border-r border-[#F5F2EA]/10">
            <div className="mx-auto grid max-w-6xl grid-cols-2 items-center gap-16">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#222]">
                <Image
                  src={PROGRAMMES_PLANS[2].image}
                  alt={PROGRAMMES_PLANS[2].title}
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
              <div className="space-y-6">
                <p className="text-xs font-mono tracking-[0.24em] text-[#B9915A] uppercase">
                  03 / 04 • {PROGRAMMES_PLANS[2].title}
                </p>
                <StoryText
                  as="h2"
                  eyebrow={PROGRAMMES_PLANS[2].subtitle}
                  description={PROGRAMMES_PLANS[2].description}
                >
                  An everlasting
                  <br />
                  sanctuary to
                  <br />
                  learn without limits.
                </StoryText>
                <div className="pt-4 border-t border-[#F5F2EA]/10 text-xs font-mono text-[#F5F2EA]/60">
                  Target Audience: {PROGRAMMES_PLANS[2].audience}
                </div>
              </div>
            </div>
          </div>

          {/* Slide 4: OUR 4 PILLARS */}
          <div className="h-full w-[100vw] shrink-0 flex items-center justify-center px-16 py-12">
            <div className="mx-auto w-full max-w-6xl space-y-10">
              <div className="flex items-center justify-between border-b border-[#F5F2EA]/20 pb-4">
                <div>
                  <p className="text-xs font-mono tracking-[0.24em] text-[#B9915A] uppercase">
                    04 / 04 • Core Purpose
                  </p>
                  <h2 className="text-3xl font-medium tracking-[-0.03em] sm:text-4xl text-[#F5F2EA]">
                    Our 4 Key Pillars of Impact
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                {PRINCIPLES.map((item) => (
                  <div key={item.number} className="space-y-2 border-t border-[#F5F2EA]/10 pt-4">
                    <span className="text-xs font-mono text-[#B9915A]">{item.number}</span>
                    <h3 className="text-xl font-medium text-[#F5F2EA]">{item.title}</h3>
                    <p className="text-xs text-[#F5F2EA]/70 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>

              <blockquote className="text-sm italic text-[#B9915A] border-l-2 border-[#B9915A] pl-4">
                &ldquo;{ORG_DETAILS.coreQuote}&rdquo;
              </blockquote>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile / Swipeable Snap Strip (< lg or reduced motion) */}
      <div className="block lg:hidden py-16 px-6 sm:px-10 space-y-16">
        {/* Mobile Slide 1 */}
        <div className="space-y-6">
          <p className="text-xs font-mono tracking-[0.24em] text-[#B9915A] uppercase">
            01 / 04 • {PROGRAMMES_PLANS[0].title}
          </p>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#222]">
            <Image
              src={PROGRAMMES_PLANS[0].image}
              alt={PROGRAMMES_PLANS[0].title}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <StoryText
            as="h2"
            eyebrow={PROGRAMMES_PLANS[0].subtitle}
            description={PROGRAMMES_PLANS[0].description}
          >
            Educational excellence in townships.
          </StoryText>
        </div>

        {/* Mobile Slide 2 */}
        <div className="space-y-6">
          <p className="text-xs font-mono tracking-[0.24em] text-[#B9915A] uppercase">
            02 / 04 • {PROGRAMMES_PLANS[1].title}
          </p>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#222]">
            <Image
              src={PROGRAMMES_PLANS[1].image}
              alt={PROGRAMMES_PLANS[1].title}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <StoryText
            as="h2"
            eyebrow={PROGRAMMES_PLANS[1].subtitle}
            description={PROGRAMMES_PLANS[1].description}
          >
            Life-changing opportunities for youth.
          </StoryText>
        </div>

        {/* Mobile Slide 3 */}
        <div className="space-y-6">
          <p className="text-xs font-mono tracking-[0.24em] text-[#B9915A] uppercase">
            03 / 04 • {PROGRAMMES_PLANS[3]?.title || PROGRAMMES_PLANS[2].title}
          </p>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#222]">
            <Image
              src={PROGRAMMES_PLANS[2].image}
              alt={PROGRAMMES_PLANS[2].title}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <StoryText
            as="h2"
            eyebrow={PROGRAMMES_PLANS[2].subtitle}
            description={PROGRAMMES_PLANS[2].description}
          >
            An everlasting sanctuary to learn without limits.
          </StoryText>
        </div>

        {/* Mobile Slide 4: Pillars */}
        <div className="space-y-6 pt-8 border-t border-[#F5F2EA]/20">
          <p className="text-xs font-mono tracking-[0.24em] text-[#B9915A] uppercase">
            04 / 04 • Core Purpose
          </p>
          <h2 className="text-2xl font-medium text-[#F5F2EA]">Our 4 Key Pillars of Impact</h2>
          <div className="grid gap-6">
            {PRINCIPLES.map((item) => (
              <div key={item.number} className="space-y-1 border-t border-[#F5F2EA]/10 pt-3">
                <span className="text-xs font-mono text-[#B9915A]">{item.number}</span>
                <h3 className="text-lg font-medium text-[#F5F2EA]">{item.title}</h3>
                <p className="text-xs text-[#F5F2EA]/70 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StorySection>
  );
}
