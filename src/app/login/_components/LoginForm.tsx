"use client";

import FormFieldWrapper from "@/components/form/FormFieldWrapper";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useLogin } from "@/queries/auth/useLogin";
import { loginSchema } from "@/schemas/auth.schema";
import type { LoginDataType } from "@/types/auth.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const { mutate } = useLogin();
  const form = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginDataType) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative w-full h-full space-y-10"
      >
        <FormFieldWrapper
          control={form.control}
          name="email"
          label="아이디"
          placeholder="설명을 입력해주세요."
        />
        <FormFieldWrapper
          control={form.control}
          name="password"
          label="비밀번호"
          inputType="password"
          placeholder="-제외"
        />
        <Button
          type="submit"
          className={cn(
            "w-full absolute bottom-0 h-12 text-base font-bold bg-gray-400",
          )}
        >
          로그인
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
