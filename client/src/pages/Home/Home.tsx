import { useState } from "react";
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

  return (
    <div className="flex min-h-full w-full *:p-6">
      <main className="flex flex-col gap-2 flex-1">
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
      </main>
      <aside className="bg-secondary flex-1 lg:w-1/2 md:w-1/3 hidden md:flex lg:shrink-0 lg:sticky lg:self-start lg:h-[calc(100vh-80px)] lg:top-17.25 items-center">
        abc
      </aside>
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
