import { NextResponse } from "next/server";
import { client } from "@/src/sanity/lib/client";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("Incoming Review Data:", body); // ✅ Debugging

        const { productId, name, userId, rating, comment } = body;

        if (!productId || !name || !userId || !rating || !comment) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const newReview = {
            _type: "review",
            productId,
            name,
            userId,
            rating: Number(rating),
            comment,
        };

        const response = await client.create(newReview);
        return NextResponse.json({ review: response }, { status: 201 });
    } catch (error) {
        console.error("Error adding review:", error);
        return NextResponse.json({ message: "Failed to add review" }, { status: 500 });
    }
}
