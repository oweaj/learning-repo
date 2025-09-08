"use client";

import { BOTTOM_NAV_LIST } from "@/constants/blog/blog";
import { getUserApi } from "@/lib/api/auth/auth";
import { blogLikeRankApi } from "@/lib/api/blog/blog";
import { myLikeBlogsApi, myblogListApi } from "@/lib/api/my/mypage";
import { useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  const handleNavPrefetch = (path: string | null) => {
    if (path === "/blog_rank") {
      queryClient.prefetchQuery({
        queryKey: ["blog_rank"],
        queryFn: blogLikeRankApi,
      });
    }

    if (path === "/my") {
      queryClient.prefetchQuery({ queryKey: ["user"], queryFn: getUserApi });
      queryClient.prefetchQuery({
        queryKey: ["myBlogs"],
        queryFn: myblogListApi,
      });
      queryClient.prefetchQuery({
        queryKey: ["myLikeBlogs"],
        queryFn: myLikeBlogsApi,
      });
    }
  };

  return (
    <nav className="w-full fixed bottom-0 left-0 right-0 h-14 shadow-[0_-3px_5px_rgba(0,0,0,0.1)] bg-white">
      <ul className="h-full flex gap-10 items-center justify-around">
        {BOTTOM_NAV_LIST.map(({ name, path, Icon }: INavItemType) => (
          <li
            key={name}
            className="p-1"
            onMouseEnter={() => handleNavPrefetch(path)}
          >
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
