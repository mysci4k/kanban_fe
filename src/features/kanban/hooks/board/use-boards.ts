import { useQuery } from "@tanstack/react-query";
import { boardApi } from "../../api/board";

export const BOARDS_QUERY_KEY = ["boards"];

export function useBoards() {
  return useQuery({
    queryKey: BOARDS_QUERY_KEY,
    queryFn: async () => {
      const response = await boardApi.getBoards();

      return response.data ?? [];
    },
    staleTime: 5 * 60 * 1000,
  });
}
