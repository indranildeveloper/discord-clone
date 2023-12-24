import { NextRequest, NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/currentProfile";
import { ChannelParams } from "@/interface/server/ChannelParamsInterface";

export async function PATCH(
  req: NextRequest,
  { params }: ChannelParams,
): Promise<NextResponse<unknown>> {
  try {
    const profile = await currentProfile();
    const { name, type } = await req.json();
    const { searchParams } = new URL(req.url);

    const serverId = searchParams.get("serverId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server ID Missing", { status: 400 });
    }

    if (!params.channelId) {
      return new NextResponse("Channel ID Missing", { status: 400 });
    }

    if (name === "general") {
      return new NextResponse("Name can not be 'general'", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          update: {
            where: {
              id: params.channelId,
              NOT: {
                name: "general",
              },
            },
            data: {
              name,
              type,
            },
          },
        },
      },
    });

    return NextResponse.json(server, { status: 200 });
  } catch (error) {
    console.log("[CHANNEL_ID_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: ChannelParams,
): Promise<NextResponse<unknown>> {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);

    const serverId = searchParams.get("serverId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server ID Missing", { status: 400 });
    }

    if (!params.channelId) {
      return new NextResponse("Channel ID Missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          delete: {
            id: params.channelId,
            name: {
              not: "general",
            },
          },
        },
      },
    });

    return NextResponse.json(server, { status: 200 });
  } catch (error) {
    console.log("[CHANNEL_ID_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
