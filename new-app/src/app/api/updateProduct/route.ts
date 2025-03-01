// import { NextResponse } from "next/server";
// import { client } from "../../../sanity/lib/client";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     console.log("API Request Body:", body); // Log incoming data

//     const { id, name, price, inventory, images, } = body;
//     if (!id || !name || price == null || inventory == null) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//     }

//     // Update product in Sanity
//     const updatedProduct = await client
//       .patch(id)
//       .set({ name, price, inventory })
//       .commit();

//     return NextResponse.json({ message: "Product updated successfully", updatedProduct });
//   } catch (error) {
//     console.error("Sanity Update Error:", error);
//     return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
//   }
// }





// working

// import { NextResponse } from "next/server";
// import { client } from "../../../sanity/lib/client";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     console.log("API Request Body:", body); // Debugging ke liye

//     const { id, name, price, inventory, images, discount, isFeatured } = body;
//     if (!id || !name || price == null || inventory == null) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//     }

//     // Update product in Sanity
//     const updatedProduct = await client
//       .patch(id)
//       .set({ name, price, inventory, images, discount, isFeatured })
//       .commit();

//     return NextResponse.json({ message: "Product updated successfully", updatedProduct });
//   } catch (error) {
//     console.error("Sanity Update Error:", error);
//     return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
//   }
// }




import { NextResponse } from "next/server";
import { client } from "../../../sanity/lib/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("API Request Body:", body); // Debugging ke liye

    const { id,  price, inventory, images, discount, isFeatured, productType } = body;

    if (!id  || price == null || inventory == null || !productType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Update product in Sanity
    const updatedProduct = await client
      .patch(id)
      .set({  price, inventory, images, discount, isFeatured, productType }) // ✅ ProductType added
      .commit();

    return NextResponse.json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.error("Sanity Update Error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}
