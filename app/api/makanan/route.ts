import { PrismaClient, Portion } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Definisikan tipe yang lebih spesifik untuk foodPortions
const foodPortions: Record<
  | "Tahu Goreng"
  | "Tempe Goreng"
  | "Paha Ayam Goreng"
  | "Telur Dadar"
  | "Telur Rebus"
  | "Tumis Kangkung"
  | "Nasi Putih"
  | "Pisang"
  | "Sambal"
  | "Indomie Goreng",
  Portion
> = {
  "Tahu Goreng": Portion.SATU_BUAH,
  "Tempe Goreng": Portion.SATU_BUAH,
  "Paha Ayam Goreng": Portion.SATU_BUAH,
  "Telur Dadar": Portion.SATU_BESAR,
  "Telur Rebus": Portion.SATU_SEDANG,
  "Tumis Kangkung": Portion.SATU_MANGKOK,
  "Nasi Putih": Portion.SATU_PORSI,
  Pisang: Portion.SATU_SEDANG,
  Sambal: Portion.SATU_SDM,
  "Indomie Goreng": Portion.SATU_BUNGKUS,
};

export const GET = async (req: Request) => {
  try {
    // Ambil makanan berdasarkan nama yang ada di foodPortions dan batasi hanya 10 data
    const foods = await prisma.food.findMany({
      where: {
        name: {
          in: Object.keys(foodPortions), // Filter hanya makanan dalam daftar foodPortions
        },
        portion: {
          in: Object.values(foodPortions) as Portion[], // Cast ke Portion[] untuk menghindari error tipe
        },
        imagePath: {
          not: null, // Pastikan hanya mengambil data yang memiliki imagePath
        },
      },
      take: 10, // Batasi hanya 10 data
    });

    // Pastikan menggabungkan data makanan dengan porsinya yang sesuai
    const foodsWithPortions = foods.map((food) => {
      const portion = foodPortions[food.name as keyof typeof foodPortions];
      return {
        ...food,
        portion, // Hanya tampilkan porsi yang sesuai dengan daftar
      };
    });

    return NextResponse.json(foodsWithPortions);
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
