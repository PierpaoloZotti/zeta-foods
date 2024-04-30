import prisma from "@/app/_lib/db";
import Header from "./_components/header";

export default async function Home() {
  const restaurantes = await prisma.restaurant.findMany({
    include: {
      categories: true,
    },
  });
  return (
    <main className="flex flex-col">
      <Header />
    </main>
  );
}
