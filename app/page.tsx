import prisma from "@/app/_lib/db";
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
      </div>
    </>
  );
}
