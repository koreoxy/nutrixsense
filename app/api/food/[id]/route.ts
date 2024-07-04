import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { error: "Invalid ID parameter!" },
      { status: 400 }
    );
  }

  try {
    const food = await prisma.food.findUnique({
      where: { id: id as string },
    });

    if (!food) {
      return NextResponse.json({ error: "Food not found!" }, { status: 404 });
    }

    return NextResponse.json(food);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch food!" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
