import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { DashboardSearchBar } from "@/components/home/DashboardSearchBar";
import PlaceTypeSelect from "./PlaceTypeSelect";
import AmenitiesSelect from "./AmenitiesSelect";
import { Toggle } from "@/components/ui/toggle";
import { PlugIcon, WifiIcon } from "lucide-react";
import PlaceCard from "@/components/home/PlaceCard";
import { Link } from "react-router";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Home() {
  const [open, setOpen] = useState(false);

  const { user } = useAuth();

  const checkAuth = async () => {
    if (!user) {
      setOpen(true);
      return;
    }
  };

  return (
    <div className="flex min-h-screen *:flex *:flex-1 *:p-6">
      <div className="flex flex-col gap-2">
        <DashboardSearchBar />
        <div className="flex gap-2">
          <PlaceTypeSelect />
          <AmenitiesSelect />
          <Toggle
            aria-label="Toggle wifi"
            size="sm"
            variant="outline"
            className="focus:bg-primary focus:text-foreground h-full"
          >
            <WifiIcon />
            With Wifi
          </Toggle>
          <Toggle
            aria-label="Toggle outlets"
            size="sm"
            variant="outline"
            className="focus:bg-primary focus:text-foreground h-full"
          >
            <PlugIcon />
            With Outlets
          </Toggle>
        </div>

        <div className="flex flex-col mt-8 gap-4">
          <Link to="/places/1">
            <PlaceCard />
          </Link>
          <Link to="/places/1">
            <PlaceCard />
          </Link>{" "}
          <Link to="/places/1">
            <PlaceCard />
          </Link>{" "}
          <Link to="/places/1">
            <PlaceCard />
          </Link>{" "}
          <Link to="/places/1">
            <PlaceCard />
          </Link>
        </div>
      </div>
      <div className="bg-secondary sticky self-start min-h-screen top-0">
        {" "}
        abc
      </div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        {open && (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Create an Account to Continue</AlertDialogTitle>
              <AlertDialogDescription>
                Sign up for free to submit places, write reviews, and bookmark
                your favorite spots. Help others find their next work-friendly
                place!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <Link to="/sign-up">
                <AlertDialogAction>Create an account</AlertDialogAction>
              </Link>
            </AlertDialogFooter>
          </AlertDialogContent>
        )}
      </AlertDialog>
    </div>
  );
}
