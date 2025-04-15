import { loginApi } from "@/api/auth/auth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface TokenType {
  access: string;
  refresh: string;
}

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data: TokenType) => {
      const { access, refresh } = data;
      // 현재 새로고침시 쿠키 사라지는 부분, 임시로 수동으로 추가해서 중복 상태
      Cookies.set("access", access, {
        secure: false,
        sameSite: "Lax",
        path: "/",
      });
      Cookies.set("refresh", refresh, {
        secure: false,
        sameSite: "Lax",
        path: "/",
      });

      router.push("/0");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "로그인 중 오류가 발생했습니다.";
        throw new Error(errorMessage);
      }
      throw new Error("네트워크 오류로 인해 다시 시도해주세요.");
    },
  });
};
