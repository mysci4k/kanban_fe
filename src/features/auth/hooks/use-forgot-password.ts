import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authApi } from "../api/auth";

export function useForgotPassword() {
  return useMutation({
    mutationFn: authApi.forgotPassword,
    onSuccess: () => {
      toast.success("Password reset email sent!", {
        description: "Please check your inbox for the password reset link",
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Please try again";
      toast.error("Failed to send password reset email", {
        description: errorMessage,
      });
    },
  });
}
