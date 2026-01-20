import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { columnApi } from "../../api/column";
import { tasksQueryKey } from "../task/use-tasks";
import { columnsQueryKey } from "./use-columns";

export function useDeleteColumn(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (columnId: string) => columnApi.deleteColumn(columnId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: columnsQueryKey(boardId) });
      queryClient.invalidateQueries({ queryKey: tasksQueryKey(boardId) });
      toast.success("Column deleted successfully", {
        description: "The column has been removed from the board",
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Please try again";
      toast.error("Failed to delete column", {
        description: errorMessage,
      });
    },
  });
}
