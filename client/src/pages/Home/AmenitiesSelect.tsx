import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AmenitiesSelect() {
  return (
    <Select>
      <SelectTrigger className="w-full max-w-40">
        <SelectValue placeholder="Select amenity" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Amenities</SelectLabel>
          <SelectItem value="wifi">Wifi</SelectItem>
          <SelectItem value="outlets">Outlets</SelectItem>
          <SelectItem value="parking">Parking</SelectItem>
          <SelectItem value="airconditioning">Airconditioning</SelectItem>
          <SelectItem value="toilets">Toilets</SelectItem>
          <SelectItem value="meeting-rooms">Meeting Rooms</SelectItem>
          <SelectItem value="pet-friendly">Pet-friendly</SelectItem>
          <SelectItem value="free-water">Free Water</SelectItem>
          <SelectItem value="free-snacks">Free Snacks</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
