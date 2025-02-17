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

// import { NextApiRequest, NextApiResponse } from "next";
// import { client } from "../../../sanity/lib/client";
// import { v4 as uuidv4 } from "uuid";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }

//   try {
//     const { file } = req.body;
//     if (!file) {
//       return res.status(400).json({ message: "No file provided" });
//     }

//     const imageAsset = await client.assets.upload("image", file, {
//       filename: `${uuidv4()}-${file.name}`,
//     });

//     res.status(200).json({ imageUrl: imageAsset.url });
//   } catch (error) {
//     console.error("Image upload failed:", error);
//     res.status(500).json({ message: "Image upload failed" });
//   }
// }
