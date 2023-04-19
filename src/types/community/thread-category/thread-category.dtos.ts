import { z } from "zod";

export const threadCategoryResponseSchema = z.object({
  id: z.string(),
  text: z.string(),
});

export type ThreadCategoryResponseDTO = z.infer<typeof threadCategoryResponseSchema>;

export const addCategoryReuqestSchema = z.object({
  categoryKey: z.string(),
  name: z.object({
    en: z.string(),
    es: z.string(),
  }),
  active: z.boolean(),
  localizedKey: z.string(),
});

export type AddCategoryRequestDTO = z.infer<typeof addCategoryReuqestSchema>;