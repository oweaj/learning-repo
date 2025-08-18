import Tab from "@/components/tab/Tab";
import { BLOG_CATEGORY } from "@/constants/blog/blog";

const BlogCategory = () => {
  return (
    <div className="flex gap-6 max-md:order-1">
      {BLOG_CATEGORY.map((item) => (
        <Tab key={item.id} category={item} />
      ))}
    </div>
  );
};

export default BlogCategory;
