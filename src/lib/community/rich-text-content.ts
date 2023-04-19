import { z } from "zod";

// Text type
const textSchema = z.object({
  text: z.string(),
  bold: z.boolean().optional(),
  italic: z.boolean().optional(),
  underline: z.boolean().optional(),
  strike: z.boolean().optional(),
});

const childrenSchema = z.lazy(() => elementSchema.or(textSchema).array());

// Element types
const paragraphElementBaseSchema = z.object({
  type: z.literal("paragraph"),
  children: childrenSchema,
});
type ParagraphElementBase = z.infer<typeof paragraphElementBaseSchema>;

const headingElementBaseSchema = z.object({
  type: z.literal("heading"),
  level: z.number().int().min(1).max(3),
  children: childrenSchema
});
type HeadingElementBase = z.infer<typeof headingElementBaseSchema>;

const linkElementBaseSchema = z.object({
  type: z.literal("link"),
  url: z.string().url(),
  children: childrenSchema
});
export type LinkElementBase = z.infer<typeof linkElementBaseSchema>;

export type Element = (ParagraphElementBase | HeadingElementBase | LinkElementBase) & {
  readonly children: readonly Node[];
};

// const elementSchema: z.ZodType<Element> = z.discriminatedUnion("type", [
//   paragraphElementBaseSchema.extend({  }),
//   headingElementBaseSchema.extend({  }),
//   linkElementBaseSchema.extend({ children: childrenSchema }),
// ]);

const elementSchema = z.union([paragraphElementBaseSchema, headingElementBaseSchema, linkElementBaseSchema]);

const nodeSchema = elementSchema.or(textSchema);
export type Node = z.infer<typeof nodeSchema>;

export const richTextSchema = z.object({
  children: nodeSchema.array(),
});
export type RichText = z.infer<typeof richTextSchema>;

// TODO: Add support for:
// bullet list, ordered list, code block, quote block, table, image, video
// Which should be available in replies and which in the main content?
