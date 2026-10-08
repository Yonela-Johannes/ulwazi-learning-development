"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Heart,
  Send,
  CheckCircle2,
  ShieldCheck,
  Mail,
  MapPin,
  Clock,
  Loader2,
  AlertCircle,
  type LucideIcon,
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
const WORDS = STATEMENT.split(" ");

// Scroll window (0–1) over which the statement fades in.
const REVEAL_START = 0.02;
const REVEAL_SPAN = 0.28;

type FormStatus = "idle" | "submitting" | "success" | "error";

const labelClass =
  "mb-3 block text-xs font-medium uppercase tracking-[0.12em] text-white/60";

const fieldClass =
  "w-full border-0 border-b border-white/25 bg-transparent px-0 py-3 text-base text-white outline-none placeholder:text-white/40 focus:border-[#4DDBDF] focus-visible:border-[#4DDBDF] focus-visible:shadow-[0_1px_0_0_#4DDBDF]";

function RevealWord({
  word,
  index,
  total,
  progress,
  reduceMotion,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const start = REVEAL_START + (index / total) * REVEAL_SPAN;
  const end = REVEAL_START + ((index + 1) / total) * REVEAL_SPAN;
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <motion.span style={{ opacity: reduceMotion ? 1 : opacity }}>
      {word}
    </motion.span>
  );
}

function ContactItem({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-5 border-b border-white/10 py-6">
      <Icon
        className="mt-1 h-5 w-5 shrink-0 text-[#4DDBDF]"
        aria-hidden="true"
      />
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-white/55">
          {label}
        </p>
        {children}
      </div>
    </div>
  );
}

