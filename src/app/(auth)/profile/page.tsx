"use client";
import * as ToastPrimitive from "@radix-ui/react-toast";
import React, { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/ui/ui/input";
import { Card } from "@/ui/ui/card";
import Navbar from "@/app/components/navbar";
import Toggle from "@/app/components/ToggleButton";
import Cancel from "@/app/components/cancel";
import dynamic from 'next/dynamic';
import "boxicons";
import ClientOnlyComponent from "@/app/components/ClientOnly";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/ui/select";
import { log } from "console";
import { request } from "http";
const Toast = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <ToastPrimitive.Provider>
      <ToastPrimitive.Root
        className="bg-red-500 text-white p-4 rounded-lg shadow-md"
        duration={5000}
      >
        
        <ToastPrimitive.Title className="font-bold">
          {title}
        </ToastPrimitive.Title>
        {description && (
          <ToastPrimitive.Description className="text-sm">
            {description}
          </ToastPrimitive.Description>
        )}
      </ToastPrimitive.Root>
      <ToastPrimitive.Viewport className="fixed bottom-4 right-4 flex flex-col gap-2" />
    </ToastPrimitive.Provider>
  );
};



const ProfilePage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");
  const [formData, setFormData] = useState({
    active: true,
    firstName: "",
    lastName: "",
    contactNumber: "",
    gmail: "",
    employeeId: "",
    maritalStatus: "",
    role: "",
    department: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    address: "",
    designation: "",
    languages: "",
    genders: [],
    language: [],
  });
  console.log(formData.active);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [role, setrole] = useState("");

  useEffect(() => {
    if (id) {
      console.log("hai");


   


      const fetchUserData = async () => {
        setLoading(true);
        try {
          const response = await axios.get<any>(`/api/staff/${id}`);
          console.log(response);

          setFormData({
            firstName: response.data.profile.firstName || "",
            lastName: response.data.profile.lastName || "",
            contactNumber: response.data.profile.contactNumber || "",
            gmail: response.data.profile.gmail || "",
            employeeId: response.data.profile.employeeId || "",
            maritalStatus: response.data.profile.maritalStatus || "",
            role: response.data.profile.role || "",
            department: response.data.profile.department || "",
            dateOfBirth: response.data.profile.dateOfBirth || "",
            gender: response.data.profile.gender || "",
            nationality: response.data.profile.nationality || "",
            address: response.data.profile.address || "",
            designation: response.data.profile.designation || "",
            languages: response.data.profile.languages || "",
            genders: response.data.dropdown.gender || [],
            language: response.data.dropdown.language || [],
            active: response.data.profile?.active || false, // or response.data?.status || ""
          });
          console.log(response.data.status);
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
  const handletextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value == "Active" ? true : false,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleLanguageChange = (value: string) => {
    setFormData((prev) => ({ ...prev, languages: value }));
  };
  console.log(formData.languages);
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
      console.log(formData);

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

  // Handle toggle for both the switch and button
  const handleToggle = () => {
    const action = formData.active ? "deactivate" : "activate"; // Determine the action
    const confirmMessage = `Are you sure you want to ${action}?`;

    // Show confirmation dialog
    if (confirm(confirmMessage)) {
      setFormData((prev) => ({ ...prev, active: !prev.active }));
    }
  };
  return (
    <div className="mt-20">
      <Navbar />
      <ClientOnlyComponent>
      <div className="min-h-screen bg-gray-50 p-10 h-screen ">
        <Card className="max-w-6xl mx-auto shadow-lg rounded-lg p-12">
          <div className="flex items-center gap-6 mb-10">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
              alt="Profile Avatar"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-semibold">
                {formData.firstName} {formData.lastName}
              </h2>

              <p className="text-sm text-gray-600">
                Team: {formData.employeeId}
              </p>
            </div>
          </div>

          <div className="relative">
            {/* Input field */}
            <div className=" top-2 left-2">
              <input
                type="text"
                readOnly
                value={formData.active ? "Active" : "Inactive"} // Dynamically set the value
                className={`p-2 rounded-md mb-6 pl-7 w-28
                     ${
                       formData.active
                         ? "border-green-500 text-green-700 bg-green-100"
                         : "border-red-500 text-red-700 bg-red-100"
                     }`}
              />
            </div>

            {/* Button */}
            <div className="absolute top-2 right-2">
              <Button onClick={handleToggle} className="px-4 py-2">
                {formData.active ? "Deactivate" : "Activate"}
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-8 border-b mb-10 text-lg">
            <Button
              variant="link"
              className="py-3 px-6 text-blue-600 font-semibold border-b-4 border-blue-600 w-full sm:w-auto text-center"
            >
              Profile
            </Button>
            {/* <Button
            variant="link"
            className="py-3 px-6 text-gray-600 hover:text-blue-600 w-full sm:w-auto text-center"
          >
            Skill Management
          </Button>
          <Button
            variant="link"
            className="py-3 px-6 text-gray-600 hover:text-blue-600 w-full sm:w-auto text-center"
            onClick={() => router.push("/payroll")}
          >
            Payroll
          </Button>
          <Button
            variant="link"
            className="py-3 px-6 text-gray-600 hover:text-blue-600 w-full sm:w-auto text-center"
          >
            Documents
          </Button> */}
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6">Personal Information</h3>

            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div>
                <div className="flex justify-end gap-6 mt-10">
                  <Button onClick={() => router.push("/staff")}>Cancel</Button>
                  <Button onClick={handleSave} disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                  </Button>
                </div>
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-900  tracking-wide">
                        First Name<span className="text-red-600">*</span>
                      </label>
                      <Input
                        required
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-900  tracking-wide">
                        Last Name<span className="text-red-600">*</span>
                      </label>
                      <Input
                        required
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-900  tracking-wide">
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
                      <label className="block text-sm font-medium mb-3 text-gray-900  tracking-wide">
                        Email ID<span className="text-red-600">*</span>
                      </label>
                      <Input
                        required
                        type="text"
                        name="gmail"
                        value={formData.gmail}
                        onChange={handleInputChange}
                        placeholder="Gmail ID"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-900  tracking-wide">
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
                      <label className="block text-sm font-medium mb-3 text-gray-900  tracking-wide">
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
                      <label className="block text-sm font-medium mb-2">
                        Role
                      </label>
                      <Select value={role} onValueChange={setrole}>
                        <SelectTrigger className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <SelectValue placeholder={formData.role} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Editor">Editor</SelectItem>
                          <SelectItem value="Staff">Staff</SelectItem>
                          <SelectItem value="Hr">Hr</SelectItem>
                          <SelectItem value="Manager">Manager</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-900  tracking-wide">
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
                      <label className="block text-sm font-medium mb-3 text-gray-900  tracking-wide">
                        Languages
                      </label>
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
                      <label className="block text-sm font-medium mb-3 text-gray-900  tracking-wide">
                        Gender
                      </label>

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
                      <label className="block text-sm font-medium mb-3 text-gray-900  tracking-wide">
                        Date of Birth
                      </label>
                      <Input
                        type="text"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        placeholder="DD/MM/YYYY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-900  tracking-wide">
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
                      <label className="block text-sm font-medium mb-3 text-gray-900  tracking-wide">
                        Address
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handletextareaChange}
                        placeholder="Address"
                        className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-900  tracking-wide">
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
                    <div className="hidden" >
                      <label className="block text-sm font-medium mb-3 text-gray-900 tracking-wide">
                        status
                      </label>
                      <Input
                        type="text"
                        name="active"
                        value={formData.active ? "Active" : "Inactive"} // Dynamically set the value
                        onChange={handleStatusChange}
                        placeholder="status"
                      />
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </Card>
      </div>
      </ClientOnlyComponent>
      
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
