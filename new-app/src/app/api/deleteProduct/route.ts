import { NextResponse } from "next/server";
import { client } from "@/src/sanity/lib/client";

export async function DELETE(req: Request) {
    try {
        const { productId } = await req.json();

        if (!productId) {
            return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
        }

        // Delete product from Sanity
        await client.delete(productId);

        return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Delete product error:", error);
        return NextResponse.json({ message: "Failed to delete product" }, { status: 500 });
    }
}
