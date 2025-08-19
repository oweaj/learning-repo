"use client";

import FormFieldWrapper from "@/components/form/FormFieldWrapper";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useUserUpdate } from "@/lib/queries/auth/useUserUpdate";
import { cn } from "@/lib/utils";
import { userSchema } from "@/schemas/auth.schema";
import type { IUserDataType } from "@/types/auth.type";
import type { IMyProfileDataType } from "@/types/mypage.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import LikeCategoryButton from "./LikeCategoryButton";

const ProfileEditForm = ({ user }: { user?: IUserDataType }) => {
  const form = useForm<IMyProfileDataType>({
    defaultValues: {
      name: user?.name ?? "",
      introduce: user?.introduce ?? "",
      like_category: user?.like_category ?? [],
    },
    resolver: zodResolver(userSchema),
  });

  const { mutate: queryUserUpdate, isSuccess } = useUserUpdate(form.reset);

  useEffect(() => {
    if (isSuccess) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isSuccess]);

  const onSubmit = (data: IMyProfileDataType) => {
    return queryUserUpdate(data);
  };

  return (
    <div>
      <div className="flex items-baseline gap-3 py-5 max-[400px]:flex-col max-[400px]:gap-1">
        <h4 className="text-lg font-semibold">프로필 정보</h4>
        <span className="text-xs text-red-500">
          ※ 기존 정보를 변경하면 수정 버튼이 활성화됩니다.
        </span>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative h-full space-y-10"
        >
          <FormFieldWrapper
            control={form.control}
            name="name"
            label="프로필 이름"
            inputStyle="max-w-[500px] p-2 h-12 bg-gray-50"
          />
          <FormFieldWrapper
            control={form.control}
            name="introduce"
            label="소개"
            placeholder="나를 소개해 주세요"
            inputStyle="max-w-[500px] p-2 h-12 bg-gray-50"
          />
          <FormFieldWrapper
            control={form.control}
            name="like_category"
            label="관심 카테고리"
            customContent={() => {
              return (
                <div>
                  <LikeCategoryButton form={form} />
                  {form.formState.errors.like_category && (
                    <p className="mt-2 text-sm font-medium text-red-500">
                      {form.formState.errors.like_category[0]?.message}
                    </p>
                  )}
                </div>
              );
            }}
          />
          <Button
            type="submit"
            className={cn(
              "w-full max-w-[500px] h-12 text-base font-bold bg-orange-400",
            )}
            disabled={!form.formState.isDirty}
          >
            프로필 수정
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileEditForm;
