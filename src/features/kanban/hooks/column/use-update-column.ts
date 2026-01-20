import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { columnApi } from "../../api/column";
import { UpdateColumnDto } from "../../types/column.types";
import { columnsQueryKey } from "./use-columns";

export function useUpdateColumn(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      columnId,
      data,
    }: {
      columnId: string;
      data: UpdateColumnDto;
    }) => columnApi.updateColumn(columnId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: columnsQueryKey(boardId) });
      toast.success("Column updated successfully", {
        description: "Your column has been updated",
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Please try again";
      toast.error("Failed to update column", {
        description: errorMessage,
      });
    },
  });
}
