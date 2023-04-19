import { z } from "zod";

export const communityUserSchema = z.object({
  userId: z.string().min(1),
  nickname: z
    .string()
    .trim()
    .min(1)
    .max(15)
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: "Nickname can only contain letters, numbers and underscores and dashes",
    })
    .refine(nickname => !/[wW][oO0]{2}[mM]/.test(nickname.replaceAll(/[-_]/g, "")), {
      message: "Nickname cannot contain the string 'woom' or something similar",
    })
    .optional(),
  created: z.date(),
  // TODO: To prevent reusing the same nickname, we need to store the old nicknames
  // Maybe store date and time of change
  oldNicknames: z.array(z.string()),
  threads: z.array(z.string()),
  upvotedThreads: z.array(z.string()),
  followedThreads: z.array(z.string()),
  hiddenThreads: z.array(z.string()),
  hiddenUsers: z.array(z.string()),
  replies: z.array(
    z.object({
      threadId: z.string(),
      replyId: z.string(),
    }),
  ),
  ban: z
    .object({
      active: z.boolean(),
      bannedUntil: z.date(),
    })
    .optional(),
});

export type CommunityUser = z.infer<typeof communityUserSchema>;
