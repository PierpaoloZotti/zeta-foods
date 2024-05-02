import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import { getRestaurants } from "../_actions/restaurants-actions";

const RecommendedRestaurant = async () => {
  const restaurants = await getRestaurants();
  return (
    <>
      <Header />
      <div className="px-5">
        <h1 className="my-6 text-2xl font-semibold">
          Restaurantes Recomendados
        </h1>
        <div className="flex flex-col gap-y-8">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="mx-auto min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedRestaurant;
