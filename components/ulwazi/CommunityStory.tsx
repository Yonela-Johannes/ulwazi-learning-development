"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

import StorySection from "@/components/story/StorySection";
import StoryText from "@/components/story/StoryText";
import ScrollReveal from "@/components/story/ScrollReveal";
import { GALLERY_CATEGORIES, GALLERY_ITEMS, SPONSORS, type GalleryItem } from "./content";

export default function CommunityStory() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const filteredItems =
    activeCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <StorySection
      id="community"
      label="Community Evidence"
      height="auto"
      className="bg-[#F5F2EA] text-[#151515] py-24"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 space-y-20">
        {/* Gallery Header */}
        <div className="space-y-8">
          <ScrollReveal>
            <StoryText
              as="h2"
              eyebrow="Community Evidence"
              description="A glimpse into the life-changing moments, field trips, and workshops created for our township children."
            >
              Moments of joy
              <br />
              & growth in action.
            </StoryText>
          </ScrollReveal>

          {/* Category Filter Pills */}
          <ScrollReveal delay={100}>
            <div className="flex flex-wrap items-center gap-2">
              {GALLERY_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-[#151515] text-[#F5F2EA]"
                      : "bg-[#151515]/5 text-[#151515]/70 hover:bg-[#151515]/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Gallery Grid with clipPath reveal */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.src + index}
              initial={shouldReduceMotion ? {} : { clipPath: "inset(15% 15% 15% 15%)", opacity: 0 }}
              whileInView={shouldReduceMotion ? {} : { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => openLightbox(index)}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-[#E7E2D6] cursor-pointer shadow-md"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151515]/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute top-3 right-3 p-2 rounded-full bg-[#151515]/60 backdrop-blur-md text-[#F5F2EA] opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-[#F5F2EA] space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#B9915A]">
                  {item.category}
                </span>
                <h3 className="text-base font-medium leading-snug">{item.title}</h3>
                <p className="text-xs text-[#F5F2EA]/70 line-clamp-1">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sponsors & Champions Section: Quiet Typographic List */}
        <div className="pt-20 border-t border-[#151515]/10 space-y-12">
          <ScrollReveal>
            <div className="max-w-xl">
              <StoryText
                as="h2"
                eyebrow="Partners & Champions"
                description="Grateful for the visionary individuals and organizations who empower Ulwazi Learning Development with resources, leadership, and time."
              >
                Our sponsors
                <br />
                & partners.
              </StoryText>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12">
            {SPONSORS.map((sponsor) => (
              <ScrollReveal key={sponsor.name}>
                <article className="space-y-6 border-l-2 border-[#B9915A] pl-6 py-2">
                  <blockquote className="text-lg sm:text-xl font-medium leading-relaxed italic text-[#151515]/90">
                    &ldquo;{sponsor.quote}&rdquo;
                  </blockquote>

                  <div className="flex items-center gap-4 pt-2">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#E7E2D6] shrink-0">
                      <Image
                        src={sponsor.image}
                        alt={sponsor.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#151515]">{sponsor.name}</h3>
                      <p className="text-xs font-mono text-[#B9915A]">{sponsor.role}</p>
                      <p className="text-xs text-[#151515]/60">{sponsor.org}</p>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-[#151515]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8">
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 rounded-full bg-[#F5F2EA]/10 text-[#F5F2EA] hover:bg-[#F5F2EA]/20 transition-all z-10 cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={prevLightbox}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#F5F2EA]/10 text-[#F5F2EA] hover:bg-[#F5F2EA]/20 transition-all z-10 cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={nextLightbox}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#F5F2EA]/10 text-[#F5F2EA] hover:bg-[#F5F2EA]/20 transition-all z-10 cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full flex flex-col items-center gap-4">
            <div className="relative w-full h-[60vh] sm:h-[70vh] rounded-2xl overflow-hidden bg-[#222]">
              <Image
                src={filteredItems[lightboxIndex].src}
                alt={filteredItems[lightboxIndex].title}
                fill
                className="object-contain"
              />
            </div>
            <div className="text-center space-y-1 max-w-xl text-[#F5F2EA]">
              <span className="text-xs font-mono uppercase tracking-widest text-[#B9915A]">
                {filteredItems[lightboxIndex].category}
              </span>
              <h3 className="text-lg font-bold">{filteredItems[lightboxIndex].title}</h3>
              <p className="text-xs text-[#F5F2EA]/70">{filteredItems[lightboxIndex].desc}</p>
            </div>
          </div>
        </div>
      )}
    </StorySection>
  );
}
