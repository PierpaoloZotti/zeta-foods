import prisma from "@/app/_lib/db";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Banner from "./_components/banner";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import ProductList from "./_components/product-list";
import RestauranatList from "./_components/restaurants-list";
import Search from "./_components/search";
import { Button } from "./_components/ui/button";

export default async function Home() {
  const restaurants = await prisma.restaurant.findMany({
    include: {
      categories: true,
    },
  });
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
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
      <CategoryList />
      <div className="px-5">
        <Banner imgUrl="/Banner.png" alt="Banner promocional" />
      </div>
      <div className="pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Link href="/restaurants/recommended">
            <Button
              variant="ghost"
              className="h-fit p-0 text-primary hover:bg-transparent"
            >
              Ver todos
              <ChevronRight className="size-4" />
            </Button>
          </Link>
        </div>
        <ProductList products={products} />
      </div>
      <Banner
        imgUrl="/BannerBurguer.png"
        alt="Banner promocional Burger"
        className="px-5"
      />
      <div className="pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>
          <Link href="/restaurants/recommended">
            <Button
              variant="ghost"
              className="h-fit p-0 text-primary hover:bg-transparent"
            >
              Ver todos
              <ChevronRight className="size-4" />
            </Button>
          </Link>
        </div>
        <RestauranatList restaurants={restaurants} />
      </div>
    </>
  );
}
