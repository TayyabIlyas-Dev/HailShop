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
       <div className="">
       <button
  className={`relative ${
    showMore ? "top-24 text-lg px-1 left-[90%]" : "top-14"
  } left-[83%] text-base font-semibold text-white bg-black hover:bg-white border-2 border-black hover:text-black transition-all px-4 py-1 rounded-full`}
  onClick={toggleShowMore}
>
  {showMore ? "X" : "+ Add product"}
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
