import { endpoints } from "@/config/env";
import apiClient from "@/shared/api/client";
import {
  CreateBoardDto,
  CreateBoardResponse,
  DeleteBoardResponse,
  GetBoardResponse,
  GetUserBoardsResponse,
  UpdateBoardDto,
  UpdateBoardResponse,
} from "../types/board.types";

export const boardApi = {
  getBoards: async (): Promise<GetUserBoardsResponse> => {
    const response = await apiClient.get<GetUserBoardsResponse>(
      endpoints.board.list,
    );

    return response.data;
  },

  getBoard: async (boardId: string): Promise<GetBoardResponse> => {
    const response = await apiClient.get<GetBoardResponse>(
      endpoints.board.get(boardId),
    );

    return response.data;
  },

  createBoard: async (data: CreateBoardDto): Promise<CreateBoardResponse> => {
    const response = await apiClient.post<CreateBoardResponse>(
      endpoints.board.create,
      data,
    );

    return response.data;
  },

  updateBoard: async (
    boardId: string,
    data: UpdateBoardDto,
  ): Promise<UpdateBoardResponse> => {
    const response = await apiClient.put<UpdateBoardResponse>(
      endpoints.board.update(boardId),
      data,
    );

    return response.data;
  },

  deleteBoard: async (boardId: string): Promise<DeleteBoardResponse> => {
    const response = await apiClient.delete<DeleteBoardResponse>(
      endpoints.board.delete(boardId),
    );

    return response.data;
  },
};
