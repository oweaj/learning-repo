import MyBlogList from "./_components/MyBlogList";

const MyBlogs = () => {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-baseline gap-3 pb-2 border-b-1 max-[400px]:flex-col max-[400px]:gap-1">
        <h3 className="text-[22px] font-semibold">작성한 블로그</h3>
        <span className="text-xs text-red-500">
          ※ 삭제된 블로그는 포함되지않습니다.
        </span>
      </div>
      <MyBlogList />
    </div>
  );
};

export default MyBlogs;
