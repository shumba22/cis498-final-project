import { auth } from "@/lib/auth";
import ReviewsTab from "@/components/user/user-reviews";
import { redirect } from "next/navigation";
import { USER_QUERIES } from "@/lib/db/actions";

export default async function ReviewsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const user = await USER_QUERIES.getReviews(session.user.id);

  console.log("User reviews:", user.reviews);

  return (<ReviewsTab reviews={user.reviews} />);
}
