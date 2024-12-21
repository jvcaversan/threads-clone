import { Session, User } from "@supabase/supabase-js";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../lib/supabase";
import { useQuery } from "@tanstack/react-query";

type AuthData = {
  session: Session | null;
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthData>({
  session: null,
  user: null,
  loading: true,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);

      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ session, loading, user: session?.user ?? null }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useUser = () => {
  const { user } = useAuth();

  if (!user) {
    throw new Error("User is required but not authenticated");
  }

  return user;
};

export const useAuth = () => useContext(AuthContext);
