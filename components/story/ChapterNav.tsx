'use client'

import { useEffect, useState } from 'react'

export type StoryChapter = {
  id: string
  label: string
}

type ChapterNavProps = {
  chapters: StoryChapter[]
  className?: string
}

export default function ChapterNav({
  chapters,
  className = '',
}: ChapterNavProps) {
  const [activeChapter, setActiveChapter] = useState(chapters[0]?.id ?? '')

  const idsKey = chapters.map((chapter) => chapter.id).join('|')

  useEffect(() => {
    const elements = (idsKey ? idsKey.split('|') : [])
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element))

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveChapter(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -54% 0px', threshold: 0 },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [idsKey])

  if (!chapters.length) return null

  return (
    <nav
      aria-label="Story chapters"
      className={`fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 text-white mix-blend-difference lg:block ${className}`}
    >
      <ol className="flex flex-col">
        {chapters.map((chapter) => {
          const active = activeChapter === chapter.id

          return (
            <li key={chapter.id}>
              <a
                href={`#${chapter.id}`}
                aria-current={active ? 'location' : undefined}
                className="group flex items-center justify-end gap-3 py-2 focus-visible:outline-none"
              >
                <span
                  className={`text-[10px] uppercase tracking-[0.18em] transition-opacity duration-300 group-focus-visible:opacity-100 ${
                    active
                      ? 'opacity-100'
                      : 'opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {chapter.label}
                </span>

                <span
                  aria-hidden="true"
                  className={`block h-1.5 rounded-full bg-current transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-current group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-transparent ${
                    active
                      ? 'w-8'
                      : 'w-1.5 opacity-30 group-hover:opacity-70'
                  }`}
                />
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}