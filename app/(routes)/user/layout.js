"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiUser,
  FiShoppingBag,
  FiStar,
  FiMessageSquare,
  FiHeart,
} from "react-icons/fi";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const active = pathname.split("/")[2]; // e.g. "orders"

  const tabs = [
    { href: "profile", label: "Profile", icon: FiUser },
    { href: "orders", label: "Orders", icon: FiShoppingBag },
    { href: "reviews", label: "Reviews", icon: FiStar },
    { href: "support", label: "Support", icon: FiMessageSquare },
    { href: "wishlist", label: "Wishlist", icon: FiHeart },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* header/banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Your Dashboard</h1>
          <p className="opacity-90">Manage your profile, orders, reviews…</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* sidebar */}
          <aside className="lg:col-span-1">
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
          </aside>

          {/* content */}
          <section className="lg:col-span-3 space-y-8">{children}</section>
        </div>
      </div>
    </div>
  );
}
