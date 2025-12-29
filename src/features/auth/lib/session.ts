import { endpoints, env } from "@/config/env";
import { cookies } from "next/headers";
import { SessionState, User } from "../types/types";

export async function getSessionCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();

  return cookieStore.get(env.SESSION_COOKIE_NAME)?.value;
}

export async function getSession(): Promise<SessionState> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(env.SESSION_COOKIE_NAME);

  if (!sessionCookie) {
    return { user: null, isAuthenticated: false };
  }

  try {
    const response = await fetch(`${env.API_URL}${endpoints.user.profile}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${env.SESSION_COOKIE_NAME}=${sessionCookie.value}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return { user: null, isAuthenticated: false };
    }

    const data = await response.json();
    const user: User = data.data;

    return { user, isAuthenticated: true };
  } catch (error) {
    console.error("Failed to validate session: ", error);

    return { user: null, isAuthenticated: false };
  }
}

export async function hasSessionCookie(): Promise<boolean> {
  const cookie = await getSessionCookie();

  return !!cookie;
}

export async function getServerSession(): Promise<SessionState> {
  return getSession();
}
