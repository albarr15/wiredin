import { useState, useRef, useMemo, useEffect, type KeyboardEvent } from "react";
import { PH_LOCATIONS } from "../constants/locations";

interface UseFilteredLocationsOptions {
  location: string;
  category: string;
  setLocation: (loc: string) => void;
  onSearch?: (searchParams: {
    category: string;
    location: string;
    coordinates?: { lat: number; lng: number };
    addressDetails?: Record<string, unknown>;
  }) => void;
}

export function useFilteredLocations({
  location,
  category,
  setLocation,
  onSearch,
}: UseFilteredLocationsOptions) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Filter locations based on input query
  const filteredLocations = useMemo(() => {
    const trimmed = location.trim().toLowerCase();
    if (!trimmed) {
      // Default suggestions when opened without typing (major cities & key regions)
      return PH_LOCATIONS.slice(0, 12);
    }
    return PH_LOCATIONS.filter(
      (loc) =>
        loc.name.toLowerCase().includes(trimmed)
    );
  }, [location]);

  // Reset highlight index when filtered list changes
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [filteredLocations]);

  // Click outside listener to dismiss suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll("li");
      const activeItem = items[highlightedIndex];
      if (activeItem) {
        activeItem.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex]);

  const handleSelectLocation = (locName: string) => {
    setLocation(locName);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        let detectedAddress = "Current Location";
        let rawAddress: Record<string, unknown> | undefined;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          if (res.ok) {
            const data = await res.json();
            rawAddress = data.address;
            if (data.display_name) {
              detectedAddress = data.display_name;
            } else if (data.address) {
              detectedAddress = Object.values(data.address)
                .filter(Boolean)
                .join(", ");
            }
          }
        } catch {
          // Fallback to "Current Location"
        }

        setLocation(detectedAddress);
        setIsLocating(false);
        setIsOpen(false);
        inputRef.current?.focus();
        onSearch?.({
          category,
          location: detectedAddress,
          coordinates: { lat: latitude, lng: longitude },
          addressDetails: rawAddress,
        });
      },
      (err) => {
        setIsLocating(false);
        if (err.code === err.PERMISSION_DENIED) {
          setLocationError("Location permission denied. Please allow in browser.");
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          setLocationError("Location unavailable. Try again.");
        } else if (err.code === err.TIMEOUT) {
          setLocationError("Location request timed out. Try again.");
        } else {
          setLocationError("Could not detect location.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const totalItems = 1 + filteredLocations.length;

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setIsOpen(true);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < totalItems - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : totalItems - 1));
    } else if (e.key === "Enter") {
      if (isOpen && highlightedIndex === 0) {
        e.preventDefault();
        handleUseCurrentLocation();
      } else if (
        isOpen &&
        highlightedIndex > 0 &&
        filteredLocations[highlightedIndex - 1]
      ) {
        e.preventDefault();
        handleSelectLocation(filteredLocations[highlightedIndex - 1].name);
      } else {
        setIsOpen(false);
        onSearch?.({ category, location });
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return {
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
  };
}
