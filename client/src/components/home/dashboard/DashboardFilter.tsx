import { useState, useEffect } from "react";
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
    SlidersHorizontal,
    Wifi,
    Plug,
    Snowflake,
    Car,
    Users,
    DoorClosed,
    PawPrint,
    Droplets,
    Cookie,
    RotateCcw,
    Volume2,
    Clock,
    Star,
    Volume1,
} from "lucide-react";

export interface DashboardFilterValues {
    amenities: string[];
    priceRange: [number, number];
    lowModerateNoise?: boolean;
    openNow?: boolean;
    minRating?: number;
}

export interface DashboardFilterProps {
    values?: DashboardFilterValues;
    defaultValue?: DashboardFilterValues;
    onChange?: (values: DashboardFilterValues) => void;
    onApply?: (values: DashboardFilterValues) => void;
    onReset?: () => void;
    minPrice?: number;
    maxPrice?: number;
    step?: number;
    className?: string;
}

export const AMENITIES_OPTIONS = [
    { id: "wifi", label: "Wifi", icon: Wifi },
    { id: "outlets", label: "Outlets", icon: Plug },
    { id: "airconditioning", label: "Air Conditioning", icon: Snowflake },
    { id: "parking", label: "Parking", icon: Car },
    { id: "meeting-rooms", label: "Meeting Rooms", icon: Users },
    { id: "toilets", label: "Restrooms", icon: DoorClosed },
    { id: "pet-friendly", label: "Pet Friendly", icon: PawPrint },
    { id: "free-water", label: "Free Water", icon: Droplets },
    { id: "free-snacks", label: "Free Snacks", icon: Cookie },
] as const;

