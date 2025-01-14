/**
 * v0 by Vercel.
 * @see https://v0.dev/t/xYHqD5MkVkT
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";

  
export default function Component() {
    const router = useRouter();
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link href="/main" className="flex items-center" prefetch={false}>
            <MountainIcon className="h-6 w-6" />
            <p>e Audit</p>
            <span className="sr-only">Acme Inc</span>
          </Link>
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
  )
}
import { SVGProps } from "react";

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
  )
}