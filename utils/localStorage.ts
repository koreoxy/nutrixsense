import { Portion } from "@prisma/client";

// utils/localStorage.ts
const FOOD_STORAGE_KEY = "foodData";
const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 1 hari dalam milidetik

interface Food {
  id: number;
  name: string;
  portion: Portion;
  calories: number;
  protein: number;
  fat: number;
  carbohydrates: number;
}

export const saveFoodToLocalStorage = (food: Food[]) => {
  const data = {
    food,
    timestamp: new Date().getTime(),
  };
  localStorage.setItem(FOOD_STORAGE_KEY, JSON.stringify(data));
};

export const loadFoodFromLocalStorage = (): Food[] => {
  const data = localStorage.getItem(FOOD_STORAGE_KEY);
  if (!data) return [];

  const { food, timestamp } = JSON.parse(data);

  // Cek jika data sudah kadaluarsa
  if (new Date().getTime() - timestamp > EXPIRATION_TIME) {
    localStorage.removeItem(FOOD_STORAGE_KEY);
    return [];
  }

  return food;
};
