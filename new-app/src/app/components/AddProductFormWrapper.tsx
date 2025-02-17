"use client";

import React, { useState, useEffect } from "react";
import { groq } from "next-sanity";
import { client } from "@/src/sanity/lib/client";
import AddProductForm from "../components/AddProductForm";

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

const AddProductFormWrapper = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);


      const toggleShowMore = () => {
        setShowMore((prev) => !prev);
      };
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
    
  return (
    <div>
       <div className="flex   items-center justify-center">
                  <button
                    className="relative my-6 text-xl mx-10 font-semibold text-gray-800 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-gray-800 after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                    onClick={toggleShowMore}
                  >
                    {showMore ? " Close form" : "Add a new product"}
                  </button>
                </div>
                {showMore && (
                  <div className="mt-10 p-4 mx-4 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl pt-3 font-bold text-center mb-4">
                      Add New Product
                    </h2>
                    <AddProductForm onProductAdded={fetchProducts} />
                  </div>
                )}
    </div>
  )
}

export default AddProductFormWrapper
