import { FC } from "react";
import { Hash } from "lucide-react";
import { ChatHeaderProps } from "@/interface/components/ChatHeaderProps";
import MobileToggle from "../shared/MobileToggle";
import UserAvatar from "../shared/UserAvatar";
import SocketIndicator from "../shared/SocketIndicator";
import ChatVideoButton from "./ChatVideoButton";

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
      {type === "conversation" && (
        <UserAvatar src={imageUrl} className="mr-2 h-8 w-8" />
      )}
      <p className="text-md font-semibold text-black dark:text-white">{name}</p>
      <div className="ml-auto flex items-center">
        {type === "conversation" && <ChatVideoButton />}
        <SocketIndicator />
      </div>
    </div>
  );
};

export default ChatHeader;
