"use client";

import { FC } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import ActionTooltip from "../shared/ActionTooltip";
import { NavigationItemProps } from "@/interface/components/NavigationItemProps";

const NavigationItem: FC<NavigationItemProps> = ({ id, name, imageUrl }) => {
  const params = useParams();
  const router = useRouter();

  const handleClick = (): void => {
    router.push(`/servers/${id}`);
  };

  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button
        className="group relative flex items-center"
        onClick={handleClick}
      >
        <div
          className={cn(
            "absolute left-0 w-1 rounded-r-full bg-primary transition-all",
            params?.serverId !== id && "group-hover:h-5",
            params?.serverId === id ? "h-9" : "h-2",
          )}
        />

        <div
          className={cn(
            "group relative mx-3 flex h-12 w-12 overflow-hidden rounded-3xl transition-all group-hover:rounded-xl",
            params?.serverId === id && "rounded-xl bg-primary/10 text-primary",
          )}
        >
          <Image src={imageUrl} fill alt={name} />
        </div>
      </button>
    </ActionTooltip>
  );
};

export default NavigationItem;
