import { useSignOut } from "#/hooks/useAuth";
import { authClient } from "#/lib/authClient";
import { LogOut, Menu } from "lucide-react";
import ThemeToggle from "../ThemeToggle";
import { Button } from "../ui/button";

interface DashboardHeaderProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

export function DashboardHeader({
  isCollapsed,
  toggleCollapse,
}: DashboardHeaderProps) {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const { signOutAndRedirect } = useSignOut();

  return (
    <header className="h-16 border-b border-[var(--line)] bg-[var(--header-bg)] backdrop-blur-xl flex items-center px-8 z-10">
      <button
        onClick={toggleCollapse}
        className="mr-6 text-[var(--sea-ink-soft)] hover:text-[var(--sea-ink)] p-2 rounded-full hover:bg-white/60 transition-all"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="flex-1">
        <span className="text-xl font-semibold text-[var(--sea-ink)] tracking-tight">
          Dashboard
        </span>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <div className="text-right">
          <p className="font-semibold text-[var(--sea-ink)]">
            {user?.name || user?.email}
          </p>
          <p className="text-xs text-[var(--sea-ink-soft)] -mt-0.5">
            {user?.role || "Staff"}
          </p>
        </div>

        <Button
          onClick={signOutAndRedirect}
          variant="ghost"
          className="text-sm font-medium text-[var(--sea-ink-soft)] hover:text-[var(--lagoon-deep)] transition-colors px-4 py-2 rounded-full hover:bg-white/60"
        >
          <LogOut />
          Sign Out
        </Button>
      </div>
    </header>
  );
}
