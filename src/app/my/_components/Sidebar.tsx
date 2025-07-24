"use client";

import Modal from "@/components/modal/Modal";
import { Button } from "@/components/ui/button";
import { MYPAGE_SIDE_BAR } from "@/constants/mypageSidebar";
import { useUser } from "@/lib/queries/auth/useUser";
import { useUserDelete } from "@/lib/queries/auth/useUserDelete";
import Link from "next/link";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const { mutate: userDelete } = useUserDelete();
  const user = useUser();

  return (
    <div className="flex flex-col gap-8 max-md:hidden min-w-[250px]">
      <div>
        <h2 className="text-[22px] font-semibold mb-2">
          <Link href={"/my"}>마이페이지</Link>
        </h2>
        <Link
          href={"/my/notice"}
          className="text-[15px] text-gray-500 hover:text-gray-700"
        >
          <span>공지사항</span>
        </Link>
      </div>
      <nav className="space-y-8">
        {MYPAGE_SIDE_BAR.map(({ groupName, items }) => (
          <div key={groupName}>
            <strong className="inline-block text-lg font-semibold mb-2">
              {groupName}
            </strong>
            <ul className="text-[15px] text-gray-500 space-y-2">
              {items.map(({ name, path }) =>
                path ? (
                  <li key={name}>
                    <Link href={path} className="hover:text-gray-700">
                      {name}
                    </Link>
                  </li>
                ) : (
                  <Modal
                    key={name}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    size="w-[35rem]"
                    content={
                      <span className="flex flex-col items-center gap-2">
                        <span>
                          <strong className="underline">{user?.email}</strong>{" "}
                          계정의 모든 데이터가 삭제되며 복구할 수 없습니다.
                        </span>
                        <label className="flex items-center gap-1">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => setChecked(e.target.checked)}
                          />
                          안내 사항 확인과 이에 대한 동의를 합니다.
                        </label>
                      </span>
                    }
                    trigger={
                      <li className="hover:text-gray-700 cursor-pointer">
                        {name}
                      </li>
                    }
                    actionButton={
                      <>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-1/3 h-10"
                          onClick={() => setIsOpen(false)}
                        >
                          취소
                        </Button>
                        <Button
                          type="submit"
                          className="w-1/3 h-10 border bg-red-500 font-semibold"
                          onClick={() => userDelete()}
                          disabled={!checked}
                        >
                          확인
                        </Button>
                      </>
                    }
                  />
                ),
              )}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
