import * as React from "react";
import { Navigation, Loader2 } from "lucide-react";
import { cn } from "cn";

interface UseCurrentLocationItemProps {
  isLocating: boolean;
  locationError: string | null;
  isHighlighted: boolean;
  onSelect: () => void;
  onMouseEnter: () => void;
}

export function UseCurrentLocationItem({
  isLocating,
  locationError,
  isHighlighted,
  onSelect,
  onMouseEnter,
}: UseCurrentLocationItemProps) {
  return (
    <li
      onMouseDown={(e) => {
        e.preventDefault();
        onSelect();
      }}
      onMouseEnter={onMouseEnter}
      className={cn(
        "flex items-center justify-between px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors border-b border-border/40 mb-1",
        isHighlighted
          ? "bg-accent text-accent-foreground"
          : "hover:bg-muted/70 text-foreground",
        isLocating && "opacity-80"
      )}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="flex items-center justify-center size-7 rounded-full bg-primary/15 text-primary shrink-0">
          {isLocating ? (
            <Loader2 className="size-4 animate-spin text-primary" />
          ) : (
            <Navigation className="size-4 text-primary fill-primary/30" />
          )}
        </div>
        <div className="flex flex-col text-left min-w-0">
          <span className="font-semibold text-foreground text-sm flex items-center gap-1.5">
            {isLocating ? "Detecting location..." : "Use your own location"}
          </span>
          <span
            className={cn(
              "text-xs truncate",
              locationError
                ? "text-destructive font-medium"
                : "text-muted-foreground"
            )}
          >
            {locationError || "Prompt device for GPS location"}
          </span>
        </div>
      </div>
    </li>
  );
}
