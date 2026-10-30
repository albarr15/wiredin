import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { CategoryDropdown } from "./components/CategoryDropdown";
import { LocationInput } from "./components/LocationInput";
import { LocationSuggestions } from "./components/LocationSuggestions";
import { useFilteredLocations } from "./hooks/useFilteredLocations";

export interface DashboardSearchBarProps {
  defaultCategory?: string;
  defaultLocation?: string;
  onSearch?: (searchParams: {
    category: string;
    location: string;
    coordinates?: { lat: number; lng: number };
    addressDetails?: Record<string, unknown>;
  }) => void;
  className?: string;
}

export function DashboardSearchBar({
  defaultCategory = "place",
  defaultLocation = "",
  onSearch,
  className,
}: DashboardSearchBarProps) {
  const [category, setCategory] = React.useState(defaultCategory);
  const [location, setLocation] = React.useState(defaultLocation);

  const {
    isOpen,
    setIsOpen,
    highlightedIndex,
    setHighlightedIndex,
    isLocating,
    locationError,
    filteredLocations,
    containerRef,
    inputRef,
    listRef,
    handleSelectLocation,
    handleUseCurrentLocation,
    handleKeyDown,
  } = useFilteredLocations({
    location,
    category,
    setLocation,
    onSearch,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
    onSearch?.({ category, location });
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-full h-12 rounded-xl border border-input bg-card shadow-xs px-2.5 gap-2 transition-all focus-within:ring-2 focus-within:ring-ring/40 focus-within:border-ring"
      >
        {/* 1. Category Dropdown */}
        <CategoryDropdown
          category={category}
          onCategoryChange={setCategory}
        />

        {/* Connector: "in" */}
        <span className="text-muted-foreground text-sm font-normal select-none shrink-0 px-0.5">
          in
        </span>

        {/* 2. Location Input */}
        <LocationInput
          inputRef={inputRef}
          location={location}
          onLocationChange={(val) => {
            setLocation(val);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onClick={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />

        {/* 3. Search Action */}
        <Button
          type="submit"
          size="sm"
          className="shrink-0 rounded-lg px-3.5 h-8.5 font-medium gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 transition-all cursor-pointer shadow-xs"
        >
          <Search className="size-4" />
          <span className="hidden sm:inline">Search</span>
        </Button>
      </form>

      {/* Location Suggestions Dropdown */}
      {isOpen && (
        <LocationSuggestions
          location={location}
          filteredLocations={filteredLocations}
          highlightedIndex={highlightedIndex}
          isLocating={isLocating}
          locationError={locationError}
          listRef={listRef}
          onSelectCurrentLocation={handleUseCurrentLocation}
          onSelectLocation={handleSelectLocation}
          onHighlightIndex={setHighlightedIndex}
        />
      )}
    </div>
  );
}
