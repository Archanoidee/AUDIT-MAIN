"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/ui/ui/input";
import { Card } from "@/ui/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");

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

  useEffect(() => {
    if (id) {
      const fetchUserData = async () => {
        setLoading(true);
        try {
          const response = await axios.get<any>(`/api/staff/${id}`);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLanguageChange = (value: string) => {
    setFormData((prev) => ({ ...prev, languages: value }));
  };

  const handleGenderChange = (value: string) => {
    console.log(value);
    setFormData((prev) => ({ ...prev, gender: value }));
  };
  // Handle Save button click
  const handleSave = async () => {
    setLoading(true);
    try {
      // Send the updated formData to the server
      const response = await axios.put(`/api/staff?id=${id}`, {
        formData: formData,
        id: id,
      });
      console.log("hi");

      if (response.status === 200) {
        alert("Profile updated successfully");
        // Optionally, you can redirect the user after updating
        router.push("/profile"); // Adjust this to the page where you want to navigate
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 p-10 h-screen overflow-y-auto ">
      <Card className="max-w-6xl mx-auto shadow-lg rounded-lg p-12">
        <div className="flex items-center gap-6 mb-10">
          <img
            src="https://static-00.iconduck.com/assets.00/user-avatar-icon-512x512-vufpcmdn.png"
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
            Payroll
          </Button>
          <Button
            variant="link"
            className="py-3 px-6 text-gray-600 hover:text-blue-600"
          >
            Documents
          </Button>
        </div>

        <div>
          <div className="flex justify-end gap-6 mt-10">
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
          <h3 className="text-xl font-semibold mb-6">Personal Information</h3>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-700 uppercase tracking-wide">
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
                <label className="block text-sm font-medium mb-3 text-gray-700 uppercase tracking-wide">
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
                <label className="block text-sm font-medium mb-3 text-gray-700 uppercase tracking-wide">
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
                <label className="block text-sm font-medium mb-3 text-gray-700 uppercase tracking-wide">
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
                <label className="block text-sm font-medium mb-3 text-gray-700 uppercase tracking-wide">
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
                <label className="block text-sm font-medium mb-3 text-gray-700 uppercase tracking-wide">
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
                <label className="block text-sm font-medium mb-3 text-gray-700 uppercase tracking-wide">Role</label>
                <Input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="Role"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-700 uppercase tracking-wide">
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
                <label className="block text-sm font-medium mb-3 text-gray-700 uppercase tracking-wide">
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
                <label className="block text-sm font-medium mb-3 text-gray-700 uppercase tracking-wide">
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
                <label className="block text-sm font-medium mb-3 text-gray-700 uppercase tracking-wide">Gender</label>
                <h1>{formData.gender}</h1>
                <Select
                  value={formData.gender} // This should be the current gender value
                  onValueChange={(value) =>
                    value.length > 0 && handleGenderChange(value)
                  } // Update the value correctly
                >
                  <SelectTrigger className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select your gender">
                      {formData.gender || "Select your gender"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {formData.genders.map((item: any) => (
                      <SelectItem
                        key={item.Key}
                        value={item.Value}
                        className="border-b border-gray-200 px-4 py-2 hover:bg-gray-300 cursor-pointer"
                      >
                        {item.Value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3 text-gray-700 uppercase tracking-wide">
                  Languages
                </label>
                <h1>{formData.languages}</h1>
                <Select
                  value={formData.languages} // Current selected languages
                  onValueChange={(value) =>
                    value.length > 0 && handleLanguageChange(value)
                  } // Update the value correctly
                >
                  <SelectTrigger className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select languages">
                      {formData.languages || "Select languages"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {formData.language?.map((item: any) => (
                      <SelectItem key={item.Key} value={item.Value}>
                        {item.Value}
                        
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-700 uppercase tracking-wide">
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
              <label className="block text-sm font-medium mb-3 text-gray-700 uppercase tracking-wide">
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

             
            </form>
          )}
        </div>
      </Card>
    </div>
  );
};

export default function Profile() {
  return (
    <Suspense fallback={<div>Loading profile...</div>}>
      <ProfilePage />
    </Suspense>
  );
}
