import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

// Initialize Prisma Client
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Handle POST request: Add new staff
    try {
      const {
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
        role,
        active,
      } = req.body;

      // Dropdown data (gender and language options)
      const dropdown = {
        gender: [
          { Key: "M", Value: "Male" },
          { Key: "F", Value: "Female" },
          { Key: "O", Value: "Other" },
        ],
        language: [
          { Key: "ML", Value: "Malayalam" },
          { Key: "EN", Value: "English" },
          { Key: "HN", Value: "Hindi" },
          { Key: "TA", Value: "Tamil" },
          { Key: "TE", Value: "Telugu" },
        ],
      };

      // Create new staff record
      const staff = await prisma.staff.create({
        data: {
          profile: {
            id: "some-unique-id", // You can generate a unique ID as needed
            gmail: email,
            password: "password", // You should hash the password in real implementation
            contactNumber: phone,
            firstName,
            lastName,
            employeeId,
            gender,
            languages,
            dateOfBirth,
            maritalStatus: "Empty", // Static example data
            nationality,
            address,
            active:"Empty",
            designation,
            region: "Empty", // Example region
            role, // Example role
            department: "Empty", // Example department

          },
          dropdown: dropdown, // Add dropdown data to the staff record
        },
      });

      return res
        .status(201)
        .json({ message: "Staff added successfully", staff });
    } catch (error) {
      return res.status(500).json({ error: "Failed to add staff" });
    }
  } else if (req.method === "GET") {
    // Handle GET request: Fetch all staff
    try {
      const staff = await prisma.staff.findMany();
      return res.status(200).json({ staff });
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch staff" });
    }
  } else if (req.method === "PUT") {
    console.log(req.method);

    // Handle PUT request: Update existing staff profile
    try {
      const {
        firstName,
        lastName,
        contactNumber,
        gmail,
        employeeId,
        maritalStatus,
        role,
        department,
        dateOfBirth,
        gender,
        nationality,
        address,
        designation,
        languages,
        genders,
        language,
        active,
      } = req.body.formData;
      console.log(
        firstName,
        lastName,
        contactNumber,
        gmail,
        employeeId,
        maritalStatus,
        role,
        department,
        dateOfBirth,
        gender,
        nationality,
        address,
        designation,
        languages,
        genders,
        language,
        active,
      );

      // Find the staff by ID
      const staff = await prisma.staff.update({
        where: { id: req.body.id },
        data: {
          profile: {
            firstName,
            lastName,
            contactNumber,
            gmail,
            employeeId,
            maritalStatus,
            role,
            department,
            dateOfBirth,
            gender,
            nationality,
            address,
            designation,
            languages,
            genders,
            language,
            active,
          },
        },
      });
      return res
        .status(200)
        .json({ message: "Staff profile updated successfully" });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ error: "Failed to update staff profile" });
    }
  } else {
    // If method is not POST, GET, or PUT, return Method Not Allowed
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
