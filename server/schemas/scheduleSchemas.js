import { z } from "zod";

const ScheduleSchema = z.object({
  id: z.uuid(),
  place_id: z.uuid(),
});

const IdParamSchema = z.object({ place_id: z.uuid() });

export const CreateScheduleSchema = z.object({
  body: ScheduleSchema.omit({ place_id: true }),
});

export const UpdateScheduleSchema = z.object({
  body: ScheduleSchema.omit({ place_id: true }).partial(),
  params: IdParamSchema,
});

export const DeleteScheduleSchema = z.object({
  params: IdParamSchema,
});

export const getScheduleSchema = z.object({
  params: IdParamSchema,
});
