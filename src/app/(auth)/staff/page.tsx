"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/ui/ui/button";
import { Input } from "@/ui/ui/input";
import Navbar from "@/app/components/navbar";
import { Avatar, AvatarImage, AvatarFallback } from "@/ui/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/ui/select";
import axios from "axios";
import { useRouter } from "next/navigation";

// Define the type for staff data
interface StaffMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profile: {
    id: string;
    gmail: string;
    contactNumber: string;
    firstName: string;
    lastName: string;
    employeeId: string;
    dateOfBirth: string;
    gender: string;
    maritalStatus: string;
    nationality: string;
    address: string;
    designation: string;
    region: string;
    role: string;
    languages: string[];
    department: string;
  };
}

// Define the type for the response data
interface StaffResponse {
  message: string;
  staff: StaffMember[]; // Assuming the response has a 'staff' field containing the array
}

const StaffListing: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [staff, setStaff] = useState<StaffMember[]>([]); // State to hold staff data
  const [filteredStaff, setFilteredStaff] = useState<StaffMember[]>([]); // State for filtered staff
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [address, setAddress] = useState("");
  const [designation, setDesignation] = useState("");
  const [languages, setLanguages] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch staff data when the component mounts
    const fetchStaff = async () => {
      try {
        const response = await axios.get<StaffResponse>("/api/staff");
        setStaff(response.data.staff); // Access 'staff' from the response
        setFilteredStaff(response.data.staff); // Set filteredStaff initially as all staff
      } catch (error) {
        console.error("Failed to fetch staff:", error);
      }
    };

    fetchStaff();
  }, []);

  useEffect(() => {
    // Filter staff based on search query
    if (searchQuery) {
      const filtered = staff.filter((member) => {
        const fullName = `${member.profile.firstName} ${member.profile.lastName}`.toLowerCase();
        return fullName.includes(searchQuery.toLowerCase());
      });
      setFilteredStaff(filtered);
    } else {
      setFilteredStaff(staff); // Reset to all staff when search is cleared
    }
  }, [searchQuery, staff]);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleSave = async () => {
    try {
      const response = await axios.post<StaffResponse>("/api/staff", {
        firstName,
        lastName,
        email,
        phone,
        employeeId,
        dateOfBirth,
        gender,
        nationality,
        address,
        designation,
        languages,
      });

      console.log(response.data.message);
      closeSidebar();
    } catch (error) {
      console.error("Failed to add staff:", error);
    }
  };

  const router = useRouter();
  return (
    <div className=" mt-20 ">
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen relative">
        <div className="flex justify-end">
          <Button
            className="py-3 px-6 text-white bg-blue-600 rounded-full shadow-md transform transition-all duration-300 ease-in-out hover:bg-blue-700 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={openSidebar}
          >
            Add Staff
          </Button>
        </div>
        <div className="flex items-center space-x-2 w-full max-w-md mx-auto">
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Search..."
              className="p-4 pl-12 pr-6 border border-gray-300 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full transition-all duration-300 ease-in-out hover:shadow-2xl focus:shadow-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl">
              🔍
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 mt-6">
          {filteredStaff.length > 0 ? (
            filteredStaff.map((staff, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg shadow-xl p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-2xl"
              >
                {/* Display staff image */}
                <Avatar className="w-24 h-16">
  <AvatarImage
    src="https://static-00.iconduck.com/assets.00/user-avatar-icon-512x512-vufpcmdn.png" // Use the provided URL
    alt={`${staff.profile.firstName} ${staff.profile.lastName}`}
  />
  <AvatarFallback>
    {staff.profile.firstName.charAt(0)}
    {staff.profile.lastName.charAt(0)}
  </AvatarFallback>
</Avatar>

                {/* Display staff name from the database */}
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  {staff.profile.firstName} {staff.profile.lastName}
                </h2>

                <div className="bg-blue-50 p-4 rounded-md w-full text-center shadow-sm">
                  <p className="text-sm text-gray-700 flex items-center justify-center gap-2">
                    📧 {staff.profile.gmail}
                  </p>
                  <p className="text-sm text-gray-700 flex items-center justify-center gap-2">
                    📞 {staff.profile.contactNumber}
                  </p>
                </div>

                <Button
                  className="mt-6 bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 ease-in-out"
                  onClick={() => router.push(`/profile/${staff.id}`)} // Pass the staff ID in the URL
                >
                  View details
                </Button>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No staff members found.
            </p>
          )}
        </div>

        {/* Full-page Sidebar */}
        {isSidebarOpen && (
          <div className="fixed top-0 right-0 w-full max-w-md h-full bg-white z-50 flex flex-col p-6 overflow-y-auto shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Personal Information</h3>
              <Button variant="outline" onClick={closeSidebar}>
                Close
              </Button>
            </div>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSave}>
              <div>
                <label className="block text-sm font-medium mb-2">
                  First Name <span className="text-red-600">*</span>
                </label>
                <Input
                  required
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={`${
                    !firstName ? "border-red-600 focus:ring-red-500" : ""
                  } border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <div>
                  <label className="block text-sm font-medium mb-2">
                    Last Name <span className="text-red-600">*</span>
                  </label>
                  <Input
                    required
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={`${
                      !lastName ? "border-red-600 focus:ring-red-500" : ""
                    } border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <Input
                    required
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${
                      !email ? "border-red-600 focus:ring-red-500" : ""
                    } border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone number</label>
                  <Input
                    type="text"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Employee ID</label>
                  <Input
                    type="text"
                    placeholder="Enter your id"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Date of Birth</label>
                  <Input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Gender</label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Nationality</label>
                  <Input
                    type="text"
                    placeholder="Enter your nationality"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Address</label>
                  <textarea
                    placeholder="Enter address here"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Designation</label>
                  <Input
                    type="text"
                    placeholder="Enter your designation"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Languages Preferences</label>
                  <Select value={languages} onValueChange={setLanguages}>
                    <SelectTrigger className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Select your languages" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Malayalam">Malayalam</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Hindi">Hindi</SelectItem>
                      <SelectItem value="Tamil">Tamil</SelectItem>
                      <SelectItem value="Telugu">Telugu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              {/* Other form fields here */}
              {/* (Same as before) */}
              <div className="flex justify-end gap-4 mt-6">
                <Button variant="outline" onClick={() => console.log("Cancel clicked")}>
                  Cancel
                </Button>
                <Button className="bg-blue-600 text-white hover:bg-blue-700" type="submit">
                  Save
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffListing;
