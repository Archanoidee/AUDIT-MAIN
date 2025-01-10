"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/ui/card";
import { Input } from "@/ui/ui/input";
import { Label } from "@/ui/ui/label";
import { useRouter } from "next/navigation";
const PayrollPage: React.FC = () => {
    const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <Card className="max-w-6xl mx-auto shadow-lg rounded-lg">
        <CardHeader>
          <div className="flex items-center gap-6 mb-10">
            <img
              src="/placeholder-avatar.png"
              alt="Profile Avatar"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <CardTitle className="text-2xl font-semibold">Olivia Bennett</CardTitle>
              <p className="text-sm text-gray-600">Team: 003509-ce</p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Navigation Tabs */}
          <div className="flex gap-8 border-b mb-10 text-lg">
          <Button
        variant="link"
        className="py-3 px-6 text-gray-600 hover:text-blue-600"
        onClick={() => router.push("/profile")}
      >
        profile
      </Button>
            <Button variant="link" className="py-3 px-6 text-gray-600 hover:text-blue-600">
              Skill Management
            </Button>
            <Button
              variant="link"
              className="py-3 px-6 text-blue-600 font-semibold border-b-4 border-blue-600"
            >
              Payrolls
            </Button>
            <Button variant="link" className="py-3 px-6 text-gray-600 hover:text-blue-600">
              Documents
            </Button>
          </div>

          {/* Payroll Form */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Payroll Information</h3>
            <form className="grid grid-cols-2 gap-6">
              <div>
                <Label className="block text-sm font-medium mb-2">Designation/Role</Label>
                <Input type="text" placeholder="Enter your designation" />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-2">Date of Joining</Label>
                <Input type="text" placeholder="DD/MM/YYYY" />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-2">Total Leave Days</Label>
                <Input type="text" placeholder="Enter your leave days" />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-2">PF</Label>
                <Input type="text" placeholder="Enter your PF no" />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-2">ESI</Label>
                <Input type="text" placeholder="Enter your ESI no" />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-2">Tax</Label>
                <Input type="text" placeholder="Enter your tax details" />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-2">Basic Pay</Label>
                <Input type="text" placeholder="$10,000" />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-2">Travel Allowance</Label>
                <Input type="text" placeholder="$1,000" />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-2">Other Allowance</Label>
                <Input type="text" placeholder="$6,000" />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-2">Daily Allowance</Label>
                <Input type="text" placeholder="$300" />
              </div>
            </form>

            {/* Payroll Calculator Button */}
            <div className="mt-10 flex justify-center">
              <Button className="px-8 py-3 bg-blue-600 text-white rounded-md">
                Payroll Calculator
              </Button>
            </div>

            {/* Save and Cancel Buttons */}
            <div className="flex justify-end gap-6 mt-10">
              <Button variant="outline" className="px-8 py-3">
                Cancel
              </Button>
              <Button className="px-8 py-3 bg-blue-600 text-white">Save</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollPage;
