import { z } from "zod";
import { threadReplySchema } from "./thread-reply.schema";

export const createReplyRequestSchema = threadReplySchema
  .pick({
    replyId: true,
    threadId: true,
    authorId: true,
    parentId: true,
    content: true,
  })
  .partial({ replyId: true });
export type CreateReplyRequestDTO = z.infer<typeof createReplyRequestSchema>;

const baseGetReplyResponseSchema = threadReplySchema.extend({
  authorNickname: z.string(),
  replyCount: z.number().default(0).optional(),
});
export type GetReplyResponseDTO = z.infer<typeof baseGetReplyResponseSchema> & {
  replies?: GetReplyResponseDTO[];
};

export const getReplyResponseSchema: z.ZodType<GetReplyResponseDTO> =
  baseGetReplyResponseSchema.extend({
    replies: z.lazy(() => z.array(getReplyResponseSchema).optional()),
  });

export const updateReplyRequestSchema = threadReplySchema.pick({
  content: true,
  pinned: true,
});
export type UpdateReplyRequestDTO = z.infer<typeof updateReplyRequestSchema>;
