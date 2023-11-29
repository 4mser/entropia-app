import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import "../globals.css";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Bottombar from "@/components/shared/Bottombar";
import RightSidebar from "@/components/shared/RightSidebar";
import Topbar from "@/components/shared/Topbar";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Entropia",
  description: "Explorers of adventure",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang='en'>
        <head>
          <meta property="og:image" content="https://app-valdi.s3.amazonaws.com/instagram-12.png" />
        </head>
        <body className={`${inter.className} xl:px-[8%] 2xl:px-[15%]` }>
          <Topbar />

          <main className='flex flex-row'>
            <LeftSidebar />
            <section className='main-container'>
              <div className='w-full max-w-4xl'>
                <Link href="https://demoentropia.vercel.app/" target="_blank">
                
                <div className="w-full h-11 flex justify-center items-center text-center bg-gradient-to-tr from-blue/80 to-green-600/80 hover:from-blue/100 hover:to-green-600/100 text-white">Visita nuestra nueva landpage -> </div>
                </Link>
                
                {children}
              </div>
            </section>
            {/* @ts-ignore */}
            <RightSidebar />
          </main>

          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
