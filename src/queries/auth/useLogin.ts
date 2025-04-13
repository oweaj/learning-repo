import { loginApi } from "@/api/auth/login";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: () => router.push("/"),
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
