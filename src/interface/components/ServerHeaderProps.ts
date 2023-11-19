import { MemberRole } from "@prisma/client";
import { ServerWithMembersWithProfile } from "@/types/server";

export interface ServerHeaderProps {
  server: ServerWithMembersWithProfile;
  role?: MemberRole;
}
