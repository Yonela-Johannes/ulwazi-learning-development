"use client";

import { X, Heart, ShieldCheck, ExternalLink } from "lucide-react";
import { ORG_DETAILS, DONATION_TIERS } from "./content";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DonationModal({ isOpen, onClose }: DonationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#151515]/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#151515] text-[#F5F2EA] p-6 sm:p-8 border border-[#B9915A]/40 shadow-2xl space-y-6">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#F5F2EA]/70 hover:text-[#B9915A] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 pt-2">
          <span className="text-[10px] font-mono tracking-widest text-[#B9915A] uppercase block">
            SUPPORT {ORG_DETAILS.name.toUpperCase()}
          </span>
          <h3 className="text-2xl font-bold uppercase font-sans text-[#F5F2EA]">
            Transform a Child&apos;s Life
          </h3>
          <p className="text-xs text-[#F5F2EA]/75">
            Your donation keeps Cape Town township children safe, educated, and nourished during school holidays.
          </p>
        </div>

        {/* Impact Highlights */}
        <div className="space-y-2.5 text-xs text-[#F5F2EA]/80 bg-[#F5F2EA]/5 p-4 border border-[#F5F2EA]/10 font-mono">
          {DONATION_TIERS.map((tier) => (
            <div key={tier.amount} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B9915A] shrink-0" />
              <span><strong>{tier.label}:</strong> {tier.desc}</span>
            </div>
          ))}
        </div>

        {/* PayPal Action Form */}
        <form action={ORG_DETAILS.payPalUrl} method="post" target="_top">
          <input type="hidden" name="hosted_button_id" value={ORG_DETAILS.payPalButtonId} />
          <button
            type="submit"
            className="w-full btn-warm py-4 rounded-full text-xs font-mono font-bold tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <Heart className="w-4 h-4 fill-[#151515]" />
            <span>PROCEED TO PAYPAL DONATION</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </form>

        {/* Footer info */}
        <div className="text-center flex items-center justify-center gap-2 text-[11px] text-[#77736B] font-mono pt-1">
          <ShieldCheck className="w-4 h-4 text-[#B9915A]" />
          <span>Secure transaction processed by PayPal</span>
        </div>
      </div>
    </div>
  );
}
