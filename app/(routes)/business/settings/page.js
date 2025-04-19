import BusinessSettingsForm from "@/components/business/business-settings";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useBusiness } from "@/components/business/business-context";

export default function SettingsPage() {
  const { business } = useBusiness();
  const router = useRouter();

  useEffect(() => {
    if (!business) {
      console.log("Business not found, redirecting to login.");
      router.replace("/auth/login");
    }
  } , [business, router]);

  console.log("Business settings:", business);
  
  return <BusinessSettingsForm initialData={business} />;
}
