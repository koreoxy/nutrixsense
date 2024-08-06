"use server";

import React from "react";
import { getAllFood } from "@/data/food";
import Image from "next/image";
import Link from "next/link";
import { Portion } from "@prisma/client";

const portionMap: { [key in Portion]: string } = {
  [Portion.SATU_BESAR]: "1 Besar",
  [Portion.SATU_SDM]: "1 sdm",
  [Portion.SERATUS_GRAM]: "100 gram",
  [Portion.SATU_BUAH]: "1 buah",
  [Portion.SATU_PORSI]: "1 porsi",
  [Portion.SATU_MANGKOK]: "1 mangkok",
  [Portion.all]: "All",
};

type Food = {
  id: string;
  name: string;
  description: string;
  calories: number | null;
  protein: number | null;
  fat: number | null;
  carbohydrates: number | null;
  imagePath: string;
  portion: Portion | null;
};

const CardFoodSearch = async ({
  query,
  currentPage,
  portion,
}: {
  query: string;
  currentPage: number;
  portion: Portion;
}) => {
  const foods: Food[] = await getAllFood(query, currentPage, portion);

  if (foods.length === 0) {
    return (
      <div className="flex justify-center font-bold">
        Data makanan tidak tersedia.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {foods.map((food, index) => (
        <Link href={`/foods/${food.id}`} key={index}>
          <div key={food.id} className="relative">
            <Image
              src={food.imagePath}
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

            <div className="bg-background w-full h-[8rem] p-2 rounded-b-md border">
              <h1 className="font-bold text-sm">{food.name}</h1>
              <h2 className="text-sm mt-2">
                Porsi {food.portion ? portionMap[food.portion] : "N/A"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {food.description.length > 35
                  ? food.description.substring(0, 35) + "..."
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
