import { useQuery } from "@tanstack/react-query";
import { taskApi } from "../../api/task";

export const tasksQueryKey = (boardId: string) => ["tasks", boardId];

export function useTasks(boardId: string) {
  return useQuery({
    queryKey: tasksQueryKey(boardId),
    queryFn: async () => {
      const response = await taskApi.getBoardTasks(boardId);

      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!boardId,
  });
}
