import { auth } from "@/lib/auth";
import { BUSINESS_QUERIES } from "@/lib/db/actions";
import BusinessProductsTab from "@/components/business/business-products";
import { redirect } from "next/navigation";

export default async function ProductsPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "BUSINESS") {
    redirect("/auth/login");
  }
  const business = await BUSINESS_QUERIES.getById(session.user.id);
  return <BusinessProductsTab products={business.products} />;
}