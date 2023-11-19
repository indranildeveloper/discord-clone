import { Member, Profile, Server } from "@prisma/client";

export type ServerWithMembersWithProfile = Server & {
  members: Array<Member & { profile: Profile }>;
};
