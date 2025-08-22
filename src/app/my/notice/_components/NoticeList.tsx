"use client";

import AccordionItems from "@/components/accordion/Accordion";
import { Accordion } from "@/components/ui/accordion";
import { useUser } from "@/lib/queries/auth/useUser";
import { useNoticeList } from "@/lib/queries/my/useNoticeList";
import type { INoticeDataType } from "@/types/mypage.type";
import { useState } from "react";

const NoticeList = () => {
  const { data } = useNoticeList();
  const { data: user } = useUser();
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
          userName={user ? user.name : null}
        />
      ))}
    </Accordion>
  );
};

export default NoticeList;
