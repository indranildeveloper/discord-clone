import { FC } from "react";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { cn } from "@/lib/utils";
import { ourFileRouter } from "./api/uploadthing/core";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { RootLayoutProps } from "@/interface/layout/RootLayoutInterface";
import ModalProvider from "@/components/providers/ModalProvider";
import SocketProvider from "@/components/providers/SocketProvider";

import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Discord",
  description: "Best text and video chat application",
};

const poppins = Poppins({
  weight: ["400", "600"],
  subsets: ["latin"],
});

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(poppins.className)}>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="next-discord-theme"
          >
            <SocketProvider>
              <ModalProvider />
              {children}
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
