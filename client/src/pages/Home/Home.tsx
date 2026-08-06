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
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
        </div>
        <div className="bg-secondary p-6 pr-8 hidden md:block md:flex-1">
          {/* map here */}
        </div>
      </div>
    </>
  );
}
