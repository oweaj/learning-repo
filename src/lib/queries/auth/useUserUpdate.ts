import { userUpdateApi } from "@/lib/api/auth/auth";
import type { IMyProfileDataType } from "@/types/mypage.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseFormReset } from "react-hook-form";

export const useUserUpdate = (reset: UseFormReset<IMyProfileDataType>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userUpdateApi,
    onSuccess: (data, newData) => {
      alert(data.message);
      reset(newData);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => alert(error.message),
  });
};
