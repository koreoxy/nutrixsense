import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  try {
    const foods = await prisma.food.findMany({
      where: {
        name: {
          contains: searchQuery,
          mode: "insensitive",
        },
      },
    });

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
