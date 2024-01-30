import VideoPlayer from "@/components/opt-in/player";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { PageProps } from "@/lib/interfaces/page.props";
import InfoSection from "@/components/opt-in/info";

export default function Home({ searchParams }: PageProps) {
  // redirect("/auth/sign-in")
  console.log(searchParams);
  const user = auth();
  console.log(user);
  if (user.userId || searchParams.__clerk_created_session)
    redirect("/dashboard");

  return (
    <main className="flex flex-col items-center justify-center min-h-screen overflow-hidden bg-white">
      <header className="flex items-center justify-between w-full h-20 px-20 bg-white">
        <div className="text-3xl font-bold">
          UMONICS <span className="text-main-500">METHOD</span>
        </div>
      </header>
      <VideoPlayer />
      <InfoSection />
    </main>
  );
}
