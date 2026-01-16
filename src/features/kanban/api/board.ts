import { endpoints } from "@/config/env";
import apiClient from "@/shared/api/client";
import {
  CreateBoardDto,
  CreateBoardResponse,
  GetUserBoardsResponse,
} from "../types/board.types";

export const boardApi = {
  getBoards: async (): Promise<GetUserBoardsResponse> => {
    const response = await apiClient.get<GetUserBoardsResponse>(
      endpoints.board.list,
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
};
