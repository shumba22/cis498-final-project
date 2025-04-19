'use client';

import ReviewsTab from "@/components/user/user-reviews";
import { useUser } from "@/components/user/user-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ReviewsPage() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      console.log("User not found, redirecting to login.");
      router.replace("/auth/login");
    }
  }, [user, router]);

  return (<ReviewsTab reviews={user.reviews} />);
}
