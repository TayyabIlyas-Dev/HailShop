"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/src/sanity/lib/image";
import { useToast } from "../context/ToastContext";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";

interface Product {
  _id: string;
  name: string;
  discount: number;
  slug: { current: string };
  images?: { asset: { _ref: string } }[];
  description: string;
  price: number;
  productType: string;
  inventory: number;
}

const StockCard: React.FC<{ product: Product; onDelete: (id: string) => void }> = ({ product, onDelete }) => {
  const { showToast } = useToast();
  const nameStyle =
  product.name.length > 12
    ? "text-[14px] sm:text-[16px]"
    : product.name.length > 10
    ? "text-[16px] sm:text-[19px]"
    : "text-[19px] sm:text-[22px]";


  const imageUrl =
    product?.images && product.images.length > 0
      ? urlForImage(product.images[0]).url()
      : "/fallback-image.jpg";

  const handleDelete = () => {
      onDelete(product._id);
      showToast("Product deleted successfully.");
    
  };
  const withoutDiscountPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  return (
    <div className="bg-white pt-4 pb-2 drop-shadow-md rounded-2xl overflow-hidden sm:hover:shadow-lg hover:scale-[1.04] transition-all duration-300">
          <Link href={`/dashboard2/stockDetails/${product.slug.current}`} prefetch={false}>
          {product.discount > 0 && (
       <div className="absolute z-10 top-2 right-1">
       <div className="w-7 sm:w-10 group">
         {/* Upper Box */}
         <div className="bg-black text-white text-center font-bold px-1 rounded-t-md">
           <span className="text-[5px] sm:text-[7px]">{product.discount}</span>
           <span className="text-[5px] sm:text-[7px]"> %OFF</span>
         </div>
     
         {/* Triangle */}
         <div
           className="w-0 h-0 
           border-l-[14px] sm:border-l-[20px] 
           border-r-[14px] sm:border-r-[20px] 
           border-t-[7px] sm:border-t-[10px] 
           border-l-transparent border-r-transparent 
           border-t-black mx-auto"
         ></div>
       </div>
     </div>
     
        )}

          <Image
          src={imageUrl}
          alt={product.name}
          width={220}
          height={100}
          className="object-contain card-image px-1 h-32 mx-auto hover:scale-[1.08] transition-transform duration-700"
          priority={false}
        />
        <div className="text-center pt-4 pb-3">
          <h1 className={`text-2xl font-bold ${nameStyle}`}>{product.name}</h1>
          <h1 className="text-xl py-1 text-gray-500 font-semibold">
            <span className="text-green-500">$ </span>         
                {Math.floor(withoutDiscountPrice)}

 

          </h1>
          <p className="text-sm text-gray-500">Stock: {product.inventory}</p>
        </div>
      </Link>
      <div className="flex items-center justify-between">
        <button
          className="bg-gray-100 hover:bg-gray-200 w-9 h-9 flex items-center justify-center rounded-full ml-4 hover:scale-110 transition-all duration-300"
          id="view-product"
        >
          <Link href={`/dashboard2/stockDetails/${product.slug.current}`} prefetch={false}>
            <FiEye />
          </Link>
        </button>

        <button
          className="bg-red-100 text-red-500 hover:bg-red-200 w-9 h-9 flex items-center justify-center rounded-full cursor-pointer mr-4 hover:scale-110 transition-all duration-300"
          onClick={handleDelete}
          id="delete-product"
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};

export default StockCard;