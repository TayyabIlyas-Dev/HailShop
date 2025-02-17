// "use client";

// import React from "react";
// import Card from "./Card";
// import { groq } from "next-sanity";
// import { client } from "../lib/sanityClient";

// const Products = async  () => {
//   const products = await client.fetch(groq`*[_type=="product"]`);
//   const limitedProducts = products.slice(0, 8);
  
//   return (
//     <div className="bg-[#FAFAFA] w-full py-8">
//       <div className="container">
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-6 mx-1 ml-2 text-center">
//         {limitedProducts.map((product: any, index: number) => (
//   <Card key={index} product={product} />
// ))}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Products;





"use client";

import React, { useEffect, useState } from "react";
import Card from "./Card";
import { groq } from "next-sanity";
import { client } from "../lib/sanityClient";

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await client.fetch(groq`*[_type=="product"]`);
      setProducts(data.slice(0, 8));
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-[#FAFAFA] w-full py-8">
      <div className="container">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-6 mx-1 ml-2 text-center">
          {products.map((product: any, index: number) => (
            <Card key={index} product={product} />
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default Products;
