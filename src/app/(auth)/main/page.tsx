"use client";
import { createElement } from "react";
import * as Icons from "lucide-react";
import { Button } from "@/ui/ui/button";
import { Card } from "@/ui/ui/card";
import { CardFooter } from "@/ui/ui/card";
import { CardHeader } from "@/ui/ui/card";
import { CardDescription } from "@/ui/ui/card";
import { CardTitle } from "@/ui/ui/card";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/navbar";

const Dashboard = () => {
  const UserIcon = Icons.User as React.ComponentType<Icons.LucideProps>;
  const FolderIcon = Icons.Folder as React.ComponentType<Icons.LucideProps>;
  const BriefcaseIcon = Icons.Briefcase as React.ComponentType<Icons.LucideProps>;
  const NetworkIcon = Icons.Network as React.ComponentType<Icons.LucideProps>;
  const MailIcon = Icons.Mail as React.ComponentType<Icons.LucideProps>;
  const router = useRouter();

  return (
    <div>
      <Navbar />
   
{/* <Button
  className="py-3 px-6 text-white bg-blue-600 rounded-full shadow-md transform transition-all duration-300 ease-in-out hover:bg-blue-700 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  onClick={() => router.push("/login")}
>
  Logout
</Button> */}


<div className="flex flex-wrap justify-center gap-8 p-8 mt-20">
  {/* Card for Staff */}
  <Card className="w-72 border border-gray-200 rounded-xl shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
    <CardHeader>
      <div className="flex justify-center mb-6">
        {UserIcon && createElement(UserIcon, { size: 40, className: "text-blue-500" })}
      </div>
      <CardTitle className="text-xl font-semibold text-center text-gray-800">
        Staff
      </CardTitle>
      <CardDescription className="text-center text-gray-600 text-sm">
        Manage and view staff information with ease.
      </CardDescription>
    </CardHeader>
    <CardFooter className="flex justify-center">
      <Button
        onClick={() => (window.location.href = "/staff")}
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
      >
        Show
      </Button>
    </CardFooter>
  </Card>

  {/* Card for Project */}
  <Card className="w-72 border border-gray-200 rounded-xl shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
    <CardHeader>
      <div className="flex justify-center mb-6">
        {FolderIcon && createElement(FolderIcon, { size: 40, className: "text-blue-500" })}
      </div>
      <CardTitle className="text-xl font-semibold text-center text-gray-800">
        Project
      </CardTitle>
      <CardDescription className="text-center text-gray-600 text-sm">
        Explore and manage ongoing projects seamlessly.
      </CardDescription>
    </CardHeader>
    <CardFooter className="flex justify-center">
      <Button
        onClick={() => (window.location.href = "/project")}
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
      >
        Show
      </Button>
    </CardFooter>
  </Card>

  {/* Card for Work */}
  <Card className="w-72 border border-gray-200 rounded-xl shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
    <CardHeader>
      <div className="flex justify-center mb-6">
        {BriefcaseIcon && createElement(BriefcaseIcon, { size: 40, className: "text-blue-500" })}
      </div>
      <CardTitle className="text-xl font-semibold text-center text-gray-800">
        Work
      </CardTitle>
      <CardDescription className="text-center text-gray-600 text-sm">
        Get in touch with our team and collaborate.
      </CardDescription>
    </CardHeader>
    <CardFooter className="flex justify-center">
      <Button
        onClick={() => (window.location.href = "/work")}
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
      >
        Show
      </Button>
    </CardFooter>
  </Card>

  {/* Card for Organization */}
  <Card className="w-72 border border-gray-200 rounded-xl shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
    <CardHeader>
      <div className="flex justify-center mb-6">
        {NetworkIcon && createElement(NetworkIcon, { size: 40, className: "text-blue-500" })}
      </div>
      <CardTitle className="text-xl font-semibold text-center text-gray-800">
        Organization
      </CardTitle>
      <CardDescription className="text-center text-gray-600 text-sm">
        Explore and manage ongoing projects seamlessly.
      </CardDescription>
    </CardHeader>
    <CardFooter className="flex justify-center">
      <Button
        onClick={() => (window.location.href = "/organization")}
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
      >
        Show
      </Button>
    </CardFooter>
  </Card>

  {/* Card for Contact */}
  <Card className="w-72 border border-gray-200 rounded-xl shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
    <CardHeader>
      <div className="flex justify-center mb-6">
        {MailIcon && createElement(MailIcon, { size: 40, className: "text-blue-500" })}
      </div>
      <CardTitle className="text-xl font-semibold text-center text-gray-800">
        Contact
      </CardTitle>
      <CardDescription className="text-center text-gray-600 text-sm">
        Get in touch with us for further information.
      </CardDescription>
    </CardHeader>
    <CardFooter className="flex justify-center">
      <Button
        onClick={() => (window.location.href = "/contact")}
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
      >
        Show
      </Button>
    </CardFooter>
  </Card>
</div>

    </div>
  );
};
export default Dashboard;
