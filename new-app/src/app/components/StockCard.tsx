"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/src/sanity/lib/image";
import { useToast } from "../context/ToastContext";
import { FiEye, FiTrash2 } from "react-icons/fi";

interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  images?: { asset: { _ref: string } }[];
  description: string;
  price: number;
  productType: string;
  inventory: number;
}

const StockCard: React.FC<{ product: Product; onDelete: (id: string) => void }> = ({ product, onDelete }) => {
  const { showToast } = useToast();

  const imageUrl =
    product?.images && product.images.length > 0
      ? urlForImage(product.images[0]).url()
      : "/fallback-image.jpg";

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      onDelete(product._id);
      showToast("Product deleted successfully.");
    }
  };

  return (
    <div className="bg-white pt-4 pb-2 drop-shadow-md rounded-2xl overflow-hidden sm:hover:shadow-lg hover:scale-[1.04] transition-all duration-300">
      <Link href={`/product/${product.slug.current}`} prefetch={false}>
        <Image
          src={imageUrl}
          alt={product.name}
          width={220}
          height={100}
          className="object-contain card-image h-32 mx-auto hover:scale-[1.08] transition-transform duration-700"
          priority={false}
        />
        <div className="text-center pt-4 pb-3">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <h1 className="text-xl py-1 text-gray-500 font-semibold">
            <span className="text-green-500">$ </span> {product.price}
          </h1>
          <p className="text-sm text-gray-500">Stock: {product.inventory}</p>
        </div>
      </Link>
      <div className="flex items-center justify-between">
        <button
          className="bg-gray-100 hover:bg-gray-200 w-9 h-9 flex items-center justify-center rounded-full ml-4 hover:scale-110 transition-all duration-300"
          id="view-product"
        >
          <Link href={`/product/${product.slug.current}`} prefetch={false}>
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