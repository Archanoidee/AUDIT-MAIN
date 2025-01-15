'use client';

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";

const Toggle = () => {
  const [isActive, setIsActive] = useState(false); // Initial state is false (inactive)

  // Handle toggle for both the switch and button
  const handleToggle = () => {
    const action = isActive ? "deactivate" : "activate"; // Determine the action
    const confirmMessage = `Are you sure you want to ${action}?`;
    
    // Show confirmation dialog
    if (confirm(confirmMessage)) {
      setIsActive(!isActive); // Toggle the state on confirmation
    }
  };

  return (
    <div className="relative">
      {/* Input field */}
      <div className=" top-2 left-2">
        <input
          type="text"
          readOnly
          value={isActive ? "Active" : "Inactive"} // Dynamically set the value
          className={`p-2 rounded-md mb-6 pl-7 w-28
            ${isActive ? "border-green-500 text-green-700 bg-green-100" : "border-red-500 text-red-700 bg-red-100"}`}
        />
      </div>

      {/* Button */}
      <div className="absolute top-2 right-2">
        <Button onClick={handleToggle} className="px-4 py-2">
          {isActive ? "Deactivate" : "Activate"}
        </Button>
      </div>
    </div>
  );
};

export default Toggle;
