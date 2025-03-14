// import { NextResponse } from "next/server";
// import { client } from "@/src/sanity/lib/client";

// export async function POST(req: Request) {
//   try {
//     const { userName, complaint, date, productName, city } = await req.json();

//     if (!userName || !complaint || !date || !productName || !city) {
//       return NextResponse.json(
//         { message: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     const newComplaint = await client.create({
//       _type: "complaint",
//       userName,
//       complaint,
//       date,
//       productName,
//       city,
//     });

//     return NextResponse.json(
//       { message: "Complaint submitted successfully", complaint: newComplaint },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error saving complaint:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }




import { NextResponse } from "next/server";
import { client } from "@/src/sanity/lib/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📩 Received data:", body); // Debugging log

    const { userName, email, phoneNumber, complaint, date, productName, city, status } = body;

    // ✅ Check for missing fields
    if (!userName || !email || !phoneNumber || !complaint || !date || !productName || !city) {
      console.log("❌ Validation failed: Missing fields");
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // ✅ Default status if not provided
    const complaintStatus = status || "Pending";

    console.log("🛠️ Creating complaint in Sanity...");

    const newComplaint = await client.create({
      _type: "complaint",
      userName,
      email,
      phoneNumber,
      complaint,
      date,
      productName,
      city,
      status: complaintStatus,
    });

    console.log("✅ Complaint created:", newComplaint);

    return NextResponse.json(
      { message: "Complaint submitted successfully", complaint: newComplaint },
      { status: 201 }
    );

  } catch (error) {
    console.error("❌ Error saving complaint:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: (error as any).message },
      { status: 500 }
    );
  }
}
