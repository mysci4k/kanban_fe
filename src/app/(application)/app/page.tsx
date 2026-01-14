import { getSession } from "@/features/auth/lib/session";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session.isAuthenticated) {
    redirect("/login");
  }

  const { user } = session;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, {user.firstName}!</h1>
        <p className="text-muted-foreground">{user.email}</p>
      </div>
    </main>
  );
}
