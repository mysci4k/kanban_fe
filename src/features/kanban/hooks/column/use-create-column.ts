import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { columnApi } from "../../api/column";
import { CreateColumnDto } from "../../types/column.types";
import { columnsQueryKey } from "./use-columns";

export function useCreateColumn(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateColumnDto) => columnApi.createColumn(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: columnsQueryKey(boardId) });
      toast.success("Column created successfully", {
        description: "Your new column has been added to the board",
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Please try again";
      toast.error("Failed to create column", {
        description: errorMessage,
      });
    },
  });
}
