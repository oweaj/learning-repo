"use client";

import PageTitle from "@/components/common/PageTitle";
import { useBlogDetail } from "@/queries/blog/useBlogDetail";
import { dateFormat } from "@/utils/dateFormat";
import Image from "next/image";
import Link from "next/link";

const BlogDetail = ({ id }: { id: number }) => {
  const data = useBlogDetail({ id });
  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-xl">
        <PageTitle title={data?.title} />
        <Link
          href={"/blog/edit"}
          className="text-lg font-semibold cursor-pointer p-1"
        >
          수정
        </Link>
      </div>
      <div className="max-w-xl flex flex-col gap-6 text-gray-600 font-medium mx-auto">
        <Image
          src={data.main_image}
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto object-cover rounded-xl"
          alt="블로그 상세 이미지"
          priority
        />
        <div>작성일시 : {dateFormat(data.created_at)}</div>
        <div className="text-sm text-gray-600 font-medium line-clamp-4 overflow-hidden break-words">
          {data.content}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
