import prisma from "@/app/_lib/db";
import { ChevronRight } from "lucide-react";
import Banner from "./_components/banner";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import ProductList from "./_components/product-list";
import Search from "./_components/search";
import { Button } from "./_components/ui/button";

export default async function Home() {
  const restaurantes = await prisma.restaurant.findMany({
    include: {
      categories: true,
    },
  });
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
        <CategoryList />
        <Banner imgUrl="/Banner.png" alt="Banner promocional" />
      </div>
      <div className="pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
          >
            Ver todos
            <ChevronRight className="size-4" />
          </Button>
        </div>
        <ProductList />
      </div>
    </>
  );
}
