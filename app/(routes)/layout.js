import Footer from "@/components/layout/footer";
import NavBar from "../components/layout/nav-bar";
import { SessionProvider } from "next-auth/react";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8F8] text-[#000000] font-mono">
      <SessionProvider>
        <NavBar />
        {children}
        <Footer />
      </SessionProvider>
    </div>
  );
}
