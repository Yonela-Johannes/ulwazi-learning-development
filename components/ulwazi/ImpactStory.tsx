"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useTransform } from "framer-motion";

import StorySection from "@/components/story/StorySection";
import StoryText from "@/components/story/StoryText";
import { useStoryProgress } from "@/components/story/useStoryProgress";
import { PROGRAMMES_PLANS, PRINCIPLES, ORG_DETAILS } from "./content";

const programmeSlides = [
  {
    number: "01",
    title: PROGRAMMES_PLANS[0].title,
    subtitle: PROGRAMMES_PLANS[0].subtitle,
    description: PROGRAMMES_PLANS[0].description,
    audience: PROGRAMMES_PLANS[0].audience,
    image: PROGRAMMES_PLANS[0].image,
    heading: (
      <>
        Creating educational
        <br />
        <span className="text-[#009CA6]">excellence</span> in townships.
      </>
    ),
  },
  {
    number: "02",
    title: PROGRAMMES_PLANS[1].title,
    subtitle: PROGRAMMES_PLANS[1].subtitle,
    description: PROGRAMMES_PLANS[1].description,
    audience: PROGRAMMES_PLANS[1].audience,
    image: PROGRAMMES_PLANS[1].image,
    heading: (
      <>
        Creating
        <br />
        <span className="text-[#009CA6]">opportunities</span>
        <br />
        for township youth.
      </>
    ),
  },
  {
    number: "03",
    title: PROGRAMMES_PLANS[2].title,
    subtitle: PROGRAMMES_PLANS[2].subtitle,
    description: PROGRAMMES_PLANS[2].description,
    audience: PROGRAMMES_PLANS[2].audience,
    image: PROGRAMMES_PLANS[2].image,
    heading: (
      <>
        A place to
        <br />
        <span className="text-[#009CA6]">learn without</span>
        <br />
        limits.
      </>
    ),
  },
];

