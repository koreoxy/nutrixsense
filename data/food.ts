import { db } from "@/lib/db";
import { Category, Portion } from "@prisma/client";

const ITEMS_PER_PAGE = 6;

export const getAllFoodAdmin = async (query: string, page: number) => {
  const foods = await db.food.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        },
      ],
    },
    skip: (page - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
  });

  return foods;
};

export const getAllFood = async (
  query: string,
  currentPage: number,
  portion?: string,
  category?: Category
) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  return db.food.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        },
        portion && portion !== "all"
          ? {
              portion: {
                equals: portion as Portion,
              },
            }
          : {},
      ],
    },
    skip: offset,
    take: ITEMS_PER_PAGE,
  });
};

export const getAllFoodPages = async (
  query: string,
  portion?: string,
  category?: Category
) => {
  const totalItems = await db.food.count({
    where: {
      AND: [
        {
          OR: [
            {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        },
        portion && portion !== "all"
          ? {
              portion: {
                equals: portion as Portion,
              },
            }
          : {},
        category
          ? {
              category: {
                equals: category as Category,
              },
            }
          : {},
      ],
    },
  });

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  return totalPages;
};

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
      category: true,
    },
    orderBy: { name: "desc" },
    take: 6,
  });
};

export const getOldestFoods = async () => {
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
      category: true,
    },
    orderBy: { createdAt: "asc" },
    take: 6,
  });
};
