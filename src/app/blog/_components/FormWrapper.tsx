import NoticeBanner from "@/components/common/NoticeBanner";
import PageTitle from "@/components/common/PageTitle";
import BlogForm from "./BlogForm";

const BlogFormWrapper = ({
  title,
  editMode,
}: { title: string; editMode: boolean }) => {
  return (
    <div className="space-y-6">
      <PageTitle title={title} />
      <NoticeBanner notice="욕설 및 비방글 작성 시 계정삭제" />
      <BlogForm editMode={editMode} />
    </div>
  );
};

export default BlogFormWrapper;
