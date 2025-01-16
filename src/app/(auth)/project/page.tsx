import React from "react";
import { Input } from "@/ui/ui/input";
import { Button } from "@/ui/ui/button";

const ProjectForm: React.FC = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-xl font-semibold mb-6">Project</h1>
        <form>
          <div className="grid grid-cols-2 gap-6">
            {/* ID */}
            <div>
              <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID <span className="text-red-500">*</span></label>
              <Input id="id" placeholder="Enter your id" />
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name <span className="text-red-500">*</span></label>
              <Input id="name" placeholder="Enter Your Name" />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                placeholder="Enter description"
                className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Owner */}
            <div>
              <label htmlFor="owner" className="block text-sm font-medium text-gray-700">Owner</label>
              <Input id="owner" placeholder="Enter owner" />
            </div>

            {/* Manager */}
            <div>
              <label htmlFor="manager" className="block text-sm font-medium text-gray-700">Manager</label>
              <Input id="manager" placeholder="Enter manager" />
            </div>

            {/* Client */}
            <div>
              <label htmlFor="client" className="block text-sm font-medium text-gray-700">Client <span className="text-red-500">*</span></label>
              <Input id="client" placeholder="Enter client" />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <Input id="category" placeholder="Enter the category" />
            </div>

            {/* Team */}
            <div>
              <label htmlFor="team" className="block text-sm font-medium text-gray-700">Team</label>
              <Input id="team" placeholder="Enter team" />
            </div>

            {/* Start Date */}
            <div>
              <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">Start date</label>
              <Input id="start-date" type="date" className="border border-gray-300 rounded-md" />
            </div>

            {/* End Date */}
            <div>
              <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">End date</label>
              <Input id="end-date" type="date" className="border border-gray-300 rounded-md" />
            </div>
          </div>
 {/* Description */}
 <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                id="Address"
                placeholder="Enter Address"
                className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-4">
            <Button variant="outline">Cancel</Button>
            <Button variant="default">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
