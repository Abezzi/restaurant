import { Link } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DashboardSidebarProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

export function DashboardSidebar({
  isCollapsed,
  toggleCollapse,
}: DashboardSidebarProps) {
  const restaurant = useQuery(api.restaurant.get) ?? {
    name: "Sandia Restaurant",
  };

  const navItems = [
    { to: "/dashboard", label: "Overview", emoji: "📊" },
    { to: "/dashboard/users", label: "Users & Permissions", emoji: "👤" },
    { to: "/dashboard/roles", label: "Roles", emoji: "🔑" },
    { to: "/dashboard/dishes", label: "Dishes & Prices", emoji: "🍽️" },
    { to: "/dashboard/restaurant", label: "Restaurant Info", emoji: "🏪" },
    { to: "/dashboard/sales", label: "Sales", emoji: "💰" },
  ];

  return (
    <div
      className={`border-r border-[var(--line)] bg-white/70 backdrop-blur-xl flex flex-col island-shell rounded-r-3xl shadow-xl h-full transition-all duration-300 ease-out overflow-hidden ${isCollapsed ? "w-20" : "w-72"
        }`}
    >
      {/* header + collapse button */}
      <div className="p-6 border-b border-[var(--line)] flex items-center justify-between">
        {!isCollapsed ? (
          <>
            <h1 className="display-title text-3xl font-bold tracking-tight text-[var(--sea-ink)]">
              {restaurant.name}
            </h1>
            <button
              onClick={toggleCollapse}
              className="text-[var(--sea-ink-soft)] hover:text-[var(--lagoon-deep)] p-2 rounded-full hover:bg-white/60 transition-all"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </>
        ) : (
          <button
            onClick={toggleCollapse}
            className="mx-auto text-[var(--sea-ink-soft)] hover:text-[var(--lagoon-deep)] p-2 rounded-full hover:bg-white/60 transition-all"
            aria-label="Expand sidebar"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* navigation menu */}
      <nav className="flex-1 px-3 py-8 space-y-1 overflow-y-auto">
        {navItems.map((item, index) => (
          <Link
            key={item.to}
            to={item.to}
            activeProps={{
              className:
                "bg-[var(--lagoon)]/10 text-[var(--lagoon-deep)] border-l-2 border-[var(--lagoon-deep)]",
            }}
            className={`group flex items-center gap-3 px-5 py-3.5 rounded-2xl text-[var(--sea-ink-soft)] hover:bg-white/60 hover:text-[var(--sea-ink)] transition-all duration-200 ${isCollapsed ? "justify-center" : ""
              }`}
            style={{ animationDelay: `${index * 40}ms` }}
            title={isCollapsed ? item.label : undefined}
          >
            <span className="text-xl opacity-80 group-hover:scale-110 transition-transform">
              {item.emoji}
            </span>
            {!isCollapsed && <span className="font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* branding */}
      {!isCollapsed && (
        <div className="p-6 border-t border-[var(--line)] text-xs text-[var(--sea-ink-soft)]">
          Powered by Alex Herrera • {new Date().getFullYear()}
        </div>
      )}
    </div>
  );
}
