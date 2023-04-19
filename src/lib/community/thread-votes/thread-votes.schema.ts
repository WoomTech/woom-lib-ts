import { z } from "zod";

export const threadVotesSchema = z.object({
  threadId: z.string(),
  upvotes: z.array(z.string()),
  replyVotes: z.array(
    z.object({
      replyId: z.string(),
      upvotes: z.array(z.string()),
    }),
  ),
});

export type ThreadVotes = z.infer<typeof threadVotesSchema>;
