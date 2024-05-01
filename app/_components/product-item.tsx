import { Product } from "@prisma/client";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { calculateProductTotalPrice } from "../_helpers/price";

type ProductItemProps = {
  product: Product & {
    restaurant: {
      name: string;
    };
  };
};

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="flex min-h-[187px] min-w-[128px] flex-col">
      <div className=" relative size-32 rounded-md object-cover">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="rounded-md object-cover shadow-md"
        />

        {product.discountPercentage > 0 && (
          <div className="absolute left-2 top-1 flex items-center rounded-full bg-primary px-2 py-1 text-xs text-neutral-100">
            <ArrowDown className="size-3" />
            <p>{product.discountPercentage}%</p>
          </div>
        )}
      </div>
      <h4 className=" mt-2 truncate text-sm">{product.name}</h4>
      <div className="flex items-baseline gap-2">
        <h3 className="text-sm font-semibold">
          R${calculateProductTotalPrice(product).toFixed(2)}
        </h3>
        {product.discountPercentage > 0 && (
          <span className="text-xs line-through">
            R${product.price.toFixed(2)}
          </span>
        )}
      </div>
      <span className="mt-1 truncate text-xs text-neutral-400">
        {product.restaurant.name}
      </span>
    </div>
  );
};

export default ProductItem;
