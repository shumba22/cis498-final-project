"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function BusinessIndex() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.user.role !== "BUSINESS") {
      console.log("User is not a business, redirecting to homepage.");
      router.replace("/homepage");
    }

    if (status === "authenticated") {
      console.log("Redirecting..., user:", session);
      router.replace(`/business/overview/`);
    } else if (status === "unauthenticated") {
      console.log("User is unauthenticated, redirecting to login.");
      router.replace("/auth/login");
    }
  }, [session, status]);
}
