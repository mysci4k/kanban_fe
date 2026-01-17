import { components, operations } from "@/shared/api/api-types";
import { TaskDto } from "./task.types";

export type ColumnDto = components["schemas"]["ColumnDto"];
export type CreateColumnDto = components["schemas"]["CreateColumnDto"];
export type UpdateColumnDto = components["schemas"]["UpdateColumnDto"];

export type GetBoardColumnsResponse =
  operations["get_board_columns"]["responses"][200]["content"]["application/json"];
export type GetColumnResponse =
  operations["get_column"]["responses"][200]["content"]["application/json"];
export type CreateColumnResponse =
  operations["create_column"]["responses"][201]["content"]["application/json"];
export type UpdateColumnResponse =
  operations["update_column"]["responses"][200]["content"]["application/json"];
export type MoveColumnResponse =
  operations["move_column"]["responses"][200]["content"]["application/json"];
export type DeleteColumnResponse =
  operations["delete_column"]["responses"][200]["content"]["application/json"];

export interface ColumnWithTasks extends ColumnDto {
  tasks: TaskDto[];
}
