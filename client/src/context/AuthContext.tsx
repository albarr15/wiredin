import { createContext, useState, useContext, useEffect } from "react";
import { type User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";

const AuthContext = createContext<User | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);

      if (event === "INITIAL_SESSION") {
        // handle initial session
        setUser(session?.user ?? null);
      } else if (event === "SIGNED_IN") {
        // handle sign in event
        setUser(session?.user ?? null);
      } else if (event === "SIGNED_OUT") {
        // handle sign out event

        console.log("SIGNED_OUT", session);
        // clear local and session storage

        setUser(null);
      } else if (event === "PASSWORD_RECOVERY") {
        // handle password recovery event
      } else if (event === "TOKEN_REFRESHED") {
        // handle token refreshed event
      } else if (event === "USER_UPDATED") {
        // handle user updated event
      }
    });

    return () => {
      // call unsubscribe to remove the callback
      subscription.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
