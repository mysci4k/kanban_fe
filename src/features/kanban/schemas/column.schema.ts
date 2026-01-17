import z from "zod";

export const createColumnSchema = z.object({
  name: z
    .string()
    .min(1, "Column name is required")
    .max(100, "Column name must be at most 100 characters"),
  boardId: z.uuidv7("Invalid board ID"),
});

export const updateColumnSchema = z.object({
  name: z
    .string()
    .min(1, "Column name is required")
    .max(100, "Column name must be at most 100 characters"),
});
