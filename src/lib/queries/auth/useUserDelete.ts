import { deleteUserApi } from "@/lib/api/auth/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useUserDelete = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      router.replace("/auth/signin");
      queryClient.removeQueries({ queryKey: ["user"] });
    },
    onError: (error) => alert(error.message),
  });
};
