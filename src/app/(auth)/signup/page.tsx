"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { authApi } from "@/lib/api/auth";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z
  .object({
    email: z.email("Invalid email format"),
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(50, "Password must be at most 50 characters long")
      .regex(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@, $, !, %, *, ?, &)",
      )
      .nonempty("Password is required"),
    passwordConfirm: z.string().nonempty("Password confirmation is required"),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["passwordConfirm"],
      });
    }
  });

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: () => {
      toast.success("Account created successfully!", {
        description: "Please check your email to activate your account",
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Please try again";
      toast.error("Registartion failed", {
        description: errorMessage,
      });
    },
  });

  const form = useForm({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      passwordConfirm: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordConfirm, ...registerData } = value;
      registerMutation.mutate(registerData);
    },
  });

  return (
    <section className="flex min-h-[calc(100vh-4rem)] px-4 py-16 md:py-32">
      <form
        id="signupForm"
        className="m-auto h-fit w-full max-w-92"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="p-6">
          <div className="mb-6 text-center">
            <h1 className="mb-1 text-xl font-semibold">Welcome to Kanblast</h1>
            <p>Create an account to get started</p>
          </div>

          <div className="space-y-6">
            <FieldGroup>
              <div className="flex gap-4">
                <form.Field name="firstName">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel>First Name</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          type="text"
                          placeholder="First Name"
                          autoComplete="off"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>
                <form.Field name="lastName">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel>Last Name</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          type="text"
                          placeholder="Last Name"
                          autoComplete="off"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>
              </div>
              <form.Field name="email">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel>Email</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        type="email"
                        placeholder="Email"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
              <form.Field name="password">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel>Password</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
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
              <form.Field name="passwordConfirm">
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
                          type={showPasswordConfirm ? "text" : "password"}
                          placeholder="Password Confirm"
                          autoComplete="off"
                        />
                        <InputGroupAddon align="inline-end">
                          <InputGroupButton
                            onClick={() =>
                              setShowPasswordConfirm((prev) => !prev)
                            }
                          >
                            {showPasswordConfirm ? <IconEyeOff /> : <IconEye />}
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

            <Button type="submit" form="signupForm" className="w-full">
              Create Account
            </Button>
          </div>
        </div>

        <p className="text-accent-foreground text-center text-sm">
          Already have an account ?
          <Button variant="link" className="px-2">
            <Link href="/login">Sign In</Link>
          </Button>
        </p>
      </form>
    </section>
  );
}
