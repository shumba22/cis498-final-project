import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AddProductForm from "@/components/business/add-product-form";

export default async function AddProducPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "BUSINESS") {
    redirect("/auth/login");
  }
  const id = session.user.businessId;
  if (!id) {
    redirect("/auth/login");
  }
  return <AddProductForm />;
}
