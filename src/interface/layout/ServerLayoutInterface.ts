import { ReactNode } from "react";

export interface ServerLayoutProps {
  children: ReactNode;
  params: {
    serverId: string;
  };
}
