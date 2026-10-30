import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PLACE_CATEGORIES } from "../constants/categories";

interface CategoryDropdownProps {
  category: string;
  onCategoryChange: (value: string) => void;
}

export function CategoryDropdown({
  category,
  onCategoryChange,
}: CategoryDropdownProps) {
  const activeCategory =
    PLACE_CATEGORIES.find((cat) => cat.value === category) ??
    PLACE_CATEGORIES[0];
  const CategoryIcon = activeCategory.icon;

  return (
    <div className="flex items-center shrink-0">
      <Select value={category} onValueChange={onCategoryChange}>
        <SelectTrigger className="border-0 shadow-none bg-transparent hover:bg-muted/70 h-9 px-2.5 rounded-lg font-medium text-foreground gap-1.5 cursor-pointer focus-visible:ring-0 focus:ring-0">
          <SelectValue placeholder="Place">
            <span className="flex items-center gap-1.5">
              <CategoryIcon className="size-4 text-muted-foreground shrink-0" />
              <span>{activeCategory.label}</span>
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent position="popper" align="start" className="min-w-40">
          {PLACE_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <SelectItem key={cat.value} value={cat.value}>
                <span className="flex items-center gap-2">
                  <Icon className="size-4 text-muted-foreground shrink-0" />
                  <span>{cat.label}</span>
                </span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
