"use client";

import SupportTab from "@/components/user/user-support";
import { useUser } from "@/components/user/user-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SupportPage() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      console.log("User not found, redirecting to login.");
      router.push("/auth/login");
    }
  }, [user, router]);

  console.log("User support requests:", user.supportRequests);

  return <SupportTab supportRequests={user.supportRequests} />;
}
