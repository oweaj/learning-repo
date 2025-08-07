"use client";

import Modal from "@/components/modal/Modal";
import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/queries/auth/useUser";
import { useBlogDelete } from "@/lib/queries/blog/useBlogDelete";
import type { IBlogDataType } from "@/types/blog.type";
import { dateFormat } from "@/utils/dateFormat";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const BlogCard = (props: IBlogDataType) => {
  const { _id, title, content, main_image, createdAt, user_id } = props;
  const formatDate = createdAt && dateFormat(createdAt);
  const [isOpen, setIsOpen] = useState(false);
  const ListRef = useRef<HTMLLIElement>(null);
  const router = useRouter();
  const { mutate: blogDelete } = useBlogDelete();
  const user = useUser();

  if (!_id || !user) return null;

  const handleBlogDelete = (id: string) => {
    blogDelete(id);
    setIsOpen(false);
  };

  return (
    <li
      ref={ListRef}
      className="relative hover:bg-gray-50 rounded-xl transition-all duration-200"
    >
      <Link href={`/blog/${_id}`} className="flex gap-10 max-md:gap-4">
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
            <p className="text-lg font-semibold">{title}</p>
          </div>
          <p className="text-sm text-gray-600 font-medium line-clamp-4 overflow-hidden w-11/12">
            {content}
          </p>
          <p className="text-sm text-gray-600 font-medium line-clamp-1 overflow-hidden max-sm:text-[12px]">
            작성일시 : {formatDate}
          </p>
        </div>
      </Link>
      {user_id._id === user._id && (
        <div className="absolute right-2 top-0">
          <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            content={
              <span className="inline-block truncate">{`블로그 이름 : ${title}`}</span>
            }
            trigger={
              <EllipsisVertical className="w-6 h-6 p-1 text-gray-600 hover:bg-gray-200 hover:rounded-lg cursor-pointer" />
            }
            actionButton={
              <>
                <Button
                  type="button"
                  variant="outline"
                  className="w-1/3 h-10"
                  onClick={() => router.push(`/blog/edit?id=${_id}`)}
                >
                  수정
                </Button>
                <Button
                  type="submit"
                  className="w-1/3 h-10 bg-red-500 font-semibold"
                  onClick={() => handleBlogDelete(_id)}
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
