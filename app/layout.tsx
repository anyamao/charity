import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// ✅ Only import Header/Footer if you actually use them globally
// import Header from "@/ui/Header";
// import Footer from "@/ui/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "rastimdobro",
  description: "Добро растёт здесь",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning // ✅ Prevents hydration warnings from browser extensions
    >
      {/* ✅ Use min-h-screen, remove centering — let child pages control their own layout */}
      <body className="min-h-[1100px] bg-gray-100 w-full font-sans">
        {/* ✅ Render Header/Footer here ONLY if they should appear on EVERY page */}
        {/* <Header /> */}

        {children}

        {/* <Footer /> */}
      </body>
    </html>
  );
}
