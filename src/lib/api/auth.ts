import type { components, operations } from "./api-types";
import apiClient from "./client";

// Schema types
type CreateUserDto = components["schemas"]["CreateUserDto"];
type LoginDto = components["schemas"]["LoginDto"];

// Response types
type RegisterResponse =
  operations["register"]["responses"][201]["content"]["application/json"];
type LoginResponse =
  operations["login"]["responses"][200]["content"]["application/json"];

// API functions
export const authApi = {
  register: async (data: CreateUserDto): Promise<RegisterResponse> => {
    const response = await apiClient.post<RegisterResponse>(
      "/auth/register",
      data,
    );
    return response.data;
  },

  login: async (credentials: LoginDto): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>(
      "/auth/login",
      credentials,
    );
    return response.data;
  },
};
