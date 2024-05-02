import { Prisma } from "@prisma/client";
import RestaurantItem from "./restaurant-item";

type RestauranatListProps = {
  restaurants: Prisma.RestaurantGetPayload<{
    include: {
      categories: true;
    };
  }>[];
};

const RestauranatList = ({ restaurants }: RestauranatListProps) => {
  console.log(restaurants);
  return (
    <div className="flex items-center gap-3 overflow-x-scroll p-0 px-5">
      {restaurants.map((restaurant) => (
        <RestaurantItem key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
};
export default RestauranatList;
