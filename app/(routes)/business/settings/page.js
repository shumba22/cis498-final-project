import { auth } from "@/lib/auth";
import { BUSINESS_QUERIES } from "@/lib/db/actions";
import BusinessSettingsForm from "@/components/business/business-settings";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "BUSINESS") {
    redirect("/auth/login");
  }
  const business = await BUSINESS_QUERIES.getNameAndDescription(session.user.businessId);
  return <BusinessSettingsForm initialData={business} />;
}