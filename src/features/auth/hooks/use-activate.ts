import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "../api/auth";

export function useActivate() {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ userId, token }: { userId: string; token: string }) =>
      authApi.activate({ userId, activationToken: token }),
    onSuccess: () => {
      setTimeout(() => {
        router.push("/login");
      }, 15000);
    },
  });
}
