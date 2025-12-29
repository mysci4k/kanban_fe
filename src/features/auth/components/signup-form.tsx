"use client";

import { ResendActivationDialog } from "@/features/auth/components/resend-activation-dialog";
import { Button } from "@/shared/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/shared/components/ui/input-group";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useState } from "react";
import { useRegister } from "../hooks/use-register";
import { signupSchema } from "../schemas/signup.schema";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const registerMutation = useRegister();

  const form = useForm({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      passwordConfirm: "",
    },
    validators: {
      onSubmit: signupSchema,
    },
    onSubmit: ({ value }) => {
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
            <h1 className="mb-1 text-xl font-semibold">Welcome to Kanblast!</h1>
            <p className="text-muted-foreground">
              Create an account to get started
            </p>
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
                          disabled={registerMutation.isPending}
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
                          disabled={registerMutation.isPending}
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
                        disabled={registerMutation.isPending}
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
                          disabled={registerMutation.isPending}
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
                          disabled={registerMutation.isPending}
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

            <Button
              type="submit"
              form="signupForm"
              className="w-full"
              disabled={registerMutation.isPending}
            >
              Create Account
            </Button>
          </div>
        </div>

        <div className="-space-y-1 text-center text-sm">
          <p className="text-accent-foreground">
            Already have an account?
            <Button variant="link" className="px-2">
              <Link href="/login">Sign In</Link>
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
