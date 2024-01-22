"use client";
import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

const SignOutButtonFail = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    // Clicking on this button will sign out a user and reroute them to the "/" (home) page.
    <Button variant={"outline"} onClick={() => signOut(() => router.push("/"))}>
      Back to Home
    </Button>
  );
};

export default SignOutButtonFail;
