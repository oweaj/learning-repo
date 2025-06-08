import { logoutApi } from "@/lib/api/auth/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => router.replace("/auth/signin"),
    onError: (error) => alert(error.message),
  });
};
