"use server";

import prisma from "@/app/_lib/db";

export async function getRecommendedProducts() {
  return await prisma.product.findMany({
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });
}
