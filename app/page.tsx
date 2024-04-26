import prisma from "@/app/_lib/db";
import Image from "next/image";

export default async function Home() {
  const restaurantes = await prisma.restaurant.findMany({
    include: {
      categories: true,
    },
  });
  return (
    <main className="flex flex-col gap-4">
      {restaurantes.map((restaurante) => (
        <div key={restaurante.id}>
          <div className="flex items-center gap-x-8">
            <div className="flex flex-col gap-y-2">
              <h2>Nome: {restaurante.name}</h2>
              <p>Taxa de entrega: {restaurante.deliveryFee.toString()}</p>
            </div>
            <div className="relative size-24  overflow-hidden rounded-xl shadow-xl">
              <Image src={restaurante.imageUrl} alt={restaurante.name} fill />
            </div>
          </div>
          <ul>
            {restaurante.categories.map((category) => (
              <li key={category.id}>{category.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
}
