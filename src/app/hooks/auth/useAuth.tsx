import { deleteUserAction } from "@/app/actions/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

// 회원탈퇴
export const useUserDelete = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: deleteUserAction,
    onSuccess: () => {
      router.replace("/auth/signin");
      queryClient.removeQueries({ queryKey: ["user"] });
    },
    onError: (error) => alert(error.message),
  });
};
