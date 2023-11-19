import { ReactNode } from "react";

export interface ActionTooltipProps {
  children: ReactNode;
  label: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}
