"use client";

import { useLogout } from "@/lib/queries/auth/useLogout";
import { useRouter } from "next/navigation";

const Header = ({ handleQueryReset }: { handleQueryReset?: () => void }) => {
  const { mutate: logout } = useLogout();
  const router = useRouter();

  const handleLogoClick = () => {
    if (handleQueryReset) {
      handleQueryReset();
    } else {
      router.push("/");
    }
  };

  return (
    <header className="max-w-screen-xl flex items-center justify-between py-7 mx-auto px-4">
      <button
        type="button"
        onClick={handleLogoClick}
        className="cursor-pointer"
      >
        <h1 className="text-3xl font-black text-orange-400">BLOG</h1>
      </button>
      <div className="flex items-center justify-between gap-4 text-sm">
        <button
          type="button"
          className="cursor-pointer hover:font-semibold"
          onClick={() => router.push("/my")}
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
