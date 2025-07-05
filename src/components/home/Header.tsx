"use client";

import { Logout } from "@/app/auth/_components/Logout";
import { useUser } from "@/lib/queries/blog/useUser";
import Link from "next/link";

const Header = () => {
  const user = useUser();

  return (
    <header className="max-w-screen-xl flex items-center justify-between py-6 mx-auto px-4">
      <Link href="/">
        <h1 className="text-3xl font-black text-orange-400">BLOG</h1>
      </Link>
      {user && (
        <div className="flex items-center justify-between gap-4">
          <span className="font-semibold">{user.name}님</span>
          <Logout />
        </div>
      )}
    </header>
  );
};

export default Header;
