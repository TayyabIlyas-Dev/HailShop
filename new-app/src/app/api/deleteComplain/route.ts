import { NextResponse } from "next/server";
import { client } from "../../../sanity/lib/client";

// DELETE: Remove Complaint
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "Complaint ID is required" }, { status: 400 });
    }

    await client.delete(id);

    return NextResponse.json({ message: "Complaint deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting complaint:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
