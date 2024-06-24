"use server";

import { z } from "zod";
import fs from "fs/promises";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema
  .refine((file) => file.size === 0 || file.type.startsWith("image/"), {
    message: "Only images are allowed",
  })
  .refine((file) => file.size < 4000000, {
    message: "Image must less than 4MB",
  });

const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  calories: z.coerce.number().int().min(1),
  protein: z.coerce.number().int().min(1),
  fat: z.coerce.number().int().min(1),
  carbohydrates: z.coerce.number().int().min(1),
  image: imageSchema,
});

const editSchema = addSchema.extend({
  image: imageSchema.optional(),
});

export const addFood = async (prevState: unknown, formData: FormData) => {
  const validatedFields = addSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = validatedFields.data;

  await fs.mkdir("public/foods", { recursive: true });
  const imagePath = `/foods/${crypto.randomUUID()}-${data.image.name}`;
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.image.arrayBuffer())
  );

  try {
    await db.food.create({
      data: {
        name: data.name,
        description: data.description,
        calories: data.calories,
        protein: data.protein,
        fat: data.fat,
        carbohydrates: data.carbohydrates,
        imagePath,
      },
    });
  } catch (error) {
    return { message: "Filed to create data" };
  }

  revalidatePath("/admin/foods");
  redirect("/admin/foods");
};

export const updateFood = async (
  id: string,
  prevState: unknown,
  formData: FormData
) => {
  const validatedFields = editSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = validatedFields.data;
  const food = await db.food.findUnique({ where: { id } });

  if (food == null) return notFound();

  let imagePath = food.imagePath;
  if (data.image != null && data.image.size > 0) {
    await fs.unlink(`public${food.imagePath}`);
    imagePath = `/foods/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await data.image.arrayBuffer())
    );
  }

  try {
    await db.food.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        calories: data.calories,
        protein: data.protein,
        fat: data.fat,
        carbohydrates: data.carbohydrates,
        imagePath,
      },
    });
  } catch (error) {
    return { message: "Filed to create data" };
  }

  revalidatePath("/admin/foods");
  redirect("/admin/foods");
};

export async function deleteFood(id: string) {
  const food = await db.food.delete({
    where: { id },
  });

  if (food == null) return notFound();

  await fs.unlink(`public${food.imagePath}`);
}
