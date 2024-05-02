import prisma from "../_lib/db";
import CategoryItem from "./category-item";

const CategoryList = async () => {
  const categories = await prisma.category.findMany();
  return (
    <div className="mt-10 flex items-center gap-3 overflow-x-scroll px-5 py-3 [&::-webkit-scrollbar]:hidden">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoryList;
