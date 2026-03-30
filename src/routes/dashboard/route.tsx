import { createFileRoute } from "@tanstack/react-router";
import { Outlet, Link } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api"; // your Convex queries
import { authClient } from "#/lib/auth-client";
import { useSignOut } from "#/hooks/useAuth";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const { signOutAndRedirect } = useSignOut();

  // Fetch restaurant info once (so footer + header can show dynamic name)
  const restaurant = useQuery(api.restaurant.get) ?? { name: "Mi Restaurante" };

  if (!user) return null; // better-auth + beforeLoad already protects this

  return (
    <div className="flex h-screen bg-gray-50">
      {/* SIDE MENU */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-amber-600">
            {restaurant.name}
          </h1>
          <p className="text-xs text-gray-500">Dashboard</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link
            to="/dashboard"
            activeProps={{ className: "bg-amber-100 text-amber-700" }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700"
          >
            📊 Overview
          </Link>
          <Link
            to="/dashboard/users"
            activeProps={{ className: "bg-amber-100 text-amber-700" }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700"
          >
            👤 Users & Permissions
          </Link>
          <Link
            to="/dashboard/roles"
            activeProps={{ className: "bg-amber-100 text-amber-700" }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700"
          >
            🔑 Roles
          </Link>
          <Link
            to="/dashboard/dishes"
            activeProps={{ className: "bg-amber-100 text-amber-700" }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700"
          >
            🍽️ Dishes & Prices
          </Link>
          <Link
            to="/dashboard/restaurant"
            activeProps={{ className: "bg-amber-100 text-amber-700" }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700"
          >
            🏪 Restaurant Info
          </Link>
          <Link
            to="/dashboard/sales"
            activeProps={{ className: "bg-amber-100 text-amber-700" }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700"
          >
            💰 Sales
          </Link>
        </nav>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="h-14 bg-white border-b flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold">Dashboard</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Logged user + role */}
            <div className="text-right">
              <p className="font-medium text-sm">{user.name || user.email}</p>
              {/* <p className="text-xs text-gray-500 capitalize"> */}
              {/*   {user.role || "staff"} */}
              {/* </p> */}
            </div>

            {/* Sign-out (better-auth) */}
            <button
              onClick={signOutAndRedirect}
              className="text-sm text-gray-500 hover:text-red-600"
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>

        {/* BOTTOM FOOTER (optional – you already have one in sidebar) */}
        <footer className="h-12 bg-white border-t flex items-center px-6 text-xs text-gray-400">
          {restaurant.name} - Alex Herrera. All rights reserved. ©{" "}
          {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}
