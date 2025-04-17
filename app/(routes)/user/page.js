"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserIndex() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      console.log("Redirecting..., user:", session);
      router.replace(`/user/profile`);
    } else if (status === "unauthenticated") {
      console.log("User is unauthenticated, redirecting to login.");
      router.replace("/auth/login");
    }
  }, [status]);
}
