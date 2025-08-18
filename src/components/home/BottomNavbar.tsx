"use client";

import { BOTTOM_NAV_LIST } from "@/constants/blog/blog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, SVGProps } from "react";

export interface INavItemType {
  id?: string;
  name: string;
  path: string | null;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const BottomNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="w-full fixed bottom-0 left-0 right-0 h-14 shadow-[0_-3px_5px_rgba(0,0,0,0.1)] bg-white">
      <ul className="h-full flex gap-10 items-center justify-around">
        {BOTTOM_NAV_LIST.map(({ name, path, Icon }: INavItemType) => (
          <li key={name} className="p-1">
            <Link href={path ? path : "/"}>
              <Icon
                className={`w-7 h-7 stroke-[1.5] ${pathname === path && "stroke-orange-500"}`}
              />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNavbar;
