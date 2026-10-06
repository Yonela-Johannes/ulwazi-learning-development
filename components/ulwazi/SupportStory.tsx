"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import {
  Heart,
  Send,
  CheckCircle2,
  ShieldCheck,
  Mail,
  MapPin,
  PhoneCall,
} from "lucide-react";

import StorySection from "@/components/story/StorySection";
import StoryText from "@/components/story/StoryText";
import ScrollReveal from "@/components/story/ScrollReveal";
import { useStoryProgress } from "@/components/story/useStoryProgress";
import { useDonate } from "./DonateProvider";
import {
  DONATION_TIERS,
  ORG_DETAILS,
  CONTACT_INTEREST_OPTIONS,
} from "./content";

const STATEMENT =
  "A safe place can change a childhood. Your support keeps children educated, safe, and nourished.";

export default function SupportStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollYProgress = useStoryProgress(sectionRef);
  const shouldReduceMotion = useReducedMotion();
  const { open: openDonateModal } = useDonate();

  const [selectedTier, setSelectedTier] = useState<number>(350);
  const [formSubmitted, setFormSubmitted] = useState(false);

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
      className="bg-[#291B4F] text-[#F8F8F6]"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-[1100px] py-16 text-center sm:py-24">
          <ScrollReveal>
            <div className="mb-8 flex items-center justify-center gap-4 text-xs font-medium uppercase tracking-[0.16em]">
              <span className="text-white/40">Support & impact</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <p className="mb-8 text-sm font-medium uppercase tracking-[0.16em] text-[#4DDBDF]">
              Our common cause
            </p>
          </ScrollReveal>

          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-[clamp(2.5rem,5vw,5.8rem)] font-medium leading-[0.94] tracking-[-0.055em]">
            {words.map((word, index) => {
              const start = index / words.length;
              const end = (index + 1) / words.length;

              const opacity = useTransform(
                scrollYProgress,
                [0.02 + start * 0.28, 0.02 + end * 0.28],
                [0.2, 1],
              );

              return (
                <motion.span
                  key={`${word}-${index}`}
                  style={shouldReduceMotion ? { opacity: 1 } : { opacity }}
                >
                  {word}
                </motion.span>
              );
            })}
          </div>
        </div>

        <div id="donate" className="border-t border-white/10 pt-20 sm:pt-28">
          <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
            <ScrollReveal>
              <div>
                <StoryText
                  as="h2"
                  eyebrow="Support our work"
                  description="Ulwazi Learning Development is a registered non-profit. Every contribution helps fund holiday programmes, meals, learning supplies and safe spaces for children."
                  className="text-[#F8F8F6]"
                >
                  Make a
                  <br />
                  <span className="text-[#4DDBDF]">direct impact.</span>
                </StoryText>
              </div>
            </ScrollReveal>

            <div>
              {/* Donation amounts */}

              <ScrollReveal delay={100}>
                <div className="border-t border-white/10">
                  {DONATION_TIERS.map((tier) => {
                    const selected = selectedTier === tier.amount;

                    return (
                      <button
                        key={tier.amount}
                        type="button"
                        onClick={() => setSelectedTier(tier.amount)}
                        className={`group relative grid w-full cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-white/10 py-7 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4DDBDF] ${
                          selected
                            ? "bg-white/[0.045]"
                            : "hover:bg-white/[0.025]"
                        }`}
                      >
                        <div>
                          <div
                            className={`text-2xl font-medium tracking-[-0.035em] sm:text-3xl ${
                              selected ? "text-[#4DDBDF]" : "text-[#F8F8F6]"
                            }`}
                          >
                            {tier.label}
                          </div>

                          <div className="mt-1 text-sm font-medium text-white/80">
                            {tier.title}
                          </div>

                          <div className="mt-2 max-w-lg text-sm leading-6 text-white/45">
                            {tier.desc}
                          </div>
                        </div>

                        {tier.popular && (
                          <span className="hidden border-b border-[#4DDBDF] pb-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#4DDBDF] sm:block">
                            Most popular
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={180}>
                <div className="mt-10">
                  <button
                    type="button"
                    onClick={openDonateModal}
                    className="btn-teal flex w-full cursor-pointer items-center justify-center gap-3 px-6 py-4 text-sm font-semibold uppercase tracking-[0.12em]"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                    <span>Donate via PayPal</span>
                  </button>

                  <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3 text-xs text-white/40">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-[#4DDBDF]" />
                      <span>Verified PayPal portal</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#4DDBDF]" />
                      <span>Registered NPO South Africa</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        <div
          id="contact"
          className="mt-32 border-t border-white/10 pt-20 sm:mt-40 sm:pt-28"
        >
          <div className="grid gap-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
            {/* Contact information */}

            <ScrollReveal>
              <div>
                <StoryText
                  as="h2"
                  eyebrow="Get in touch"
                  description="Have a question, want to volunteer, or interested in sponsoring a holiday programme? We'd love to hear from you."
                  className="text-[#F8F8F6]"
                >
                  Contact
                  <br />
                  <span className="text-[#4DDBDF]">Ulwazi.</span>
                </StoryText>

                <div className="mt-12 border-t border-white/10">
                  <div className="grid gap-0">
                    <div className="flex items-start gap-5 border-b border-white/10 py-6">
                      <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#4DDBDF]" />

                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.12em] text-white/35">
                          Location
                        </p>

                        <p className="mt-2 text-sm font-medium leading-6 text-white/80">
                          {ORG_DETAILS.locationFull}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-5 border-b border-white/10 py-6">
                      <Mail className="mt-1 h-5 w-5 shrink-0 text-[#4DDBDF]" />

                      <div className="min-w-0">
                        <p className="text-xs font-medium uppercase tracking-[0.12em] text-white/35">
                          Email
                        </p>

                        <a
                          href={`mailto:${ORG_DETAILS.email}`}
                          className="mt-2 block truncate text-sm font-medium text-[#4DDBDF] hover:underline"
                        >
                          {ORG_DETAILS.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-5 border-b border-white/10 py-6">
                      <PhoneCall className="mt-1 h-5 w-5 shrink-0 text-[#4DDBDF]" />

                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.12em] text-white/35">
                          Operating hours
                        </p>

                        <p className="mt-2 text-sm font-medium leading-6 text-white/80">
                          {ORG_DETAILS.operatingHours}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-white/40">
                          {ORG_DETAILS.operatingNote}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Form */}

            <ScrollReveal delay={100}>
              <div className="border-t border-white/10 pt-8 lg:pt-0 lg:border-t-0">
                {formSubmitted ? (
                  <div className="flex min-h-[500px] flex-col items-center justify-center border border-white/10 px-8 py-16 text-center">
                    <CheckCircle2 className="h-14 w-14 text-[#4DDBDF]" />

                    <h3 className="mt-7 text-3xl font-medium tracking-[-0.04em] text-white">
                      Message received.
                    </h3>

                    <p className="mt-4 max-w-md text-sm leading-7 text-white/50">
                      Thank you for reaching out to Ulwazi Learning Development.
                      Lumka Johannes or our team will get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form
                    action={ORG_DETAILS.contactFormUrl}
                    method="POST"
                    onSubmit={handleFormSubmit}
                    className="space-y-8"
                  >
                    <input
                      type="hidden"
                      name="_cc"
                      value={ORG_DETAILS.formCc}
                    />

                    <input
                      type="hidden"
                      name="_subject"
                      value="New Inquiry from Ulwazi Website"
                    />

                    <div className="grid gap-8 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-3 block text-xs font-medium uppercase tracking-[0.12em] text-white/40"
                        >
                          Full name
                        </label>

                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          placeholder="Your name"
                          className="w-full border-0 border-b border-white/20 bg-transparent px-0 py-3 text-base text-white outline-none placeholder:text-white/25 focus:border-[#4DDBDF]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="mb-3 block text-xs font-medium uppercase tracking-[0.12em] text-white/40"
                        >
                          Email address
                        </label>

                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          placeholder="you@example.com"
                          className="w-full border-0 border-b border-white/20 bg-transparent px-0 py-3 text-base text-white outline-none placeholder:text-white/25 focus:border-[#4DDBDF]"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="interest"
                        className="mb-3 block text-xs font-medium uppercase tracking-[0.12em] text-white/40"
                      >
                        How would you like to get involved?
                      </label>

                      <select
                        id="interest"
                        name="interest"
                        className="w-full cursor-pointer border-0 border-b border-white/20 bg-[#291B4F] px-0 py-3 text-base text-white outline-none focus:border-[#4DDBDF]"
                      >
                        {CONTACT_INTEREST_OPTIONS.map((option) => (
                          <option
                            key={option}
                            value={option}
                            className="bg-[#291B4F]"
                          >
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="mb-3 block text-xs font-medium uppercase tracking-[0.12em] text-white/40"
                      >
                        Your message
                      </label>

                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        placeholder="Share your thoughts, questions, or how you would like to support..."
                        className="w-full resize-none border-0 border-b border-white/20 bg-transparent px-0 py-3 text-base leading-7 text-white outline-none placeholder:text-white/25 focus:border-[#4DDBDF]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-teal flex w-full cursor-pointer items-center justify-center gap-3 px-6 py-4 text-sm font-semibold uppercase tracking-[0.12em]"
                    >
                      <span>Send message</span>
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </StorySection>
  );
}
