import { createContext, useState, useContext, useEffect } from "react";
import { type Session, type User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isOnboardDialogOpen: boolean;
  openOnboardDialog: () => void;
  closeOnboardDialog: () => void;
};

const AuthContext = createContext<AuthContextValue>({
  session: null,
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isOnboardDialogOpen: false,
  openOnboardDialog: () => {},
  closeOnboardDialog: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboardDialogOpen, setIsOnboardDialogOpen] = useState(false);

  const openOnboardDialog = () => setIsOnboardDialogOpen(true);
  const closeOnboardDialog = () => setIsOnboardDialogOpen(false);
  const user = session?.user ?? null;
  const isAuthenticated = !!user;

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
          const hasUsername = user.user_metadata.user_name;

          if (!hasUsername) {
            alert("User missing username ...");
            openOnboardDialog();
          }
        }
      } else if (event === "SIGNED_OUT") {
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
    <AuthContext.Provider
      value={{
        session,
        user,
        isAuthenticated,
        isLoading,
        isOnboardDialogOpen,
        openOnboardDialog,
        closeOnboardDialog,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

// export const useAuth = () => {
//   const { session, isLoading } = useContext(AuthContext);
//   return {
//     session,
//     user: session?.user ?? null,
//     isAuthenticated: !!session?.user,
//     isLoading,
//   };
// };
