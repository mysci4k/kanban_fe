import { endpoints } from "@/config/env";
import apiClient from "@/shared/api/client";
import {
  AddBoardMemberDto,
  AddNewBoardMemberResponse,
  DeleteBoardMemberDto,
  GetBoardMembersResponse,
  RemoveBoardMemberResponse,
  UpdateBoardMemberRoleDto,
  UpdateBoardMemberRoleResponse,
} from "../types/member.types";

export const memberApi = {
  getMembers: async (boardId: string): Promise<GetBoardMembersResponse> => {
    const response = await apiClient.get<GetBoardMembersResponse>(
      endpoints.board.members(boardId),
    );

    return response.data;
  },

  addMember: async (
    data: AddBoardMemberDto,
  ): Promise<AddNewBoardMemberResponse> => {
    const response = await apiClient.post<AddNewBoardMemberResponse>(
      endpoints.member.add,
      data,
    );

    return response.data;
  },

  updateMemberRole: async (
    data: UpdateBoardMemberRoleDto,
  ): Promise<UpdateBoardMemberRoleResponse> => {
    const response = await apiClient.put<UpdateBoardMemberRoleResponse>(
      endpoints.member.updateRole,
      data,
    );

    return response.data;
  },

  removeMember: async (
    data: DeleteBoardMemberDto,
  ): Promise<RemoveBoardMemberResponse> => {
    const response = await apiClient.delete<RemoveBoardMemberResponse>(
      endpoints.member.remove,
      { data },
    );

    return response.data;
  },
};
