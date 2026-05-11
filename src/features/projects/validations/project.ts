import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(1, "Project name is required").max(50, "Project name is too long"),
  description: z.string().max(200, "Description is too long").optional(),
  templateId: z.string().optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

export const updateProjectSchema = z.object({
  name: z.string().min(1, "Project name is required").max(50, "Project name is too long").optional(),
  description: z.string().max(200, "Description is too long").optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
  published: z.boolean().optional(),
});

export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
