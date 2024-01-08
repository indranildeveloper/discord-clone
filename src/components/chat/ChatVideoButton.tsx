"use client";

import { FC } from "react";
import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ActionTooltip from "../shared/ActionTooltip";
import { Video, VideoOff } from "lucide-react";

const ChatVideoButton: FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isVideo = searchParams?.get("video");

  const Icon = isVideo ? VideoOff : Video;
  const tooltipLabel = isVideo ? "End Video Call" : "Start Video Call";

  const handleClick = (): void => {
    const url = qs.stringifyUrl(
      {
        url: pathname ?? "",
        query: {
          video: isVideo ? undefined : true,
        },
      },
      { skipNull: true },
    );

    router.push(url);
  };

  return (
    <ActionTooltip side="bottom" label={tooltipLabel}>
      <button
        onClick={handleClick}
        className="mr-4 transition hover:opacity-75"
      >
        <Icon className="h-6 w-6 text-zinc-500 dark:text-zinc-400 " />
      </button>
    </ActionTooltip>
  );
};

export default ChatVideoButton;
