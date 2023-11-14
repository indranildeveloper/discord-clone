import { FC } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { RootLayoutProps } from "@/interface/layout/RootLayoutInterface";

import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Discord",
  description: "Best text and video chat application",
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
