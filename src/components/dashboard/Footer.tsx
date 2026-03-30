import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function DashboardFooter() {
  const restaurant = useQuery(api.restaurant.get) ?? {
    name: "Sandia Restaurant",
  };

  return (
    <footer className="h-12 border-t border-[var(--line)] bg-[var(--header-bg)] backdrop-blur flex items-center px-8 text-xs text-[var(--sea-ink-soft)]">
      {restaurant.name} . All rights reserved. © {new Date().getFullYear()}
    </footer>
  );
}
