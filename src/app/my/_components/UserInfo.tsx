"use client";

import type { INavItemType } from "@/components/home/BottomNavbar";
import { MYPAGE_USER_INFO } from "@/constants/mypage/mypage";
import { useMyBlogList } from "@/lib/queries/my/useMyBlogList";
import { useMyLikeBlogList } from "@/lib/queries/my/useMyLikeBlogList";
import Link from "next/link";

const UserInfo = () => {
  const { data: queryBlogs } = useMyBlogList();
  const { data: queryLikeblogs } = useMyLikeBlogList();

  return (
    <div className="w-full border rounded-sm py-8 flex justify-center">
      <div className="w-full grid grid-cols-4 gap-6 max-md:grid-cols-2 max-md:gap-8">
        {MYPAGE_USER_INFO.map(({ id, name, path, Icon }: INavItemType) => (
          <div key={id} className="w-full text-center text-sm">
            {path ? (
              <Link href={path}>
                <div className="min-h-20 flex flex-col items-center gap-2">
                  <Icon className="w-6 h-6 text-gray-700" />
                  <span>{name}</span>
                  <span>
                    {id === "blogCount"
                      ? (queryBlogs?.blogs.length ?? 0)
                      : id === "likeBlogs"
                        ? (queryLikeblogs?.likeBlogs.length ?? 0)
                        : null}
                  </span>
                </div>
              </Link>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Icon
                  className={`w-6 h-6 text-gray-700 ${id === "likeCount" && "fill-yellow-400 stroke-yellow-400"}`}
                />
                {name}
                <span>
                  {id === "likeCount" && (queryBlogs?.maxLikeCount ?? 0)}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserInfo;
