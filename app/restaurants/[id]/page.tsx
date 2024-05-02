import DeliveryDetails from "@/app/_components/delivery-details";
import ProductList from "@/app/_components/product-list";
import { Badge } from "@/app/_components/ui/badge";
import RestaurantImage from "@/app/restaurants/[id]/_components/restaurant-image";
import { getRestaurantsById } from "@/app/restaurants/_actions/restaurants-actions";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

type RestaurantProps = {
  params: {
    id: string;
  };
};

const Restaurant = async ({ params: { id } }: RestaurantProps) => {
  const restaurant = await getRestaurantsById(id);
  if (!restaurant) {
    return notFound();
  }
  return (
    <div>
      <RestaurantImage restaurant={restaurant} />
      <div className="relative -my-4 rounded-t-2xl bg-neutral-50">
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-x-1">
            <div className="relative size-6">
              <Image
                src={restaurant.imageUrl}
                alt={restaurant.name}
                fill
                className="rounded-full"
              />
            </div>
            <h1 className="text-xl font-semibold">{restaurant.name}</h1>
          </div>
          <div className="flex items-center gap-x-1 rounded-full bg-slate-800 px-3 py-1">
            <StarIcon size={16} className="fill-yellow-500 text-yellow-500" />
            <span className="font-semibold text-white">4.5</span>
          </div>
        </div>
        <DeliveryDetails
          deliveryFee={Number(restaurant.deliveryFee)}
          deliveryTimeMinutes={restaurant.deliveryTimeMinutes}
        />
        <div className="flex items-center gap-x-3 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
          {restaurant.categories.map((category) => (
            <Badge
              key={category.id}
              className="min-w-[167px] bg-neutral-200 px-6 py-2 text-muted-foreground shadow hover:bg-neutral-100 hover:shadow-inner"
            >
              {category.name}
            </Badge>
          ))}
        </div>
        <div className="mt-3 space-y-3">
          <h2 className="px-5 font-semibold">Mais Pedidos</h2>
          <ProductList products={restaurant.products} />
        </div>
        <div className="mt-6">
          {restaurant.categories.map((category) => (
            <div className="mt-3 space-y-3" key={category.id}>
              <h2 className="px-5 font-semibold">{category.name}</h2>
              <ProductList products={category.products} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
