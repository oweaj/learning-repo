"use client";

import FormFieldWrapper from "@/components/form/FormFieldWrapper";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useNoticeCreate } from "@/lib/queries/my/useNoticeCreate";
import { cn } from "@/lib/utils";
import { NoticeCreateSchema } from "@/schemas/notice.schema";
import type { INoticeFormDataType } from "@/types/mypage.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface NoticeFormProps {
  editMode: boolean;
  defaultData?: INoticeFormDataType;
  id?: string;
}

const NoticeForm = ({ editMode, defaultData }: NoticeFormProps) => {
  const router = useRouter();
  const { mutate: queryNoticeCreate } = useNoticeCreate();

  const form = useForm({
    defaultValues: {
      title: editMode ? defaultData?.title || "" : "",
      content: editMode ? defaultData?.content || "" : "",
    },
    resolver: zodResolver(NoticeCreateSchema),
  });

  const onSubmit = (data: INoticeFormDataType) => {
    return queryNoticeCreate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative w-full h-full space-y-8"
      >
        <FormFieldWrapper
          control={form.control}
          name="title"
          label="타이틀(30자 이내)"
          placeholder="타이틀을 입력해주세요."
        />
        <FormFieldWrapper
          control={form.control}
          name="content"
          label="내용(10자 이상)"
          customContent={(field) => (
            <textarea
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              style={{ resize: "none" }}
              className="h-80 border rounded-lg bg-gray-50 p-3"
              placeholder="공지사항을 작성해주세요."
            />
          )}
        />
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            className={cn("w-1/2 h-12 text-base font-bold")}
            onClick={() => router.push("/my/notice")}
          >
            취소
          </Button>
          <Button
            type="submit"
            className={cn("w-1/2 h-12 text-base font-bold bg-orange-400")}
          >
            제출
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NoticeForm;
