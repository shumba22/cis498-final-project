import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { USER_QUERIES } from "@/lib/db/actions";
import SupportTab from "@/components/user/user-support";

export default async function ReviewsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const user = await USER_QUERIES.getSupportRequests(session.user.id);

  console.log("User support requests:", user.supportRequests);

  return (<SupportTab supportRequests={user.supportRequests} />);
}
