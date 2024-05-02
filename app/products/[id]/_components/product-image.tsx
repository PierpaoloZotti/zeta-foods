"use client";

import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type ProductImageProps = {
  product: Pick<Product, "imageUrl" | "name">; // Pick the imageUrl and name fields from the Product type
};
const ProductImage = ({ product }: ProductImageProps) => {
  const router = useRouter();
  return (
    <div className="relative h-[360px] w-full ">
      <Image src={product.imageUrl} alt={product.name} fill objectFit="cover" />

      <Button
        onClick={() => router.back()}
        className="absolute left-4 top-4 size-fit rounded-full bg-neutral-100 p-2 text-foreground shadow-md transition-all duration-200 ease-in-out hover:text-white hover:shadow-inner"
        size="icon"
      >
        <ChevronLeft />
      </Button>
    </div>
  );
};

export default ProductImage;
