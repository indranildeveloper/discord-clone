import { FC } from "react";
import { ChannelType } from "@prisma/client";
import { ServerSidebarProps } from "@/interface/components/ServerSidebarProps";
import { currentProfile } from "@/lib/currentProfile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import ServerHeader from "./ServerHeader";

const ServerSidebar: FC<ServerSidebarProps> = async ({ serverId }) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }
  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  /* eslint-disable */
  const textChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT,
  );
  const audioChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO,
  );
  const videoChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO,
  );

  const members = server?.members.filter(
    (member) => member.profileId !== profile.id,
  );
  /* eslint-enable */

  if (!server) {
    return redirect("/");
  }

  const role = server.members.find((member) => member.profileId === profile.id)
    ?.role;

  return (
    <div className="flex h-full w-full flex-col bg-gray-100 dark:bg-slate-900">
      <ServerHeader server={server} role={role} />
    </div>
  );
};

export default ServerSidebar;
