import * as z from "zod";

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(50, "Password must be at most 50 characters long")
      .regex(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@, $, !, %, *, ?, &)",
      )
      .nonempty("Password is required"),
    newPasswordConfirm: z
      .string()
      .nonempty("Password confirmation is required"),
  })
  .superRefine(({ newPassword, newPasswordConfirm }, ctx) => {
    if (newPassword !== newPasswordConfirm) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["newPasswordConfirm"],
      });
    }
  });
