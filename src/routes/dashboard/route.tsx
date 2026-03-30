import { createFileRoute } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import { useState } from "react";
import { DashboardSidebar } from "#/components/dashboard/Sidebar";
import { DashboardHeader } from "#/components/dashboard/Header";
import { DashboardFooter } from "#/components/dashboard/Footer";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-base)]">
      {/* Collapsible Sidebar */}
      <DashboardSidebar
        isCollapsed={isCollapsed}
        toggleCollapse={toggleCollapse}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          isCollapsed={isCollapsed}
          toggleCollapse={toggleCollapse}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8 bg-transparent">
          <div className="max-w-[1200px] mx-auto">
            <Outlet />
          </div>
        </main>

        <DashboardFooter />
      </div>
    </div>
  );
}
