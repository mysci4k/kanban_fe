"use client";

import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import * as z from "zod";
import { authApi } from "../api/auth";

const formSchema = z.object({
  email: z.email("Invalid email format"),
});

export function ResendActivationDialog({
  buttonVariant = "default",
}: React.ComponentProps<typeof Button> & {
  buttonVariant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | "link";
}) {
  const resendMutation = useMutation({
    mutationFn: authApi.resendActivation,
    onSuccess: () => {
      toast.success("Activation email sent!", {
        description: "Please check your inbox for the activation link",
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Please try again";
      toast.error("Failed to resend activation email", {
        description: errorMessage,
      });
    },
  });

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      resendMutation.mutate({ email: value.email });
    },
  });

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant={buttonVariant} className="px-2">
            Resend Email
          </Button>
        }
      />
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Resend Activation Email</DialogTitle>
          <DialogDescription>
            Enter your email address to receive a new activation link.
          </DialogDescription>
        </DialogHeader>
        <form
          id="resendForm"
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
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
                    disabled={resendMutation.isPending}
                    type="email"
                    placeholder="Email"
                    autoComplete="off"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <DialogFooter>
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  disabled={resendMutation.isPending}
                >
                  Cancel
                </Button>
              }
            />
            <Button
              type="submit"
              form="resendForm"
              disabled={resendMutation.isPending}
            >
              Resend Email
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
