"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useTransform, useReducedMotion } from "framer-motion";

import StorySection from "@/components/story/StorySection";
import StickyScene from "@/components/story/StickyScene";
import StoryText from "@/components/story/StoryText";
import ScrollReveal from "@/components/story/ScrollReveal";
import { useStoryProgress } from "@/components/story/useStoryProgress";

interface UlwaziHeroProps {
  onOpenDonateModal?: () => void;
}

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

export default function UlwaziHero({ onOpenDonateModal }: UlwaziHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollYProgress = useStoryProgress(sectionRef);
  const shouldReduceMotion = useReducedMotion();

  // Text scroll-drift transforms
  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0.1]);
  const textY = useTransform(scrollYProgress, [0, 0.45], [0, -50]);

  // Gallery tiles speed transforms
  const tileY0 = useTransform(scrollYProgress, [0, 1], [0, photos[0].speed]);
  const tileY1 = useTransform(scrollYProgress, [0, 1], [0, photos[1].speed]);
  const tileY2 = useTransform(scrollYProgress, [0, 1], [0, photos[2].speed]);
  const tileY3 = useTransform(scrollYProgress, [0, 1], [0, photos[3].speed]);

  const tileYTransforms = [tileY0, tileY1, tileY2, tileY3];

  return (
    <StorySection
      ref={sectionRef}
      id="beginning"
      label="The Beginning"
      height="220vh"
      className="bg-[#F5F2EA] text-[#151515]"
    >
      <StickyScene>
        <div className="relative h-full w-full bg-[#F5F2EA]">
          <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col justify-end gap-8 px-6 pb-16 pt-24 sm:px-10 sm:pb-20 lg:grid lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16 lg:px-16 lg:pb-24 lg:pt-28">
            {/* Story with scroll drift */}
            <ScrollReveal>
              <motion.div
                style={
                  shouldReduceMotion
                    ? {}
                    : { opacity: textOpacity, y: textY }
                }
                className="max-w-xl"
              >
                <StoryText
                  as="h1"
                  eyebrow="Ulwazi Learning Development"
                  description="Ulwazi means knowledge in Xhosa. We run safe holiday programmes and teach life skills to children in Mfuleni, so they have somewhere to learn, grow and feel supported."
                >
                  Every child deserves
                  <br />
                  a safe place to grow.
                </StoryText>

                <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-[#77736B]">
                  {onOpenDonateModal && (
                    <button
                      type="button"
                      onClick={onOpenDonateModal}
                      className="border-b border-[#B9915A] pb-0.5 text-[#151515] transition-colors hover:text-[#9E7947] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B9915A]"
                    >
                      Support the work
                    </button>
                  )}
                </div>
              </motion.div>
            </ScrollReveal>

            {/* Gallery with parallax tiles */}
            <ScrollReveal delay={150}>
              <div
                className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 sm:-mx-10 sm:px-10 lg:mx-0 lg:grid lg:h-[68vh] lg:grid-flow-dense lg:grid-cols-6 lg:grid-rows-6 lg:gap-3 lg:overflow-visible lg:px-0"
                role="group"
                aria-label="Photos from Ulwazi programmes"
              >
                {photos.map((photo, index) => {
                  const yTransform = tileYTransforms[index];
                  return (
                    <motion.figure
                      key={photo.src}
                      style={
                        shouldReduceMotion ? {} : { y: yTransform }
                      }
                      className={`relative aspect-[4/5] w-[70%] shrink-0 snap-center overflow-hidden bg-[#E7E2D6] sm:w-[45%] lg:aspect-auto lg:w-auto ${photo.span}`}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.caption}
                        fill
                        priority={photo.priority}
                        sizes="(max-width: 1024px) 70vw, 40vw"
                        className="object-cover"
                      />
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#151515]/60 to-transparent px-4 pb-3 pt-10 text-xs text-white">
                        {photo.caption}
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
