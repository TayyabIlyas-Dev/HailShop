"use client";

import React, { useEffect, useState } from "react";
import { client } from "@/src/sanity/lib/client";
import Card from "../../components/Card";

const SmartWatches = () => {
  const [smartWatchProducts, setSmartWatchProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product" && productType == "table"]{
          name, slug, images, price, productType ,discount
        }`;
        const products = await client.fetch(query);
        setSmartWatchProducts(products);
      } catch (error) {
        console.error("Error fetching smart watches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container  mx-auto px-4 py-32">
      <h1 className="text-3xl font-bold text-center mb-3">Elegant Table Designs
      </h1>
      <h1 className="text-[13px] text-gray-500 font-semibold text-center  mb-5">Discover top-rated products from various categories to suit your needs and preferences.</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading smart watches...</p>
      ) : smartWatchProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {smartWatchProducts.map((product) => (
            <Card key={product.slug.current} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No smart watches available.</p>
      )}
    </div>
  );
};

export default SmartWatches;
