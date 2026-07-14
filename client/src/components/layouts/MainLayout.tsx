import { Outlet } from "react-router";
import { Button } from "../ui/button";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/context/AuthContext";

export default function MainLayout() {
  const { user } = useAuth();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error: Sign out failed, ", error);
    }
  };

  return (
    <>
      {/* TODO: NAVBAR HERE */}
      <div className="w-full px-8 py-6 bg-amber-700">
        {user && <Button onClick={() => signOut()}>Sign out</Button>}
      </div>

      <div className="flex flex-col gap-8 px-8 py-8 lg:px-16">
        <Outlet />
      </div>
    </>
  );
}
