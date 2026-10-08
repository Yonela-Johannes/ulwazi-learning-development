import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import MotionProvider from "@/components/story/MotionProvider";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ulwazilearningdevelopment.org"),

  title: {
    default: "Ulwazi Learning Development",
    template: "%s | Ulwazi Learning Development",
  },

  description:
    "Ulwazi Learning Development is a registered non-profit organisation in South Africa working to educate, support, and empower children and young people in townships, villages, and underserved communities.",

  keywords: [
    "Ulwazi Learning Development",
    "NGO South Africa",
    "South African nonprofit",
    "Child development South Africa",
    "Children's education South Africa",
    "Township youth development",
    "Village youth development",
    "Community development South Africa",
    "Youth empowerment",
    "Child education",
    "Life skills",
    "Holiday programmes",
    "Education nonprofit",
  ],

  openGraph: {
    title: "Ulwazi Learning Development",
    description:
      "Creating opportunities for children and young people across South Africa through education, life skills, support, and community development.",
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
    <html lang="en" className={nunito.variable}>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}