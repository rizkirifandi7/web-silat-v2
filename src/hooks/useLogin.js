"use client";

import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "@/lib/api/auth";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await loginApi(email, password);
      return response.data;
    },
    onSuccess: (data) => {
      const user = data.data;
      setAuth(user);
      // Redirect based on role
      if (user.role === "admin") {
        router.push("/admin/dashboard");
      } else if (user.role === "anggota" || user.role === "user") {
        router.push("/member/dashboard");
      } else {
        router.push("/dashboard");
      }
    },
  });
};
