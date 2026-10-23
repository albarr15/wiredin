import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  AirVentIcon,
  BookIcon,
  BriefcaseIcon,
  ClockIcon,
  CoffeeIcon,
  CookieIcon,
  DogIcon,
  GlassWaterIcon,
  HeartIcon,
  MapPinIcon,
  MapPinnedIcon,
  PhilippinePesoIcon,
  PlugIcon,
  SquareParkingIcon,
  StarIcon,
  ToiletIcon,
  WifiIcon,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "../ui/toggle";

import { type Address, type Place } from "@wiredin/types";
import { useEffect, useState } from "react";

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

  const amenityIcons: Record<string, LucideIcon> = {
    has_wifi: WifiIcon,
    has_outlets: PlugIcon,
    has_parking: SquareParkingIcon,
    has_toilets: ToiletIcon,
    has_free_snacks: CookieIcon,
    has_free_water: GlassWaterIcon,
    has_airconditioning: AirVentIcon,
    is_pet_friendly: DogIcon,
  };

  const PlaceIcon = placeIcons[props.category];

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [address, setAddress] = useState<Address | null>(null);
  const fullAddress = Object.entries(address ?? {})
    .filter(([key]) => !["place_id", "updated_at", "created_at"].includes(key))
    .map(([, value]) => value)
    .join(", ");

  useEffect(() => {
    const getAddress = async () => {
      console.log("getting addres for place ", props.id);
      setError(null);
      setIsLoading(true);

      try {
        const response = await fetch(`/api/places/${props.id}/addresses`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error occurred when fetching address.");
        }

        const data = await response.json();
        console.log("Success:", data);

        setSuccess(true);
        setAddress(data.data);
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    getAddress();
  }, []);

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
            {props.rating > 0 && (
              <div className="flex gap-2 items-center">
                {props.rating}
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }, (_, index) => (
                    <StarIcon
                      key={index}
                      className={
                        index < Math.round(props.rating)
                          ? "fill-amber-400"
                          : "fill-secondary"
                      }
                      strokeWidth={0}
                      size={16}
                    />
                  ))}
                </div>
              </div>
            )}
            {props.rating <= 0 && (
              <div className="flex gap-2 items-center">
                <StarIcon
                  className="fill-secondary"
                  strokeWidth={0}
                  size={16}
                />
                No ratings yet
              </div>
            )}
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
            <div className="flex flex-wrap gap-2 w-full mt-2">
              {props.amenities.map((amenity, index) => {
                const AmenityIcon = amenityIcons[amenity];

                return (
                  <Badge key={index}>
                    <AmenityIcon /> {amenity}
                  </Badge>
                );
              })}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
