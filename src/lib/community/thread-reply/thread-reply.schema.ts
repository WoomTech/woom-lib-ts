import { z } from "zod";
import { richTextSchema } from "../rich-text-content";

export const threadReplySchema = z.object({
  replyId: z.string(),
  threadId: z.string(),
  authorId: z.string(),
  parentId: z.string().optional(),
  created: z.date(),
  modified: z.date().optional(),
  content: z.object({
    type: z.string(),
    data: richTextSchema,
  }),
  deleted: z.date().optional(),
  pinned: z.date().optional(),
});

export type ThreadReply = z.infer<typeof threadReplySchema>;
