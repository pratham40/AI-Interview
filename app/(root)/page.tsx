import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold text-center mt-10">
        Get Interview Ready with AI with Feedback and Mock Interviews
      </h1>
      <Button asChild className="mt-10" >
        <Link href="/interview">
          Start Mock Interview
        </Link>
      </Button>
    </div>

  );
}
