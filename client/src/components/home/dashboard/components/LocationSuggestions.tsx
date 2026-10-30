import * as React from "react";
import { MapPin, Compass } from "lucide-react";
import { cn } from "cn";
import { type LocationItem } from "../constants/locations";
import { UseCurrentLocationItem } from "./UseCurrentLocationItem";

interface LocationSuggestionsProps {
  location: string;
  filteredLocations: LocationItem[];
  highlightedIndex: number;
  isLocating: boolean;
  locationError: string | null;
  listRef: React.RefObject<HTMLUListElement | null>;
  onSelectCurrentLocation: () => void;
  onSelectLocation: (name: string) => void;
  onHighlightIndex: (index: number) => void;
}

export function LocationSuggestions({
  location,
  filteredLocations,
  highlightedIndex,
  isLocating,
  locationError,
  listRef,
  onSelectCurrentLocation,
  onSelectLocation,
  onHighlightIndex,
}: LocationSuggestionsProps) {
  return (
    <div className="absolute left-0 right-0 sm:left-24 sm:right-28 mt-2 z-50 rounded-xl border border-border bg-popover text-popover-foreground shadow-lg overflow-hidden animate-in fade-in-0 zoom-in-95">
      <div className="px-3 py-2 border-b border-border/50 bg-muted/30 flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {location
            ? "Suggestions in the Philippines"
            : "Popular Cities & Regions (PH)"}
        </span>
        <span>{filteredLocations.length} results</span>
      </div>

      <ul
        ref={listRef}
        className="max-h-72 overflow-y-auto p-1.5 space-y-0.5 select-none"
      >
        {/* First suggestion: Use your own location */}
        <UseCurrentLocationItem
          isLocating={isLocating}
          locationError={locationError}
          isHighlighted={highlightedIndex === 0}
          onSelect={onSelectCurrentLocation}
          onMouseEnter={() => onHighlightIndex(0)}
        />

        {filteredLocations.length > 0 ? (
          filteredLocations.map((loc, idx) => {
            const itemIndex = idx + 1;
            const isSelected = highlightedIndex === itemIndex;
            return (
              <li
                key={`${loc.name}-${loc.area}`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onSelectLocation(loc.name);
                }}
                onMouseEnter={() => onHighlightIndex(itemIndex)}
                className={cn(
                  "flex items-center justify-between px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors",
                  isSelected
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-muted/70 text-foreground"
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {loc.type === "city" ? (
                    <MapPin className="size-4 text-muted-foreground shrink-0" />
                  ) : (
                    <Compass className="size-4 text-muted-foreground shrink-0" />
                  )}
                  <span className="font-medium truncate">{loc.name}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span className="text-xs text-muted-foreground">
                    {loc.area}
                  </span>
                  <span
                    className={cn(
                      "text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded",
                      loc.type === "city"
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-primary/20 text-foreground"
                    )}
                  >
                    {loc.type}
                  </span>
                </div>
              </li>
            );
          })
        ) : (
          <li className="py-6 text-center text-sm text-muted-foreground truncate">
            No cities or regions found matching "{location}".
          </li>
        )}
      </ul>
    </div>
  );
}
