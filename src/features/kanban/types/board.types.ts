import { components, operations } from "@/shared/api/api-types";

// Schema types
export type BoardDto = components["schemas"]["BoardDto"];
export type CreateBoardDto = components["schemas"]["CreateBoardDto"];

// Response types
export type GetUserBoardsResponse =
  operations["get_user_boards"]["responses"][200]["content"]["application/json"];
export type CreateBoardResponse =
  operations["create_board"]["responses"][201]["content"]["application/json"];
