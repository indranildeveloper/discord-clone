"use client";

import { FC, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QueryProviderProps } from "@/interface/components/QueryProviderProps";

const QueryProvider: FC<QueryProviderProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
