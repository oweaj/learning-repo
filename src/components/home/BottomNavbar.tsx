"use client";

import { BOTTOM_NAV_LIST } from "@/constants/bottomNavbar";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";

interface navItemType {
  id: string;
  link: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const BottomNavbar = () => {
  return (
    <nav className="w-full fixed bottom-0 left-0 right-0 h-14 shadow-[0_-3px_5px_rgba(0,0,0,0.1)] bg-white">
      <ul className="h-full flex gap-10 items-center justify-around">
        {BOTTOM_NAV_LIST.map(({ id, link, Icon }: navItemType) => (
          <li key={id} className="p-1">
            <Link href={link}>
              <Icon className="w-6 h-6" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNavbar;
