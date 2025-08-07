import { profileImageUploadApi } from "@/lib/api/auth/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useImageUpload = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: profileImageUploadApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => alert(error.message),
  });
};
