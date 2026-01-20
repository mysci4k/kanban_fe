import { useQuery } from "@tanstack/react-query";
import { boardApi } from "../../api/board";

export const boardQueryKey = (boardId: string) => ["board", boardId];

export function useBoard(boardId: string) {
  return useQuery({
    queryKey: boardQueryKey(boardId),
    queryFn: async () => {
      const response = await boardApi.getBoard(boardId);

      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!boardId,
  });
}
