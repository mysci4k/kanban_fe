"use client";

import { endpoints } from "@/config/env";
import { operations } from "@/shared/api/api-types";
import apiClient from "@/shared/api/client";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContextType, SessionState, User } from "../types/types";

type LoginResponse =
  operations["login"]["responses"]["200"]["content"]["application/json"];
type ProfileResponse =
  operations["get_user_profile"]["responses"]["200"]["content"]["application/json"];

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
  initialSession?: SessionState;
}

export function AuthProvider({ children, initialSession }: AuthProviderProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [user, setUser] = useState<User | null>(initialSession?.user ?? null);
  const [isLoading, setIsLoading] = useState<boolean>(!initialSession);
  const isAuthenticated = !!user;

  const fetchUser = useCallback(async (): Promise<User | null> => {
    try {
      const response = await apiClient.get<ProfileResponse>(
        endpoints.user.profile,
      );

      return response.data.data ?? null;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    if (initialSession) {
      return;
    }

    const initSession = async () => {
      setIsLoading(true);
      const currentUser = await fetchUser();
      setUser(currentUser);
      setIsLoading(false);
    };

    initSession();
  }, [fetchUser, initialSession]);

  const login = useCallback(
    async (email: string, password: string): Promise<void> => {
      const response = await apiClient.post<LoginResponse>(
        endpoints.auth.login,
        {
          email,
          password,
        },
      );

      const loggedInUser = response.data.data;
      if (loggedInUser) {
        setUser(loggedInUser);

        queryClient.clear();

        const params = new URLSearchParams(window.location.search);
        const callbackUrl = params.get("redirect") || "/dashboard";

        router.push(callbackUrl);
      }
    },
    [queryClient, router],
  );

  const logout = useCallback(async (): Promise<void> => {
    try {
      await apiClient.post(endpoints.auth.logout);
    } catch (error) {
      console.error("Logout failed: ", error);
    } finally {
      setUser(null);
      queryClient.clear();

      router.push("/login");
    }
  }, [queryClient, router]);

  const refreshSession = useCallback(async (): Promise<void> => {
    try {
      await apiClient.post(endpoints.auth.renew);

      const currentUser = await fetchUser();
      setUser(currentUser);
    } catch (error) {
      console.error("Session refresh failed: ", error);

      setUser(null);
    }
  }, [fetchUser]);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const REFRESH_INTERVAL = 20 * 60 * 60 * 1000;
    const intervalId = setInterval(() => {
      refreshSession();
    }, REFRESH_INTERVAL);

    return () => clearInterval(intervalId);
  }, [isAuthenticated, refreshSession]);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