export default function SupportStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollYProgress = useStoryProgress(sectionRef);
  const shouldReduceMotion = useReducedMotion() ?? false;
  const { open: openDonateModal } = useDonate();

  const [selectedTier, setSelectedTier] = useState<number>(350);
  const [status, setStatus] = useState<FormStatus>("idle");

  const selected = DONATION_TIERS.find((t) => t.amount === selectedTier);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    setStatus("submitting");

    try {
      const response = await fetch(ORG_DETAILS.contactFormUrl, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (!response.ok) throw new Error(`Form returned ${response.status}`);

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
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
        {/* Statement */}
        <div className="mx-auto max-w-[1100px] py-16 text-center sm:py-24">
          <ScrollReveal>
            <p className="mb-8 text-sm font-medium uppercase tracking-[0.16em] text-[#4DDBDF]">
              Our common cause
            </p>
          </ScrollReveal>

          {/* Full sentence for screen readers; the per-word spans are decorative */}
          <p className="sr-only">{STATEMENT}</p>
          <div
            aria-hidden="true"
            className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-[clamp(2.5rem,5vw,5.8rem)] font-medium leading-[0.94] tracking-[-0.055em]"
          >
            {WORDS.map((word, index) => (
              <RevealWord
                key={`${word}-${index}`}
                word={word}
                index={index}
                total={WORDS.length}
                progress={scrollYProgress}
                reduceMotion={shouldReduceMotion}
              />
            ))}
          </div>
        </div>

        {/* Donate */}
        <div id="donate" className="border-t border-white/10 pt-20 sm:pt-28">
          <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
            <ScrollReveal>
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
            </ScrollReveal>

            <div>
              <ScrollReveal delay={100}>
                <div
                  role="radiogroup"
                  aria-label="Donation amount"
                  className="border-t border-white/10"
                >
                  {DONATION_TIERS.map((tier) => {
                    const isSelected = selectedTier === tier.amount;

                    return (
                      <button
                        key={tier.amount}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setSelectedTier(tier.amount)}
                        className={`flex w-full cursor-pointer items-center justify-between gap-5 border-b border-white/10 py-7 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#4DDBDF] ${
                          isSelected
                            ? "bg-white/[0.045]"
                            : "hover:bg-white/[0.025]"
                        }`}
                      >
                        <div className="min-w-0">
                          <div
                            className={`text-2xl font-medium tracking-[-0.035em] sm:text-3xl ${
                              isSelected ? "text-[#4DDBDF]" : "text-[#F8F8F6]"
                            }`}
                          >
                            {tier.label}
                          </div>

                          <div className="mt-1 text-sm font-medium text-white/85">
                            {tier.title}
                          </div>

                          <div className="mt-2 max-w-lg text-sm leading-6 text-white/60">
                            {tier.desc}
                          </div>
                        </div>

                        {tier.popular && (
                          <span className="hidden shrink-0 border-b border-[#4DDBDF] pb-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#4DDBDF] sm:block">
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
                    // NOTE: DonateProvider's `open` needs to accept an optional
                    // amount for the selection to carry into the modal.
                    onClick={() => openDonateModal(selectedTier)}
                    className="btn-teal flex w-full cursor-pointer items-center justify-center gap-3 px-6 py-4 text-sm font-semibold uppercase tracking-[0.12em]"
                  >
                    <Heart className="h-4 w-4 fill-current" aria-hidden="true" />
                    <span>
                      Donate {selected ? selected.label : ""} via PayPal
                    </span>
                  </button>

                  <ul className="mt-5 flex flex-wrap gap-x-7 gap-y-3 text-xs text-white/55">
                    <li className="flex items-center gap-2">
                      <ShieldCheck
                        className="h-4 w-4 text-[#4DDBDF]"
                        aria-hidden="true"
                      />
                      <span>Verified PayPal portal</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2
                        className="h-4 w-4 text-[#4DDBDF]"
                        aria-hidden="true"
                      />
                      <span>Registered NPO South Africa</span>
                    </li>
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div
          id="contact"
          className="mt-32 border-t border-white/10 pt-20 sm:mt-40 sm:pt-28"
        >
          <div className="grid gap-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
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
                  <ContactItem icon={MapPin} label="Location">
                    <p className="mt-2 text-sm font-medium leading-6 text-white/85">
                      {ORG_DETAILS.locationFull}
                    </p>
                  </ContactItem>

                  <ContactItem icon={Mail} label="Email">
                    <a
                      href={`mailto:${ORG_DETAILS.email}`}
                      className="mt-2 block break-all text-sm font-medium text-[#4DDBDF] hover:underline focus-visible:underline focus-visible:outline-none"
                    >
                      {ORG_DETAILS.email}
                    </a>
                  </ContactItem>

                  <ContactItem icon={Clock} label="Operating hours">
                    <p className="mt-2 text-sm font-medium leading-6 text-white/85">
                      {ORG_DETAILS.operatingHours}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-white/55">
                      {ORG_DETAILS.operatingNote}
                    </p>
                  </ContactItem>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="border-t border-white/10 pt-8 lg:border-t-0 lg:pt-0">
                {status === "success" ? (
                  <div
                    role="status"
                    className="flex min-h-[500px] flex-col items-center justify-center border border-white/10 px-8 py-16 text-center"
                  >
                    <CheckCircle2
                      className="h-14 w-14 text-[#4DDBDF]"
                      aria-hidden="true"
                    />

                    <h3 className="mt-7 text-3xl font-medium tracking-[-0.04em] text-white">
                      Message received.
                    </h3>

                    <p className="mt-4 max-w-md text-sm leading-7 text-white/65">
                      Thank you for reaching out to Ulwazi Learning Development.
                      Lumka Johannes or our team will get back to you shortly.
                    </p>

                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-8 cursor-pointer border-b border-[#4DDBDF] pb-1 text-xs font-medium uppercase tracking-[0.14em] text-[#4DDBDF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4DDBDF]"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form
                    action={ORG_DETAILS.contactFormUrl}
                    method="POST"
                    onSubmit={handleFormSubmit}
                    className="space-y-8"
                  >
                    <input type="hidden" name="_cc" value={ORG_DETAILS.formCc} />
                    <input
                      type="hidden"
                      name="_subject"
                      value="New Inquiry from Ulwazi Website"
                    />
                    {/* Honeypot: real visitors never see or fill this */}
                    <input
                      type="text"
                      name="_honey"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="hidden"
                    />

                    <div className="grid gap-8 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className={labelClass}>
                          Full name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          autoComplete="name"
                          placeholder="Your name"
                          className={fieldClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className={labelClass}>
                          Email address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          autoComplete="email"
                          placeholder="you@example.com"
                          className={fieldClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="interest" className={labelClass}>
                        How would you like to get involved?
                      </label>
                      <select
                        id="interest"
                        name="interest"
                        className={`${fieldClass} cursor-pointer bg-[#291B4F]`}
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
                      <label htmlFor="message" className={labelClass}>
                        Your message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        placeholder="Share your thoughts, questions, or how you would like to support..."
                        className={`${fieldClass} resize-none leading-7`}
                      />
                    </div>

                    {status === "error" && (
                      <div
                        role="alert"
                        className="flex items-start gap-3 border border-red-300/30 bg-red-300/[0.06] px-4 py-3 text-sm leading-6 text-red-100"
                      >
                        <AlertCircle
                          className="mt-0.5 h-4 w-4 shrink-0"
                          aria-hidden="true"
                        />
                        <p>
                          Your message didn&apos;t send. Check your connection
                          and try again, or email us directly at{" "}
                          <a
                            href={`mailto:${ORG_DETAILS.email}`}
                            className="underline"
                          >
                            {ORG_DETAILS.email}
                          </a>
                          .
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="btn-teal flex w-full cursor-pointer items-center justify-center gap-3 px-6 py-4 text-sm font-semibold uppercase tracking-[0.12em] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {status === "submitting" ? (
                        <>
                          <span>Sending…</span>
                          <Loader2
                            className="h-4 w-4 animate-spin"
                            aria-hidden="true"
                          />
                        </>
                      ) : (
                        <>
                          <span>Send message</span>
                          <Send className="h-4 w-4" aria-hidden="true" />
                        </>
                      )}
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