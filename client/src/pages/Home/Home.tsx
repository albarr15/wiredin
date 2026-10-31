import { useEffect, useState } from "react";
import PlaceCard from "@/components/home/PlaceCard/PlaceCard";
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
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@/components/ui/spinner";
import SampleImg from "@/assets/hero.png";
import { type Place } from "@wiredin/types";
import { DashboardSearchBar } from "@/components/home/dashboard/DashboardSearchBar";
import DashboardFilter from "@/components/home/dashboard/DashboardFilter";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

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
    <div className="flex min-h-full w-full *:py-6 *:px-2 *:sm:px-6">
      <main className="flex flex-col gap-2 flex-1">
        <DashboardSearchBar />
        <DashboardFilter />

        <div className="flex flex-col mt-8 gap-4">
          {isLoading && (
            <div className="flex gap-1 items-center">
              <Spinner /> <span>Fetching places...</span>
            </div>
          )}

          {places &&
            // TODO: fetch necessary
            places.map((place, index) => {
              const placeProps = {
                id: place.id,
                name: place.name,
                category: place.category,
                pricing_tier: place.pricing_tier,
                image_url: place.image_url ?? SampleImg,
              };
              return (
                <Link to="/places/1" key={index}>
                  <PlaceCard {...placeProps} />
                </Link>
              );
            })}
        </div>
      </main>
      <aside className="bg-secondary lg:w-1/2 md:w-1/3 hidden md:flex lg:shrink-0 lg:sticky lg:self-start lg:h-[calc(100vh-80px)] lg:top-17.25 items-center">
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
