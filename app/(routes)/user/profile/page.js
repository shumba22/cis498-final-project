'use client';

import UserInfo from "@/components/user/user-info";
import { useRouter } from 'next/navigation'
import { useEffect } from "react";
import { useUser } from "@/components/user/user-context";

export default function ProfilePage() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      console.log('User not found, redirecting to login.')
      router.replace('/auth/login')
    }
  }, [user, router])

  return (<UserInfo user={user} />);
}
