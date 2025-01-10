"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/ui/ui/button";
import { Input } from "@/ui/ui/input";
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
  const [languages, setLanguages] = useState<string[]>([]);

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
    <div className="p-6 bg-gray-50 min-h-screen relative">
       
      <div className="flex justify-end">
  <Button
    className="bg-blue-600 text-white hover:bg-blue-700"
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
      className="p-3 pl-10 pr-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
    />
    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
      🔍
    </span>
  </div>
</div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
  {filteredStaff.length > 0 ? (
    filteredStaff.map((staff, index) => (
      <div
        key={index}
        className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center"
      >
        {/* Display staff image */}
        <img
          src={staff.profile.id} // Replace this with a valid image URL if necessary
          alt={`${staff.firstName} ${staff.lastName}`}
          className="w-20 h-20 rounded-full mb-4"
        />
        {/* Display staff name from the database */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
  {staff.profile.firstName} {staff.profile.lastName}
</h2>

        <div className="bg-blue-50 p-2 rounded-md w-full text-center">
          <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
            📧 {staff.profile.gmail}
          </p>
          <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
            📞 {staff.profile.contactNumber}
          </p>
        </div>
        <Button
  className="mt-4 bg-blue-600 text-white w-full hover:bg-blue-700"
  onClick={() => router.push(`/profile/${staff.id}`)}  // Pass the staff ID in the URL
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
        <div className="fixed inset-0 bg-white z-50 flex flex-col p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Personal Information</h3>
            <Button variant="outline" onClick={closeSidebar}>
              Close
            </Button>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">First Name</label>
              <Input required type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <Input required type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone number</label>
              <Input required type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Employee ID</label>
              <Input required type="text" placeholder="Enter your employee id" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Date of Birth</label>
              <Input required type="text" placeholder="DD/MM/YYYY" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Gender</label>
              <Select required value={gender} onValueChange={setGender}>
                <SelectTrigger>
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
              <Input type="text" placeholder="Enter your nationality" value={nationality} onChange={(e) => setNationality(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <Input type="text" placeholder="Enter full address here" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Designation</label>
              <Input type="text" placeholder="Enter your designation" value={designation} onChange={(e) => setDesignation(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Languages Preferences</label>
              <Input type="text" placeholder="Select your preferred languages" value={languages.join(", ")} onChange={(e) => setLanguages(e.target.value.split(", "))} />
            </div>
          </form>
          <div className="flex justify-end gap-4 mt-6">
            <Button variant="outline" onClick={closeSidebar}>
              Cancel
            </Button>
            <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
export default StaffListing;
