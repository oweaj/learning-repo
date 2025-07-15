import BottomNavbar from "@/components/home/BottomNavbar";
import Header from "@/components/home/Header";
import Sidebar from "./_components/Sidebar";
import UserInfo from "./_components/UserInfo";
import UserProfile from "./_components/UserProfile";

const MyPage = () => {
  return (
    <>
      <Header />
      <div className="flex max-w-screen-xl p-4 mx-auto">
        <Sidebar />
        <div className="flex-3/4">
          <UserProfile />
          <UserInfo />
        </div>
      </div>
      <BottomNavbar />
    </>
  );
};

export default MyPage;
