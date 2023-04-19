import { z } from "zod";

export enum UserReportReason {
  spam = "spam",
  offensive = "offensive",
  sharing_personal_information = "sharing_personal_information",
  inciting_violence = "inciting_violence",
}
export const userReportDetailsSchema = z.object({
  reporterUserId: z.string(),
  reportDate: z.date(),
  reportReason: z.nativeEnum(UserReportReason).optional(),
  reportText: z.string().optional(),
});

export const userReportsSchema = z.object({
  userId: z.string(),
  reports: z.array(userReportDetailsSchema),
  reportsCount: z.number(),
});

export type UserReports = z.infer<typeof userReportsSchema>;
export type UserReportDetails = z.infer<typeof userReportDetailsSchema>;
