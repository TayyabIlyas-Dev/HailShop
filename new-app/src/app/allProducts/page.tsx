// 'use client'
import React, { useContext } from 'react'
import { groq } from 'next-sanity';
import { client } from '@/src/sanity/lib/client';
import Card from '../components/Card';


const allProducts = async () => {

    const products = await client.fetch(groq `*[_type=="product"]`)

    return (
        
        <>
      
        <div className='bg-[#f8f8f8]  w-full  pb-20 pt-24 p-2'>
            <div className='container'>
                <div className='py-4 text-center'>
                    <h1 className='text-3xl p-2 font-bold'>Explore Our Collection</h1>
                    <p className='italic text-[14px]'>Find the perfect products for every occasion, with the best quality and prices.</p>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-6'>
                    {products.map((product:any,index:number)=>(
                        <Card key={index} product={product} />
                    )) 
                    } 
                </div>



            </div>
        </div>
    
        </>
    )
}

export default allProducts
