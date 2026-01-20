import { useQuery } from "@tanstack/react-query";
import { columnApi } from "../../api/column";

export const columnsQueryKey = (boardId: string) => ["columns", boardId];

export function useColumns(boardId: string) {
  return useQuery({
    queryKey: columnsQueryKey(boardId),
    queryFn: async () => {
      const response = await columnApi.getColumns(boardId);

      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!boardId,
  });
}
