import prisma from "../_lib/db";
import CategoryItem from "./category-item";

const CategoryList = async () => {
  const categories = await prisma.category.findMany();
  return (
    <div className="mt-10 flex gap-3 overflow-x-scroll">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoryList;
