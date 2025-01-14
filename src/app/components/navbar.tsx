"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { SVGProps } from "react";

export default function Component() {
  const router = useRouter();
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full px-4">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center">
            <Link href="/main" className="flex items-center" prefetch={false}>
              <MountainIcon className="h-6 w-6 mr-2" />
              <p className="font-medium text-lg">e Audit</p>
              <span className="sr-only">Acme Inc</span>
            </Link>
          </div>

          <nav className="hidden md:flex gap-4">
            <Link
              href="/main"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              Home
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button
              className="py-3 px-6 text-white bg-blue-600 rounded-full shadow-md transform transition-all duration-300 ease-in-out hover:bg-blue-700 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => router.push("/login")}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function MountainIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}