import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { esES } from '@clerk/localizations'

import "../globals.css";

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
          <header className="flex justify-start w-full p-5 mb-14">
          <img src="/entropia.svg" alt="logo" className="w-32" />
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
