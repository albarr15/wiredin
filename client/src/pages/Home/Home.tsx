import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

export default function Home() {
  useEffect(() => {
    const checkAuth = async () => {
      const { error } = await supabase.auth.getUser();

      if (error) {
        location.href = "/login";
      }
    };
    checkAuth();
  }, []);

  return (
    <>
      <h1>Home Page</h1>
    </>
  );
}
