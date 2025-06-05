import { signinApi } from "@/lib/api/auth/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useSignin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signinApi,
    onSuccess: () => router.push("/"),
    onError: (error) => alert(error.message),
  });
};
