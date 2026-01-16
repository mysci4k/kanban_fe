import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { boardApi } from "../api/board";
import { CreateBoardDto } from "../types/board.types";
import { BOARDS_QUERY_KEY } from "./use-boards";

export function useCreateBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBoardDto) => boardApi.createBoard(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOARDS_QUERY_KEY });
      toast.success("Board created successfully", {
        description: "You can now start adding tasks to your board",
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Please try again";
      toast.error("Failed to create board", {
        description: errorMessage,
      });
    },
  });
}
