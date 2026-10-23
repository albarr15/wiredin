import { z } from "zod";

const ScheduleDaySchema = z.object({
  schedule_id: z.uuid(),
  day_of_week: z.enum([
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ]),
  opening_time: z.string().time().optional(),
  closing_time: z.string().time().optional(),
});

const IdParamSchema = z.object({ schedule_id: z.uuid() });

export const CreateScheduleDaySchema = z.object({
  body: ScheduleDaySchema.omit({ schedule_id: true }),
});

export const UpdateScheduleDaySchema = z.object({
  body: ScheduleDaySchema.omit({ schedule_id: true }).partial(),
  params: IdParamSchema,
});

export const DeleteScheduleDaySchema = z.object({
  params: IdParamSchema,
});

export const GetScheduleDaySchema = z.object({
  params: IdParamSchema,
});

export type ScheduleDay = z.infer<typeof ScheduleDaySchema>;
export type DayOfWeek = ScheduleDay["day_of_week"];
export type CreateScheduleDayInput = z.infer<typeof CreateScheduleDaySchema>["body"];
export type UpdateScheduleDayInput = z.infer<typeof UpdateScheduleDaySchema>["body"];
