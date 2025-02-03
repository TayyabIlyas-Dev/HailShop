

// 'use client'
// import React, { useContext } from 'react'
// import { groq } from 'next-sanity';
// import { client } from '@/sanity/lib/client';
// import Card from './Card';



// const Products = async () => {
//     const products = await client.fetch(groq `*[_type=="product"]`)

//     return (
//             <div className='bg-[#f8f8f8] w-full py-12 mt-[125px]'>
//                 <div className='container'>
//                 <div className='py-4 text-center'>
//                     <h1 className='text-3xl font-bold'>Best Selling Products</h1>
//                     <h1 className=''>Enjoy Up To 50%</h1>
//                 </div>
//                 <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-6'>
//                     {products.map((product:any,index:number)=>(
//                         <Card key={index} product={product} />
//                     )) 
//                     } 
//                 </div>



//             </div>
//         </div>
//     )
// }

// export default Products




'use client';

import React, { useEffect, useState } from 'react';
import { client } from '@/src/sanity/lib/client';
import Card from './Card';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const data = await client.fetch(`*[_type=="product"]`);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
}, []);


return (
    <div className='bg-[#FAFAFA] w-full py-8 '>
      <div className='container'>
      
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-6 mx-1 ml-2 text-center '>
          {products.map((product: any, index: number) => (
              <Card key={index} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};
export default Products;