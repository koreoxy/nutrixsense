import { db } from "@/lib/db";

export const getFoods = async () => {
  try {
    const foods = await db.food.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        calories: true,
        protein: true,
        fat: true,
        carbohydrates: true,
      },
      orderBy: { name: "asc" },
    });
    return foods;
  } catch (error) {
    throw new Error("Failed to fetch foods data");
  }
};

export const getFoodById = async (id: string) => {
  try {
    const food = await db.food.findUnique({ where: { id } });
    return food;
  } catch {
    return null;
  }
};

export const getNewestFoods = async () => {
  return db.food.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      calories: true,
      protein: true,
      fat: true,
      carbohydrates: true,
      imagePath: true,
    },
    orderBy: { name: "desc" },
    take: 6,
  });
};

export const getAllFood = async () => {
  return db.food.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      calories: true,
      protein: true,
      fat: true,
      carbohydrates: true,
    },
  });
};
