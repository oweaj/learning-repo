import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { INoticeDataType } from "@/types/mypage.type";
import { Button } from "../ui/button";

interface IAccordionProps {
  notice: INoticeDataType;
  userName: string | null;
}

const AccordionItems = ({ notice, userName }: IAccordionProps) => {
  return (
    <AccordionItem value={notice._id}>
      <AccordionTrigger className="text-base">{notice.title}</AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4 text-balance whitespace-pre-line">
        <p>{notice.content}</p>
        {userName === "관리자" && (
          <div className="flex gap-4">
            <Button type="button" variant="outline">
              수정
            </Button>
            <Button type="button">삭제</Button>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};

export default AccordionItems;
