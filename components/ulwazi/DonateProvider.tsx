"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import DonationModal from "./DonationModal";

type DonateContextType = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const DonateContext = createContext<DonateContextType | null>(null);

export function DonateProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <DonateContext.Provider value={{ open, close, isOpen }}>
      {children}
      <DonationModal isOpen={isOpen} onClose={close} />
    </DonateContext.Provider>
  );
}

export function useDonate() {
  const context = useContext(DonateContext);
  if (!context) {
    throw new Error("useDonate must be used within a DonateProvider");
  }
  return context;
}
