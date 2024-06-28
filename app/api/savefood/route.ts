// pages/api/savefood.ts

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const {
      foodName,
      classCounts,
      calories,
      protein,
      fat,
      carbohydrates,
      userId,
    } = await request.json();

    // Cek apakah nama makanan sudah ada di database
    const existingFood = await prisma.saveFood.findFirst({
      where: {
        name: foodName,
      },
    });

    if (existingFood) {
      return NextResponse.json(
        { error: "Food already exists" },
        { status: 400 }
      );
    }

    // Jika tidak ada, tambahkan makanan baru
    const savedFood = await prisma.saveFood.create({
      data: {
        name: foodName,
        totalFoodNutrition: classCounts,
        calories,
        protein,
        fat,
        carbohydrates,
        userId, // Sertakan userId yang sesuai
      },
    });

    return NextResponse.json({
      message: "Food saved successfully",
      data: savedFood,
    });
  } catch (error) {
    console.error("Error saving food:", error);
    return NextResponse.json(
      { error: "Failed to save food!" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
