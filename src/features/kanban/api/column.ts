import { endpoints } from "@/config/env";
import apiClient from "@/shared/api/client";
import {
  CreateColumnDto,
  CreateColumnResponse,
  DeleteColumnResponse,
  GetBoardColumnsResponse,
  GetColumnResponse,
  MoveColumnResponse,
  UpdateColumnDto,
  UpdateColumnResponse,
} from "../types/column.types";

export const columnApi = {
  getColumns: async (boardId: string): Promise<GetBoardColumnsResponse> => {
    const response = await apiClient.get<GetBoardColumnsResponse>(
      endpoints.column.getByBoard(boardId),
    );

    return response.data;
  },

  getColumn: async (columnId: string): Promise<GetColumnResponse> => {
    const response = await apiClient.get<GetColumnResponse>(
      endpoints.column.get(columnId),
    );

    return response.data;
  },

  createColumn: async (
    data: CreateColumnDto,
  ): Promise<CreateColumnResponse> => {
    const response = await apiClient.post<CreateColumnResponse>(
      endpoints.column.create,
      data,
    );

    return response.data;
  },

  updateColumn: async (
    columnId: string,
    data: UpdateColumnDto,
  ): Promise<UpdateColumnResponse> => {
    const response = await apiClient.put<UpdateColumnResponse>(
      endpoints.column.update(columnId),
      data,
    );

    return response.data;
  },

  moveColumn: async (
    columnId: string,
    position: number,
  ): Promise<MoveColumnResponse> => {
    const response = await apiClient.patch<MoveColumnResponse>(
      endpoints.column.move(columnId, position),
    );

    return response.data;
  },

  deleteColumn: async (columnId: string): Promise<DeleteColumnResponse> => {
    const response = await apiClient.delete<DeleteColumnResponse>(
      endpoints.column.delete(columnId),
    );

    return response.data;
  },
};
