import { ReactNode } from "react";

export interface SocketContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socket: any | null;
  isConnected: boolean;
}

export interface SocketProviderProps {
  children: ReactNode;
}
