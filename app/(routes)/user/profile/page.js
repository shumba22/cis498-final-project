import { auth } from "@/lib/auth";
import UserInfo from "@/components/user/user-info";
import { redirect } from "next/navigation";
import { USER_QUERIES } from "@/lib/db/actions";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const user = await USER_QUERIES.getById(session.user.id);

  return (<UserInfo user={user} />);
}
