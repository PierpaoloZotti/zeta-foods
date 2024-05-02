import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type CategoryItemProps = {
  category: Category;
};

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div className="h-[60px]  min-w-fit rounded-md p-4 shadow">
      <Link href={`/categories/${category.id}`}>
        <div className="flex w-full items-center justify-center gap-x-2">
          <Image
            src={category.imageUrl}
            alt={category.name}
            width={30}
            height={30}
          />
          <p className=" font-semibold">{category.name}</p>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
