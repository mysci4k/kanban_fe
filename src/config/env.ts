import { get } from "node:https";

export const env = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
  WS_URL: process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080/api",

  SESSION_COOKIE_NAME: "user-session",

  IS_DEVELOPMENT: process.env.NODE_ENV === "development",
  IS_PRODUCTION: process.env.NODE_ENV === "production",
} as const;

export const routes = {
  protected: ["/app"],
  auth: ["/login", "/signup"],
} as const;

export const endpoints = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    register: "/auth/register",
    activate: "/auth/activate",
    resendActivation: "/auth/resend-activation",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    renew: "/auth/renew",
  },
  user: {
    profile: "/user/profile",
  },
  board: {
    list: "/board/",
    create: "/board/",
    get: (boardId: string) => `/board/${boardId}`,
    update: (boardId: string) => `/board/${boardId}`,
    delete: (boardId: string) => `/board/${boardId}`,
  },
  column: {
    create: "/column/",
    get: (columnId: string) => `/column/${columnId}`,
    update: (columnId: string) => `/column/${columnId}`,
    delete: (columnId: string) => `/column/${columnId}`,
    getByBoard: (boardId: string) => `/column/board/${boardId}`,
    move: (columnId: string, position: number) =>
      `/column/${columnId}/move/${position}`,
  },
  task: {
    create: "/task/",
    get: (taskId: string) => `/task/${taskId}`,
    update: (taskId: string) => `/task/${taskId}`,
    delete: (taskId: string) => `/task/${taskId}`,
    getByColumn: (columnId: string) => `/task/column/${columnId}`,
    getByBoard: (boardId: string) => `/task/board/${boardId}`,
    move: (taskId: string, columnId: string, position: number) =>
      `/task/${taskId}/move/${columnId}/${position}`,
  },
  ws: {
    board: (boardId: string) => `/ws/board/${boardId}`,
  },
} as const;
