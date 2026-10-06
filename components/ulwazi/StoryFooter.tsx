"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Facebook, Linkedin, Github } from "lucide-react";
import { useDonate } from "./DonateProvider";
import { ORG_DETAILS } from "./content";

export default function StoryFooter() {
  const { open: openDonate } = useDonate();

  return (
    <footer className="border-t border-[#291B4F]/10 bg-[#F8F8F6] text-[#291B4F]">
      <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 xl:px-16">
        <div className="grid gap-16 lg:grid-cols-[1.25fr_0.65fr_0.85fr] lg:gap-20">
          <div>
            <Link
              href="#beginning"
              className="group inline-flex items-center gap-4"
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden border border-[#291B4F]/10 bg-white">
                <Image
                  src="/img/LOGO.png"
                  alt={ORG_DETAILS.name}
                  fill
                  sizes="48px"
                  className="object-contain p-1"
                />
              </div>

              <div>
                <span className="block text-sm font-semibold uppercase tracking-[0.12em]">
                  {ORG_DETAILS.name}
                </span>
                <span className="mt-1 block text-xs text-[#009CA6]">
                  {ORG_DETAILS.npoStatus}
                </span>
              </div>
            </Link>

            <p className="mt-8 max-w-xl text-base leading-7 text-[#291B4F]/55 sm:text-lg">
              Empowering vulnerable township children in Cape Town through
              holiday learning programmes, foundational life skills, and safe
              sanctuary. {ORG_DETAILS.tagline}.
            </p>

            <div className="mt-8 flex items-center gap-5">
              <a
                href={ORG_DETAILS.socials.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="text-[#291B4F]/45 transition-colors hover:text-[#009CA6]"
              >
                <Facebook className="h-5 w-5" />
              </a>

              <a
                href={ORG_DETAILS.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-[#291B4F]/45 transition-colors hover:text-[#009CA6]"
              >
                <Linkedin className="h-5 w-5" />
              </a>

              <a
                href={ORG_DETAILS.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="text-[#291B4F]/45 transition-colors hover:text-[#009CA6]"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-[#009CA6]">
              Explore
            </h2>

            <nav className="mt-6 flex flex-col items-start gap-4 text-sm">
              <a
                href="#beginning"
                className="text-[#291B4F]/65 transition-colors hover:text-[#009CA6]"
              >
                The Beginning
              </a>

              <a
                href="#lumka"
                className="text-[#291B4F]/65 transition-colors hover:text-[#009CA6]"
              >
                Lumka&apos;s Story
              </a>

              <a
                href="#ulwazi"
                className="text-[#291B4F]/65 transition-colors hover:text-[#009CA6]"
              >
                The Work
              </a>

              <a
                href="#community"
                className="text-[#291B4F]/65 transition-colors hover:text-[#009CA6]"
              >
                Community
              </a>

              <a
                href="#support"
                className="text-[#291B4F]/65 transition-colors hover:text-[#009CA6]"
              >
                Support
              </a>

              <a
                href="#contact"
                className="text-[#291B4F]/65 transition-colors hover:text-[#009CA6]"
              >
                Contact
              </a>
            </nav>
          </div>

          <div>
            <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-[#009CA6]">
              Support Ulwazi
            </h2>

            <p className="mt-6 text-sm leading-6 text-[#291B4F]/55">
              Your contribution helps create safe spaces, learning
              opportunities and meaningful support for children.
            </p>

            <button
              type="button"
              onClick={openDonate}
              className="border border-(--ink) mt-7 flex w-full cursor-pointer items-center justify-center gap-3 px-6 py-4 text-sm font-semibold uppercase tracking-[0.1em]"
            >
              <Heart className="h-4 w-4 fill-current" />
              <span>Make a donation</span>
            </button>

            <div className="mt-5 text-xs leading-5 text-[#291B4F]/40">
              <p>{ORG_DETAILS.npoStatus}</p>
              <p>{ORG_DETAILS.locationFull}</p>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-[#291B4F]/10 pt-7 text-xs text-[#291B4F]/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {ORG_DETAILS.name}. All rights
            reserved.
          </p>

          <p>Cape Town</p>
        </div>
      </div>
    </footer>
  );
}