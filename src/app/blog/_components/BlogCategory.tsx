import Tab from "@/components/tab/Tab";
import { BLOG_CATEGORY } from "@/constants/blogCategory";

const BlogCategory = () => {
  return (
    <div className="flex gap-6">
      {BLOG_CATEGORY.map((item) => (
        <Tab key={item.id} category={item} />
      ))}
    </div>
  );
};

export default BlogCategory;
