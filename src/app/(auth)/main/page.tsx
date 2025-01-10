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

const Dashboard = () => {
  const UserIcon = Icons.User as React.ComponentType<Icons.LucideProps>;
  const FolderIcon = Icons.Folder as React.ComponentType<Icons.LucideProps>;
  const BriefcaseIcon = Icons.Briefcase as React.ComponentType<Icons.LucideProps>;
  const NetworkIcon = Icons.Network as React.ComponentType<Icons.LucideProps>;
  const MailIcon = Icons.Mail as React.ComponentType<Icons.LucideProps>;
  const router = useRouter();

  return (
    <div>
<Button
                  
                  className="py-3 px-6 text-blue-600 hover:text-blue-600"
                  onClick={() => router.push("/login")}
                >
                  Logout
                </Button>

    <div className="flex flex-wrap justify-center gap-6 p-6">
     
      {/* Card for Staff */}
      <Card className="w-64 border rounded-lg shadow-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            {UserIcon && createElement(UserIcon, { size: 32, className: "text-blue-500" })}
          </div>
          <CardTitle className="text-center">Staff</CardTitle>
          <CardDescription className="text-center">
            Manage and view staff information with ease.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Button onClick={() => (window.location.href = "/staff")}>Show</Button>
        </CardFooter>
      </Card>

      {/* Card for Project */}
      <Card className="w-64 border rounded-lg shadow-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            {FolderIcon && createElement(FolderIcon, { size: 32, className: "text-blue-500" })}
          </div>
          <CardTitle className="text-center">Project</CardTitle>
          <CardDescription className="text-center">
            Explore and manage ongoing projects seamlessly.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Button onClick={() => (window.location.href = "/project")}>Show</Button>
        </CardFooter>
      </Card>

      {/* Card for Work */}
      <Card className="w-64 border rounded-lg shadow-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            {BriefcaseIcon && createElement(BriefcaseIcon, { size: 32, className: "text-blue-500" })}
          </div>
          <CardTitle className="text-center">Work</CardTitle>
          <CardDescription className="text-center">
            Get in touch with our team and collaborate.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Button onClick={() => (window.location.href = "/work")}>Show</Button>
        </CardFooter>
      </Card>

      {/* Card for Organization */}
      <Card className="w-64 border rounded-lg shadow-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            {NetworkIcon && createElement(NetworkIcon, { size: 32, className: "text-blue-500" })}
          </div>
          <CardTitle className="text-center">Organization</CardTitle>
          <CardDescription className="text-center">
            Explore and manage ongoing projects seamlessly.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Button onClick={() => (window.location.href = "/organization")}>Show</Button>
        </CardFooter>
      </Card>

      {/* Card for Contact */}
      <Card className="w-64 border rounded-lg shadow-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            {MailIcon && createElement(MailIcon, { size: 32, className: "text-blue-500" })}
          </div>
          <CardTitle className="text-center">Contact</CardTitle>
          <CardDescription className="text-center">
            Explore and manage ongoing projects seamlessly.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Button onClick={() => (window.location.href = "/contact")}>Show</Button>
        </CardFooter>
      </Card>
    </div>
    </div>
  );
};
export default Dashboard;
