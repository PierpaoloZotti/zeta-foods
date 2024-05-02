import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import prisma from "@/app/_lib/db";
import { notFound } from "next/navigation";

type CategoryPageProps = {
  params: {
    id: string;
  };
};

const CategoryPage = async ({ params: { id } }: CategoryPageProps) => {
  const categoryType = await prisma.category.findUnique({
    where: {
      id,
    },
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
  });
  if (!categoryType) {
    return notFound();
  }
  return (
    <div>
      <Header />
      <h1 className="my-6 mt-10 px-5 text-xl font-semibold">
        {categoryType.name}
      </h1>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-10">
        {categoryType.products.map((products) => (
          <ProductItem key={products.id} product={products} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
