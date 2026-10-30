import AmenitiesSelect from "@/pages/Home/AmenitiesSelect";
import PlaceTypeSelect from "@/pages/Home/PlaceTypeSelect";
import { WifiIcon, PlugIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

export default function DashboardFilter() {
    return (
        <div className="flex gap-2 w-full">
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
    )
}