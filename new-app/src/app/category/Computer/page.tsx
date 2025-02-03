"use client";

import React, { useEffect, useState } from "react";
import { client } from "@/src/sanity/lib/client";
import Card from "../../components/Card";

const Computers = () => {
  const [computerProducts, setComputerProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product" && productType == "computer"]{
          name, slug, images, price, productType
        }`;
        const products = await client.fetch(query);
        setComputerProducts(products);
      } catch (error) {
        console.error("Error fetching computers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-32">
      <h1 className="text-4xl font-bold text-center mb-3">Computers</h1>
      <h1 className="text-[14px] text-gray-500 font-semibold text-center  mb-5">Discover top-rated products from various categories to suit your needs and preferences.</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading computers...</p>
      ) : computerProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {computerProducts.map((product) => (
            <Card key={product.slug.current} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No computers available.</p>
      )}
    </div>
  );
};

export default Computers;
