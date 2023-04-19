import { z } from "zod";
import { paginationOptionsSchema } from "../pagination-options";
import { getVotesResponseSchema } from "../thread-votes";
import { threadSchema } from "./thread.schema";

export const createThreadRequestSchema = threadSchema
  .pick({
    threadId: true,
    authorId: true,
    title: true,
    content: true,
    categories: true,
    metadata: true,
  })
  .partial({ threadId: true });
export type CreateThreadRequestDTO = z.infer<typeof createThreadRequestSchema>;

export const updateThreadRequestSchema = threadSchema
  .pick({
    title: true,
    content: true,
    categories: true,
    closed: true,
    pinned: true,
  })
  .partial();
export type UpdateThreadRequestDTO = z.infer<typeof updateThreadRequestSchema>;

export const getThreadResponseSchema = threadSchema.extend({
  authorNickname: z.string(),
  followerCount: z.number().optional(),
  votes: getVotesResponseSchema.optional(),
});
export type GetThreadResponseDTO = z.infer<typeof getThreadResponseSchema>;

export const getThreadListResponseSchema = getThreadResponseSchema
  .omit({ votes: true })
  .array();
export type GetThreadListResponseDTO = z.infer<typeof getThreadListResponseSchema>;

export const getThreadsValidateRequestOptions = {
  query: paginationOptionsSchema.extend({
    search: z.string().trim().optional().default(""),
    sortBy: z.enum(["newest"]).optional().default("newest"),
    upvoted: z.coerce
      .string()
      .optional()
      .transform(v => v === "true")
      .pipe(z.boolean()),
    followed: z.coerce
      .string()
      .optional()
      .transform(v => v === "true")
      .pipe(z.boolean()),
    hidden: z
      .string()
      .optional()
      .transform(v => v === "true")
      .pipe(z.boolean()),
    myThreads: z
      .string()
      .optional()
      .transform(v => v === "true")
      .pipe(z.boolean()),
    categories: z
      .string()
      .transform(str => str.split(","))
      .pipe(z.array(z.string().min(1)).min(1))
      .optional(),
    author: z.string().optional(),
  }),
  headers: z.object({
    domain: z.string(),
    language: z.string(),
  }),
};

const getThreadsParamsSchema = getThreadsValidateRequestOptions.query.merge(
  getThreadsValidateRequestOptions.headers,
);
export type GetThreadsParams = z.infer<typeof getThreadsParamsSchema> & {
  userId: string;
};
