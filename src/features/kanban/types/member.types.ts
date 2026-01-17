import { components, operations } from "@/shared/api/api-types";

export type BoardMemberDto = components["schemas"]["BoardMemberDto"];
export type BoardMemberRoleEnum = components["schemas"]["BoardMemberRoleEnum"];
export type AddBoardMemberDto = components["schemas"]["AddBoardMemberDto"];
export type UpdateBoardMemberRoleDto =
  components["schemas"]["UpdateBoardMemberRoleDto"];
export type DeleteBoardMemberDto =
  components["schemas"]["DeleteBoardMemberDto"];

export type GetBoardMembersResponse =
  operations["get_board_members"]["responses"]["200"]["content"]["application/json"];
export type AddNewBoardMemberResponse =
  operations["add_new_board_member"]["responses"]["201"]["content"]["application/json"];
export type UpdateBoardMemberRoleResponse =
  operations["update_board_member_role"]["responses"]["200"]["content"]["application/json"];
export type RemoveBoardMemberResponse =
  operations["remove_board_member"]["responses"]["200"]["content"]["application/json"];
