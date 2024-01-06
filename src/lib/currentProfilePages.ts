import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest } from "next";
import { db } from "./db";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const currentProfilePages = async (req: NextApiRequest) => {
  const { userId } = getAuth(req);

  if (!userId) return null;

  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  });

  return profile;
};
