import { FC } from "react";
import { ChatWelcomeProps } from "@/interface/components/ChatWelcomeProps";
import { Hash } from "lucide-react";

const ChatWelcome: FC<ChatWelcomeProps> = ({ type, name }) => {
  return (
    <div className="mb-4 space-y-2 px-4">
      {type === "channel" && (
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-500 dark:bg-zinc-700">
          <Hash className="h-12 w-12 text-white" />
        </div>
      )}
      <h2 className="text-xl font-bold md:text-3xl">
        {type === "channel" ? "Welcome to #" : ""}
        {name}
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {type === "channel"
          ? `This is the start of the #${name} channel.`
          : `This is the start of your conversation with ${name}.`}
      </p>
    </div>
  );
};

export default ChatWelcome;
