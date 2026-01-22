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
    .string()
    .refine(
      (value) => {
        if (!value.trim()) return true;
        const tags = value
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
        return tags.length <= 5;
      },
      { message: "A maximum of 5 tags are allowed" },
    )
    .refine(
      (value) => {
        if (!value.trim()) return true;
        const tags = value
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
        return tags.every((tag) => tag.length <= 50);
      },
      { message: "Each tag must be at most 50 characters" },
    ),
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
    .string()
    .refine(
      (value) => {
        if (!value.trim()) return true;
        const tags = value
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
        return tags.length <= 5;
      },
      { message: "A maximum of 5 tags are allowed" },
    )
    .refine(
      (value) => {
        if (!value.trim()) return true;
        const tags = value
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
        return tags.every((tag) => tag.length <= 50);
      },
      { message: "Each tag must be at most 50 characters" },
    ),
});
