'use client'
import React, { useEffect, useState } from "react";
import StockCard from "./StockCard";
import { client } from "../lib/sanityClient";
import { groq } from "next-sanity";

interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  images?: { asset: { _ref: string } }[];
  description: string;
  price: number;
  productType: string;
  inventory: number;
  discount: number;
}

const Inventory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await client.fetch(groq`*[_type=="product"]`);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchProducts();
    }, []);
  
    const handleDeleteProduct = async (productId: string) => {
      try {
        const response = await fetch("/api/deleteProduct", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId }),
        });
  
        if (!response.ok) throw new Error("Failed to delete product");
  
        setProducts(products.filter((p) => p._id !== productId));
      } catch (error) {
        console.error("Product deletion failed:", error);
        alert("Failed to delete product. Please try again.");
      }
    };
  
  return (
    <div>
      <div className="pt-4 px-3 text-start">
        <h1 className="text-4xl  px-3 font-bold">Inventory</h1>
      </div>
      {loading ? (
        <p className="text-center text-gray-600">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 mx-3 mt-8">
          {products.map((product) => (
            <StockCard
              key={product._id}
              product={product}
              onDelete={handleDeleteProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Inventory;
