import { z } from "zod";
import { ChannelType } from "@prisma/client";

export const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Channel name is required.",
    })
    .refine((name) => name !== "general", {
      message: "Channel name can not be 'general'",
    }),
  type: z.nativeEnum(ChannelType),
});

export type formPayload = z.infer<typeof formSchema>;
