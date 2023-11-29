import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { esES } from '@clerk/localizations'

import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth",
  description: "Registro Entropía",
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
