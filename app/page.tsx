import type { Metadata } from "next";
import ChapterNav, { type StoryChapter } from "@/components/story/ChapterNav";
import { DonateProvider } from "@/components/ulwazi/DonateProvider";
import StoryNav from "@/components/ulwazi/StoryNav";
import StoryFooter from "@/components/ulwazi/StoryFooter";

import UlwaziHero from "@/components/ulwazi/UlwaziHero";
import FounderStory from "@/components/ulwazi/FounderStory";
import ImpactStory from "@/components/ulwazi/ImpactStory";
import CommunityStory from "@/components/ulwazi/CommunityStory";
import SupportStory from "@/components/ulwazi/SupportStory";

export const metadata: Metadata = {
  title: "Ulwazi Learning Development | Township Youth",
  description:
    "Ulwazi Learning Development is a registered non-profit organisation in dedicated to protecting, educating, and empowering vulnerable township children through holiday programmes and life skills.",
};

const chapters: StoryChapter[] = [
  { id: "beginning", label: "The Beginning" },
  { id: "lumka", label: "Lumka" },
  { id: "ulwazi", label: "The Work" },
  { id: "community", label: "Community" },
  { id: "support", label: "Support" },
];

export default function Home() {
  return (
    <DonateProvider>
      <main className="min-h-screen overflow-x-clip bg-[#F5F2EA] text-[#151515]">
        <StoryNav />

        <ChapterNav chapters={chapters} />

        <UlwaziHero />
        <FounderStory />
        <ImpactStory />
        <CommunityStory />
        <SupportStory />

        <StoryFooter />
      </main>
    </DonateProvider>
  );
}
