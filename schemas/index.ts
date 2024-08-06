import { UserRole } from "@prisma/client";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is requeired",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters requeired",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "New Password is required!!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!!",
      path: ["password"],
    }
  );

export const FoodSchema = z.object({
  id: z.string(),
  foodName: z.string().min(3, "Food name must be at least 3 characters long"),
  calories: z.number().min(1, "Calories must be greater than 0"),
  protein: z.number().min(1, "Protein must be greater than 0"),
  fat: z.number().min(1, "Fat must be greater than 0"),
  carbohydrates: z.number().min(1, "Carbohydrates must be greater than 0"),
  detection_time: z.date(),
  berat: z.string(),
  energiKj: z.number().optional(),
  energiKl: z.number().optional(),
  lemakJenuh: z.number().optional(),
  lemakTakJenuhG: z.number().optional(),
  lemakTakJenuhT: z.number().optional(),
  kolesterol: z.number().optional(), // Corrected 'kolestrol' to 'kolesterol'
  serat: z.number().optional(),
  gula: z.number().optional(),
  sodium: z.number().optional(),
  kalium: z.number().optional(),
  image_path: z.string().url(), // Ensure the string is a valid URL if it is an image URL
});

export const addFeedbackSchema = z.object({
  description: z.string(),
});
