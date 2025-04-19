"use client";

import OrdersTab from "@/components/user/user-orders";
import { useUser } from "@/components/user/user-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OrdersPage() {
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      console.log("User not found, redirecting to login.");
      router.replace("/auth/login");
    }
  }, [user, router]);

  console.log("User orders:", user.orders);

  return <OrdersTab orders={user.orders} />;
}
