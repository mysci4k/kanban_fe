import { endpoints } from "@/config/env";
import apiClient from "@/shared/api/client";
import {
  CreateTaskDto,
  CreateTaskResponse,
  DeleteTaskResponse,
  GetColumnTasksResponse,
  GetTaskResponse,
  MoveTaskResponse,
  UpdateTaskDto,
  UpdateTaskResponse,
} from "../types/task.types";

export const taskApi = {
  getTasks: async (columnId: string): Promise<GetColumnTasksResponse> => {
    const response = await apiClient.get<GetColumnTasksResponse>(
      endpoints.task.getByColumn(columnId),
    );

    return response.data;
  },

  getTask: async (taskId: string): Promise<GetTaskResponse> => {
    const response = await apiClient.get<GetTaskResponse>(
      endpoints.task.get(taskId),
    );

    return response.data;
  },

  createTask: async (data: CreateTaskDto): Promise<CreateTaskResponse> => {
    const response = await apiClient.post<CreateTaskResponse>(
      endpoints.task.create,
      data,
    );

    return response.data;
  },

  updateTask: async (
    taskId: string,
    data: UpdateTaskDto,
  ): Promise<UpdateTaskResponse> => {
    const response = await apiClient.put<UpdateTaskResponse>(
      endpoints.task.update(taskId),
      data,
    );

    return response.data;
  },

  moveTask: async (
    taskId: string,
    columnId: string,
    position: number,
  ): Promise<MoveTaskResponse> => {
    const response = await apiClient.patch<MoveTaskResponse>(
      endpoints.task.move(taskId, columnId, position),
    );

    return response.data;
  },

  deleteTask: async (taskId: string): Promise<DeleteTaskResponse> => {
    const response = await apiClient.delete<DeleteTaskResponse>(
      endpoints.task.delete(taskId),
    );

    return response.data;
  },
};
