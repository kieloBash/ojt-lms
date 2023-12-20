import { z } from "zod";

export const fileSchema = z.object({
  name: z.string(),
  url: z.string(),
  type: z.string(),
  level: z.string().optional(),
});

export const materialsSchema = z.object({
  _id: z.string(),
  filename: z.string(),
  url: z.string(),
  classDate: z.date().optional(),
  gradeLevel: z.array(z.string()).optional(),
  type: z.string(),
  available: z.boolean(),
  createdAt: z.date().optional(),
});

export type FileType = z.infer<typeof fileSchema>;
export type MaterialType = z.infer<typeof materialsSchema>;
