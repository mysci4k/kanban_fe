"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { authApi } from "@/lib/api/auth";
import { IconCircleX, IconEye, IconEyeOff } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z
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

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const userId = searchParams.get("userId");
  const token = searchParams.get("token");

  const resetMutation = useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: () => {
      toast.success("Password reset successfully!", {
        description: "You can now log in with your new password",
      });
      setTimeout(() => {
        router.push("/login");
      }, 15000);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Please try again";
      toast.error("Password reset failed", {
        description: errorMessage,
      });
    },
  });

  const form = useForm({
    defaultValues: {
      newPassword: "",
      newPasswordConfirm: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      if (!userId || !token) {
        toast.error("Invalid reset link", {
          description: "The reset link is invalid or incomplet.",
        });
        return;
      }

      resetMutation.mutate({
        userId,
        resetToken: token,
        newPassword: value.newPassword,
      });
    },
  });

  if (!userId || !token) {
    return (
      <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16 md:py-32">
        <div className="w-full max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <IconCircleX className="text-destructive h-16 w-16" />
          </div>
          <h1 className="mb-2 text-2xl font-semibold">Invalid Reset Link</h1>
          <p className="text-muted-foreground mb-6">
            The password reset link is invalid or incomplete. Please check your
            email for the correct link.
          </p>
          <Link
            href="/login"
            className={buttonVariants({ variant: "default" })}
          >
            Go to Login
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="flex min-h-[calc(100vh-4rem)] px-4 py-16 md:py-32">
      <form
        id="resetForm"
        className="m-auto h-fit w-full max-w-92"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="p-6">
          <div className="mb-6 text-center">
            <h1 className="mb-1 text-xl font-semibold">Reset Your Password</h1>
            <p className="text-muted-foreground">
              Enter your new password below
            </p>
          </div>

          <div className="space-y-6">
            <FieldGroup>
              <form.Field name="newPassword">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel>New Password</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          disabled={resetMutation.isPending}
                          type={showPassword ? "text" : "password"}
                          placeholder="New Password"
                          autoComplete="off"
                        />
                        <InputGroupAddon align="inline-end">
                          <InputGroupButton
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? <IconEyeOff /> : <IconEye />}
                          </InputGroupButton>
                        </InputGroupAddon>
                      </InputGroup>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
              <form.Field name="newPasswordConfirm">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel>Password Confirm</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          disabled={resetMutation.isPending}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Password Confrim"
                          autoComplete="off"
                        />
                        <InputGroupAddon align="inline-end">
                          <InputGroupButton
                            onClick={() =>
                              setShowConfirmPassword((prev) => !prev)
                            }
                          >
                            {showConfirmPassword ? <IconEyeOff /> : <IconEye />}
                          </InputGroupButton>
                        </InputGroupAddon>
                      </InputGroup>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </FieldGroup>

            <Button
              type="submit"
              form="resetForm"
              className="w-full"
              disabled={resetMutation.isPending}
            >
              Reset Password
            </Button>
          </div>
        </div>

        <p className="text-accent-foreground text-center text-sm">
          Remember your password?
          <Button variant="link" className="px-2">
            <Link href="/login">Sign In</Link>
          </Button>
        </p>
      </form>
    </section>
  );
}
