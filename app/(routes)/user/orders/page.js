import { auth } from "@/lib/auth";
import OrdersTab from "@/components/user/user-orders";
import { redirect } from "next/navigation";
import { USER_QUERIES } from "@/lib/db/actions";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const user = await USER_QUERIES.getById(session.user.id);

  return (<OrdersTab user={user} />);
}