export function DashboardFilter({
    values: controlledValues,
    defaultValue,
    onChange,
    onApply,
    onReset,
    minPrice = 0,
    maxPrice = 1000,
    step = 100,
    className,
}: DashboardFilterProps) {
    const [open, setOpen] = useState(false);

    const initialAmenities =
        defaultValue?.amenities ?? controlledValues?.amenities ?? [];
    const initialPriceRange: [number, number] =
        defaultValue?.priceRange ?? controlledValues?.priceRange ?? [minPrice, maxPrice];
    const initialNoise =
        defaultValue?.lowModerateNoise ?? controlledValues?.lowModerateNoise ?? false;
    const initialOpenNow =
        defaultValue?.openNow ?? controlledValues?.openNow ?? false;
    const initialRating =
        defaultValue?.minRating ?? controlledValues?.minRating ?? 0;

    const [selectedAmenities, setSelectedAmenities] =
        useState<string[]>(initialAmenities);
    const [priceRange, setPriceRange] =
        useState<[number, number]>(initialPriceRange);
    const [lowModerateNoise, setLowModerateNoise] =
        useState<boolean>(initialNoise);
    const [openNow, setOpenNow] =
        useState<boolean>(initialOpenNow);
    const [minRating, setMinRating] =
        useState<number>(initialRating);

    // Sync with controlled values if provided
    useEffect(() => {
        if (controlledValues) {
            setSelectedAmenities(controlledValues.amenities);
            setPriceRange(controlledValues.priceRange);
            if (controlledValues.lowModerateNoise !== undefined) {
                setLowModerateNoise(controlledValues.lowModerateNoise);
            }
            if (controlledValues.openNow !== undefined) {
                setOpenNow(controlledValues.openNow);
            }
            if (controlledValues.minRating !== undefined) {
                setMinRating(controlledValues.minRating);
            }
        }
    }, [controlledValues]);

    const isPriceModified =
        priceRange[0] !== minPrice || priceRange[1] !== maxPrice;

    const activeFilterCount =
        selectedAmenities.length +
        (isPriceModified ? 1 : 0) +
        (lowModerateNoise ? 1 : 0) +
        (openNow ? 1 : 0) +
        (minRating > 0 ? 1 : 0);

    const toggleAmenity = (id: string) => {
        const next = selectedAmenities.includes(id)
            ? selectedAmenities.filter((item) => item !== id)
            : [...selectedAmenities, id];
        setSelectedAmenities(next);
        onChange?.({
            amenities: next,
            priceRange,
            lowModerateNoise,
            openNow,
            minRating,
        });
    };

    const handlePriceChange = (val: number[]) => {
        const nextPrice: [number, number] = [
            val[0] ?? minPrice,
            val[1] ?? maxPrice,
        ];
        setPriceRange(nextPrice);
        onChange?.({
            amenities: selectedAmenities,
            priceRange: nextPrice,
            lowModerateNoise,
            openNow,
            minRating,
        });
    };

    const handleToggleNoise = () => {
        const next = !lowModerateNoise;
        setLowModerateNoise(next);
        onChange?.({
            amenities: selectedAmenities,
            priceRange,
            lowModerateNoise: next,
            openNow,
            minRating,
        });
    };

    const handleToggleOpenNow = () => {
        const next = !openNow;
        setOpenNow(next);
        onChange?.({
            amenities: selectedAmenities,
            priceRange,
            lowModerateNoise,
            openNow: next,
            minRating,
        });
    };

    const handleRatingChange = (rating: number) => {
        setMinRating(rating);
        onChange?.({
            amenities: selectedAmenities,
            priceRange,
            lowModerateNoise,
            openNow,
            minRating: rating,
        });
    };

    const handleReset = () => {
        const defaultRange: [number, number] = [minPrice, maxPrice];
        setSelectedAmenities([]);
        setPriceRange(defaultRange);
        setLowModerateNoise(false);
        setOpenNow(false);
        setMinRating(0);
        onChange?.({
            amenities: [],
            priceRange: defaultRange,
            lowModerateNoise: false,
            openNow: false,
            minRating: 0,
        });
        onReset?.();
    };

    const handleApply = () => {
        onApply?.({
            amenities: selectedAmenities,
            priceRange,
            lowModerateNoise,
            openNow,
            minRating,
        });
        setOpen(false);
    };

    return (
        <div className={cn("flex items-center gap-2 flex-wrap w-full", className)}>
            {/* 1. Main Filter Popover */}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className={cn(
                            "h-8.5 gap-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all border-input bg-card hover:bg-muted/70",
                            activeFilterCount > 0 &&
                            "border-primary/60 bg-primary/10 text-foreground font-semibold"
                        )}
                    >
                        <SlidersHorizontal className="size-3.5 text-muted-foreground shrink-0" />
                        <span>Filters</span>
                        {activeFilterCount > 0 && (
                            <Badge
                                variant="default"
                                className="size-4.5 p-0 flex items-center justify-center rounded-full text-[10px] font-semibold bg-primary text-primary-foreground"
                            >
                                {activeFilterCount}
                            </Badge>
                        )}
                    </Button>
                </PopoverTrigger>

                <PopoverContent
                    align="start"
                    sideOffset={8}
                    className="w-80 sm:w-96 p-4 gap-4 bg-popover text-popover-foreground rounded-xl shadow-lg border border-border"
                >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                        <PopoverHeader className="gap-0.5">
                            <PopoverTitle className="text-sm font-semibold">
                                Filter Places
                            </PopoverTitle>
                            <PopoverDescription className="text-xs text-muted-foreground">
                                Refine by preferences, budget, and amenities
                            </PopoverDescription>
                        </PopoverHeader>
                        {activeFilterCount > 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleReset}
                                className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                            >
                                <RotateCcw className="size-3 mr-1" />
                                Reset
                            </Button>
                        )}
                    </div>

                    <Separator />

                    {/* Quick Preferences: Open Now & Noise Level */}
                    <div className="space-y-2">
                        <Label className="text-xs font-semibold text-foreground">
                            Preferences
                        </Label>
                        <div className="flex flex-wrap gap-1.5">
                            <Toggle
                                size="sm"
                                variant="outline"
                                pressed={openNow}
                                onPressedChange={handleToggleOpenNow}
                                className={cn(
                                    "rounded-lg text-xs font-medium gap-1.5 h-8 px-2.5 transition-all cursor-pointer border-input",
                                    openNow
                                        ? "bg-primary! text-primary-foreground font-semibold border-none"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                )}
                            >
                                <Clock className="size-3.5" />
                                <span>Open Now</span>
                            </Toggle>

                            <Toggle
                                size="sm"
                                variant="outline"
                                pressed={lowModerateNoise}
                                onPressedChange={handleToggleNoise}
                                className={cn(
                                    "rounded-lg text-xs font-medium gap-1.5 h-8 px-2.5 transition-all cursor-pointer border-input",
                                    lowModerateNoise
                                        ? "bg-primary! text-primary-foreground font-semibold border-none"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                )}
                            >
                                <Volume2 className="size-3.5" />
                                <span>Low–Moderate Noise</span>
                            </Toggle>
                        </div>
                    </div>

                    <Separator />

                    {/* Rating Filter */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label className="text-xs font-semibold text-foreground">
                                Rating
                            </Label>
                            {minRating > 0 && (
                                <span className="text-xs font-medium text-foreground bg-muted px-2 py-0.5 rounded-md border border-border/50">
                                    {minRating}★ & up
                                </span>
                            )}
                        </div>
                        <div className="grid grid-cols-4 gap-1.5">
                            {[
                                { value: 0, label: "Any" },
                                { value: 3.5, label: "3.5+" },
                                { value: 4.0, label: "4.0+" },
                                { value: 4.5, label: "4.5+" },
                            ].map((opt) => (
                                <Toggle
                                    key={opt.value}
                                    size="sm"
                                    variant="outline"
                                    pressed={minRating === opt.value}
                                    onPressedChange={() => handleRatingChange(opt.value)}
                                    className={cn(
                                        "h-8 text-xs rounded-lg cursor-pointer transition-all border-input gap-1",
                                        minRating === opt.value
                                            ? "bg-primary! text-primary-foreground font-semibold border-none"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                    )}
                                >
                                    {opt.value > 0 && <Star className="size-3 fill-current" />}
                                    <span>{opt.label}</span>
                                </Toggle>
                            ))}
                        </div>
                    </div>

                    <Separator />

                    {/* Price Range Slider */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label className="text-xs font-semibold text-foreground">
                                Price Range
                            </Label>
                            <span className="text-xs font-medium text-foreground bg-muted px-2.5 py-0.5 rounded-md border border-border/50">
                                ₱{priceRange[0]} – ₱{priceRange[1]}
                                {priceRange[1] >= maxPrice ? "+" : ""}
                            </span>
                        </div>

                        <div className="pt-2 px-1">
                            <Slider
                                min={minPrice}
                                max={maxPrice}
                                step={step}
                                value={priceRange}
                                onValueChange={handlePriceChange}
                                className="cursor-pointer"
                            />
                        </div>

                        <div className="flex justify-between text-[11px] text-muted-foreground px-1">
                            <span>₱{minPrice}</span>
                            <span>₱{maxPrice}+</span>
                        </div>
                    </div>

                    <Separator />

                    {/* Amenities Multi-Select */}
                    <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                            <Label className="text-xs font-semibold text-foreground">
                                Amenities
                            </Label>
                            {selectedAmenities.length > 0 && (
                                <span className="text-[11px] text-muted-foreground font-medium">
                                    {selectedAmenities.length} selected
                                </span>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
                            {AMENITIES_OPTIONS.map((item) => {
                                const isSelected = selectedAmenities.includes(item.id);
                                const Icon = item.icon;
                                return (
                                    <Toggle
                                        key={item.id}
                                        size="sm"
                                        variant="outline"
                                        pressed={isSelected}
                                        onPressedChange={() => toggleAmenity(item.id)}
                                        className={cn(
                                            "rounded-lg text-xs font-medium gap-1.5 h-8 px-2.5 transition-all cursor-pointer border-input",
                                            isSelected && "bg-primary! text-primary-foreground font-semibold border-none"
                                        )}
                                    >
                                        <Icon className="size-3.5" />
                                        <span>{item.label}</span>
                                    </Toggle>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-border">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setOpen(false)}
                            className="h-8 text-xs cursor-pointer text-muted-foreground hover:text-foreground"
                        >
                            Close
                        </Button>
                        <Button
                            size="sm"
                            onClick={handleApply}
                            className="h-8 text-xs font-medium px-4 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                            Apply Filters
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>

            {/* 2. Quick Toggles for most popular filters */}
            <Toggle
                size="sm"
                variant="outline"
                pressed={selectedAmenities.includes("wifi")}
                onPressedChange={() => toggleAmenity("wifi")}
                className={cn(
                    "h-8.5 gap-1.5 text-xs rounded-lg cursor-pointer transition-all border-input bg-card",
                    selectedAmenities.includes("wifi")
                    && "bg-primary! text-primary-foreground font-semibold border-none"
                )}
            >
                <Wifi className="size-3.5" />
                <span className="hidden sm:block">With Wifi</span>
            </Toggle>

            <Toggle
                size="sm"
                variant="outline"
                pressed={selectedAmenities.includes("outlets")}
                onPressedChange={() => toggleAmenity("outlets")}
                className={cn(
                    "h-8.5 gap-1.5 text-xs rounded-lg cursor-pointer transition-all border-input bg-card",
                    selectedAmenities.includes("outlets")
                    && "bg-primary! text-primary-foreground font-semibold border-none"
                )}
            >
                <Plug className="size-3.5" />
                <span className="hidden sm:block">With Outlets</span>
            </Toggle>

            <Toggle
                size="sm"
                variant="outline"
                pressed={lowModerateNoise}
                onPressedChange={handleToggleNoise}
                className={cn(
                    "h-8.5 gap-1.5 text-xs rounded-lg cursor-pointer transition-all border-input bg-card",
                    lowModerateNoise
                    && "bg-primary! text-primary-foreground font-semibold border-none"
                )}
            >
                <Volume1 className="size-3.5" />
                <span className="hidden sm:block">Low-Moderate Noise</span>
            </Toggle>

            {/* 3. Quick Reset Action */}
            {activeFilterCount > 0 && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleReset}
                    className="h-8.5 px-2 text-xs text-muted-foreground hover:text-foreground cursor-pointer gap-1 transition-all"
                >
                    <RotateCcw className="size-3" />
                    <span>Reset</span>
                </Button>
            )}
        </div>
    );
}

export default DashboardFilter;