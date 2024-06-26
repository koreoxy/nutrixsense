import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
  try {
    const foods = await prisma.food.findMany();
    return NextResponse.json(foods);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch foods!" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
