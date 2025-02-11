import { NextResponse } from "next/server";
import { client } from "@/src/sanity/lib/client";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
        }

        // Convert File to Blob for Sanity upload
        const buffer = await file.arrayBuffer();
        const blob = new Blob([buffer], { type: file.type });

        // Upload image to Sanity
        const asset = await client.assets.upload("image", blob, { filename: file.name });

        return NextResponse.json({ _id: asset._id }, { status: 200 });
    } catch (error) {
        console.error("Image upload error:", error);
        return NextResponse.json({ message: "Image upload failed" }, { status: 500 });
    }
}
