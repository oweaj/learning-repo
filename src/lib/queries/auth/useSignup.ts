import { signupApi } from "@/lib/api/auth/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useSignup = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signupApi,
    onSuccess: () => router.push("/auth/signin"),
    onError: (error) => alert(error.message),
  });
};
