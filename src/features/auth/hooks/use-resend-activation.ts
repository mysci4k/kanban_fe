import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authApi } from "../api/auth";

export function useResendActivation() {
  return useMutation({
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
}
