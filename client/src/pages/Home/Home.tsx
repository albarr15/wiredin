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
import { Link } from "react-router";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { MapPin, PlugIcon, SearchIcon, WifiIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import {
  Combobox,
  ComboboxInput,
  ComboboxEmpty,
  ComboboxList,
  ComboboxItem,
  ComboboxContent,
  ComboboxValue,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
} from "@/components/ui/combobox";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PlaceCard from "@/components/place-card";
import { z } from "zod";

export default function Home() {
  const [open, setOpen] = useState(false);
  const { session, user } = useAuth();

  const checkAuth = async () => {
    if (!user) {
      setOpen(true);
      return;
    }

    // TODO: edit this to the target protected route

    console.log("fetching backend user data ...");
    fetch("/api/profile", {
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        location.href = "/profile";
      })
      .catch((error) => console.error("Error fetching data: ", error));
  };

  const categories = ["Cafe", "Coworking Space", "Library", "Other"];
  const [hasWifi, setHasWifi] = useState(false);
  const [hasOutlets, setHasOutlets] = useState(false);

  const amenities = [
    "Parking",
    "Air Conditioning",
    "Toilets",
    "Meeting Rooms",
    "Pet-friendly",
    "Free Water",
    "Free Snacks",
  ];

  const [selectedAmenities, setSelectedAmenities] = React.useState<string[]>(
    [],
  );

  const PlaceSchema = z.object({
    id: z.uuid(),
    name: z.string(),
    address_id: z.uuid(),
    created_by: z.uuid(),
    category: z.enum(["CAFE", "COWORKING_SPACE", "LIBRARY", "OTHER"]),

    // optionals
    pricing_tier: z
      .string()
      .regex(/^\d+-\d+$/, {
        error:
          "The pricing_tier must follow the format: [lowest_price]-[highest_price]",
      })
      .optional(),
    image_url: z.preprocess(
      (value) => (value === "" ? undefined : value),
      z.url().optional(),
    ),
    phone: z
      .string()
      .regex(/^\+639\d{9}$/, {
        error: "The phone must follow the format: +639000000000 (no spaces)",
      })
      .optional(),
    email_address: z.email().optional(),
    facebook_url: z.url().optional(),
    instagram_url: z.url().optional(),
    tiktok_url: z.url().optional(),
    website_url: z.url().optional(),
  });
  type PlaceType = z.infer<typeof PlaceSchema>;

  const AmenitySchema = z.object({
    id: z.uuid(),
    place_id: z.uuid(),
    has_wifi: z.boolean(),
    wifi_quality: z.enum([
      "UNAVAILABLE",
      "SLOW",
      "MODERATE",
      "FAST",
      "UNKNOWN",
    ]),
    has_outlets: z.boolean(), // fixed: was missing ()
    outlet_availability: z.enum([
      "UNAVAILABLE",
      "FEW",
      "MODERATE",
      "MANY",
      "UNKNOWN",
    ]),
    noise_level: z.enum(["LOW", "MODERATE", "HIGH", "UNKNOWN"]),
    has_parking: z.boolean(),
    parking_availability: z.enum([
      "UNAVAILABLE",
      "LIMITED",
      "AVAILABLE",
      "UNKNOWN",
    ]),
    has_toilets: z.boolean(),
    has_meeting_rooms: z.boolean(),
    meeting_room_count: z.number(),
    has_free_snacks: z.boolean(),
    has_free_water: z.boolean(),
    has_airconditioning: z.boolean(),
    is_pet_friendly: z.boolean(),
  });

  type AmenityType = z.infer<typeof AmenitySchema>;

  const samplePlace: PlaceType = {
    id: "8f14e45f-ceea-4d29-b943-56c50b52d0e2",
    name: "Commune Café & Coworking",
    address_id: "a1b2c3d4-e5f6-4789-9abc-def012345678",
    created_by: "c9f8e7d6-b5a4-4392-8271-6f5e4d3c2b1a",
    category: "COWORKING_SPACE",

    // optionals
    pricing_tier: "200-500",
    image_url:
      "https://iaqyoyutytgsnvcziwrx.supabase.co/storage/v1/object/public/place-images/public/another%20name3/1785150961253-IMG_1556.JPG",
    phone: "+639171234567",
    email_address: "hello@communecafe.ph",
    facebook_url: "https://facebook.com/communecafeph",
    instagram_url: "https://instagram.com/communecafeph",
    tiktok_url: "https://tiktok.com/@communecafeph",
    website_url: "https://communecafe.ph",
  };

  const sampleAmenity: AmenityType = {
    id: "5b6c7d8e-9f0a-4b1c-8d2e-3f4a5b6c7d8e",
    place_id: "8f14e45f-ceea-4d29-b943-56c50b52d0e2",
    has_wifi: true,
    wifi_quality: "FAST",
    has_outlets: true,
    outlet_availability: "MANY",
    noise_level: "MODERATE",
    has_parking: true,
    parking_availability: "LIMITED",
    has_toilets: true,
    has_meeting_rooms: false,
    meeting_room_count: 0,
    has_free_snacks: false,
    has_free_water: true,
    has_airconditioning: true,
    is_pet_friendly: false,
  };

  return (
    <>
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
      <div className="flex w-full h-full justify-between">
        <div className="flex flex-col flex-1 md:flex-2 lg:flex-1 gap-6 p-6 pb-8 pl-8 bg-card w-full">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <MapPin size={20} strokeWidth={1.5} />
              <span className="underline cursor-pointer">
                Use your current location?
              </span>
            </div>
            <Button variant={"outline"}>Submit a Place</Button>
          </div>
          <ButtonGroup className="w-full h-12">
            <Input placeholder="Search..." className="h-full" />
            <Button
              variant="outline"
              className="h-full px-4"
              aria-label="Search"
            >
              <SearchIcon />
            </Button>
          </ButtonGroup>
          <div className="flex gap-2 items-center">
            <Combobox items={categories}>
              <ComboboxInput placeholder="Select Category" showClear />
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            <Combobox
              items={amenities}
              multiple
              value={selectedAmenities}
              onValueChange={setSelectedAmenities}
            >
              <ComboboxChips>
                <ComboboxValue>
                  {selectedAmenities.map((amenity) => (
                    <ComboboxChip key={amenity}>{amenity}</ComboboxChip>
                  ))}
                </ComboboxValue>
                <ComboboxChipsInput
                  placeholder={
                    selectedAmenities.length > 0 ? "" : "Select Amenities"
                  }
                />
              </ComboboxChips>
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>

            <Button
              variant={hasWifi ? "default" : "outline"}
              onClick={() => setHasWifi((prev) => !prev)}
            >
              <WifiIcon />
              With WiFi
            </Button>

            <Button
              variant={hasOutlets ? "default" : "outline"}
              onClick={() => setHasOutlets((prev) => !prev)}
            >
              <PlugIcon />
              With Outlets
            </Button>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">X results found.</span>
            <div className="flex gap-2 items-center">
              <span className="text-sm">Sort by: </span>
              <Select defaultValue="distance">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="distance">Nearest Distance</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="reviews">Most Reviewed</SelectItem>
                    <SelectItem value="newest">Recently Added</SelectItem>
                    <SelectItem value="price-asc">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-desc">
                      Price: High to Low
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <PlaceCard
            onClick={() => checkAuth()}
            place={samplePlace}
            amenity={sampleAmenity}
          ></PlaceCard>
        </div>
        <div className="bg-secondary p-6 pr-8 hidden md:block md:flex-1">
          {/* map here */}
        </div>
      </div>
    </>
  );
}
