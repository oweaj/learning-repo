"use client";

import Modal from "@/components/modal/Modal";
import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/queries/auth/useUser";
import { useUserDelete } from "@/lib/queries/auth/useUserDelete";
import { useState } from "react";

const UserDeleteModal = ({ name }: { name: string }) => {
  const { data: user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const { mutate: userDelete } = useUserDelete();

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      size="w-[35rem]"
      content={
        <span className="flex flex-col items-center gap-2">
          <span>
            <strong className="underline">{user?.email}</strong> 계정의 모든
            데이터가 삭제되며 복구할 수 없습니다.
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
      trigger={<li className="hover:text-gray-700 cursor-pointer">{name}</li>}
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
  );
};

export default UserDeleteModal;
