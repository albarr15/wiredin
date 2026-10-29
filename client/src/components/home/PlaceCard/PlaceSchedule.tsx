import { ClockIcon } from "lucide-react";
import type { ScheduleDay } from "@wiredin/types";

type PlaceScheduleProps = {
  schedule: ScheduleDay[];
};

function formatTime(time: string): string {
  const [hourStr, minuteStr] = time.split(":");
  const hour24 = Number(hourStr);
  const minutes = Number(minuteStr);
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;

  return minutes === 0
    ? `${hour12} ${period}`
    : `${hour12}:${String(minutes).padStart(2, "0")} ${period}`;
}

export function PlaceSchedule({ schedule }: PlaceScheduleProps) {
  const dayName = new Date()
    .toLocaleDateString("en-US", { weekday: "long" })
    .toUpperCase() as ScheduleDay["day_of_week"];

  const scheduleDay = schedule.find((sd) => sd.day_of_week === dayName);

  const openingTime = scheduleDay?.opening_time?.slice(0, 5);
  const closingTime = scheduleDay?.closing_time?.slice(0, 5);

  const hours =
    openingTime && closingTime ? (
      `${formatTime(openingTime)} - ${formatTime(closingTime)}`
    ) : (
      <span className="text-destructive">Closed</span>
    );

  return (
    <div className="flex gap-1 items-center">
      <ClockIcon strokeWidth={1.5} size={16} strokeOpacity={1} />
      {schedule?.length === 0 ? (
        <span className="text-muted-foreground italic">Unknown</span>
      ) : (
        hours
      )}
    </div>
  );
}
