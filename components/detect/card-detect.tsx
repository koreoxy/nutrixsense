"use client";

import { Beef, EggFried, Flame, Wheat } from "lucide-react";
import React from "react";
import useSWR from "swr";
import ButtonSaveFood from "./button-save-food";

interface CardDetectProps {
  name: string;
  totalClass: number;
}

type Food = {
  id: number;
  name: string;
  description: string;
  calories: number;
  protein: number;
  fat: number;
  carbohydrates: number;
};

type PortionFood = {
  [key: string]: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const CardDetect: React.FC<CardDetectProps> = ({ name, totalClass }) => {
  const portionFood: PortionFood = {
    "Tahu Goreng": `${totalClass} Buah`,
    "Tempe Goreng": `${totalClass} Buah`,
    "Paha Ayam Goreng": `${totalClass} Buah`,
    "Telur Dadar": `${totalClass} Besar`,
    "Telur Rebus": `${totalClass} Sedang`,
    "Tumis Kangkung": `${totalClass} Mangkuk`,
    "Nasi Putih": `${totalClass} Porsi`,
    Pisang: `${totalClass} Sedang`,
    Sambal: `${totalClass} Sdm`,
    "Indomie Goreng": `${totalClass} Bungkus`,
  };

  const { data, error } = useSWR<Food[]>("/api/food", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div className="text-center">Loading...</div>;

  const foodItem = data.find((food) => food.name === name);

  if (!foodItem) return <div>No data found for {name}</div>;

  // Calculate total nutrients
  const totalNutrients = {
    calories: Math.round(foodItem.calories * totalClass),
    protein: Math.round(foodItem.protein * totalClass),
    fat: Math.round(foodItem.fat * totalClass),
    carbohydrates: Math.round(foodItem.carbohydrates * totalClass),
  };

  const nutrients = [
    {
      label: "Kal",
      value: totalNutrients.calories.toString(),
      unit: "Kkal",
      image: "/nutrisi/kalori.png",
      icon: <Flame size={20} />,
    },
    {
      label: "Prot",
      value: totalNutrients.protein.toString(),
      unit: "g",
      image: "/nutrisi/protein.png",
      icon: <Beef size={20} />,
    },
    {
      label: "Karbo",
      value: totalNutrients.carbohydrates.toString(),
      unit: "g",
      image: "/nutrisi/carbo.png",
      icon: <Wheat size={20} />,
    },
    {
      label: "Lemak",
      value: totalNutrients.fat.toString(),
      unit: "g",
      image: "/nutrisi/fat.png",
      icon: <EggFried size={20} />,
    },
  ];

  return (
    <div className="border border-r-0 border-l-0 mt-4 p-4">
      <div>
        {totalClass > 1 && (
          <h2 className="font-bold text-lg">Total Nutrisi Makanan</h2>
        )}
        <h1 className="font-bold text-lg">
          {foodItem.name} {""}
          {portionFood[foodItem.name]}
        </h1>
      </div>
      <div className="flex gap-2 justify-between text-center">
        {nutrients.map((nutrient) => (
          <div key={nutrient.label}>
            <div className="flex items-center mt-2">
              {nutrient.icon}
              <h1 className="text-lg">{nutrient.label}</h1>
            </div>
            <p>
              <b className="font-bold text-lg">{nutrient.value}</b>
              <b className="text-muted-foreground font-normal">
                {nutrient.unit}
              </b>
            </p>
          </div>
        ))}
        {/* Show ButtonSaveFood only when there's exactly one class of food */}
        {totalClass === 1 && (
          <ButtonSaveFood
            foodNames={[foodItem.name]}
            classCounts={{ [foodItem.name]: totalClass }}
            totalNutrients={totalNutrients}
          />
        )}
      </div>
    </div>
  );
};

export default CardDetect;
