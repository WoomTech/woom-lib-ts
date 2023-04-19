import { z } from "zod";

export const localizableField = z.object({
  en: z.string().optional(),
  es: z.string().optional(),
});

export const threadCategory = z.object({
  name: localizableField,
  active: z.boolean(),
  categoryKey: z.string(),
  localizedKey: z.string(),
});

export const threadCategories = z.object({
  domain: z.string(),
  categories: z.array(threadCategory),
});

export type LocalizableField = z.infer<typeof localizableField>;

export type ThreadCategory = z.infer<typeof threadCategory>;

export type ThreadCategories = z.infer<typeof threadCategories>;
