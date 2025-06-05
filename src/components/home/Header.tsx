import { Logout } from "@/app/auth/_components/Logout";
import Link from "next/link";

const Header = () => {
  return (
    <header className="max-w-screen-xl flex items-center justify-between py-6 mx-auto px-4">
      <Link href="/">
        <h1 className="text-3xl font-black text-orange-400">BLOG</h1>
      </Link>
      <Logout />
    </header>
  );
};

export default Header;
