import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { boardApi } from "../../api/board";
import { UpdateBoardDto } from "../../types/board.types";
import { boardQueryKey } from "./use-board";
import { BOARDS_QUERY_KEY } from "./use-boards";

export function useUpdateBoard(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateBoardDto) => boardApi.updateBoard(boardId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: boardQueryKey(boardId) });
      queryClient.invalidateQueries({ queryKey: BOARDS_QUERY_KEY });
      toast.success("Board updated successfully", {
        description: "Your changes have been saved",
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Please try again";
      toast.error("Failed to update board", {
        description: errorMessage,
      });
    },
  });
}
