import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Haridas Ayurveda - Herbal Products & Natural Healing",
  description:
    "Authentic Ayurvedic medicines and herbal solutions from Haridas Ayurveda.",
  verification: {
    google: "xEjsgdO6gog7TEZIuEFwGo5bL0PVXtXS-udM1YE0zdY",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
