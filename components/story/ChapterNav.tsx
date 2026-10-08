"use client";

import { useEffect, useState } from "react";

export type StoryChapter = {
  id: string;
  label: string;
};

type ChapterNavProps = {
  chapters: StoryChapter[];
  className?: string;
};

export default function ChapterNav({
  chapters,
  className = "",
}: ChapterNavProps) {
  const [activeChapter, setActiveChapter] = useState(
    chapters[0]?.id ?? "",
  );

  const idsKey = chapters.map((chapter) => chapter.id).join("|");

  useEffect(() => {
    const ids = idsKey ? idsKey.split("|") : [];

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) return;

    let ticking = false;

    const updateActiveChapter = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        const targetPosition = window.innerHeight * 0.4;

        let closestElement: HTMLElement | null = null;
        let closestDistance = Infinity;

        for (const element of elements) {
          const rect = element.getBoundingClientRect();

          /*
           * Use the section's top edge as the primary
           * reference point. This makes the indicator
           * feel more natural as the user moves through
           * long story sections.
           */
          const distance = Math.abs(rect.top - targetPosition);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestElement = element;
          }
        }

        if (
          closestElement &&
          closestElement.id !== activeChapter
        ) {
          setActiveChapter(closestElement.id);
        }

        ticking = false;
      });
    };

    updateActiveChapter();

    window.addEventListener("scroll", updateActiveChapter, {
      passive: true,
    });

    window.addEventListener("resize", updateActiveChapter);

    return () => {
      window.removeEventListener("scroll", updateActiveChapter);
      window.removeEventListener("resize", updateActiveChapter);
    };
  }, [idsKey, activeChapter]);

  if (!chapters.length) return null;

  return (
    <nav
      aria-label="Story sections"
      className={`fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block xl:right-8 ${className}`}
    >
      <ol className="flex flex-col items-end gap-1">
        {chapters.map((chapter, index) => {
          const active = activeChapter === chapter.id;

          return (
            <li key={chapter.id}>
              <a
                href={`#${chapter.id}`}
                aria-current={active ? "location" : undefined}
                aria-label={`Go to ${chapter.label}`}
                className="group flex items-center justify-end gap-3 rounded-full py-2.5 pl-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009CA6]/50"
              >
                {/* Label */}
                <span
                  className={`
                    text-sm font-semibold
                    leading-none
                    transition-all duration-300
                    ${
                      active
                        ? "translate-x-0 text-[#291B4F] opacity-100"
                        : "translate-x-2 text-[#291B4F]/50 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                    }
                  `}
                >
                  {chapter.label}
                </span>

                {/* Indicator */}
                <span
                  aria-hidden="true"
                  className="flex h-6 w-3 items-center justify-center"
                >
                  <span
                    className={`
                      block rounded-full
                      transition-all duration-300
                      ${
                        active
                          ? "h-6 w-1.5 bg-[#009CA6]"
                          : "h-2 w-2 bg-[#291B4F]/20 group-hover:bg-[#009CA6]/70"
                      }
                    `}
                  />
                </span>
              </a>
            </li>
          );
        })}
      </ol>

      {/* Section count */}
      <div className="mt-6 flex items-center justify-end gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#291B4F]/40">
          Explore
        </span>

        <span
          aria-hidden="true"
          className="h-px w-7 bg-[#009CA6]/40"
        />
      </div>
    </nav>
  );
}