import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { calculateProductTotalPrice, formatPrice } from "../_helpers/price";
import DiscountBadge from "./badge-discount";

type ProductItemProps = {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>;
};

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="flex min-h-[187px] min-w-[128px] flex-col">
        <div className=" relative size-32 rounded-md object-cover">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="rounded-md object-cover shadow-md"
          />

          {product.discountPercentage > 0 && (
            <DiscountBadge
              discountPercentage={product.discountPercentage}
              className="absolute left-2 top-1"
            />
          )}
        </div>
        <h4 className=" mt-2 truncate text-sm">{product.name}</h4>
        <div className="flex items-baseline gap-2">
          <h3 className="text-sm font-semibold">
            {formatPrice(calculateProductTotalPrice(product))}
          </h3>
          {product.discountPercentage > 0 && (
            <span className="text-xs line-through">
              {formatPrice(Number(product.price))}
            </span>
          )}
        </div>
        <span className="mt-1 truncate text-xs text-neutral-400">
          {product.restaurant.name}
        </span>
      </div>
    </Link>
  );
};

export default ProductItem;
