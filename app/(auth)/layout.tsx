import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { esES } from '@clerk/localizations'

import "../globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Entropía",
  description: "Explorers of adventure",

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      localization={esES}
      appearance={{
        baseTheme: dark,

      }}
    >
      <html lang='es'>
      <head>
        <meta property="og:image" content="https://app-valdi.s3.amazonaws.com/instagram-12.png" />
      </head>
        <body className={`${inter.className}  w-full  bg-dark-1 flex flex-col  items-center `}>
          <header className="flex justify-between items-center w-full p-5 mb-8 md:px-[10%] xl:px-[15%]">
            <img src="/entropia.svg" alt="logo" className="w-28" />
            <Link href="https://demoentropia.vercel.app/" target="_blank" className="bg-gradient-to-tr group from-blue to-green-700 h-9 rounded-full flex items-center justify-center p-px">
              <div className="bg-dark-1 rounded-full group-hover:bg-opacity-60 h-full w-full flex justify-center items-center text-center text-white px-3 gap-1">
                Ver landpage (old) <span className="group-hover:translate-x-1 transition">{'->'}</span>
              </div>
            </Link>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
