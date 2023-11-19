import { FC } from "react";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Separator } from "../ui/Separator";
import { ScrollArea } from "../ui/ScrollArea";
import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import NavigationAction from "./NavigationAction";
import NavigationItem from "./NavigationItem";
import ToggleTheme from "../shared/ToggleTheme";

const NavigationSidebar: FC = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="flex h-full w-full flex-col items-center space-y-4 py-3 dark:bg-secondary">
      <NavigationAction />
      <Separator className="mx-auto h-0.5 w-10 bg-zinc-300 dark:bg-zinc-700" />
      <ScrollArea className="w-full flex-1">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="mt-auto flex flex-col items-center gap-y-4 pb-3">
        <ToggleTheme />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-12 w-12",
            },
          }}
        />
      </div>
    </div>
  );
};

export default NavigationSidebar;
