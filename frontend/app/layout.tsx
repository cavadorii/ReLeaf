import type { Metadata } from "next";
import { Quicksand } from 'next/font/google'
import Link from 'next/link';
import localFont from "next/font/local";
import "./globals.css";
import { SidebarProvider, SidebarBody } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const quicksand = Quicksand({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "ReLeaf",
  description: "ReLeaf the world, one tree at a time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body
        className={`${quicksand.className} ${geistSans.variable} ${geistMono.variable}  antialiased`}
      >
          <div className="flex flex-row min-h-screen w-full">
            <AppSidebar/> {/* Adjust width as needed */}
            <div className="flex flex-col flex-1 justify-between items-center">
              <main className="flex-grow w-full">
                {children}
              </main>
            </div>
          </div>

      </body>
    </html>
  );
}
