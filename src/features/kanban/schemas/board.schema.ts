import z from "zod";

export const createBoardSchema = z.object({
  name: z
    .string()
    .min(1, "Board name is required")
    .max(100, "Board name must be at most 100 characters"),
  description: z
    .string()
    .max(500, "Description must be at most 500 characters"),
});

export const updateBoardSchema = z.object({
  name: z.string().max(100, "Board name must be at most 100 characters"),
  description: z
    .string()
    .max(500, "Description must be at most 500 characters"),
});
