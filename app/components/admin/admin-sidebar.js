"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiUser,
  FiShoppingBag,
  FiStar,
  FiMessageSquare,
  FiHeart,
  FiUsers,
} from "react-icons/fi";

export default function AdminSidebar() {
  const pathname = usePathname();
  const active = pathname.split("/")[2];

  const tabs = [
    { href: "profile", label: "Profile", icon: FiUser },
    { href: "users", label: "Users", icon: FiUsers },
    { href: "business", label: "Business", icon: FiUsers },
    
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 top-8 space-y-6">
      <nav className="space-y-1">
        {tabs.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={`/user/${href}`}
            className={
              `flex items-center p-3 rounded-md transition ` +
              (active === href
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600")
            }
          >
            <Icon className="mr-3" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
