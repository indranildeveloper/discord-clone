import { ReactNode } from "react";

export interface ServeSearchProps {
  data: Array<{
    label: string;
    type: "channel" | "member";
    data:
      | Array<{
          id: string;
          icon: ReactNode;
          name: string;
        }>
      | undefined;
  }>;
}
