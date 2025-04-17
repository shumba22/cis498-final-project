import Footer from "@/components/layout/footer";
import NavBar from "../components/layout/nav-bar";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
