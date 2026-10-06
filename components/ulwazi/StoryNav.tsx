"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Menu, X } from "lucide-react";

import { useDonate } from "./DonateProvider";
import { ORG_DETAILS } from "./content";

const navLinks = [
  { name: "The Beginning", href: "#beginning" },
  { name: "Founder", href: "#lumka" },
  { name: "The Work", href: "#ulwazi" },
  { name: "Community", href: "#community" },
  { name: "Support", href: "#support" },
];

export default function StoryNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { open: openDonate } = useDonate();

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleDonate = () => {
    setMobileMenuOpen(false);
    openDonate();
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-[#291B4F]/8 bg-[#F8F8F6]/90 px-5 py-4 backdrop-blur-md sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between">
          {/* Brand */}
          <Link
            href="#beginning"
            onClick={() => setMobileMenuOpen(false)}
            className="group flex items-center gap-3 focus-visible:outline-none"
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white p-1 ring-1 ring-[#291B4F]/10 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/img/LOGO.png"
                alt={ORG_DETAILS.name}
                fill
                sizes="40px"
                className="object-contain"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-semibold uppercase tracking-[0.12em] text-[#291B4F] sm:text-base">
                {ORG_DETAILS.shortName}
              </span>

              <span className="text-[10px] uppercase tracking-[0.12em] text-[#6F6B78] sm:text-xs">
                Learning Development
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main Navigation"
            className="hidden items-center gap-7 lg:flex xl:gap-9"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative py-2 text-sm font-medium tracking-[-0.01em] text-[#291B4F]/75 transition-colors duration-200 hover:text-[#009CA6] focus-visible:outline-none focus-visible:text-[#009CA6]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Donate */}
          <div className="hidden lg:block">
            <button
              type="button"
              onClick={openDonate}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#009CA6] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#007F87] active:translate-y-px"
            >
              <Heart className="h-4 w-4 fill-current" />
              Donate
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={handleDonate}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[#009CA6] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#007F87]"
            >
              <Heart className="h-3.5 w-3.5 fill-current" />
              Donate
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#291B4F] transition-colors hover:bg-[#291B4F]/5 focus-visible:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex min-h-screen flex-col bg-[#F8F8F6] text-[#291B4F]">
          <div className="flex items-center justify-between border-b border-[#291B4F]/10 px-6 py-5">
            <Link
              href="#beginning"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3"
            >
              <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white p-1 ring-1 ring-[#291B4F]/10">
                <Image
                  src="/img/LOGO.png"
                  alt={ORG_DETAILS.name}
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-semibold uppercase tracking-[0.12em]">
                  {ORG_DETAILS.shortName}
                </span>
                <span className="text-[10px] uppercase tracking-[0.12em] text-[#6F6B78]">
                  Learning Development
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#291B4F] hover:bg-[#291B4F]/5"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center px-8 sm:px-12">
            <div className="flex flex-col gap-5">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex items-baseline gap-4 text-3xl font-medium tracking-[-0.035em] transition-colors duration-200 hover:text-[#009CA6] sm:text-4xl"
                >
                  <span className="text-xs font-medium tracking-[0.12em] text-[#009CA6]">
                    0{index + 1}
                  </span>

                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </nav>

          <div className="border-t border-[#291B4F]/10 px-8 py-7 sm:px-12">
            <button
              type="button"
              onClick={handleDonate}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#009CA6] px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-[#007F87]"
            >
              <Heart className="h-5 w-5 fill-current" />
              <span>Support Our Children</span>
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-[#6F6B78]">
              {ORG_DETAILS.npoStatus} · {ORG_DETAILS.location}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
