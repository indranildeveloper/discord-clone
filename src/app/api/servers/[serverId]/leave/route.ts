import { NextRequest, NextResponse } from "next/server";
import { ServerParams } from "@/interface/server/ServerParamsInterface";
import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";

export async function PATCH(
  req: NextRequest,
  { params }: ServerParams,
): Promise<NextResponse<unknown>> {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.serverId) {
      return new NextResponse("Server ID Missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: {
          not: profile.id,
        },
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id,
          },
        },
      },
    });

    return NextResponse.json(server, { status: 200 });
  } catch (error) {
    console.log("[SERVER_ID_LEAVE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
