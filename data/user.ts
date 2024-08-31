import { db } from "@/lib/db";

const ITEMS_PER_PAGE = 6;

export const getAllUsers = async (query: string, page: number) => {
  const users = await db.user.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    skip: (page - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
  });

  return users;
};

export const getAllUsersPages = async (query: string) => {
  const count = await db.user.count({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
  });

  return Math.ceil(count / ITEMS_PER_PAGE);
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
};

export const getEmailUser = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
};
