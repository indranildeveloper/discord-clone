import { FC } from "react";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { RootLayoutProps } from "@/interface/layout/RootLayoutInterface";

import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Discord",
  description: "Best text and video chat application",
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
