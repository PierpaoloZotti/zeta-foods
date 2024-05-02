"use client";

import DiscountBadge from "@/app/_components/badge-discount";
import ProductList from "@/app/_components/product-list";
import { Button } from "@/app/_components/ui/button";
import { calculateProductTotalPrice, formatPrice } from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { BikeIcon, ChevronDown, ChevronUp, Clock } from "lucide-react";
import { useState } from "react";

type ProductDetailsProps = {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
};

const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(
    calculateProductTotalPrice(product),
  );

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
    setTotalPrice(calculateProductTotalPrice(product) * (quantity + 1));
  };

  const handleDecrement = () => {
    setQuantity((prev) => prev - 1);
    setTotalPrice(calculateProductTotalPrice(product) * (quantity - 1));
  };
  return (
    <div>
      <div className="flex justify-between px-5">
        <div className="flex flex-col">
          <div className="flex items-center gap-x-2">
            <h2 className="font-semibold">
              {/* R$ {calculateProductTotalPrice(product)} */}
              {formatPrice(totalPrice)}
            </h2>
            {product.discountPercentage > 0 && (
              <DiscountBadge discountPercentage={product.discountPercentage} />
            )}
          </div>
          {product.discountPercentage > 0 && (
            <span className="text-xs  text-neutral-400">
              De {formatPrice(Number(product.price) * quantity)}
            </span>
          )}
        </div>
        <div>
          <div className="flex items-center gap-x-2">
            <Button
              onClick={handleDecrement}
              disabled={quantity === 1}
              className="size-7"
              size="icon"
            >
              <ChevronDown size={14} />
            </Button>
            <span className="w-4 text-center text-sm">{quantity}</span>
            <Button onClick={handleIncrement} className="size-7" size="icon">
              <ChevronUp size={14} />
            </Button>
          </div>
        </div>
      </div>
      <div className="mx-5 my-6 flex justify-between rounded-md border border-muted-foreground/40 px-12 py-2.5 shadow">
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2 ">
            <BikeIcon size={18} />
            <span className="text-xs text-muted-foreground">Entrega</span>
          </div>
          {Number(product.restaurant.deliveryFee) > 0 ? (
            <span className="text-sm font-semibold">
              {formatPrice(Number(product.restaurant.deliveryFee))}
            </span>
          ) : (
            <span className="text-sm font-semibold">Grátis</span>
          )}
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2 ">
            <Clock size={18} />
            <span className="text-xs text-muted-foreground">Entrega</span>
          </div>
          <span className="text-sm font-semibold">
            {product.restaurant.deliveryTimeMinutes} min
          </span>
        </div>
      </div>
      <h2 className="mb-3 px-5 text-lg  font-semibold">Sobre</h2>
      <p className="px-5 text-muted-foreground">{product.description}</p>
      <h2 className="my-3 px-5 text-lg  font-semibold">Sucos</h2>
      <ProductList products={complementaryProducts} />
      <Button className="mx-5 mb-5 mt-4 w-full " size="lg">
        Adicionar ao carrinho
      </Button>
    </div>
  );
};

export default ProductDetails;
