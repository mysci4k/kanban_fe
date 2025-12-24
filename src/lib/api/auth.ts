import type { components, operations } from "./api-types";
import apiClient from "./client";

// Schema types
type CreateUserDto = components["schemas"]["CreateUserDto"];
type LoginDto = components["schemas"]["LoginDto"];
type ActivationQueryDto = components["schemas"]["ActivationQueryDto"];
type ResendActivationQueryDto =
  components["schemas"]["ResendActivationQueryDto"];

// Response types
type RegisterResponse =
  operations["register"]["responses"][201]["content"]["application/json"];
type LoginResponse =
  operations["login"]["responses"][200]["content"]["application/json"];
type ActivateResponse =
  operations["activate"]["responses"][200]["content"]["application/json"];
type ResendActivationResponse =
  operations["resend_activation"]["responses"][200]["content"]["application/json"];

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

  activate: async (query: ActivationQueryDto): Promise<ActivateResponse> => {
    const response = await apiClient.post<ActivateResponse>(
      "/auth/activate",
      null,
      {
        params: query,
      },
    );

    return response.data;
  },

  resendActivation: async (
    query: ResendActivationQueryDto,
  ): Promise<ResendActivationResponse> => {
    const response = await apiClient.post<ResendActivationResponse>(
      "/auth/resend-activation",
      null,
      {
        params: query,
      },
    );

    return response.data;
  },
};
