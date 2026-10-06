"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useTransform } from "framer-motion";

import StorySection from "@/components/story/StorySection";
import StickyScene from "@/components/story/StickyScene";
import StoryText from "@/components/story/StoryText";
import ScrollReveal from "@/components/story/ScrollReveal";
import { useStoryProgress } from "@/components/story/useStoryProgress";
import { useDonate } from "./DonateProvider";

const photos = [
  {
    src: "/images/mainimg.jpg",
    caption: "Empowering township children",
    span: "lg:col-span-4 lg:row-span-4",
    priority: true,
    speed: -30,
  },
  {
    src: "/images/img1.jpg",
    caption: "Safe holiday programmes",
    span: "lg:col-span-2 lg:row-span-3",
    speed: -60,
  },
  {
    src: "/images/img13.jpg",
    caption: "Foundational life skills",
    span: "lg:col-span-2 lg:row-span-3",
    speed: -20,
  },
  {
    src: "/img/6.jpg",
    caption: "Building future leaders",
    span: "lg:col-span-4 lg:row-span-2",
    speed: -50,
  },
];

export default function UlwaziHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollYProgress = useStoryProgress(sectionRef);
  const shouldReduceMotion = useReducedMotion();
  const { open: openDonateModal } = useDonate();

  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.42],
    [1, 0.15],
  );

  const textY = useTransform(
    scrollYProgress,
    [0, 0.42],
    [0, -60],
  );

  const tileY0 = useTransform(
    scrollYProgress,
    [0, 1],
    [0, photos[0].speed],
  );

  const tileY1 = useTransform(
    scrollYProgress,
    [0, 1],
    [0, photos[1].speed],
  );

  const tileY2 = useTransform(
    scrollYProgress,
    [0, 1],
    [0, photos[2].speed],
  );

  const tileY3 = useTransform(
    scrollYProgress,
    [0, 1],
    [0, photos[3].speed],
  );

  const tileYTransforms = [
    tileY0,
    tileY1,
    tileY2,
    tileY3,
  ];

  return (
    <StorySection
      ref={sectionRef}
      id="beginning"
      label="The Beginning"
      height="220vh"
      className="bg-[#F8F8F6] text-[#291B4F]"
    >
      <StickyScene>
        <div className="relative h-full w-full overflow-hidden bg-[#F8F8F6]">
          <div className="relative z-10 mx-auto flex h-full w-full max-w-[1700px] flex-col justify-end gap-10 px-5 pb-12 pt-24 sm:px-8 sm:pb-16 lg:grid lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16 lg:px-12 lg:pb-20 xl:px-16">
            {/* Story */}
            <ScrollReveal>
              <motion.div
                style={
                  shouldReduceMotion
                    ? undefined
                    : {
                        opacity: textOpacity,
                        y: textY,
                      }
                }
                className="max-w-2xl"
              >
                <StoryText
                  as="h1"
                  eyebrow="Ulwazi Learning Development"
                  description="Ulwazi means knowledge in Xhosa. We create safe spaces where children in Mfuleni can learn, grow, build life skills and feel supported."
                >
                  Every child
                  <br />
                  deserves a
                  <br />
                  <span className="text-[#009CA6]">
                    safe place to grow.
                  </span>
                </StoryText>

                <div className="mt-9 flex items-center gap-6">
                  <button
                    type="button"
                    onClick={openDonateModal}
                    className="group inline-flex cursor-pointer items-center gap-3 border-b-2 border-[#009CA6] pb-1.5 text-base font-medium tracking-[-0.01em] text-[#291B4F] transition-colors duration-200 hover:text-[#009CA6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009CA6] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F8F8F6]"
                  >
                    Support the work

                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </button>
                </div>

              </motion.div>
            </ScrollReveal>

            {/* Gallery */}
            <ScrollReveal delay={150}>
              <div
                className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:h-[68vh] lg:grid-flow-dense lg:grid-cols-6 lg:grid-rows-6 lg:gap-3 lg:overflow-visible lg:px-0 lg:pb-0"
                role="group"
                aria-label="Photos from Ulwazi programmes"
              >
                {photos.map((photo, index) => {
                  const yTransform = tileYTransforms[index];

                  return (
                    <motion.figure
                      key={photo.src}
                      style={
                        shouldReduceMotion
                          ? undefined
                          : { y: yTransform }
                      }
                      className={`
                        group relative aspect-[4/5] w-[78%] shrink-0
                        snap-center overflow-hidden
                        bg-[#E8E8E3]
                        rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.05)]
                        transition-shadow duration-300
                        hover:shadow-[0_0_30px_rgba(0,0,0,0.1)]
                        sm:aspect-[3/4] sm:w-[78%]
                        sm:first-of-type:ml-5
                        sm:last-of-type:mr-5
                        sm:w-[48%]
                        lg:aspect-auto lg:w-auto
                        ${photo.span}
                      `}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.caption}
                        fill
                        priority={photo.priority}
                        sizes="(max-width: 640px) 78vw, (max-width: 1024px) 48vw, 40vw"
                        className="object-cover transition-transform duration-[1400ms]roundex-2xl ease-out group-hover:scale-[1.025]"
                      />

                      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#291B4F]/70 via-[#291B4F]/15 to-transparent opacity-90" />

                      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 px-4 pb-4 text-sm font-medium text-white sm:px-5 sm:pb-5">
                        <span>{photo.caption}</span>
                      </figcaption>
                    </motion.figure>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </StickyScene>
    </StorySection>
  );
}