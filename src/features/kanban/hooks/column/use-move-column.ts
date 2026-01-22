import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { columnApi } from "../../api/column";
import { ColumnDto } from "../../types/column.types";
import { columnsQueryKey } from "./use-columns";

export function useMoveColumn(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      columnId,
      position,
    }: {
      columnId: string;
      position: number;
    }) => columnApi.moveColumn(columnId, position),
    onMutate: async ({ columnId, position }) => {
      await queryClient.cancelQueries({ queryKey: columnsQueryKey(boardId) });

      const previousColumns = queryClient.getQueryData<ColumnDto[]>(
        columnsQueryKey(boardId),
      );

      if (previousColumns) {
        const columnIndex = previousColumns.findIndex((c) => c.id === columnId);
        if (columnIndex !== -1) {
          const newColumns = [...previousColumns];
          const [movedColumn] = newColumns.splice(columnIndex, 1);
          newColumns.splice(position, 0, movedColumn);
          queryClient.setQueryData(columnsQueryKey(boardId), newColumns);
        }
      }

      return { previousColumns };
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any, _variables, context) => {
      if (context?.previousColumns) {
        queryClient.setQueryData(
          columnsQueryKey(boardId),
          context.previousColumns,
        );
      }

      const errorMessage = error.response?.data?.message || "Please try again";
      toast.error("Failed to move column", {
        description: errorMessage,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: columnsQueryKey(boardId) });
    },
  });
}
