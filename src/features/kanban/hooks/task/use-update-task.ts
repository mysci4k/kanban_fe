import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { taskApi } from "../../api/task";
import { UpdateTaskDto } from "../../types/task.types";
import { tasksQueryKey } from "./use-tasks";

export function useUpdateTask(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: UpdateTaskDto }) =>
      taskApi.updateTask(taskId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tasksQueryKey(boardId) });
      toast.success("Task updated successfully", {
        description: "Your task has been updated",
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Please try again";
      toast.error("Failed to update task", {
        description: errorMessage,
      });
    },
  });
}
