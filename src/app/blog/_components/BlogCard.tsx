"use client";

import Modal from "@/components/modal/Modal";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { useBlogDelete } from "@/lib/queries/blog/useBlogDelete";
import type { TBlogListType } from "@/types/blog.type";
import { dateFormat } from "@/utils/dateFormat";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const BlogCard = (props: TBlogListType) => {
  const { id, title, content, main_image, created_at, user_id } = props;
  const formatDate = created_at && dateFormat(created_at);
  const [isOpen, setIsOpen] = useState(false);
  const ListRef = useRef<HTMLLIElement>(null);
  const router = useRouter();
  const { mutate: blogDelete } = useBlogDelete();
  const session = useUser();

  if (!id) return null;

  const handleBlogDelete = (id: number) => {
    blogDelete(id);
    setIsOpen(false);
  };

  return (
    <li
      ref={ListRef}
      className="relative hover:bg-gray-50 rounded-xl transition-all duration-200"
    >
      <Link href={`/blog/${id}`} className="flex gap-10 max-md:gap-4">
        <div className="relative w-[250px] rounded-xl overflow-hidden aspect-square">
          <Image
            src={main_image || ""}
            width={300}
            height={300}
            className="w-full h-full object-cover"
            alt="블로그 메인 이미지"
            priority
          />
        </div>
        <div className="w-3/4 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">{title}</div>
          </div>
          <div className="text-sm text-gray-600 font-medium line-clamp-4 overflow-hidden w-11/12">
            {content}
          </div>
          <div className="text-sm text-gray-600 font-medium">
            작성일시 : {formatDate}
          </div>
        </div>
      </Link>
      {user_id.id === session && (
        <div className="absolute right-2 top-0">
          <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            content={`Blog Title : ${title}`}
            trigger={
              <EllipsisVertical className="w-6 h-6 p-1 text-gray-600 hover:bg-gray-200 hover:rounded-lg cursor-pointer" />
            }
            actionButton={
              <>
                <Button
                  type="button"
                  variant="outline"
                  className="w-1/3 h-10"
                  onClick={() => router.push("/blog/edit")}
                >
                  수정
                </Button>
                <Button
                  type="submit"
                  className="w-1/3 h-10 bg-red-500 font-semibold"
                  onClick={() => handleBlogDelete(id)}
                >
                  삭제
                </Button>
              </>
            }
          />
        </div>
      )}
    </li>
  );
};

export default BlogCard;
