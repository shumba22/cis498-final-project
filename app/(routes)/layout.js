import NavBar from "@/components/layout/nav-bar";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

