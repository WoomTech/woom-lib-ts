import { z } from "zod";
import { threadReportDetailsSchema, threadReportsSchema } from "./thread-reports.schema";

export const threadReportRequestSchema = threadReportDetailsSchema;

export const getThreadReportResponseSchema = threadReportsSchema;

export type ThreadReportRequestDTO = z.infer<typeof threadReportRequestSchema>;
