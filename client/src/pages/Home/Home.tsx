import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { DashboardSearchBar } from "@/components/home/DashboardSearchBar";
import PlaceTypeSelect from "./PlaceTypeSelect";
import AmenitiesSelect from "./AmenitiesSelect";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { BookmarkIcon, PlugIcon, WifiIcon } from "lucide-react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [alignItemWithTrigger, setAlignItemWithTrigger] = useState(true);

  const { user } = useAuth();

  const checkAuth = async () => {
    if (!user) {
      setOpen(true);
      return;
    }
  };

  return (
    <div className="flex h-full *:flex *:flex-1 *:p-6">
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
      </div>
      <div className="bg-secondary"></div>
    </div>
    /*
    <>
    // TODO: Integrate to current dashboard
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
      <Card onClick={() => checkAuth()}>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </> */
  );
}
