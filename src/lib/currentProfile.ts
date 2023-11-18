import { auth } from "@clerk/nextjs";
import { db } from "./db";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const currentProfile = async () => {
  const { userId } = auth();

  if (!userId) return null;

  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  });

  return profile;
};
