"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { UserRole } from "@prisma/client";

// Define schema for the user data
const addUserSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  role: z.enum(["ADMIN", "USER"]),
});

const updateUserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  password: z.string().optional(),
  role: z.nativeEnum(UserRole).optional(), // Ensure role is typed as UserRole
});

// ADD USER ACTION
export const addUser = async (prevState: unknown, formData: FormData) => {
  if (!(formData instanceof FormData)) {
    throw new Error("Invalid form data");
  }

  const entries = Object.fromEntries(formData.entries());
  const validatedFields = addUserSchema.safeParse(entries);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = validatedFields.data;
  const hashPassword = await bcrypt.hash(data.password, 10);

  try {
    await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashPassword,
        role: data.role,
      },
    });
  } catch (error) {
    return { message: "Failed to create user" };
  }

  revalidatePath("/admin/users");
  redirect("/admin/users");
};

// UPDATE USER ACTION
export async function updateUser(
  prevState: unknown,
  id: string,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  try {
    // Parse and validate form data
    const validatedFields = updateUserSchema.safeParse(
      Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
      const errorMessages = Object.values(
        validatedFields.error.flatten().fieldErrors
      )
        .flat()
        .join(", ");
      return {
        success: false,
        error: errorMessages,
      };
    }

    const data = validatedFields.data;

    // If a new password is provided, hash it
    let hashedPassword;
    if (data.password) {
      hashedPassword = await bcrypt.hash(data.password, 10);
    }

    // Update the user in the database
    await db.user.update({
      where: { id },
      data: {
        name: data.name || undefined,
        email: data.email || undefined,
        ...(hashedPassword && { password: hashedPassword }), // Only update the password if provided
        role: data.role || undefined, // Typed correctly as UserRole
      },
    });

    // Revalidate the path and redirect after successful update
    revalidatePath("/admin/users");
    redirect("/admin/users");

    return { success: true };
  } catch (error) {
    // Handle any validation or database errors
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map((e) => e.message).join(", ");
      return {
        success: false,
        error: errorMessages,
      };
    }
    return { success: false, error: "Failed to update user" };
  }
}

export async function deleteUser(id: string) {
  const user = await db.user.delete({
    where: { id },
  });

  if (user == null) return notFound();
}
