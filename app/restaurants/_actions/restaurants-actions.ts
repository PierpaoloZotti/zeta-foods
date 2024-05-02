"use server";

import prisma from "@/app/_lib/db";

export const getRestaurants = async () => {
  return await prisma.restaurant.findMany({
    include: {
      categories: true,
    },
  });
};

export const getRestaurantsById = async (id: string) => {
  return await prisma.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        include: {
          products: {
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
};

export const searchRestaurants = async (search: string) => {
  return await prisma.restaurant.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  });
};
