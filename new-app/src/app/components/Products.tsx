


'use client';

import React, { useState, useEffect } from 'react';
import { client } from '@/src/sanity/lib/client';
import Card from './Card';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await client.fetch(`*[_type=="product"]`);
        setProducts(data.slice(0, 8)); // Sirf pehle 4 products set honge
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    

    fetchProducts();
  }, []); // 👈 Empty dependency array means it runs only once

  return (
    <div className='bg-[#FAFAFA] w-full py-8'>
      <div className='container'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-6 mx-1 ml-2 text-center'>
          {loading ? (
            <p className="text-center col-span-4">Loading...</p>
          ) : (
            products.map((product: any, index: number) => (
              <Card key={index} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
