import { auth } from "@/lib/auth";
import { BUSINESS_QUERIES } from "@/lib/db/actions";
import BusinessOverview from "@/components/business/business-overview";
import { redirect } from "next/navigation";

export default async function DashboardIndex() {
  const session = await auth();
  if (!session?.user || session.user.role !== "BUSINESS") {
    redirect("/auth/login");
  }
  const business = await BUSINESS_QUERIES.getById(session.user.id);

  if (!business) {
    redirect("/auth/login");
  }

  return <BusinessOverview business={business} />;
}