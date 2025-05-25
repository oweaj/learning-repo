"use client";

import { useLogout } from "@/lib/queries/auth/useLogout";
import { LogOut } from "lucide-react";

export const Logout = () => {
  const { mutate: logout } = useLogout();

  return (
    <button type="button" className="cursor-pointer" onClick={() => logout()}>
      <LogOut className="w-6 h-6" />
    </button>
  );
};
