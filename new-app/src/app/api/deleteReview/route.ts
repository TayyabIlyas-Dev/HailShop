import { NextResponse } from "next/server";
import { client } from "../../../sanity/lib/client";

export async function DELETE(req: Request) {
  try {
    const { reviewId, userId } = await req.json();

    if (!reviewId || !userId) {
      return NextResponse.json({ error: "Review ID and User ID are required" }, { status: 400 });
    }

    // Check if the review exists
    const existingReview = await client.fetch(`*[_type == "review" && _id == $reviewId][0]`, {
      reviewId,
    });

    if (!existingReview) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    // Ensure only the owner can delete the review
    if (existingReview.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Delete review
    await client.delete(reviewId);

    return NextResponse.json({ message: "Review deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Delete Review Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
