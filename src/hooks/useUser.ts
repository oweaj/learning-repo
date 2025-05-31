"use client";

import { createSupabaseClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export function useUser() {
  const [session, setSession] = useState<string | null>(null);
  const supabase = createSupabaseClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session?.user.id || null);
    };
    getUser();
  }, [supabase]);

  return session;
}
