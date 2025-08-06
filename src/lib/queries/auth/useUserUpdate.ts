import { userUpdateApi } from "@/lib/api/auth/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUserUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userUpdateApi,
    onSuccess: (data) => {
      alert(data.message);
      window.scrollTo({ top: 0, behavior: "smooth" });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => alert(error.message),
  });
};
