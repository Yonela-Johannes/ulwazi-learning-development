"use client";

import Image from "next/image";
import { Heart, Facebook, Linkedin, Github, type LucideIcon } from "lucide-react";
import { useDonate } from "./DonateProvider";
import { ORG_DETAILS } from "./content";

const NAV_LINKS = [
  { href: "#beginning", label: "The Beginning" },
  { href: "#lumka", label: "Lumka's Story" },
  { href: "#ulwazi", label: "The Work" },
  { href: "#community", label: "Community" },
  { href: "#support", label: "Support" },
  { href: "#contact", label: "Contact" },
] as const;

const SOCIAL_LINKS: { label: string; href?: string; icon: LucideIcon }[] = [
  { label: "Facebook", href: ORG_DETAILS.socials.facebook, icon: Facebook },
  { label: "LinkedIn", href: ORG_DETAILS.socials.linkedin, icon: Linkedin },
  { label: "GitHub", href: ORG_DETAILS.socials.github, icon: Github },
];

const CURRENT_YEAR = new Date().getFullYear();

const TEAL_TEXT = "text-[#007A82]";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009CA6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F8F6]";

export default function StoryFooter() {
  const { open: openDonate } = useDonate();

  const socials = SOCIAL_LINKS.filter(
    (link): link is typeof link & { href: string } => Boolean(link.href),
  );

  return (
    <footer className="border-t border-[#291B4F]/10 bg-[#F8F8F6] text-[#291B4F]">
      <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 xl:px-16">
        <div className="grid gap-16 lg:grid-cols-[1.25fr_0.65fr_0.85fr] lg:gap-20">
          {/* Brand */}
          <div>
            <a
              href="#beginning"
              className={`inline-flex items-center gap-4 ${focusRing}`}
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden border border-[#291B4F]/10 bg-white">
                {/* Decorative: the name is announced by the adjacent text */}
                <Image
                  src="/img/LOGO.png"
                  alt=""
                  fill
                  sizes="48px"
                  className="object-contain p-1"
                />
              </div>

              <div>
                <span className="block text-sm font-semibold uppercase tracking-[0.12em]">
                  {ORG_DETAILS.name}
                </span>
                <span className={`mt-1 block text-xs ${TEAL_TEXT}`}>
                  {ORG_DETAILS.npoStatus}
                </span>
              </div>
            </a>

            <p className="mt-8 max-w-xl text-base leading-7 text-[#291B4F]/70 sm:text-lg">
              Empowering vulnerable township children in Cape Town through
              holiday learning programmes, foundational life skills, and safe
              sanctuary. {ORG_DETAILS.tagline}.
            </p>

            {socials.length > 0 && (
              <ul
                aria-label="Social media"
                className="mt-8 flex items-center gap-5"
              >
                {socials.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block rounded-sm text-[#291B4F]/60 transition-colors hover:text-[#009CA6] ${focusRing}`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                      <span className="sr-only">{label} (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Navigation */}
          <nav aria-labelledby="footer-explore">
            <h2
              id="footer-explore"
              className={`text-xs font-medium uppercase tracking-[0.14em] ${TEAL_TEXT}`}
            >
              Explore
            </h2>

            <ul className="mt-6 flex flex-col items-start gap-4 text-sm">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className={`rounded-sm text-[#291B4F]/75 transition-colors hover:text-[#009CA6] ${focusRing}`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Donate */}
          <div>
            <h2
              className={`text-xs font-medium uppercase tracking-[0.14em] ${TEAL_TEXT}`}
            >
              Support Ulwazi
            </h2>

            <p className="mt-6 text-sm leading-6 text-[#291B4F]/70">
              Your contribution helps create safe spaces, learning
              opportunities and meaningful support for children.
            </p>

            <button
              type="button"
              onClick={() => openDonate()}
              className={`mt-7 flex w-full cursor-pointer items-center justify-center gap-3 border border-[#291B4F] px-6 py-4 text-sm font-semibold uppercase tracking-[0.1em] transition-colors hover:bg-[#291B4F] hover:text-[#F8F8F6] ${focusRing}`}
            >
              <Heart className="h-4 w-4 fill-current" aria-hidden="true" />
              <span>Make a donation</span>
            </button>

            <address className="mt-5 text-xs not-italic leading-5 text-[#291B4F]/60">
              {ORG_DETAILS.locationFull}
            </address>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-[#291B4F]/10 pt-7 text-xs text-[#291B4F]/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {CURRENT_YEAR} {ORG_DETAILS.name}. All rights reserved.
          </p>

          <a
            href="#beginning"
            className={`self-start rounded-sm transition-colors hover:text-[#009CA6] sm:self-auto ${focusRing}`}
          >
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}