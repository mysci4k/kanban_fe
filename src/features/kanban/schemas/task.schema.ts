import z from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Task title is required")
    .max(254, "Task title must be at most 254 characters"),
  description: z
    .string()
    .max(2000, "Description must be at most 2000 characters"),
  tags: z
    .array(z.string().max(50, "Tag must be at most 50 characters"))
    .max(5, "A maximum of 5 tags are allowed"),
  columnId: z.uuidv7("Invalid column ID"),
});

export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Task title is required")
    .max(254, "Task title must be at most 254 characters"),
  description: z
    .string()
    .max(2000, "Description must be at most 2000 characters"),
  tags: z
    .array(z.string().max(50, "Tag must be at most 50 characters"))
    .max(5, "A maximum of 5 tags are allowed"),
});
