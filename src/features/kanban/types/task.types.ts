import { components, operations } from "@/shared/api/api-types";

export type TaskDto = components["schemas"]["TaskDto"];
export type CreateTaskDto = components["schemas"]["CreateTaskDto"];
export type UpdateTaskDto = components["schemas"]["UpdateTaskDto"];

export type GetColumnTasksResponse =
  operations["get_column_tasks"]["responses"][200]["content"]["application/json"];
export type GetTaskResponse =
  operations["get_task"]["responses"][200]["content"]["application/json"];
export type CreateTaskResponse =
  operations["create_task"]["responses"][201]["content"]["application/json"];
export type UpdateTaskResponse =
  operations["update_task"]["responses"][200]["content"]["application/json"];
export type MoveTaskResponse =
  operations["move_task"]["responses"][200]["content"]["application/json"];
export type DeleteTaskResponse =
  operations["delete_task"]["responses"][200]["content"]["application/json"];
