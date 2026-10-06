"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Facebook, Linkedin, Github } from "lucide-react";
import { useDonate } from "./DonateProvider";
import { ORG_DETAILS } from "./content";

export default function StoryFooter() {
  const { open: openDonate } = useDonate();

  return (
    <footer className="bg-[#151515] text-[#F5F2EA] border-t border-[#F5F2EA]/10 relative overflow-hidden text-xs sm:text-sm py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link href="#beginning" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-[#B9915A]/40 p-0.5 relative overflow-hidden bg-white">
                <Image
                  src="/img/LOGO.png"
                  alt={ORG_DETAILS.name}
                  fill
                  sizes="32px"
                  className="object-contain p-0.5"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#F5F2EA] tracking-widest uppercase font-mono">
                  {ORG_DETAILS.name.toUpperCase()}
                </span>
                <span className="text-[9px] font-mono text-[#B9915A] uppercase tracking-wider">
                  {ORG_DETAILS.npoStatus}
                </span>
              </div>
            </Link>

            <p className="text-[#F5F2EA]/70 leading-relaxed text-xs max-w-sm">
              Empowering vulnerable township children in Cape Town through holiday learning programmes, foundational life skills, and safe sanctuary. {ORG_DETAILS.tagline}.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={ORG_DETAILS.socials.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="p-2 border border-[#F5F2EA]/15 text-[#F5F2EA] hover:border-[#B9915A] hover:text-[#B9915A] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={ORG_DETAILS.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="p-2 border border-[#F5F2EA]/15 text-[#F5F2EA] hover:border-[#B9915A] hover:text-[#B9915A] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={ORG_DETAILS.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="p-2 border border-[#F5F2EA]/15 text-[#F5F2EA] hover:border-[#B9915A] hover:text-[#B9915A] transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#B9915A]">
              CHAPTERS
            </h4>
            <ul className="space-y-2 text-xs font-mono text-[#F5F2EA]/75">
              <li><a href="#beginning" className="hover:text-[#B9915A] transition-colors">01 THE BEGINNING</a></li>
              <li><a href="#lumka" className="hover:text-[#B9915A] transition-colors">02 LUMKA&apos;S STORY</a></li>
              <li><a href="#ulwazi" className="hover:text-[#B9915A] transition-colors">03 THE WORK</a></li>
              <li><a href="#community" className="hover:text-[#B9915A] transition-colors">04 COMMUNITY EVIDENCE</a></li>
              <li><a href="#support" className="hover:text-[#B9915A] transition-colors">05 SUPPORT & IMPACT</a></li>
            </ul>
          </div>

          {/* Action Box */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#B9915A]">
              SUPPORT OUR CAUSE
            </h4>
            <p className="text-xs text-[#F5F2EA]/70">
              100% of your contribution directly supports our holiday programmes and meals for township youth.
            </p>

            <button
              type="button"
              onClick={openDonate}
              className="w-full btn-warm py-3 rounded-full text-xs font-mono font-bold tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Heart className="w-3.5 h-3.5 fill-[#151515]" />
              <span>MAKE A DONATION</span>
            </button>

            <div className="text-[11px] text-[#77736B] pt-1 font-mono">
              {ORG_DETAILS.npoStatus} • {ORG_DETAILS.locationFull}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#F5F2EA]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#77736B]">
          <div>
            &copy; {new Date().getFullYear()} {ORG_DETAILS.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
