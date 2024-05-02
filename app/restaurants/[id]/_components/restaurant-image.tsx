"use client";

import FavoriteIcon from "@/app/_components/favorite-heart";
import { Button } from "@/app/_components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type RestaurantImageProps = {
  restaurant: Pick<Restaurant, "imageUrl" | "name">;
};

const RestaurantImage = ({ restaurant }: RestaurantImageProps) => {
  const router = useRouter();

  return (
    <div className="relative h-[250px] w-full">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        objectFit="cover"
      />

      <Button
        onClick={() => router.back()}
        className="absolute left-4 top-4 size-fit rounded-full bg-neutral-100 p-2 text-foreground shadow-md transition-all duration-200 ease-in-out hover:text-white hover:shadow-inner"
        size="icon"
      >
        <ChevronLeft />
      </Button>
      <FavoriteIcon className="absolute right-4 top-4" />
    </div>
  );
};

export default RestaurantImage;
