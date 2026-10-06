"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Menu, X } from "lucide-react";
import { useDonate } from "./DonateProvider";
import { ORG_DETAILS } from "./content";

const navLinks = [
  { name: "THE BEGINNING", href: "#beginning" },
  { name: "LUMKA", href: "#lumka" },
  { name: "THE WORK", href: "#ulwazi" },
  { name: "COMMUNITY", href: "#community" },
  { name: "SUPPORT", href: "#support" },
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
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 sm:px-10 lg:px-16 text-white mix-blend-difference">
        {/* Brand */}
        <Link
          href="#beginning"
          onClick={() => setMobileMenuOpen(false)}
          className="group flex items-center gap-3 focus-visible:outline-none"
        >
          <div className="relative h-8 w-8 overflow-hidden rounded-full border border-white/30 bg-white p-0.5 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/img/LOGO.png"
              alt={ORG_DETAILS.name}
              fill
              sizes="32px"
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em]">
              {ORG_DETAILS.shortName}
            </span>
            <span className="-mt-0.5 text-[8px] font-mono uppercase tracking-[0.14em] opacity-80">
              Learning Development
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Main Navigation" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-80 transition-opacity hover:opacity-100 focus-visible:outline-none"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Donate Button */}
        <div className="hidden md:block">
          <button
            type="button"
            onClick={openDonate}
            className="inline-flex items-center gap-2 rounded-full border border-white px-4 py-2 text-xs font-mono font-bold uppercase tracking-[0.16em] transition-all hover:bg-white hover:text-black cursor-pointer"
          >
            <Heart className="h-3.5 w-3.5 fill-current" />
            Donate
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={handleDonate}
            className="inline-flex items-center gap-1.5 rounded-full border border-white px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.12em]"
          >
            <Heart className="h-3 w-3 fill-current" />
            Donate
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-1 focus-visible:outline-none"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Full-Screen Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-between bg-[#151515] text-[#F5F2EA] px-8 py-12">
          <div className="flex items-center justify-between border-b border-[#F5F2EA]/20 pb-6">
            <span className="text-sm font-mono tracking-widest text-[#B9915A] uppercase">
              {ORG_DETAILS.name}
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#F5F2EA]"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-6 text-2xl font-medium tracking-tight">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#B9915A] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-6 border-t border-[#F5F2EA]/20 space-y-4">
            <button
              type="button"
              onClick={handleDonate}
              className="btn-warm w-full py-4 rounded-full text-xs font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <Heart className="h-4 w-4 fill-[#151515]" />
              <span>SUPPORT OUR CHILDREN</span>
            </button>
            <p className="text-[10px] font-mono text-[#F5F2EA]/60 text-center uppercase tracking-wider">
              {ORG_DETAILS.npoStatus} • {ORG_DETAILS.location}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
