import { signinApi } from "@/lib/api/auth/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useSignin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: signinApi,
    onSuccess: () => {
      router.replace("/");
      queryClient.removeQueries({ queryKey: ["user"] });
    },
    onError: (error) => alert(error.message),
  });
};
