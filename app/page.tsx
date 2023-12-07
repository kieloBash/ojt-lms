import { redirect } from "next/navigation";

export default function Home() {
  redirect("/auth/sign-in")
  return (
    <main className="flex min-h-screen flex-col items-center bg-main-400 justify-between p-24"></main>
  );
}
