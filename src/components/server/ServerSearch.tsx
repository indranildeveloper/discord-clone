"use client";

import { FC } from "react";
import { Command, Search } from "lucide-react";
import { ServeSearchProps } from "@/interface/components/ServerSearchProps";

const ServerSearch: FC<ServeSearchProps> = ({ data }) => {
  return (
    <>
      <button className="group flex w-full items-center gap-x-2 rounded-md px-2 py-2 transition hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50">
        <Search className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
        <p className="text-sm font-semibold text-zinc-500 transition group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300">
          Search
        </p>
        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground">
          <span className="text-xs">
            <Command className="h-3 w-3" />
          </span>
          K
        </kbd>
      </button>
    </>
  );
};

export default ServerSearch;
