import { z } from "zod";
import { ProjectType } from "@prisma/client";

export const projectValidator = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(5).max(255),
  type: z.nativeEnum(ProjectType),
  url: z.string().url(),
  dateCreated: z.string().datetime().optional(),
});
