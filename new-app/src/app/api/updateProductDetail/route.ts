// import { NextRequest, NextResponse } from "next/server";
// import { client } from "../../../sanity/lib/client";

// export async function PUT(req: NextRequest) {
//     try {
//         const { _id, name, description, price, inventory, images } = await req.json();

//         if (!_id) {
//             return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
//         }

//         // Sanity mutation query
//         const mutation = {
//             mutations: [
//                 {
//                     patch: {
//                         id: _id,
//                         set: {
//                             name,
//                             description,
//                             price: parseFloat(price),
//                             inventory: parseInt(inventory),
//                             images,
//                         },
//                     },
//                 },
//             ],
//         };

//         await client.fetch(`*[_id == $_id]`, { _id });

//         await client.request({
//             method: "POST",
//             uri: "/mutate",
//             body: mutation,
//         });

//         return NextResponse.json({ message: "Product updated successfully!" }, { status: 200 });
//     } catch (error) {
//         console.error("Error updating product:", error);
//         return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
//     }
// }

import { NextResponse } from "next/server";
import { client } from "../../../sanity/lib/client";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const { id, name, description, price, inventory, productType, images } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    if (!name || !description || !price || !inventory || !productType) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (!Array.isArray(images) || images.length !== 4) {
      return NextResponse.json({ error: "Exactly 4 images are required" }, { status: 400 });
    }

    // Update the product in Sanity
    await client.patch(id)
      .set({
        name,
        description,
        price,
        inventory,
        productType,
        images: images.map((image) => ({
          _type: "image",
          asset: {
            _type: "reference",
            _ref: image._ref || uuidv4(), // Ensure reference format
          },
        })),
      })
      .commit();

    return NextResponse.json({ message: "Product updated successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}
