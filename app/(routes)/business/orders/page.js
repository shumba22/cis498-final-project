import { auth } from "@/lib/auth";
import { BUSINESS_QUERIES } from "@/lib/db/actions";
import BusinessOrdersTab from "@/components/business/business-orders";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "BUSINESS") {
    redirect("/auth/login");
  }
  const id = session.user.businessId;
  if (!id) {
    redirect("/auth/login");
  }
  const orders = await BUSINESS_QUERIES.getOrdersForBusiness(id);
  console.log("Orders for business:", orders);
  return <BusinessOrdersTab orders={orders} />;
}
