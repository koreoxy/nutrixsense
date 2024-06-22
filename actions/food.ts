"use server";

import { FoodSchema } from "@/schemas";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";

export const saveFood = async (formData: FormData) => {
  const validateFields = FoodSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validateFields.success) {
    return {
      Error: validateFields.error.flatten().fieldErrors,
    };
  }

  try {
    const user = await currentUser(); // Dapatkan user dari sesi
    if (!user) {
      return { message: "User is not authenticated" };
    }

    await db.foods.create({
      data: {
        foodName: validateFields.data.foodName,
        calories: validateFields.data.calories,
        protein: validateFields.data.protein,
        fat: validateFields.data.fat,
        carbohydrates: validateFields.data.carbohydrates,
        detection_time: validateFields.data.detection_time,
        image_path: validateFields.data.image_path,
        user: {
          connect: {
            id: user.id, // Gunakan user.id dari sesi
          },
        },
      },
    });
  } catch (error) {
    return { message: "Failed to create foods" };
  }

  revalidatePath("/admin");
  redirect("/admin");
};
