"use client";

import PageTitle from "@/components/common/PageTitle";
import { useBlogDetail } from "@/lib/queries/blog/useBlogDetail";
import { useUser } from "@/lib/queries/blog/useUser";
import { dateFormat } from "@/utils/dateFormat";
import Image from "next/image";
import Link from "next/link";

const BlogDetail = ({ id }: { id: string }) => {
  const user = useUser();
  const data = useBlogDetail({ id });

  if (!data || !user) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-xl">
        <PageTitle title={data.title} />
        {data.user_id._id === user._id && (
          <Link
            href={`/blog/edit?id=${id}`}
            className="text-lg font-semibold cursor-pointer p-1 border border-gray-600 rounded-xl px-3 hover:bg-gray-800 hover:text-white transition-all"
          >
            수정
          </Link>
        )}
      </div>
      <div className="flex flex-col gap-6 text-gray-600 font-medium px-4">
        <div className="relative w-full max-w-[500px] aspect-video rounded-xl overflow-hidden mx-auto">
          <Image
            src={data.main_image}
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            className="object-cover"
            alt="블로그 상세 이미지"
            priority
          />
        </div>
        <div>작성일시 : {dateFormat(data.createdAt)}</div>
        <div className="text-sm text-gray-600 font-medium line-clamp-4 overflow-hidden break-words">
          {data.content}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
