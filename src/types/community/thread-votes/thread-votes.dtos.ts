import { z } from "zod";
import { threadVotesSchema } from "./thread-votes.schema";

export const getVotesResponseSchema = threadVotesSchema
  .pick({
    threadId: true,
  })
  .extend({
    upvoted: z.boolean(),
    upvotesCount: z.number(),
    replyVotes: z.array(
      z.object({
        replyId: z.string(),
        upvoted: z.boolean(),
        upvotesCount: z.number(),
      }),
    ),
  });

export type GetVotesResponseDTO = z.infer<typeof getVotesResponseSchema>;
