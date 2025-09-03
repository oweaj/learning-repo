import Tab from "@/components/tab/Tab";
import { BLOG_CATEGORY } from "@/constants/blog/blog";

const BlogCategory = ({
  category,
  handleQueryChange,
}: {
  category: string | null;
  handleQueryChange: ({ newCategory }: { newCategory: string | null }) => void;
}) => {
  return (
    <div className="flex gap-6 max-md:order-1">
      {BLOG_CATEGORY.map((item) => (
        <Tab
          key={item.id}
          item={item}
          category={category}
          handleQueryChange={handleQueryChange}
        />
      ))}
    </div>
  );
};

export default BlogCategory;
