import { z } from "zod";

export const threadFollows = z.object({
  threadId: z.string(),
  followers: z.array(z.string()),
});

export type ThreadFollows = z.infer<typeof threadFollows>;
