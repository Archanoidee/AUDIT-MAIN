"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { SVGProps, useState } from "react";
import "boxicons/css/boxicons.min.css";

export default function Component() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
        <div className="w-full px-4">
          <div className="flex justify-between items-center h-14">
            {/* Left Section */}
            <div className="flex items-center">
              <Link href="/main" className="flex items-center" prefetch={false}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7sbmoB1o-ivHsjx0j34auMA30FeyzWBNtzQ&s"
                alt="Profile Avatar"
                className="w-44 h-14 "
              />
                
                <p className="font-medium text-lg"></p>
                <span className="sr-only">Acme Inc</span>
              </Link>
            </div>

            {/* Center Navigation */}
            <nav className="hidden md:flex gap-4">
              <Link
                href="/main"
                className="font-medium flex items-center text-sm transition-colors hover:underline"
                prefetch={false}
              >
                Home
              </Link>
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* User Icon */}
              <i
                className="bx bxs-user cursor-pointer text-lg text-[#4A90E2]"
                onClick={toggleSidebar} // Toggle sidebar visibility
              ></i>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed top-0 right-0 w-full max-w-md h-full bg-white z-50 flex flex-col p-6 overflow-y-auto shadow-lg">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                alt="Profile Avatar"
                className="w-14 h-14 rounded-full object-cover"
              />
              <div className="mt-2">
                <h3 className="text-lg font-semibold">test</h3>
                <p className="text-sm text-gray-500">
                  test@gmail.com
                </p>
                <p className="text-sm text-gray-500">testing this profile</p>
              </div>
            </div>
            <button
              className="text-red-500 font-bold"
              onClick={closeSidebar} // Close sidebar
            >
              Cancel
            </button>
          </div>

          {/* Sidebar Menu */}
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => router.push("/login")}
              className="flex items-center text-blue-600 hover:underline text-base"
            >
              <i className="bx bx-log-out mr-2"></i> Logout
            </button>
            <button
              className="flex items-center text-gray-700 hover:underline text-base"
            >
              <i className="bx bx-cog mr-2"></i> Settings
            </button>
            <button
              className="flex items-center text-gray-700 hover:underline text-base"
            >
              <i className="bx bx-help-circle mr-2"></i> Help
            </button>
          </div>
        </div>
      )}
    </>
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
