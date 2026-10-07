import { Button } from "./ui/button";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

export default function () {
  const { user } = useAuth();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error: Sign out failed, ", error);
    }
  };

  return (
    <div className="sticky top-0 z-100 bg-background w-full px-8 py-4 border-b shadow-xs flex justify-between items-center">
      <Link to="/">
        <span className="font-semibold">WiredIn</span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link to="/">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link to="/profile">Profile</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div>
        {user && (
          <Button
            variant={"outline"}
            className="mr-4"
            onClick={() => signOut()}
          >
            Sign-out
          </Button>
        )}
        {!user && (
          <>
            <Link to="/login">
              <Button variant={"outline"} className="mr-4">
                Log-in
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button variant={"default"}>Sign-up</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
