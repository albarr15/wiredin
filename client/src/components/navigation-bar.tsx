import { Button } from "./ui/button";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router";
import { Spinner } from "./ui/spinner";
import { useState } from "react";

export default function NavigationBar() {
  const { user } = useAuth();
  const isUserFound = user ? true : false;

  const [isSignOutLoading, setIsSignOutLoading] = useState(false);

  const signOut = async () => {
    if (isSignOutLoading) return;

    setIsSignOutLoading(true);
    try {
      const { error } = await supabase.auth.signOut({ scope: "local" });

      if (error) throw error;
    } catch (err) {
      console.error("Error: Sign out failed, ", err);
    } finally {
      setIsSignOutLoading(false);
    }
  };

  return (
    <nav className="w-full px-8 py-4 border-b">
      <div className="flex items-center justify-between">
        <Button variant={"ghost"}>WiredIn</Button>
        <div className="flex gap-4">
          {isUserFound && (
            <Button
              variant={"outline"}
              onClick={() => signOut()}
              disabled={isSignOutLoading}
            >
              {isSignOutLoading && <Spinner data-icon="inline-start" />}
              Sign out
            </Button>
          )}
          {!isUserFound && (
            <>
              <Link to="/login">
                <Button variant={"outline"}>Log-in</Button>
              </Link>
              <Link to="/sign-up">
                <Button>Sign-up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
