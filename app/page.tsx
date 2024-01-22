import { redirect } from "next/navigation";

export default function Home() {
  redirect("/auth/sign-in")
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24 bg-main-400"></main>
  );
}
