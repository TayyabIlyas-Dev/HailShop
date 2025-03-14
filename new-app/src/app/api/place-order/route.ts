
import { NextResponse } from "next/server";
import { client } from "../../lib/sanityClient"; 
export async function POST(req: Request) {
  try {
    const orderData = await req.json(); // Body parse karein
    const response = await client.create(orderData); // Database me save karein

    // Inventory update
    await Promise.all(
      orderData.cartItems.map((item: any) =>
        client.patch(item.productId).inc({ inventory: -item.productQty }).commit()
      )
    );

    return NextResponse.json({ message: "Order Placed Successfully", order: response }, { status: 200 });
  } catch (error) {
    console.error("Error saving order:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


// Previous code 14 march 15 march

// // pages/api/place-order.ts
// import type { NextApiRequest, NextApiResponse } from "next";
// import { client } from "../../lib/sanityClient"; // Apna database client import karo

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }

//   try {
//     const orderData = req.body; // Jo data success page se aayega
//     const response = await client.create(orderData); // Database me save karo

//     // Inventory update
//     await Promise.all(
//       orderData.cartItems.map((item: any) =>
//         client.patch(item.productId).inc({ inventory: -item.productQty }).commit()
//       )
//     );

//     return res.status(200).json({ message: "Order Placed Successfully", order: response });
//   } catch (error) {
//     console.error("Error saving order:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }
