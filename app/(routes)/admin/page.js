'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const { data: user, status } = useSession();
  const router = useRouter();

  console.log("User session data:", user);
  console.log("User session status:", status);

  if (status === "unauthenticated") {
    return (
      <div>
        <h1>Access Denied</h1>
        <p>You must be logged in to view this page.</p>
      </div>
    );
  }

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!user) {
    return (
      <div>
        <h1>Access Denied</h1>
        <p>You must be logged in to view this page.</p>
      </div>
    );
  }

  if (user.user.role === "USER") {
    router.push("/dashboard");
    return null;
  }

  if (user.user.role === "BUSINESS") {
    router.push("/business/dashboard");
    return null;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
      <p>User ID: {user?.user?.id}</p>
      <p>User Email: {user?.user?.email}</p>
      <p>User Role: {user?.user?.role}</p>
    </div>
  );
}

export default Dashboard;