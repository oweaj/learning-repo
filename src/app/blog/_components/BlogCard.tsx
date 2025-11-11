"use client";

import { useBlogDelete } from "@/app/hooks/blog/useBlog";
import Modal from "@/components/modal/Modal";
import { Button } from "@/components/ui/button";
import type { IBlogDataType } from "@/types/blog.type";
import { dateFormat } from "@/utils/dateFormat";
import { EllipsisVertical } from "lucide-react";
import { Star } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const BlogCard = ({ item }: { item: IBlogDataType }) => {
  const { _id, title, content, main_image, createdAt, user_id, like_count } =
    item;
  const formatDate = createdAt && dateFormat(createdAt);
  const [isOpen, setIsOpen] = useState(false);
  const ListRef = useRef<HTMLLIElement>(null);
  const router = useRouter();
  const { mutate: blogDelete } = useBlogDelete();
  const { data: session } = useSession();

  if (!_id) return null;

  const handleBlogDelete = (id: string) => {
    blogDelete(id);
    setIsOpen(false);
  };

  return (
    <li
      ref={ListRef}
      className="relative hover:bg-gray-50 rounded-xl transition-all duration-200"
    >
      <Link
        href={`/blog/${_id}`}
        className="flex gap-10 max-md:gap-4 transition-all duration-200 max-mlg:flex-col"
      >
        <div className="relative w-[250px] rounded-xl overflow-hidden aspect-[4/3] max-mlg:w-full max-mlg:aspect-video">
          <Image
            src={main_image || ""}
            width={300}
            height={300}
            className="w-full h-full object-cover"
            alt="블로그 메인 이미지"
            priority
          />
        </div>
        <div className="w-3/4 flex flex-col justify-between overflow-hidden max-mlg:w-full max-mlg:gap-4">
          <div className="w-5/6 flex items-center justify-between">
            <p className="text-lg font-semibold line-clamp-1 overflow-hidden">
              {title}
            </p>
          </div>
          <p className="text-sm text-gray-600 font-medium line-clamp-4 overflow-hidden w-11/12 max-mlg:w-full">
            {content}
          </p>
          <div className="flex items-center [&>*:not(:last-child)]:after:content-['·'] [&>*:not(:last-child)]:after:mx-2">
            <p className="text-sm text-gray-600 font-medium line-clamp-1 overflow-hidden max-sm:text-[12px]">
              {formatDate}
            </p>
            <p className="text-sm text-gray-600 font-medium">0개의 댓글</p>
            <div className="flex items-center gap-[2px] text-sm text-gray-600">
              <Star className="w-[15px] h-[15px] stroke-1 fill-yellow-400 stroke-yellow-400" />
              {like_count}
            </div>
          </div>
        </div>
      </Link>
      {user_id.id === session?.user.id && (
        <div className="absolute right-2 top-0">
          <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            content={
              <span className="inline-block truncate">{`블로그 이름 : ${title}`}</span>
            }
            trigger={
              <EllipsisVertical
                className="w-6 h-6 p-1 text-gray-600 hover:bg-gray-200 hover:rounded-lg cursor-pointer"
                aria-label="블로그 옵션 트리거"
              />
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
