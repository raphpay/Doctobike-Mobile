import { supabase } from "@/src/lib/supabase";
import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!ignore) setUser(data.session?.user ?? null);
      setLoading(false);
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      ignore = true;
      subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}
