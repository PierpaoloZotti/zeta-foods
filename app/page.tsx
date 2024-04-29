import prisma from "@/app/_lib/db";
import Image from "next/image";

export default async function Home() {
  const restaurantes = await prisma.restaurant.findMany({
    include: {
      categories: true,
    },
  });
  return <main className="flex flex-col gap-4">zetafoods</main>;
}
