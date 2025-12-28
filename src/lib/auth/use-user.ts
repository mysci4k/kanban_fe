"use client";

import { useQuery } from "@tanstack/react-query";
import { operations } from "../api/api-types";
import apiClient from "../api/client";
import { useAuth } from "../../components/providers/auth-provider";

type ProfileResponse =
  operations["get_user_profile"]["responses"]["200"]["content"]["application/json"];

export const USER_QUERY_KEY = ["user", "profile"];

export function useUser() {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: async () => {
      const response = await apiClient.get<ProfileResponse>("/user/profile");

      return response.data.data;
    },
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useUserProfile() {
  const { user, isLoading } = useAuth();

  return { user, isLoading };
}
