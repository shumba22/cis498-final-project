import BusinessProductsTab from "@/components/business/business-products";
import { useBusiness } from "@/components/business/business-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProductsPage() {
  const { business } = useBusiness();
  const router = useRouter();

  useEffect(() => {
    if (!business) {
      console.log("Business not found, redirecting to login.");
      router.replace("/auth/login");
    }
  }, [business, router]);

  console.log("Products for business:", business.products);

  return <BusinessProductsTab products={business.products} />;
}
