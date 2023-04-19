import { z } from "zod";

import { richTextSchema } from "../rich-text-content";

export const threadSchema = z.object({
  threadId: z.string(),
  oldThreadId: z.string().optional(),
  authorId: z.string(),
  created: z.date(),
  modified: z.date().optional(),
  title: z.string().min(1).max(300),
  content: z.object({
    type: z.string(),
    data: richTextSchema,
  }),
  categories: z.array(z.string()).min(1),
  pinned: z.date().optional(),
  closed: z.date().optional(),
  deleted: z.date().optional(),
  replyCount: z.number(),
  replyAuthorIds: z.array(z.string()),
  metadata: z.object({
    language: z.string(),
    domain: z.string(),
    country: z.string().optional(),
    province: z.string().optional(),
  }),
});
export type Thread = z.infer<typeof threadSchema>;
