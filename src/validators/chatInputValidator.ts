import { z } from "zod";

export const ChatInputSchema = z.object({
  content: z.string().min(1),
});

export type ChatInputPayload = z.infer<typeof ChatInputSchema>;
