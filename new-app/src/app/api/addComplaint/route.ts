import { NextResponse } from "next/server";
import { client } from "@/src/sanity/lib/client";

export async function POST(req: Request) {
  try {
    const { userName, complaint, date, productName, city } = await req.json();

    if (!userName || !complaint || !date || !productName || !city) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const newComplaint = await client.create({
      _type: "complaint",
      userName,
      complaint,
      date,
      productName,
      city,
    });

    return NextResponse.json(
      { message: "Complaint submitted successfully", complaint: newComplaint },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving complaint:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
