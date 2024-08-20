"use server";

import React from "react";
import { getNewestFoods } from "@/data/food";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";
import Link from "next/link";

type Food = {
  id: string;
  name: string;
  description: string;
  calories: number | null;
  protein: number | null;
  fat: number | null;
  carbohydrates: number | null;
  imagePath: string;
};

const CardFoodHome: React.FC = async () => {
  const foods: Food[] = (await getNewestFoods()).map((food) => ({
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
                    src={food.imagePath || "/makanan.jpg"}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{
                      width: "500px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                    alt="food image"
                    className="rounded-t-md"
                  />

                  <div className="absolute top-[8px] left-[8px] bg-background p-1 rounded-lg text-sm">
                    <p className="font-bold">
                      {food.calories ?? "N/A"}{" "}
                      <b className="text-muted-foreground font-normal">Kkal</b>
                    </p>
                  </div>

                  <div className="bg-background w-full p-1 rounded-b-md border">
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
