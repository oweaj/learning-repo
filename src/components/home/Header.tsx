"use client";

import { useLogout } from "@/lib/queries/auth/useLogout";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const { mutate: logout } = useLogout();
  const router = useRouter();

  return (
    <header className="max-w-screen-xl flex items-center justify-between py-6 mx-auto px-4">
      <Link href="/">
        <h1 className="text-3xl font-black text-orange-400">BLOG</h1>
      </Link>
      <div className="flex items-center justify-between gap-4 text-sm">
        <button
          type="button"
          className="cursor-pointer hover:font-semibold"
          onClick={() => router.push("/mypage")}
        >
          마이페이지
        </button>
        <button
          type="button"
          className="cursor-pointer hover:font-semibold"
          onClick={() => logout()}
        >
          로그아웃
        </button>
      </div>
    </header>
  );
};

export default Header;
