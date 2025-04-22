import { logoutApi } from "@/api/auth/auth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      Cookies.remove("access");
      Cookies.remove("refresh");
      router.push("/login");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "로그아웃 중 오류가 발생했습니다.";
        throw new Error(errorMessage);
      }
      throw new Error("네트워크 오류로 인해 다시 시도해주세요.");
    },
  });
};
