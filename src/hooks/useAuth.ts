import { authClient } from "#/lib/auth-client";
import { useNavigate } from "@tanstack/react-router";

export function useSignOut() {
  const navigate = useNavigate();

  const signOutAndRedirect = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            void navigate({ to: "/", replace: true });
          },
        },
      });
    } catch (error) {
      console.error("Sign out failed:", error);
      // fallback
      void navigate({ to: "/", replace: true });
    }
  };

  return { signOutAndRedirect };
}
