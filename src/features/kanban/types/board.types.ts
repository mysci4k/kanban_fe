import { components, operations } from "@/shared/api/api-types";
import { ColumnWithTasks } from "./column.types";

export type BoardDto = components["schemas"]["BoardDto"];
export type CreateBoardDto = components["schemas"]["CreateBoardDto"];
export type UpdateBoardDto = components["schemas"]["UpdateBoardDto"];

export type GetUserBoardsResponse =
  operations["get_user_boards"]["responses"][200]["content"]["application/json"];
export type GetBoardResponse =
  operations["get_board"]["responses"][200]["content"]["application/json"];
export type CreateBoardResponse =
  operations["create_board"]["responses"][201]["content"]["application/json"];
export type UpdateBoardResponse =
  operations["update_board"]["responses"][200]["content"]["application/json"];
export type DeleteBoardResponse =
  operations["delete_board"]["responses"][200]["content"]["application/json"];

export interface BoardWithColumnsAndTasks extends BoardDto {
  columns: ColumnWithTasks[];
}
