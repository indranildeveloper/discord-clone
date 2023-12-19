"use client";

import { FC } from "react";
import { ServerHeaderProps } from "@/interface/components/ServerHeaderProps";
import { MemberRole } from "@prisma/client";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  TrashIcon,
  UserPlus,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import { useModal } from "@/hooks/useModalStore";

const ServerHeader: FC<ServerHeaderProps> = ({ server, role }) => {
  const { onOpen } = useModal();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        {/* TODO: Truncate the server name */}
        <button className="text-md flex h-12 w-full items-center border-b border-neutral-200 px-3 font-semibold transition hover:bg-zinc-700/10 dark:border-neutral-800 dark:hover:bg-zinc-700/50">
          {server.name}
          <ChevronDown className="ml-auto h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 space-y-1 text-sm font-medium text-black dark:text-neutral-400">
        {isModerator && (
          <DropdownMenuItem
            className="cursor-pointer px-3 py-2 text-sm"
            onClick={() => onOpen("invite", { server })}
          >
            Invite People
            <UserPlus className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            className="cursor-pointer px-3 py-2 text-sm"
            onClick={() => onOpen("editServer", { server })}
          >
            Server Settings
            <Settings className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            className="cursor-pointer px-3 py-2 text-sm"
            onClick={() => onOpen("members", { server })}
          >
            Manage Members
            <Users className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem
            className="cursor-pointer px-3 py-2 text-sm"
            onClick={() => onOpen("createChannel")}
          >
            Create Channel
            <PlusCircle className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm text-rose-500">
            Delete Server
            <TrashIcon className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem
            className="cursor-pointer px-3 py-2 text-sm text-rose-500"
            onClick={() => onOpen("leaveServer", { server })}
          >
            Leave Server
            <LogOut className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerHeader;
