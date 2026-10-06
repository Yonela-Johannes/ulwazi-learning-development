"use client";

import { useRef, useState } from "react";
import { motion, useTransform, useReducedMotion } from "framer-motion";
import { Heart, Send, CheckCircle2, ShieldCheck, Mail, MapPin, PhoneCall } from "lucide-react";

import StorySection from "@/components/story/StorySection";
import StoryText from "@/components/story/StoryText";
import ScrollReveal from "@/components/story/ScrollReveal";
import { useStoryProgress } from "@/components/story/useStoryProgress";
import {
  DONATION_TIERS,
  ORG_DETAILS,
  CONTACT_INTEREST_OPTIONS,
} from "./content";

interface SupportStoryProps {
  onOpenDonateModal?: () => void;
}

const STATEMENT = "A safe place can change a childhood. Your support keeps Mfuleni children educated, safe, and nourished.";

export default function SupportStory({ onOpenDonateModal }: SupportStoryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollYProgress = useStoryProgress(sectionRef);
  const shouldReduceMotion = useReducedMotion();

  const [selectedTier, setSelectedTier] = useState<number>(350);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const words = STATEMENT.split(" ");

  const handleFormSubmit = () => {
    setFormSubmitted(true);
  };

  return (
    <StorySection
      ref={sectionRef}
      id="support"
      label="Support & Impact"
      height="auto"
      className="bg-[#151515] text-[#F5F2EA] py-24"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 space-y-24">
        {/* Word-by-Word Scroll Reveal Statement */}
        <div className="text-center max-w-4xl mx-auto py-12">
          <p className="text-xs font-mono tracking-[0.24em] text-[#B9915A] uppercase mb-6">
            Our Common Cause
          </p>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-3xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.03em] leading-tight">
            {words.map((word, index) => {
              const start = index / words.length;
              const end = (index + 1) / words.length;
              // eslint-disable-next-ok
              const opacity = useTransform(
                scrollYProgress,
                [0.05 + start * 0.25, 0.05 + end * 0.25],
                [0.2, 1]
              );

              return (
                <motion.span
                  key={index + word}
                  style={shouldReduceMotion ? { opacity: 1 } : { opacity }}
                >
                  {word}
                </motion.span>
              );
            })}
          </div>
        </div>

        {/* Tiered Donation Section */}
        <div id="donate" className="space-y-12 pt-12 border-t border-[#F5F2EA]/10">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <StoryText
                as="h2"
                align="center"
                eyebrow="Support Our Work"
                description="Ulwazi Learning Development is a registered non-profit. Every contribution directly funds holiday programmes, meals, and learning supplies."
              >
                Make a direct impact today.
              </StoryText>
            </div>
          </ScrollReveal>

          {/* Tier Cards */}
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {DONATION_TIERS.map((tier) => (
              <div
                key={tier.amount}
                onClick={() => setSelectedTier(tier.amount)}
                className={`p-6 rounded-2xl border cursor-pointer transition-all relative ${
                  selectedTier === tier.amount
                    ? "border-[#B9915A] bg-[#F5F2EA]/10 shadow-xl"
                    : "border-[#F5F2EA]/10 bg-[#F5F2EA]/5 hover:border-[#F5F2EA]/20"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-[#B9915A] text-[#151515] font-mono text-[10px] uppercase tracking-wider font-bold">
                    Most Popular
                  </span>
                )}
                <div className="text-2xl font-mono font-bold text-[#B9915A] mb-1">
                  {tier.label}
                </div>
                <div className="text-base font-bold text-[#F5F2EA] mb-2">{tier.title}</div>
                <div className="text-xs text-[#F5F2EA]/70 leading-relaxed">{tier.desc}</div>
              </div>
            ))}
          </div>

          {/* Action Button & PayPal Direct Form */}
          <div className="flex flex-col items-center justify-center gap-4 max-w-md mx-auto pt-2">
            <button
              type="button"
              onClick={onOpenDonateModal}
              className="w-full btn-warm py-4 rounded-full text-xs font-mono font-bold tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Heart className="w-4 h-4 fill-[#151515]" />
              <span>DONATE VIA PAYPAL</span>
            </button>

            <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono text-[#F5F2EA]/50 pt-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#B9915A]" />
                <span>Verified PayPal Portal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#B9915A]" />
                <span>Registered NPO South Africa</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form & Information */}
        <div id="contact" className="grid lg:grid-cols-12 gap-12 pt-16 border-t border-[#F5F2EA]/10">
          {/* Left Column: Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <StoryText
              as="h2"
              eyebrow="Get In Touch"
              description="Have questions, want to volunteer, or interested in sponsoring a holiday programme? Send us a message."
            >
              Contact Ulwazi
            </StoryText>

            <div className="space-y-4 pt-4 text-xs font-mono">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#F5F2EA]/5 border border-[#F5F2EA]/10">
                <MapPin className="w-5 h-5 text-[#B9915A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[#F5F2EA]/50 uppercase">Location</h4>
                  <p className="text-[#F5F2EA] font-sans font-medium text-sm">{ORG_DETAILS.locationFull}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#F5F2EA]/5 border border-[#F5F2EA]/10">
                <Mail className="w-5 h-5 text-[#B9915A] shrink-0 mt-0.5" />
                <div className="overflow-hidden">
                  <h4 className="text-[#F5F2EA]/50 uppercase">Email</h4>
                  <a
                    href={`mailto:${ORG_DETAILS.email}`}
                    className="text-[#B9915A] font-sans font-medium text-sm hover:underline block truncate"
                  >
                    {ORG_DETAILS.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#F5F2EA]/5 border border-[#F5F2EA]/10">
                <PhoneCall className="w-5 h-5 text-[#B9915A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[#F5F2EA]/50 uppercase">Operating Hours</h4>
                  <p className="text-[#F5F2EA] font-sans font-medium text-sm">{ORG_DETAILS.operatingHours}</p>
                  <p className="text-[#F5F2EA]/60 text-[11px]">{ORG_DETAILS.operatingNote}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Formsubmit Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#F5F2EA]/5 border border-[#F5F2EA]/10">
              {formSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-[#B9915A] mx-auto" />
                  <h3 className="text-2xl font-bold text-[#F5F2EA]">Message Received!</h3>
                  <p className="text-xs text-[#F5F2EA]/75 max-w-md mx-auto">
                    Thank you for reaching out to Ulwazi Learning Development. Lumka Johannes or our team will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form
                  action={ORG_DETAILS.contactFormUrl}
                  method="POST"
                  onSubmit={handleFormSubmit}
                  className="space-y-6 text-xs font-mono"
                >
                  <input type="hidden" name="_cc" value={ORG_DETAILS.formCc} />
                  <input
                    type="hidden"
                    name="_subject"
                    value="New Inquiry from Ulwazi Website"
                  />

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-[#F5F2EA]/70 uppercase block">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="Lumka Johannes"
                        className="w-full px-4 py-3 rounded-lg bg-[#151515] border border-[#F5F2EA]/20 text-[#F5F2EA] placeholder-[#F5F2EA]/30 focus:outline-none focus:border-[#B9915A] text-sm font-sans"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[#F5F2EA]/70 uppercase block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-lg bg-[#151515] border border-[#F5F2EA]/20 text-[#F5F2EA] placeholder-[#F5F2EA]/30 focus:outline-none focus:border-[#B9915A] text-sm font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="interest" className="text-[#F5F2EA]/70 uppercase block">
                      How would you like to get involved?
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      className="w-full px-4 py-3 rounded-lg bg-[#151515] border border-[#F5F2EA]/20 text-[#F5F2EA] focus:outline-none focus:border-[#B9915A] text-sm font-sans"
                    >
                      {CONTACT_INTEREST_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[#F5F2EA]/70 uppercase block">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Share your thoughts, questions, or how you would like to support..."
                      className="w-full px-4 py-3 rounded-lg bg-[#151515] border border-[#F5F2EA]/20 text-[#F5F2EA] placeholder-[#F5F2EA]/30 focus:outline-none focus:border-[#B9915A] text-sm font-sans resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-warm py-4 rounded-full text-xs font-mono font-bold tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <span>SEND MESSAGE</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </StorySection>
  );
}
