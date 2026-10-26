import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ClockIcon,
  CoffeeIcon,
  HeartIcon,
  MapPinIcon,
  MapPinnedIcon,
  PhilippinePesoIcon,
  BookIcon,
  BriefcaseIcon,
  type LucideIcon,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { PlaceAmenities } from "./PlaceAmenities";

import {
  type Address,
  type Amenity,
  type Place,
  type ScheduleDay,
} from "@wiredin/types";
import { useEffect, useState } from "react";
import { PlaceRating } from "./PlaceRating";
import { useAuth } from "@/context/AuthContext";

type NonPlaceProps = {
  rating: number;
  reviews_amount: number | null;
  // location: string;
  schedule: string | null;
  amenities: string[];
};

type PlaceCardProps = Pick<
  Place,
  "id" | "name" | "category" | "pricing_tier" | "image_url"
> &
  NonPlaceProps;

export default function PlaceCard(props: PlaceCardProps) {
  const placeIcons: Record<string, LucideIcon> = {
    CAFE: CoffeeIcon,
    COWORKING_SPACE: BriefcaseIcon,
    LIBRARY: BookIcon,
    OTHER: MapPinnedIcon,
  };

  const PlaceIcon = placeIcons[props.category];

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [place, setPlace] = useState<Place | null>(null);

  const { session } = useAuth();

  useEffect(() => {
    const getPlace = async (id: string) => {
      setError(null);
      setIsLoading(true);

      try {
        const response = await fetch(
          `/api/places/${id}?include=addresses,amenities,schedules`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.access_token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Error occurred when fetching place.");
        }

        const data = await response.json();

        setSuccess(true);
        setPlace(data.data[0]);
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    getPlace(props.id);
  }, []);
  const address = place?.addresses?.[0];
  const amenitiesData = place?.amenities?.[0];
  const schedule = place?.schedules ?? [];

  const activeAmenities: string[] = amenitiesData
    ? Object.entries(amenitiesData)
        .filter(([key]) => key.startsWith("has_") || key.startsWith("is_"))
        .filter(([, value]) => Boolean(value))
        .map(([key]) => key)
    : (props.amenities ?? []);

  const fullAddress = Object.entries(address ?? {})
    .filter(([key]) => !["place_id", "updated_at", "created_at"].includes(key))
    .map(([, value]) => value)
    .join(", ");

  return (
    <Card className={"flex flex-row! @container max-h-56"}>
      <img
        src={props.image_url}
        className="object-cover w-1/3 border rounded m-2 shadow-sm"
      ></img>
      <div className="flex flex-col w-full h-full gap-(--card-spacing) pt-(--card-spacing)!">
        <CardHeader>
          <div className="flex flex-row gap-2">
            <CardTitle>{props.name}</CardTitle>
            {}
            <PlaceIcon strokeWidth={1.5} size={18} strokeOpacity={0.8} />
          </div>
          <CardDescription>
            {props.rating && <PlaceRating rating={props.rating} />}
          </CardDescription>
          <CardAction>
            <Toggle variant="outline" aria-label="Toggle save">
              <HeartIcon />
              Save
            </Toggle>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 items-start">
              <MapPinIcon strokeWidth={1.5} size={18} strokeOpacity={1} />
              {address && fullAddress}
              {!address && "..."}
            </div>

            <div className="flex flex-row gap-8 w-full ">
              {props.schedule && (
                <div className="flex gap-1 items-center">
                  <ClockIcon strokeWidth={1.5} size={16} strokeOpacity={1} />
                  {props.schedule}
                </div>
              )}
              {props.pricing_tier && (
                <div className="flex gap-1 items-center">
                  <PhilippinePesoIcon
                    strokeWidth={1.5}
                    size={16}
                    strokeOpacity={1}
                  />
                  {props.pricing_tier}
                </div>
              )}
            </div>
            <PlaceAmenities amenities={activeAmenities} />
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
