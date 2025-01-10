import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const staff = await prisma.staff.findMany({
      select: {
        dropdown: true, // Select the dropdown field
      },
    });
    console.log(staff);
    

    // Extract unique languages and gender values
    const languages: string[] = [];
    const gender: string[] = [];

    staff.forEach((staffMember) => {
      const dropdown = staffMember.dropdown as { language: string[]; gender: string[] };
      languages.push(...dropdown.language);
      gender.push(...dropdown.gender);
    });

    // Remove duplicates
    const uniqueLanguages = [...new Set(languages)];
    const uniqueGender = [...new Set(gender)];

    res.status(200).json({ languages: uniqueLanguages, gender: uniqueGender });
  } catch (error) {
    console.error("Error fetching dropdown data:", error);
    res.status(500).json({ message: "Failed to fetch dropdown data" });
  }
}
  