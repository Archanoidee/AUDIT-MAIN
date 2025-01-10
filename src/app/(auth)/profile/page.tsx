'use client';

import React, { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/ui/ui/input";
import { Card } from "@/ui/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios"; // Ensure axios is imported
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";

// Define the ProfilePage component
const ProfilePage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams?.get("id"); // Get the ID from query parameters

  // State to manage the form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    gmail: "",
    employeeId: "",
    maritalStatus: "",
    role: "",
    department: "",
    dob: "",
    gender: "",
    nationality: "",
    address: "",
    designation: "",
    languages: "",
    genders: [],
    language: [],
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch user data based on the ID
  useEffect(() => {
    if (id) {
      const fetchUserData = async () => {
        setLoading(true);
        try {
          // Use axios to call the API route for fetching the profile
          const response = await axios.get<any>(`/api/staff/${id}`);
          console.log(response.data);

          console.log("API Response:", response.data);

          // Map response to formData structure
          setFormData({
            firstName: response.data.profile.firstName || "",
            lastName: response.data.profile.lastName || "",
            contactNumber: response.data.profile.contactNumber || "",
            gmail: response.data.profile.gmail || "",
            employeeId: response.data.profile.employeeId || "",
            maritalStatus: response.data.profile.maritalStatus || "",
            role: response.data.profile.role || "",
            department: response.data.profile.department || "",
            dob: response.data.profile.dob || "",
            gender: response.data.profile.gender || "",
            nationality: response.data.profile.nationality || "",
            address: response.data.profile.address || "",
            designation: response.data.profile.designation || "",
            languages: response.data.profile.languages || "",
            genders: response.data.dropdown.gender || [],
            language: response.data.dropdown.language || [],
          });
          console.log(response.data.dropdown);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError("Error fetching user data");
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    }
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle select change for gender
  const handleGenderChange = (value: string) => {
    setFormData((prev) => ({ ...prev, gender: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <Card className="max-w-6xl mx-auto shadow-lg rounded-lg p-12">
        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-10">
          <img
            src="/placeholder-avatar.png"
            alt="Profile Avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-semibold">
              {formData.firstName} {formData.lastName}
            </h2>
            <p className="text-sm text-gray-600">Team: {formData.employeeId}</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-8 border-b mb-10 text-lg">
          <Button
            variant="link"
            className="py-3 px-6 text-blue-600 font-semibold border-b-4 border-blue-600"
          >
            Profile
          </Button>
          <Button
            variant="link"
            className="py-3 px-6 text-gray-600 hover:text-blue-600"
          >
            Skill Management
          </Button>
          <Button
            variant="link"
            className="py-3 px-6 text-gray-600 hover:text-blue-600"
            onClick={() => router.push("/payroll")}
          >
            Payrolls
          </Button>
          <Button
            variant="link"
            className="py-3 px-6 text-gray-600 hover:text-blue-600"
          >
            Documents
          </Button>
        </div>

        {/* Personal Information Form */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Personal Information</h3>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <form className="grid grid-cols-2 gap-6">
              {/* Form Fields */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  First Name
                </label>
                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Last Name
                </label>
                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Contact Number
                </label>
                <Input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  placeholder="Contact Number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Gmail ID
                </label>
                <Input
                  type="text"
                  name="gmail"
                  value={formData.gmail}
                  onChange={handleInputChange}
                  placeholder="Gmail ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Employee ID
                </label>
                <Input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  placeholder="Employee ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Marital Status
                </label>
                <Input
                  type="text"
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleInputChange}
                  placeholder="Marital Status"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <Input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="Role"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Department
                </label>
                <Input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="Department"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Date of Birth
                </label>
                <Input
                  type="text"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  placeholder="DD/MM/YYYY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Gender</label>
                <Select
                  value={formData.gender}
                  onValueChange={handleGenderChange}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent></SelectContent>
                </Select>
                {formData?.genders?.length > 0
                  ? formData.genders.map((item: any) => (
                      <h1 key={item.Key}>{item.Value}</h1>
                    ))
                  : null}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nationality
                </label>
                <Input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  placeholder="Nationality"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Address
                </label>
                <Input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Designation
                </label>
                <Input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  placeholder="Designation"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Languages
                </label>
                <Input
                  type="text"
                  name="languages"
                  value={formData.languages}
                  onChange={handleInputChange}
                  placeholder="Languages"
                />
              </div>
            </form>
          )}
          {/* Save and Cancel Buttons */}
          <div className="flex justify-end gap-6 mt-10">
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Wrap ProfilePage in Suspense and export it
export default function Profile() {
  return (
    <Suspense fallback={<div>Loading profile...</div>}>
      <ProfilePage />
    </Suspense>
  );
}
