"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { checkSession } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser, clearIsAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const privateRoutes = ["/profile", "/notes"];
  const isPrivate = privateRoutes.some((r) => pathname.startsWith(r));
  const router = useRouter();

  useEffect(() => {
    const verifySession = async () => {
      try {
        const user = await checkSession();
        if (user) {
          setUser(user);
        } else if (isPrivate) {
          clearIsAuthenticated();
          router.push("/sign-in");
        }
      } catch {
        if (isPrivate) {
          clearIsAuthenticated();
          router.push("/sign-in");
        }
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, [pathname, isPrivate, setUser, clearIsAuthenticated, router]);

  if (isLoading) return <p>Loading...</p>;

  return <>{children}</>;
}
