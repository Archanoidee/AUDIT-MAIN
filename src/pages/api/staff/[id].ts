// pages/api/staff/[id].ts
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

// Mock staff data
const staffDatabase = [
  { id: "677e3ca618ca442d5892814e", firstName: "John", lastName: "Doe" },
  { id: "another-id", firstName: "Jane", lastName: "Smith" },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { id } = req.query;

    // Ensure the ID is a string and process
    if (typeof id === "string") {
      const staff =await db.staff.findUnique({ where: { id } });      

      if (staff) {
        // Return staff directly or structure the response
        return res.status(200).json(staff);
      } else {
        return res.status(404).json({ error: "Staff not found" });
      }
    } else {
      return res.status(400).json({ error: "Invalid ID" });
    }
  } else {
    // Handle unsupported HTTP methods
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
