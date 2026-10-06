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
  const [activeChapter, setActiveChapter] = useState(chapters[0]?.id ?? "");

  const idsKey = chapters.map((chapter) => chapter.id).join("|");

  useEffect(() => {
    const ids = idsKey ? idsKey.split("|") : [];

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) return;

    const updateActiveChapter = () => {
      const viewportCenter = window.innerHeight * 0.42;

      let closestElement: HTMLElement | null = null;
      let closestDistance = Infinity;

      for (const element of elements) {
        const rect = element.getBoundingClientRect();

        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          continue;
        }

        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestElement = element;
        }
      }

      if (closestElement) {
        setActiveChapter(closestElement.id);
      }
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
  }, [idsKey]);

  if (!chapters.length) return null;

  return (
    <nav
      aria-label="Story chapters"
      className={`fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block ${className}`}
    >
      <ol className="flex flex-col items-end gap-1">
        {chapters.map((chapter, index) => {
          const active = activeChapter === chapter.id;

          return (
            <li key={chapter.id}>
              <a
                href={`#${chapter.id}`}
                aria-current={active ? "location" : undefined}
                className="group flex items-center justify-end gap-4 py-2.5 pl-4 focus-visible:outline-none"
              >
                <span
                  className={`
                    text-xs font-medium tracking-[-0.01em]
                    transition-all duration-300
                    ${
                      active
                        ? "translate-x-0 text-[#291B4F] opacity-100"
                        : "translate-x-1 text-[#291B4F]/55 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                    }
                  `}
                >
                  {chapter.label}
                </span>

                <span
                  aria-hidden="true"
                  className={`
                    relative flex h-5 w-2 items-center justify-center
                  `}
                >
                  <span
                    className={`
                      block rounded-full
                      transition-all duration-500
                      ${
                        active
                          ? "h-5 w-1.5 bg-[#009CA6]"
                          : "h-1.5 w-1.5 bg-[#291B4F]/20 group-hover:bg-[#009CA6]/60"
                      }
                    `}
                  />
                </span>
              </a>
            </li>
          );
        })}
      </ol>

      <div className="mt-5 flex items-center justify-end gap-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#291B4F]/35">
          Story
        </span>

        <span className="h-px w-6 bg-[#009CA6]/40" />
      </div>
    </nav>
  );
}
