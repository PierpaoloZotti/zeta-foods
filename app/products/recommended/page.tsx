import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { getRecommendedProducts } from "../_actions/product-actions";

const RecommendedProducts = async () => {
  const produtos = await getRecommendedProducts();
  return (
    <div>
      <Header />
      <h1 className="my-6 mt-10 px-5 text-xl font-semibold">
        Produtos Recommendados
      </h1>
      <div className="gap-x-4gg flex flex-wrap items-center justify-center gap-y-6">
        {produtos.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
