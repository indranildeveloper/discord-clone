import { ChannelType, MemberRole } from "@prisma/client";
import { ServerWithMembersWithProfile } from "@/types/server";

export interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfile;
}
