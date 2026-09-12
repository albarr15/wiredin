import { z } from "zod";

const UserSchema = z.object({
  id: z.uuid(),
  user_name: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  avatar_url: z.string().optional(),
  role: z.enum(["USER", "ADMIN"]),
});

const IdParamSchema = z.object({ id: z.uuid() });

export const CreateUserSchema = z.object({
  body: UserSchema.omit({ id: true }),
});

export const UpdateUserSchema = z.object({
  body: UserSchema.omit({ id: true }).partial(),
});

export const DeleteUserSchema = z.object({
  params: IdParamSchema,
});

export const getUserSchema = z.object({
  params: IdParamSchema,
});
