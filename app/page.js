import NavBar from "@/components/layout/nav-bar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <p className="mt-4">Welcome to the application!</p>
    </div>
  );
}
