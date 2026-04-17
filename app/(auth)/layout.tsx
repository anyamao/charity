import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "@/ui/Header";
import Footer from "@/ui/Footer";
import MainMenu from "@/ui/MainMenu";
import Link from "next/link";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" relative w-full h-full min-h-[1100px] max-w-[1100px] flex flex-col items-center p-[10px] flex-1">
      <div className="flex flex-row w-full items-end">
        <Link href="/" className="flex pointer flex-row items-center">
          <img src="/flowerch.png" className="w-[40px]" />
          <p className="text-pink-900 font-semibold ">РастиДобро</p>
        </Link>
      </div>

      <main className="flex-1 h-full min-h-[1100px] mt-[100px] pb-[250px] flex flex-col items-center justify-center  w-full">
        {children}
      </main>
      <img
        src="/background.jpg"
        className="fixed top-0 left-0 w-full object-cover  h-full -z-30"
      />
    </div>
  );
}
