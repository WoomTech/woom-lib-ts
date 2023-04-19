import { z } from "zod";

import { communityUserSchema } from "./community-user.schema";

export const getCommunityUserResponseSchema = communityUserSchema.omit({ replies: true });

export const getCommunityUserDetailResponseSchema = communityUserSchema;

export const upsertCommunityUserRequestSchema = communityUserSchema
  .pick({
    nickname: true,
  })
  .partial();

export type UpsertCommunityUserRequestDTO = z.infer<
  typeof upsertCommunityUserRequestSchema
>;

export const hiddenUsersListResponseSchema = communityUserSchema
  .pick({
    hiddenUsers: true,
  })
  .partial();

export const hiddenThreadsListResponseSchema = communityUserSchema
  .pick({
    hiddenThreads: true,
  })
  .partial();
