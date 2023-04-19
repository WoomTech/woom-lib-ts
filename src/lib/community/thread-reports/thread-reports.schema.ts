import { z } from "zod";

export enum ThreadReportReason {
  spam = "spam",
  offensive = "offensive",
  sharing_personal_information = "sharing_personal_information",
  inciting_violence = "inciting_violence",
}

export const threadReportDetailsSchema = z.object({
  reporterUserId: z.string(),
  reportDate: z.date(),
  reportReason: z.nativeEnum(ThreadReportReason).optional(),
  reportText: z.string().optional(),
});

export const threadReportsSchema = z.object({
  threadId: z.string(),
  replyId: z.string().optional(),
  reports: z.array(threadReportDetailsSchema),
  reportsCount: z.number(),
});

export type ThreadReports = z.infer<typeof threadReportsSchema>;
export type ThreadReportDetails = z.infer<typeof threadReportDetailsSchema>;
