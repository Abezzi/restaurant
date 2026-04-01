import { createFileRoute, Navigate } from "@tanstack/react-router";
import { authClient } from "#/lib/authClient";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
});

function DashboardHome() {
  const { data: session, isPending } = authClient.useSession();

  // show loading while session is being fetched
  if (isPending) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-900 dark:border-neutral-800 dark:border-t-neutral-100" />
      </div>
    );
  }

  // if not logged in, redirect to sign-in page
  if (!session?.user) {
    return <Navigate to="/auth/better-auth" />;
  }

  // home page
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Restaurant Dashboard</h1>
      <p className="text-neutral-500">Welcome back, {session.user.name} 👋</p>
      <p>{session.user.email}</p>
      {/* 
        TODO:
        - TanStack Table for dishes + price editing
        - User management & permissions
        - Landing page editor (update hero, menu, etc.)
      */}
    </div>
  );
}
