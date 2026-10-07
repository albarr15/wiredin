import { Outlet } from "react-router";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/context/AuthContext";
import NavigationBar from "../NavigationBar";

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
      <NavigationBar />
      <div className="flex flex-col gap-8 px-8 py-8 lg:px-16">
        <Outlet />
      </div>
    </>
  );
}
