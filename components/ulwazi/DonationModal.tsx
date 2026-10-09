"use client";

import { useEffect, useId, useRef, type MouseEvent } from "react";
import { X, Heart, ShieldCheck, ExternalLink } from "lucide-react";
import { ORG_DETAILS, DONATION_TIERS } from "./content";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Tier amount chosen on the page, highlighted and sent to PayPal. */
  amount?: number;
}

export default function DonationModal({
  isOpen,
  onClose,
  amount,
}: DonationModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  // A native <dialog> opened with showModal() gives us, for free: a focus
  // trap, Escape to close, an inert background, and focus returning to the
  // button that opened it.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      submitRef.current?.focus();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  // Stop the page scrolling behind the modal.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  // Clicks on the backdrop land on the <dialog> element itself, because the
  // dialog has no padding and all content sits inside the inner wrapper.
  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={handleBackdropClick}
      className="
        m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto
        border border-white/10 bg-[#291B4F] p-0 text-[#F8F8F6] shadow-2xl
        opacity-0 translate-y-3 transition-[opacity,transform] duration-200
        open:translate-y-0 open:opacity-100
        starting:open:translate-y-3 starting:open:opacity-0
        motion-reduce:transition-none
        backdrop:bg-[#150D2B]/80 backdrop:backdrop-blur-sm
      "
    >
      <div className="relative p-6 sm:p-10">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close donation window"
          className="absolute right-3 top-3 flex h-11 w-11 cursor-pointer items-center justify-center text-white/60 transition-colors hover:text-[#4DDBDF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4DDBDF]"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Header */}
        <header className="pr-8">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#4DDBDF]">
            Support {ORG_DETAILS.name}
          </p>

          <h2
            id={titleId}
            className="mt-4 text-3xl font-medium leading-[1.05] tracking-[-0.04em] sm:text-4xl"
          >
            Give a child
            <br />a safe place.
          </h2>

          <p className="mt-5 text-sm leading-6 text-white/65">
            Your donation keeps Cape Town township children safe, educated and
            nourished during school holidays.
          </p>
        </header>

        {/* What a gift does */}
        <ul className="mt-8 border-t border-white/10">
          {DONATION_TIERS.map((tier) => {
            const isSelected = amount === tier.amount;

            return (
              <li
                key={tier.amount}
                aria-current={isSelected ? "true" : undefined}
                className={`grid grid-cols-[5.5rem_1fr] items-baseline gap-4 border-b border-white/10 px-3 py-4 ${
                  isSelected ? "bg-white/[0.045]" : ""
                }`}
              >
                <span
                  className={`text-lg font-medium tracking-[-0.03em] ${
                    isSelected ? "text-[#4DDBDF]" : "text-[#F8F8F6]"
                  }`}
                >
                  {tier.label}
                </span>

                <span className="text-sm leading-6 text-white/65">
                  {tier.desc}
                  {isSelected && (
                    <span className="ml-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[#4DDBDF]">
                      Your gift
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>

        {/* PayPal */}
        <form
          action={ORG_DETAILS.payPalUrl}
          method="post"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8"
        >
          <input
            type="hidden"
            name="hosted_button_id"
            value={ORG_DETAILS.payPalButtonId}
          />
          {amount !== undefined && (
            <input type="hidden" name="amount" value={amount} />
          )}

          <button
            ref={submitRef}
            type="submit"
            className="btn-teal flex w-full cursor-pointer items-center justify-center gap-3 px-6 py-4 text-sm font-semibold uppercase tracking-[0.12em]"
          >
            <Heart className="h-4 w-4 fill-current" aria-hidden="true" />
            <span>Continue to PayPal</span>
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </button>

          <p className="mt-3 text-center text-xs leading-5 text-white/55">
            You can confirm or change the amount on PayPal.
          </p>
        </form>

        <div className="mt-6 flex items-center justify-center gap-2 border-t border-white/10 pt-6 text-xs text-white/55">
          <ShieldCheck
            className="h-4 w-4 shrink-0 text-[#4DDBDF]"
            aria-hidden="true"
          />
          <span>Secure payment processed by PayPal</span>
        </div>
      </div>
    </dialog>
  );
}