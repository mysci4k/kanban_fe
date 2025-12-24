"use client";

import { ResendActivationDialog } from "@/components/auth/resend-activation-dialog";
import { buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { authApi } from "@/lib/api/auth";
import { IconCircleCheck, IconCircleX } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ActivatePage() {
  const activationAttempted = useRef(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const userId = searchParams.get("userId");
  const token = searchParams.get("token");

  const activateMutation = useMutation({
    mutationFn: ({ userId, token }: { userId: string; token: string }) =>
      authApi.activate({ userId, activationToken: token }),
    onSuccess: () => {
      setTimeout(() => {
        router.push("/login");
      }, 15000);
    },
  });

  useEffect(() => {
    if (userId && token && !activationAttempted.current) {
      activationAttempted.current = true;
      activateMutation.mutate({ userId, token });
    }
  }, [userId, token, activateMutation]);

  if (!userId || !token) {
    return (
      <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16 md:py-32">
        <div className="w-full max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <IconCircleX className="text-destructive h-16 w-16" />
          </div>
          <h1 className="mb-2 text-2xl font-semibold">
            Invalid Activation Link
          </h1>
          <p className="text-muted-foreground mb-6">
            The activation link is invalid or incomplete. Please check your
            email for the correct link.
          </p>
          <div className="flex flex-col gap-4">
            <ResendActivationDialog />
            <Link
              href="/login"
              className={buttonVariants({ variant: "outline" })}
            >
              Go to Login
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (activateMutation.isPending) {
    return (
      <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16 md:py-32">
        <div className="w-full max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <Spinner className="text-primary size-16" />
          </div>
          <h1 className="mb-2 text-2xl font-semibold">
            Activating Your Account
          </h1>
          <p className="text-muted-foreground">
            Please wait while we activate your account...
          </p>
        </div>
      </section>
    );
  }

  if (activateMutation.isError) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const error = activateMutation.error as any;
    const errorMessage =
      error.response?.data?.message || "Failed to activate account.";

    return (
      <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16 md:py-32">
        <div className="w-full max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <IconCircleX className="text-destructive h-16 w-16" />
          </div>
          <h1 className="mb-2 text-2xl font-semibold">Activation Failed</h1>
          <p className="text-muted-foreground mb-6">{errorMessage}</p>
          <div className="flex flex-col gap-4">
            <ResendActivationDialog />
            <Link
              href="/login"
              className={buttonVariants({ variant: "outline" })}
            >
              Go to Login
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (activateMutation.isSuccess) {
    return (
      <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16 md:py-32">
        <div className="w-full max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <IconCircleCheck className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="mb-2 text-2xl font-semibold">Account Activated!</h1>
          <p className="text-muted-foreground mb-6">
            Your account has been successfully activated. You will be redirected
            to the login page in a moment.
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

  return null;
}
