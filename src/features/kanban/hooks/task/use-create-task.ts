import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { taskApi } from "../../api/task";
import { CreateTaskDto } from "../../types/task.types";
import { tasksQueryKey } from "./use-tasks";

export function useCreateTask(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskDto) => taskApi.createTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tasksQueryKey(boardId) });
      toast.success("Task created successfully", {
        description: "Your new task has been added to the board",
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Please try again";
      toast.error("Failed to create task", {
        description: errorMessage,
      });
    },
  });
}
