import * as React from "react";
import { X } from "lucide-react";

interface LocationInputProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  location: string;
  onLocationChange: (val: string) => void;
  onFocus: () => void;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function LocationInput({
  inputRef,
  location,
  onLocationChange,
  onFocus,
  onClick,
  onKeyDown,
}: LocationInputProps) {
  return (
    <div className="relative flex-1 min-w-0 flex items-center">
      <input
        ref={inputRef}
        type="text"
        value={location}
        placeholder="Manila"
        autoComplete="off"
        spellCheck="false"
        onClick={onClick}
        onFocus={onFocus}
        onChange={(e) => onLocationChange(e.target.value)}
        onKeyDown={onKeyDown}
        className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none border-0 focus:ring-0 focus:outline-none pr-6 truncate"
      />

      {location && (
        <button
          type="button"
          onClick={() => {
            onLocationChange("");
            onClick();
            inputRef.current?.focus();
          }}
          className="absolute right-0 text-muted-foreground hover:text-foreground p-0.5 rounded-full hover:bg-muted transition-colors cursor-pointer"
          aria-label="Clear location"
        >
          <X className="size-3.5" />
        </button>
      )}
    </div>
  );
}
