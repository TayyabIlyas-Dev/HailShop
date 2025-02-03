"use client";

import React, { useEffect, useState } from "react";
import { client } from "@/src/sanity/lib/client";
import Card from "../../components/Card";

const Cameras = () => {
  const [cameraProducts, setCameraProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product" && productType == "camera"]{
          name, slug, images, price, productType
        }`;
        const products = await client.fetch(query);
        setCameraProducts(products);
      } catch (error) {
        console.error("Error fetching cameras:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-32">
      <h1 className="text-4xl font-bold text-center mb-3">Cameras</h1>
      <h1 className="text-[14px] font-semibold text-gray-500 text-center  mb-5">Discover top-rated products from various categories to suit your needs and preferences.</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading cameras...</p>
      ) : cameraProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cameraProducts.map((product) => (
            <Card key={product.slug.current} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No cameras available.</p>
      )}
    </div>
  );
};

export default Cameras;
