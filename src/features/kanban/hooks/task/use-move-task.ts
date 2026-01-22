import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { taskApi } from "../../api/task";
import { TaskDto } from "../../types/task.types";
import { tasksQueryKey } from "./use-tasks";

export function useMoveTask(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      taskId,
      columnId,
      position,
    }: {
      taskId: string;
      columnId: string;
      position: number;
    }) => taskApi.moveTask(taskId, columnId, position),
    onMutate: async ({ taskId, columnId, position }) => {
      await queryClient.cancelQueries({ queryKey: tasksQueryKey(boardId) });

      const previousTasks = queryClient.getQueryData<TaskDto[]>(
        tasksQueryKey(boardId),
      );

      if (previousTasks) {
        const taskIndex = previousTasks.findIndex((t) => t.id === taskId);
        if (taskIndex !== -1) {
          const newTasks = [...previousTasks];
          const movedTask = { ...newTasks[taskIndex], columnId };
          newTasks.splice(taskIndex, 1);

          const tasksInColumn = newTasks.filter((t) => t.columnId === columnId);
          const insertIndex = newTasks.findIndex(
            (t) =>
              t.columnId === columnId && tasksInColumn.indexOf(t) >= position,
          );

          if (insertIndex === -1) {
            newTasks.push(movedTask);
          } else {
            newTasks.splice(insertIndex, 0, movedTask);
          }

          queryClient.setQueryData(tasksQueryKey(boardId), newTasks);
        }
      }

      return { previousTasks };
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(tasksQueryKey(boardId), context.previousTasks);
      }

      const errorMessage = error.response?.data?.message || "Please try again";
      toast.error("Failed to move task", {
        description: errorMessage,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: tasksQueryKey(boardId) });
    },
  });
}
