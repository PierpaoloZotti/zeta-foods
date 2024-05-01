import prisma from "../_lib/db";
import ProductItem from "./product-item";

const ProductList = async () => {
  const products = await prisma.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });
  console.log(products);
  return (
    <div className="flex gap-3 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden ">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
