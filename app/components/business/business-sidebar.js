'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiBriefcase, FiBox, FiShoppingCart, FiFilePlus, FiSettings } from "react-icons/fi";

export default function BusinessSidebar() {
  const pathname = usePathname();
  const active = pathname.split("/")[2]; // e.g. "orders"
  const tabs = [
      { href: "overview", label: "Overview", icon: FiBriefcase },
      { href: "products", label: "Products", icon: FiBox },
      { href: "orders", label: "Orders", icon: FiShoppingCart },
      { href: "settings", label: "Settings", icon: FiSettings },
      { href: "addProduct", label: "Add Product", icon: FiFilePlus },
    ];
  return (
    <aside className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow-md p-6 top-8 space-y-6">
        <nav className="space-y-1">
          {tabs.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={`/business/${href}`}
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
  );
}
