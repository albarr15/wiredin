import { useEffect, useState } from "react";
import { DashboardSearchBar } from "@/components/home/DashboardSearchBar";
import PlaceTypeSelect from "./PlaceTypeSelect";
import AmenitiesSelect from "./AmenitiesSelect";
import { Toggle } from "@/components/ui/toggle";
import { PlugIcon, WifiIcon } from "lucide-react";
import PlaceCard from "@/components/home/PlaceCard";
import { Link } from "react-router";
import { ZodUUID } from "zod";
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
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@/components/ui/spinner";

// TODO: import shared types from backend to maintain consistency
type Place = {
  id: ZodUUID;
  name: string;
  address_id: ZodUUID;
  created_by: ZodUUID;
  category: string;
  pricing_tier: string | null;
  image_url: string | null;
  phone: string | null;
  email_address: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  tiktok_url: string | null;
  website_url: string | null;
};

export default function Home() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { session } = useAuth();
  const [places, setPlaces] = useState<Place[] | null>(null);

  useEffect(() => {
    const getPlaces = async () => {
      setError(null);
      setIsLoading(true);

      try {
        const response = await fetch("/api/places?limit=3&page=1", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error occurred when fetching places.");
        }

        const data = await response.json();
        console.log("Success:", data);

        setSuccess(true);
        setPlaces(data.data);
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    getPlaces();
  }, []);

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
          {isLoading && (
            <div className="flex gap-1 items-center">
              <Spinner /> <span>Fetching places...</span>
            </div>
          )}

          {places &&
            // TODO: create props in PlaceCard for eaach attribute
            places.map((place, index) => (
              <Link to="/places/1" key={index}>
                <PlaceCard />
              </Link>
            ))}
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
