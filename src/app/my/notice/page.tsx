"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/queries/auth/useUser";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import NoticeList from "./_components/NoticeList";

const Notice = () => {
  const { data: user } = useUser();
  const router = useRouter();

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between gap-3 pb-5 border-b-2 border-gray-700">
        <h3 className="text-[22px] font-semibold">공지사항</h3>
        {user?.name === "관리자" && (
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/my/notice/create")}
          >
            <Pencil />
            공지 등록
          </Button>
        )}
      </div>
      <NoticeList />
    </div>
  );
};

export default Notice;
