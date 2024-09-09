import React from "react";
import { getAllFood } from "@/data/food";
import Image from "next/image";
import Link from "next/link";
import { Category, Portion } from "@prisma/client";

const portionMap: { [key in Portion | "all"]: string } = {
  [Portion.SATU_BESAR]: "1 Besar",
  [Portion.SATU_SDM]: "1 sdm",
  [Portion.SERATUS_GRAM]: "100 gram",
  [Portion.SATU_BUAH]: "1 buah",
  [Portion.SATU_PORSI]: "1 porsi",
  [Portion.SATU_MANGKOK]: "1 mangkok",
  [Portion.SATU_SEDANG]: "1 Sedang",
  [Portion.SATU_KECIL]: "1 kecil",
  [Portion.SATU_BUNGKUS]: "1 bungkus",
  [Portion.SATU_GELAS]: "1 Gelas",
  all: "All",
};

const CardFoodSearch = async ({
  query,
  currentPage,
  portion,
  category,
}: {
  query: string;
  currentPage: number;
  portion: Portion | "all";
  category?: Category;
}) => {
  let foods = await getAllFood(query, currentPage, portion, category);

  // Filter berdasarkan kategori jika tersedia
  if (category) {
    foods = foods.filter((food) => food.category === category);
  }

  // Filter berdasarkan porsi jika porsi bukan "all"
  if (portion !== "all") {
    foods = foods.filter((food) => food.portion === portion);
  }

  // Handle jika tidak ada data makanan yang sesuai
  if (foods.length === 0) {
    let message = "Data makanan tidak tersedia";
    if (category) {
      message += ` dengan kategori ${category
        .toLowerCase()
        .replace(/_/g, " ")}`;
    }
    if (portion !== "all") {
      message += ` dan porsi ${portionMap[portion]}`;
    }

    return <div className="flex justify-center font-bold">{message}.</div>;
  }

  // Render data makanan yang sesuai
  return (
    <div className="grid grid-cols-2 gap-2">
      {foods.map((food, index) => (
        <Link href={`/foods/${food.id}`} key={index}>
          <div key={food.id} className="relative">
            <Image
              src={food.imagePath || "/food-3d/5.png"}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "500px",
                height: "150px",
                objectFit: "cover",
              }}
              alt="food image"
              className="rounded-t-md bg-white"
            />

            <div className="absolute top-[8px] left-[8px] bg-background p-1 rounded-lg text-sm">
              <p className="font-bold">
                {food.calories ?? "N/A"}{" "}
                <b className="text-muted-foreground font-normal">Kkal</b>
              </p>
            </div>

            <div className="absolute bottom-[140px] right-[8px] p-1 rounded-lg text-sm">
              <span className="text-xs border border-sky-700 rounded-lg p-1 text-blue-700 backdrop-blur-sm bg-white/70 font-bold">
                {food.category
                  .toLowerCase()
                  .replace(/_/g, " ")
                  .replace(/^\w/, (c) => c.toUpperCase())}
              </span>
            </div>

            <div className="bg-background w-full h-[8rem] p-2 rounded-b-md border">
              <h1 className="font-bold text-sm">{food.name}</h1>

              <h2 className="text-sm mt-2">
                Porsi {food.portion ? portionMap[food.portion] : "N/A"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {food.description.length > 35
                  ? `${food.description.substring(0, 35)}...`
                  : food.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CardFoodSearch;
