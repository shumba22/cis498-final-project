import NavBar from "@/components/layout/nav-bar";
import Footer from "@/components/layout/footer";
import BusinessSidebar from "@/components/business/business-sidebar";

export const metadata = { title: "Business Dashboard" };

export default function BusinessDashboardLayout({ children }) {
  return (
    <main className="container mx-auto px-4 py-8 flex-1 text-gray-800">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <BusinessSidebar />
        <section className="lg:col-span-3 space-y-8">{children}</section>
      </div>
    </main>
  );
}
