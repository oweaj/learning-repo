import MyBlogs from "./_components/MyBlogs";
import UserInfo from "./_components/UserInfo";
import UserProfile from "./_components/UserProfile";

const MyPage = async () => {
  return (
    <div className="w-full space-y-8">
      <UserProfile />
      <UserInfo />
      <MyBlogs />
    </div>
  );
};

export default MyPage;
