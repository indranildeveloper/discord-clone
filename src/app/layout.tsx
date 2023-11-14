import { FC } from "react";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { RootLayoutProps } from "@/interface/layout/RootLayoutInterface";

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
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="next-discord-theme"
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
