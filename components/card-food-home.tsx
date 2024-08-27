"use server";

import React from "react";
import { getOldestFoods } from "@/data/food";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";
import Link from "next/link";
import { Category } from "@prisma/client";

type Food = {
  id: string;
  name: string;
  description: string;
  calories: number | null;
  protein: number | null;
  fat: number | null;
  carbohydrates: number | null;
  imagePath: string;
  category: Category;
};

const CardFoodHome: React.FC = async () => {
  const foods: Food[] = (await getOldestFoods()).map((food) => ({
    ...food,
    imagePath: food.imagePath || "/food-3d/5.png",
  }));

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {foods.map((food, index) => (
          <CarouselItem className="basis-1/2" key={index}>
            <Link href={`/foods/${food.id}`}>
              <div className="">
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

                  <div className="absolute bottom-[120px] right-[8px] p-1 rounded-lg text-sm">
                    <span className="text-xs border border-sky-700 rounded-lg p-1 text-blue-700 backdrop-blur-sm bg-white/70 font-bold">
                      {food.category
                        .toLowerCase()
                        .replace(/_/g, " ")
                        .replace(/^\w/, (c) => c.toUpperCase())}
                    </span>
                  </div>

                  <div className="bg-background w-full h-[7rem] p-2 rounded-b-md border">
                    <h1 className="font-bold">{food.name}</h1>
                    <p className="text-sm text-muted-foreground">
                      {food.description.length > 35
                        ? food.description.substring(0, 35) + "..."
                        : food.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CardFoodHome;
