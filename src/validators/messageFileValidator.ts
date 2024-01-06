import { z } from "zod";

export const MessageFileSchema = z.object({
  fileUrl: z.string().min(1, {
    message: "Attachment is required.",
  }),
});

export type MessageFilePayload = z.infer<typeof MessageFileSchema>;
