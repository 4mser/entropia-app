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
import ButtonLandpage from "@/components/ui/button-landpage";
import CreatePost from "@/components/shared/CreatePost";
import PostearPc from "@/components/shared/PostearPc";


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
          {/* <Topbar /> */}

          <main className='flex flex-row'> 
            <LeftSidebar />
            <section className='main-container'>
              <div className='w-full max-w-4xl relative'>
                {/* <PostearPc /> */}
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
