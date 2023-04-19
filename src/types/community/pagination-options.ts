import { z } from "zod";

export const paginationOptionsSchema = z.object({
  take: z.coerce.number().min(1).max(100),
  skip: z.coerce.number().min(0),
});

export type PaginationOptions = z.infer<typeof paginationOptionsSchema>;
