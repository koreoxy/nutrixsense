"use server";

import { db } from "@/lib/db";
import { z } from "zod";

const addFeedbackSchema = z.object({
  description: z.string(),
});

export const addFeedback = async (formData: { description: string }) => {
  const validatedFields = addFeedbackSchema.safeParse(formData);

  if (!validatedFields.success) {
    throw new Error(
      JSON.stringify(validatedFields.error.flatten().fieldErrors)
    );
  }

  try {
    await db.feedBack.create({
      data: {
        description: validatedFields.data.description,
      },
    });
    return { success: true, message: "Feedback berhasil dikirim" };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Gagal mengirim data feedback"
    );
  }
};
