import { getUserApi } from "@/lib/api/auth/auth";
import { useQuery } from "@tanstack/react-query";
import type { IUserRequest } from "../../../../server/utils/jwt";

export const useUser = () => {
  const data = useQuery({
    queryKey: ["user"],
    queryFn: getUserApi,
  });

  return data.data?.user as IUserRequest;
};
