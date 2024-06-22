import { db } from "@/lib/db";

export const getFoods = async () => {
  try {
    const foods = await db.foods.findMany();
    return foods;
  } catch (error) {
    throw new Error("Failed to fetch foods data");
  }
};
