import { components } from "@/shared/api/api-types";

export type User = components["schemas"]["UserDto"];

export interface Session {
  user: User;
  isAuthenticated: true;
}

export interface NoSession {
  user: null;
  isAuthenticated: false;
}

export type SessionState = Session | NoSession;

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
};
