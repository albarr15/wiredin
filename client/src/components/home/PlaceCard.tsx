import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import SampleImg from "@/assets/hero.png";
import {
  ClockIcon,
  CoffeeIcon,
  HeartIcon,
  MapPinIcon,
  PhilippinePesoIcon,
  PlugIcon,
  StarIcon,
  WifiIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "../ui/toggle";

import { cn } from "@/lib/utils";

export default function PlaceCard({
  className,
  onClick,
  // TODO: create sm size for mobile UI
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <Card
      onClick={onClick}
      className={cn("flex flex-row! @container max-h-56", className)}
    >
      <img
        src={SampleImg}
        className="object-cover w-1/3 border rounded m-2 shadow-sm"
      ></img>
      <div className="flex flex-col w-full h-full gap-(--card-spacing) pt-(--card-spacing)!">
        <CardHeader>
          <div className="flex flex-row gap-2">
            <CardTitle>Elsewhere Cafe</CardTitle>
            <CoffeeIcon strokeWidth={1.5} size={18} strokeOpacity={0.8} />
          </div>
          <CardDescription>
            <div className="flex gap-2 items-center">
              4.8
              <div className="flex gap-0.3">
                <StarIcon
                  className="fill-amber-400"
                  strokeWidth={0}
                  size={16}
                />
                <StarIcon
                  className="fill-amber-400"
                  strokeWidth={0}
                  size={16}
                />
                <StarIcon
                  className="fill-amber-400"
                  strokeWidth={0}
                  size={16}
                />
                <StarIcon
                  className="fill-amber-400"
                  strokeWidth={0}
                  size={16}
                />
                <StarIcon
                  className="fill-amber-400"
                  strokeWidth={0}
                  size={16}
                />
              </div>
              (15 reviews)
            </div>
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
              3/F, 2510 Taft Ave, Malate, Manila, 1004 Metro Manila
            </div>

            <div className="flex flex-row gap-8 w-full ">
              <div className="flex gap-1 items-center">
                <ClockIcon strokeWidth={1.5} size={16} strokeOpacity={1} />
                10:00 AM - 5:00 PM
              </div>
              <div className="flex gap-1 items-center">
                <PhilippinePesoIcon
                  strokeWidth={1.5}
                  size={16}
                  strokeOpacity={1}
                />
                1 - 200
              </div>
            </div>
            <div className="flex flex-wrap gap-2 w-full mt-2">
              <Badge>
                <WifiIcon /> With Wifi
              </Badge>
              <Badge>
                <PlugIcon /> With Outlets
              </Badge>
              <Badge>
                <PlugIcon /> With Outlets
              </Badge>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
