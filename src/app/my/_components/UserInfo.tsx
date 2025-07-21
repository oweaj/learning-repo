import type { INavItemType } from "@/components/home/BottomNavbar";
import { MYPAGE_USER_INFO } from "@/constants/mypage/mypageUserInfo";
import Link from "next/link";

const UserInfo = () => {
  return (
    <div className="w-full border rounded-sm py-8 flex justify-center">
      <div className="w-full grid grid-cols-5 max-md:grid-cols-3 max-md:gap-8">
        {MYPAGE_USER_INFO.map(({ name, path, Icon }: INavItemType) => (
          <div key={name} className="w-full text-center text-sm">
            {path ? (
              <Link href={path}>
                <div className="flex flex-col items-center gap-2">
                  <Icon className="w-6 h-6 text-gray-700" />
                  {name}
                </div>
              </Link>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Icon className="w-6 h-6 text-gray-700" />
                {name}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserInfo;
