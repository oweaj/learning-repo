import { Logout } from "@/app/auth/_components/Logout";

const Header = () => {
  return (
    <header className="max-w-screen-xl flex items-center justify-between py-6 mx-auto px-4">
      <h1 className="text-3xl font-black text-orange-400">BLOG</h1>
      <Logout />
    </header>
  );
};

export default Header;
