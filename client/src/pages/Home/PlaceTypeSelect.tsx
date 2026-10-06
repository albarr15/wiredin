import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PlaceTypeSelect() {
  return (
    <Select>
      <SelectTrigger className="w-full max-w-40">
        <SelectValue placeholder="Select type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Place Types</SelectLabel>
          <SelectItem value="cafe">Cafe</SelectItem>
          <SelectItem value="coworking-space">Coworking Space</SelectItem>
          <SelectItem value="library">Library</SelectItem>
          <SelectItem value="others">Others</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
