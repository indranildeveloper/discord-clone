"use client";

import { FC } from "react";
import { Plus } from "lucide-react";
import ActionTooltip from "../shared/ActionTooltip";
import { useModal } from "@/hooks/useModalStore";

const NavigationAction: FC = () => {
  const { onOpen } = useModal();

  return (
    <div>
      <ActionTooltip label="Create a server" side="right" align="center">
        <button
          className="group flex items-center"
          onClick={() => onOpen("createServer")}
        >
          <div className="mx-3 flex h-12 w-12 items-center justify-center overflow-hidden rounded-3xl bg-background transition-all group-hover:rounded-xl group-hover:bg-emerald-500 dark:bg-neutral-700">
            <Plus
              className="text-emerald-500 transition group-hover:text-white"
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};

export default NavigationAction;
