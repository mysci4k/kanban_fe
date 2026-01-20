import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { boardApi } from "../../api/board";
import { BOARDS_QUERY_KEY } from "./use-boards";

export function useDeleteBoard() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (boardId: string) => boardApi.deleteBoard(boardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOARDS_QUERY_KEY });
      toast.success("Board deleted successfully", {
        description: "The board has been removed",
      });

      router.push("/app");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Please try again";
      toast.error("Failed to delete board", {
        description: errorMessage,
      });
    },
  });
}
