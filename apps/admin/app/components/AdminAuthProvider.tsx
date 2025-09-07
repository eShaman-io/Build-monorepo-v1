"use client";

import { useAuth } from "@esh/ui";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to login if not authenticated
      router.push("/login");
    } else if (user) {
      user.getIdTokenResult().then((idTokenResult) => {
        if (!idTokenResult.claims.admin) {
          // Redirect if not an admin
          router.push("/unauthorized");
        }
      });
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}
