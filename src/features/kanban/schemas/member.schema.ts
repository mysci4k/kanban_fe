import z from "zod";

export const addMemberSchema = z.object({
  boardId: z.uuidv7("Invalid board ID"),
  userId: z.uuidv7("Invalid user ID"),
});

export const updateMemberRoleSchema = z.object({
  boardId: z.uuidv7("Invalid board ID"),
  userId: z.uuidv7("Invalid user ID"),
  role: z.enum(["owner", "moderator", "member"], "Invalid role"),
});

export const removeMemberSchema = z.object({
  boardId: z.uuidv7("Invalid board ID"),
  userId: z.uuidv7("Invalid user ID"),
});
