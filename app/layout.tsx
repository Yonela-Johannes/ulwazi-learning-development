import type { Metadata } from "next";
import MotionProvider from "@/components/story/MotionProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ulwazilearningdevelopment.org"),

  title: {
    default: "Ulwazi Learning Development",
    template: "%s | Ulwazi Learning Development",
  },

  description:
    "Ulwazi Learning Development is a registered non-profit organisation in Cape Town dedicated to protecting, educating, and empowering vulnerable township children through holiday programmes and life skills.",

  keywords: [
    "Ulwazi Learning Development",
    "NGO South Africa",
    "Cape Town NGO",
    "Mfuleni",
    "Township Youth Development",
    "Lumka Johannes",
    "Holiday Programme",
    "Education Non Profit",
  ],

  openGraph: {
    title: "Ulwazi Learning Development",
    description:
      "Empowering vulnerable township children with life skills, safe sanctuary, and foundational education.",
    url: "https://www.ulwazilearningdevelopment.org/",
    siteName: "Ulwazi Learning Development",
    images: [
      {
        url: "/img/LOGO.png",
        width: 500,
        height: 500,
        alt: "Ulwazi Learning Development",
      },
    ],
    locale: "en_ZA",
    type: "website",
  },

  icons: {
    icon: "/img/LOGO.png",
    shortcut: "/img/LOGO.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
