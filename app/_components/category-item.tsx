import { Category } from "@prisma/client";
import Image from "next/image";

type CategoryItemProps = {
  category: Category;
};

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div className="rounded-md p-4 shadow-md">
      <div className="flex items-center  gap-x-2 bg-gray-100 p-4 ">
        <Image
          src={category.imageUrl}
          alt={category.name}
          width={30}
          height={30}
        />
        <span className=" font-semibold">{category.name}</span>
      </div>
    </div>
  );
};

export default CategoryItem;
