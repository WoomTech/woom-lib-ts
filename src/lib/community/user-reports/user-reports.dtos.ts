import { z } from "zod";
import { userReportDetailsSchema, userReportsSchema } from "./user-reports.schema";

export const userReportRequestSchema = userReportDetailsSchema;

export const getUserReportResponseSchema = userReportsSchema;

export type UserReportRequestDTO = z.infer<typeof userReportRequestSchema>;
