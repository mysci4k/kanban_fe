"use client";

import { ForgotPasswordDialog } from "@/components/auth/forgot-password-dialog";
import { ResendActivationDialog } from "@/components/auth/resend-activation-dialog";
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

const formSchema = z.object({
  email: z.email("Invalid email format"),
  password: z.string().nonempty("Password is required"),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: () => {
      toast.success("Logged in successfully!", {
        description: "Welcome back",
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Please try again";
      toast.error("Login failed", {
        description: errorMessage,
      });
    },
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      loginMutation.mutate(value);
    },
  });

  return (
    <section className="flex min-h-[calc(100vh-4rem)] px-4 py-16 md:py-32">
      <form
        id="loginForm"
        className="m-auto h-fit w-full max-w-92"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="p-6">
          <div className="mb-6 text-center">
            <h1 className="mb-1 text-xl font-semibold">Welcome back!</h1>
            <p className="text-muted-foreground">
              Login to your Kanblast account
            </p>
          </div>

          <div className="space-y-6">
            <FieldGroup>
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
                        disabled={loginMutation.isPending}
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
                      <div className="flex justify-between">
                        <FieldLabel>Password</FieldLabel>
                        <ForgotPasswordDialog />
                      </div>
                      <InputGroup>
                        <InputGroupInput
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          disabled={loginMutation.isPending}
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
            </FieldGroup>

            <Button
              type="submit"
              form="loginForm"
              className="w-full"
              disabled={loginMutation.isPending}
            >
              Login
            </Button>
          </div>
        </div>

        <div className="-space-y-1 text-center text-sm">
          <p className="text-accent-foreground">
            Don&apos;t have an account?
            <Button variant="link" className="px-2">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </p>
          <p className="text-accent-foreground">
            Didn&apos;t receive an activation email?
            <ResendActivationDialog buttonVariant="link" />
          </p>
        </div>
      </form>
    </section>
  );
}
