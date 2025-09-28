import { getUserApi } from "@/lib/api/auth/auth";
import type { IUserDataType } from "@/types/auth.type";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useUser = () => {
  const accessToken = Cookies.get("accessToken");

  return useQuery<IUserDataType>({
    queryKey: ["user"],
    queryFn: getUserApi,
    enabled: !!accessToken,
  });
};
