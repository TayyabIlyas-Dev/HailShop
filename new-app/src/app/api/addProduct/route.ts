import { NextResponse } from "next/server";
import { client } from "@/src/sanity/lib/client";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, description, price, productType, inventory, images,discount, isFeatured  } = body;

        if (!name || !description || !price || !productType || !inventory) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const newProduct = {
            _type: "product",
            name,
            description,
            price: parseFloat(price),
            productType,
            discount: discount ? Number(discount) : 0, // Default 0 if no discount
        
            isFeatured: Boolean(isFeatured),
            inventory: parseInt(inventory, 10),
            images,
            slug: {
                _type: "slug",
                current: name.toLowerCase().replace(/\s+/g, "-"),
            },
        };

        const response = await client.create(newProduct);
        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        console.error("Error adding product:", error);
        return NextResponse.json({ message: "Failed to add product" }, { status: 500 });
    }
}
