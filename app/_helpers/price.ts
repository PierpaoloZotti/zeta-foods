import { Product } from "@prisma/client";

export const calculateProductTotalPrice = (product: Product): number => {
  if (product.discountPercentage === 0) {
    return Number(product.price);
  }
  return (
    Number(product.price) -
    (Number(product.price) * product.discountPercentage) / 100
  );
};
