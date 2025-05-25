import NoticeBanner from "@/components/common/NoticeBanner";
import PageTitle from "@/components/common/PageTitle";
import type { TBlogListType } from "@/types/blog.type";
import BlogForm from "./BlogForm";

const BlogFormWrapper = ({
  title,
  editMode,
  defaultData,
  id,
}: {
  title: string;
  editMode: boolean;
  defaultData?: TBlogListType;
  id?: string;
}) => {
  return (
    <div className="space-y-6">
      <PageTitle title={title} />
      <NoticeBanner notice="욕설 및 비방글 작성 시 계정삭제" />
      <BlogForm editMode={editMode} defaultData={defaultData} id={id} />
    </div>
  );
};

export default BlogFormWrapper;
