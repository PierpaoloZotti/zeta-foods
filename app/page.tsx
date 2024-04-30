import prisma from "@/app/_lib/db";
import Banner from "./_components/banner";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";

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
    </>
  );
}
