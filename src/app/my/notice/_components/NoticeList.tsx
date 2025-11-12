"use client";

import { useNoticeList } from "@/app/hooks/my/useMy";
import AccordionItems from "@/components/accordion/Accordion";
import { Accordion } from "@/components/ui/accordion";
import type { INoticeDataType } from "@/types/mypage.type";
import { useSession } from "next-auth/react";
import { useState } from "react";

const NoticeList = () => {
  const { data } = useNoticeList();
  const { data: session } = useSession();
  const [openItem, setOpenItem] = useState<string>("");

  return (
    <Accordion
      type="single"
      collapsible
      value={openItem}
      onValueChange={(value) => setOpenItem(value)}
    >
      {data?.map((notice: INoticeDataType) => (
        <AccordionItems
          key={notice._id}
          notice={notice}
          userName={session?.user ? session.user.name : null}
        />
      ))}
    </Accordion>
  );
};

export default NoticeList;
