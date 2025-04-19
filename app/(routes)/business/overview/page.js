'use client';

import BusinessOverview from "@/components/business/business-overview";
import { useBusiness } from "@/components/business/business-context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OverviewPage() {
  const { business } = useBusiness();
  const router = useRouter();

  useEffect(() => {
    if (!business) {
      console.log("Business not found, redirecting to login.");
      router.push("/auth/login");
    }
  } , [business, router]);

  console.log("Business overview:", business);

  return <BusinessOverview business={business} />;
}