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
      createdAt,
    } = await request.json();

    const savedFood = await prisma.saveFood.create({
      data: {
        name: foodName,
        classCounts: classCounts,
        calories,
        protein,
        fat,
        carbohydrates,
        userId,
        createdAt,
      },
    });

    return NextResponse.json({
      message: "Data makanan berhasil disimpan!",
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

// Handler untuk GET request
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  try {
    // Memeriksa apakah userId ada
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required!" },
        { status: 400 }
      );
    }

    // Mencari data makanan yang disimpan berdasarkan userId
    const foods = await prisma.saveFood.findMany({
      where: { userId },
    });

    // Mengembalikan data makanan yang disimpan dalam format JSON
    return NextResponse.json({
      status: "success",
      data: foods,
    });
  } catch (err) {
    console.error("Error fetching saved foods:", err);
    return NextResponse.json(
      { error: "Failed to fetch saved foods!" },
      { status: 500 }
    );
  }
}

// Handler untuk DELETE request
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const foodId = searchParams.get("foodId");

  try {
    if (!foodId) {
      return NextResponse.json(
        { error: "Food ID is required!" },
        { status: 400 }
      );
    }

    await prisma.saveFood.delete({
      where: { id: foodId },
    });

    return NextResponse.json({
      status: "success",
      message: "Data makanan berhasil dihapus!",
    });
  } catch (err) {
    console.error("Error deleting food:", err);
    return NextResponse.json(
      { error: "Failed to delete food!" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
