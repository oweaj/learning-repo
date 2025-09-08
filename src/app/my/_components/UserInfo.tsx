"use client";

import type { INavItemType } from "@/components/home/BottomNavbar";
import { MYPAGE_USER_INFO } from "@/constants/mypage/mypage";
import type { IMyBlogDataType, IMyLikeBlogDataType } from "@/types/blog.type";
import Link from "next/link";

interface IMyInfoType {
  queryBlogs: IMyBlogDataType;
  queryLikeblogs: IMyLikeBlogDataType;
}

const UserInfo = ({ queryBlogs, queryLikeblogs }: IMyInfoType) => {
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
                      ? queryBlogs?.blogs.length
                      : id === "likeBlogs"
                        ? queryLikeblogs?.likeBlogs.length
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
                <span>{id === "likeCount" && queryBlogs?.maxLikeCount}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserInfo;
