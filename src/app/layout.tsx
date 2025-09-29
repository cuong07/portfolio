import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ChatBot from "../components/ChatBot";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vo Manh Cuong | Full-Stack Developer & Blockchain Engineer",
  description:
    "Proficient in building RESTful APIs using Node.js, NestJS with TypeScript. Experienced in React, Angular, blockchain integration, and modern web technologies.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        {/* <ScrollProgress /> */}
        {/* <CustomCursor /> */}
        <ChatBot />
        {children}
      </body>
    </html>
  );
}
