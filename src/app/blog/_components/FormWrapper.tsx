import NoticeForm from "@/app/my/notice/_components/NoticeForm";
import PageTitle from "@/components/common/PageTitle";
import type { IBlogFormDataType } from "@/types/blog.type";
import BlogForm from "./BlogForm";

const FormWrapper = ({
  title,
  editMode,
  name,
  defaultData,
  id,
}: {
  title: string;
  editMode: boolean;
  name: "blog" | "notice";
  defaultData?: IBlogFormDataType;
  id?: string;
}) => {
  return (
    <div className="space-y-6">
      {name === "blog" ? (
        <>
          <PageTitle title={title} />
          <BlogForm editMode={editMode} defaultData={defaultData} id={id} />
        </>
      ) : (
        <>
          <h3 className="text-xl font-semibold">공지사항 등록</h3>
          <NoticeForm editMode={editMode} defaultData={defaultData} id={id} />
        </>
      )}
    </div>
  );
};

export default FormWrapper;
