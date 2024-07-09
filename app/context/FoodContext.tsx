// context/FoodContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  saveFoodToLocalStorage,
  loadFoodFromLocalStorage,
} from "@/utils/localStorage";

// Local Portion enum definition
enum Portion {
  SATU_BESAR = "SATU_BESAR",
  SATU_SDM = "SATU_SDM",
  SERATUS_GRAM = "SERATUS_GRAM",
  SATU_BUAH = "SATU_BUAH",
  SATU_PORSI = "SATU_PORSI",
  SATU_MANGKOK = "SATU_MANGKOK",
}

interface Food {
  id: number;
  name: string;
  portion: Portion;
  calories: number;
  protein: number;
  fat: number;
  carbohydrates: number;
}

interface FoodContextProps {
  foods: Food[];
  addFood: (food: Food) => void;
  removeFood: (id: number) => void;
}

const FoodContext = createContext<FoodContextProps | undefined>(undefined);

export const FoodProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [foods, setFoods] = useState<Food[]>([]);

  // Function to map Prisma Portion to local Portion
  const mapPrismaPortionToLocal = (portion: string): Portion => {
    switch (portion) {
      case "SATU_BESAR":
        return Portion.SATU_BESAR;
      case "SATU_SDM":
        return Portion.SATU_SDM;
      case "SERATUS_GRAM":
        return Portion.SERATUS_GRAM;
      case "SATU_BUAH":
        return Portion.SATU_BUAH;
      case "SATU_PORSI":
        return Portion.SATU_PORSI;
      case "SATU_MANGKOK":
        return Portion.SATU_MANGKOK;
      default:
        throw new Error(`Unknown portion: ${portion}`);
    }
  };

  useEffect(() => {
    // Load initial food data from localStorage and map portions
    const storedFoods = loadFoodFromLocalStorage() as Food[];
    if (storedFoods.length > 0) {
      const mappedFoods = storedFoods.map((food) => ({
        ...food,
        portion: mapPrismaPortionToLocal(food.portion as string),
      }));
      setFoods(mappedFoods);
    }
  }, []);

  const addFood = (food: Food) => {
    const newFoods = [...foods, food];
    setFoods(newFoods);
    saveFoodToLocalStorage(newFoods);
  };

  const removeFood = (id: number) => {
    const newFoods = foods.filter((food) => food.id !== id);
    setFoods(newFoods);
    saveFoodToLocalStorage(newFoods);
  };

  return (
    <FoodContext.Provider value={{ foods, addFood, removeFood }}>
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = () => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error("useFood must be used within a FoodProvider");
  }
  return context;
};
