import Image from "next/image";
import prisma from "../_lib/db";

const Cardapio = async () => {
  const cardapios = await prisma.product.findMany();

  return (
    <section className="by container bg-neutral-100">
      {cardapios.map((cardapio) => (
        <div
          key={cardapio.id}
          className="mb-4 flex w-fit flex-col gap-y-6 rounded-xl border-8 border-b-green-600 border-l-yellow-600 border-r-blue-800 border-t-primary bg-primary/60 p-4 shadow-xl "
        >
          <div className="flex items-center gap-x-8">
            <div className="flex flex-col gap-y-2">
              <h2>Nome: {cardapio.name}</h2>
              <p>Preço: {cardapio.price.toString()}</p>
            </div>
            <div className="relative size-24  overflow-hidden rounded-xl shadow-xl">
              <Image
                src={cardapio.imageUrl}
                alt={cardapio.name}
                fill
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Cardapio;
