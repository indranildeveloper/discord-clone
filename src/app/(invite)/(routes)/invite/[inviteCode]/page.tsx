import { FC } from "react";

import { redirect } from "next/navigation";
import { RedirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/currentProfile";
import { InvitePageProps } from "@/interface/pages/InvitePageProps";

const InvitePage: FC<InvitePageProps> = async ({ params }) => {
  const profile = await currentProfile();

  // TODO: Join the server after new account created user in user
  if (!profile) {
    return <RedirectToSignIn />;
  }

  if (!params.inviteCode) {
    return redirect("/");
  }

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return null;
};

export default InvitePage;
