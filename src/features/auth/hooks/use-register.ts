import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authApi } from "../api/auth";

export function useRegister() {
  return useMutation({
    mutationFn: authApi.register,
    onSuccess: () => {
      toast.success("Account created successfully!", {
        description: "Please check your email to activate your account",
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Please try again";
      toast.error("Registration failed", {
        description: errorMessage,
      });
    },
  });
}
