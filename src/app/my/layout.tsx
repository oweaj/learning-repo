import BottomNavbar from "@/components/home/BottomNavbar";
import Header from "@/components/home/Header";
import Sidebar from "./_components/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="flex max-w-screen-xl p-4 mx-auto">
        <Sidebar />
        {children}
      </div>
      <BottomNavbar />
    </>
  );
};

export default Layout;
