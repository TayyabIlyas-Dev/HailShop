"use client";

import React, { useEffect, useState } from "react";
import { client } from "@/src/sanity/lib/client";
import Card from "../components/Card";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product" && isFeatured == true]{
          name, slug, images, price, productType,discount
        }`;

        const products = await client.fetch(query);
        setFeaturedProducts(products);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className=" bg-[#FAFAFA] mx-auto px-4 py-12">
      <div className="container">

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-6 mx-1 ml-2 text-center">
        {featuredProducts.map((product) => (
          <Card key={product.slug.current} product={product} />
        ))}
      </div>
          </div>
    </div>
  );
};

export default FeaturedProducts;
