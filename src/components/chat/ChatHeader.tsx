import { FC } from "react";
import { Hash } from "lucide-react";
import { ChatHeaderProps } from "@/interface/components/ChatHeaderProps";
import MobileToggle from "../shared/MobileToggle";

const ChatHeader: FC<ChatHeaderProps> = ({
  serverId,
  name,
  type,
  imageUrl,
}) => {
  return (
    <div className="text-md flex h-12 items-center border-b border-neutral-200 px-3 font-semibold dark:border-neutral-600">
      <MobileToggle serverId={serverId} />
      {type === "channel" && (
        <Hash className="dark:text-zinc-4 mr-2 h-5 w-5 text-zinc-500" />
      )}
      <p className="text-md font-semibold text-black dark:text-white">{name}</p>
    </div>
  );
};

export default ChatHeader;