export default function ImpactStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollYProgress = useStoryProgress(sectionRef);
  const shouldReduceMotion = useReducedMotion();

  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-300vw"]);

  return (
    <StorySection
      ref={sectionRef}
      id="ulwazi"
      label="The Work"
      height="400vh"
      className="bg-[#291B4F] text-[#F8F8F6]"
    >
      {/* Desktop horizontal story */}
      <div className="sticky top-0 hidden h-svh overflow-hidden lg:block">
        <motion.div
          style={shouldReduceMotion ? undefined : { x }}
          className="flex h-full w-[400vw]"
        >
          {programmeSlides.map((slide) => (
            <div
              key={slide.number}
              className="relative flex h-full w-screen shrink-0 items-center border-r border-white/10 bg-[#291B4F]"
            >
              <div className="mx-auto grid w-full max-w-[1550px] grid-cols-[0.95fr_1.05fr] items-center gap-16 px-12 py-16 xl:gap-24 xl:px-20">
                {/* Image */}
                <div className="relative h-[62vh] overflow-hidden bg-[#21163F]">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes="48vw"
                    className="object-cover transition-transform duration-[1400ms] ease-out rounded-2xl"
                  />

                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#291B4F]/70 to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-6 text-white">
                    <span className="max-w-xs text-sm font-medium leading-5">
                      {slide.title}
                    </span>
                  </div>
                </div>

                {/* Story */}
                <div className="max-w-2xl">
                  <div className="mb-8 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.16em]">
                    <span className="text-white/40">{slide.title}</span>
                  </div>

                  <StoryText
                    as="h2"
                    eyebrow={slide.subtitle}
                    description={slide.description}
                    className="text-[#F8F8F6]"
                  >
                    {slide.heading}
                  </StoryText>

                  <div className="mt-10 flex max-w-xl items-start gap-4 border-t border-white/10 pt-5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#009CA6]" />

                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-white/40">
                        Who it serves
                      </p>

                      <p className="mt-2 text-base leading-7 text-white/60">
                        {slide.audience}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Final principles panel */}
          <div className="relative flex h-full w-screen shrink-0 items-center bg-[#291B4F] text-[#F8F8F6]">
            <div className="mx-auto w-full max-w-[1400px] px-8 py-16 sm:px-12 lg:px-20">
              <div className="grid items-start gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
                {/* Intro */}
                <div>
                  <div className="mb-8 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.16em]">
                    <span className="text-white/40">Core purpose</span>
                  </div>

                  <h2 className="max-w-xl text-[clamp(3rem,5vw,5.8rem)] font-medium leading-[0.9] tracking-[-0.055em]">
                    The work is
                    <br />
                    built around
                    <br />
                    <span className="text-[#009CA6]">four things.</span>
                  </h2>

                  <p className="mt-8 max-w-md text-base leading-7 text-white/60 sm:text-lg">
                    These principles shape how Ulwazi creates spaces for
                    children to learn, connect, grow and imagine something
                    bigger for themselves.
                  </p>
                </div>

                {/* Principles */}
                <div>
                  <div className="grid border-t border-white/15 sm:grid-cols-2">
                    {PRINCIPLES.map((item) => (
                      <div
                        key={item.number}
                        className="border-b border-white/15 py-7 sm:px-6 sm:first:pl-0"
                      >
                        <h3 className="mt-4 text-2xl font-medium tracking-[-0.03em] text-[#F8F8F6] sm:text-3xl">
                          {item.title}
                        </h3>

                        <p className="mt-3 max-w-sm text-base leading-7 text-white/55">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <blockquote className="mt-10 max-w-2xl border-l-2 border-[#009CA6] pl-6 text-lg leading-8 text-white/75 sm:text-xl">
                    “{ORG_DETAILS.coreQuote}”
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile / tablet story */}
      <div className="block bg-[#291B4F] px-6 py-24 text-[#F8F8F6] sm:px-10 lg:hidden">
        <div className="mx-auto max-w-3xl">
          {programmeSlides.map((slide, index) => (
            <article
              key={slide.number}
              className="border-t border-white/10 py-16 first:border-t-0 first:pt-0"
            >
              {/* Chapter label */}
              <div className="mb-7 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.15em]">
                <span className="text-white/40">{slide.title}</span>
              </div>

              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#21163F]">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  sizes="100vw"
                  className="object-cover rounded-2xl"
                  priority={index === 0}
                />

                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#291B4F]/70 to-transparent" />

                <span className="absolute bottom-4 left-5 text-sm font-medium text-white">
                  {slide.title}
                </span>
              </div>

              {/* Story */}
              <div className="mt-9">
                <StoryText
                  as="h2"
                  eyebrow={slide.subtitle}
                  description={slide.description}
                  className="text-[#F8F8F6]"
                >
                  {slide.heading}
                </StoryText>

                <div className="mt-8 border-t border-white/10 pt-5">
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-white/40">
                    Who it serves
                  </p>

                  <p className="mt-2 text-base leading-7 text-white/60">
                    {slide.audience}
                  </p>
                </div>
              </div>
            </article>
          ))}

          {/* Mobile principles */}
          <article className="border-t border-white/10 pt-16">
            <div className="mb-7 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.15em]">
              <span className="text-white/40">Core purpose</span>
            </div>

            <div>
              <h2 className="text-[clamp(2.7rem,10vw,4.5rem)] font-medium leading-[0.9] tracking-[-0.055em]">
                The work is
                <br />
                built around
                <br />
                <span className="text-[#009CA6]">four things.</span>
              </h2>

              <p className="mt-7 max-w-xl text-base leading-7 text-white/60">
                These principles shape how Ulwazi creates spaces for children to
                learn, connect, grow and imagine something bigger for
                themselves.
              </p>

              <div className="mt-10 border-t border-white/15">
                {PRINCIPLES.map((item) => (
                  <div
                    key={item.number}
                    className="border-b border-white/15 py-6"
                  >
                    <h3 className="mt-3 text-xl font-medium tracking-[-0.025em] text-[#F8F8F6]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/55">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              <blockquote className="mt-9 border-l-2 border-[#009CA6] pl-5 text-base leading-7 text-white/70">
                “{ORG_DETAILS.coreQuote}”
              </blockquote>
            </div>
          </article>
        </div>
      </div>
    </StorySection>
  );
}
