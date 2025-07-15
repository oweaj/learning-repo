import { MYPAGE_SIDE_BAR } from "@/constants/mypageSidebar";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="min-w-[250px]">
      <h2 className="text-[22px] font-semibold mb-6">마이페이지</h2>
      <nav className="space-y-8">
        {MYPAGE_SIDE_BAR.map(({ groupName, items }) => (
          <div key={groupName} className="">
            <h3 className="text-lg font-semibold mb-2">{groupName}</h3>
            <ul className="text-[15px] text-gray-500 space-y-2">
              {items.map(({ name, path }) => (
                <li key={name}>
                  <Link href={path} className="hover:text-gray-700">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
