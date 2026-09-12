import { createContext, useState, useContext, useEffect } from "react";
import { type Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";
import OnboardUserDialog from "@/components/OnboardUserDialog";

type AuthContextValue = {
  session: Session | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextValue>({
  session: null,
  isLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboardUserDialog, setShowOnboardUserDialog] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    // handles auth events after initial load
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);

      if (event === "SIGNED_IN" && session) {
        // handle sign in event

        const user = session.user;

        // // Check if the email was confirmed within the last few seconds
        if (user) {
          const emailConfirmedAt = user.confirmed_at
            ? new Date(user.confirmed_at).getTime()
            : null;

          if (!emailConfirmedAt) return; // not confirmed yet

          const now = new Date().getTime();
          const isJustConfirmed = now - emailConfirmedAt < 1000 * 120;

          if (isJustConfirmed) {
            alert("User just finished confirming their email!");
            // Trigger your welcome modal, analytics, or redirect here
            // TODO: trigger dialog here
            setShowOnboardUserDialog(true);
          }
        }
      } else if (event === "SIGNED_OUT") {
        console.log("SIGNED_OUT", session);
        setSession(null);
      } else if (event === "PASSWORD_RECOVERY") {
        // handle password recovery event
      } else if (event === "TOKEN_REFRESHED") {
        // handle token refreshed event
      } else if (event === "USER_UPDATED") {
        // handle user updated event
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const { session, isLoading } = useContext(AuthContext);
  return {
    session,
    user: session?.user ?? null,
    isAuthenticated: !!session?.user,
    isLoading,
  };
};
