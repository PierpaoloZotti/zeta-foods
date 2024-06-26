import { Prisma } from "@prisma/client";
import { BikeIcon, ClockIcon, HeartIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "../_helpers/price";
import { cn } from "../_lib/utils";
import { Button } from "./ui/button";

type RestaurantItemProps = {
  restaurant: Prisma.RestaurantGetPayload<{}>;
  className?: string;
};

const RestaurantItem = ({ restaurant, className }: RestaurantItemProps) => {
  return (
    <Link href={`/restaurants/${restaurant.id}`}>
      <div
        className={cn("min-h-[187px] min-w-[267px] max-w-[267px]", className)}
      >
        <div className="relative h-[136px] w-full">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            className="rounded-md object-cover shadow-md"
          />
          <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-neutral-200 px-3 py-2">
            <StarIcon className="size-4 fill-yellow-500 text-yellow-500" />
            <p className="text-xs font-semibold">5.0</p>
          </div>

          <Button
            variant="ghost"
            className="absolute right-2 top-2 size-fit rounded-full bg-neutral-400 p-2"
            size="icon"
          >
            <HeartIcon className="size-4 fill-white text-white" />
          </Button>
        </div>
        <h1>{restaurant.name}</h1>
        <div className="flex gap-3">
          <div className="flex items-center gap-1">
            <BikeIcon size={16} className="text-primary" />
            {Number(restaurant.deliveryFee) > 0 ? (
              <p className="text-sm font-semibold">
                {formatPrice(Number(restaurant.deliveryFee))}
              </p>
            ) : (
              <p className="text-sm font-semibold">Grátis</p>
            )}
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon size={16} className="text-primary" />
            <p className="text-sm font-semibold">
              {restaurant.deliveryTimeMinutes} min
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantItem;
