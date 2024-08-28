"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log(isLoggedIn);

    if (!isLoggedIn) {
      console.log("login");
      router.push("/sign-in");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    <Loader2 className="animate-spin h-8 w-8 text-zinc-300" />;
  }

  return <>{children}</>;
};

export default RequireAuth;
