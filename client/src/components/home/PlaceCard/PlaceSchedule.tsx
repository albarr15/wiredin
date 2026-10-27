import { ClockIcon } from "lucide-react";
import type { ScheduleDay } from "@wiredin/types";

type PlaceScheduleProps = {
  schedule: ScheduleDay[];
};

export function PlaceSchedule({ schedule }: PlaceScheduleProps) {
  const dayName = new Date()
    .toLocaleDateString("en-US", { weekday: "long" })
    .toUpperCase() as ScheduleDay["day_of_week"];

  const scheduleDay = schedule.find((sd) => sd.day_of_week === dayName);

  const openingTime = scheduleDay?.opening_time?.slice(0, 5);
  const closingTime = scheduleDay?.closing_time?.slice(0, 5);

  const hours =
    openingTime && closingTime ? (
      `${openingTime} - ${closingTime}`
    ) : (
      <span className="text-destructive">Closed</span>
    );

  return (
    <div className="flex gap-1 items-center">
      <ClockIcon strokeWidth={1.5} size={16} strokeOpacity={1} />
      {hours}
    </div>
  );
}
