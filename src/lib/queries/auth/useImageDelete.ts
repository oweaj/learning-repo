import { profileImageDeleteApi } from "@/lib/api/auth/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useImageDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: profileImageDeleteApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => alert(error.message),
  });
};
