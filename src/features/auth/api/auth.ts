import { components, operations } from "@/shared/api/api-types";
import apiClient from "@/shared/api/client";

// Schema types
type CreateUserDto = components["schemas"]["CreateUserDto"];
type LoginDto = components["schemas"]["LoginDto"];
type ActivationQueryDto = components["schemas"]["ActivationQueryDto"];
type ResendActivationQueryDto =
  components["schemas"]["ResendActivationQueryDto"];
type ForgotPasswordQueryDto = components["schemas"]["ForgotPasswordQueryDto"];
type ResetPasswordDto = components["schemas"]["ResetPasswordDto"];

// Response types
type RegisterResponse =
  operations["register"]["responses"][201]["content"]["application/json"];
type LoginResponse =
  operations["login"]["responses"][200]["content"]["application/json"];
type LogoutResponse =
  operations["logout"]["responses"][200]["content"]["application/json"];
type ActivateResponse =
  operations["activate"]["responses"][200]["content"]["application/json"];
type ResendActivationResponse =
  operations["resend_activation"]["responses"][200]["content"]["application/json"];
type ForgotPasswordResponse =
  operations["forgot_password"]["responses"][200]["content"]["application/json"];
type ResetPasswordResponse =
  operations["reset_password"]["responses"][200]["content"]["application/json"];

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

  logout: async (): Promise<LogoutResponse> => {
    const response = await apiClient.post<LogoutResponse>("/auth/logout");

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

  forgotPassword: async (
    query: ForgotPasswordQueryDto,
  ): Promise<ForgotPasswordResponse> => {
    const response = await apiClient.post<ForgotPasswordResponse>(
      "/auth/forgot-password",
      null,
      {
        params: query,
      },
    );

    return response.data;
  },

  resetPassword: async (
    data: ResetPasswordDto,
  ): Promise<ResetPasswordResponse> => {
    const response = await apiClient.post<ResetPasswordResponse>(
      "/auth/reset-password",
      data,
    );

    return response.data;
  },
};
