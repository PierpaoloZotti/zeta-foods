import prisma from "@/app/_lib/db";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductDetails from "./_components/product-details";
import ProductImage from "./_components/product-image";

type ProductPageProps = {
  params: {
    id: string;
  };
};
const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });
  if (!product) {
    return notFound();
  }
  const juices = await prisma.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
      restaurantId: product.restaurantId,
    },
    include: {
      restaurant: true,
    },
  });
  return (
    <div>
      <ProductImage product={product} />
      <div>
        <div className="flex items-center gap-x-4 p-5">
          <div className="relative size-6">
            <Image
              src={product.restaurant.imageUrl}
              alt={product.restaurant.name}
              fill
              className="rounded-full"
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </span>
        </div>
        <h1 className="mb-3 mt-1 px-5 text-xl font-semibold">{product.name}</h1>
        <ProductDetails product={product} complementaryProducts={juices} />
      </div>
    </div>
  );
};

export default ProductPage;
