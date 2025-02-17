"use client";

import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Products } from "../components";
import Link from "next/link";
import Image from "next/image";
import { FavouritesContext } from "../context/FavouritesContext";
import { urlForImage } from "@/src/sanity/lib/image";
import { FiShoppingBag } from "react-icons/fi";
import { Heart } from "lucide-react";
import { TiDeleteOutline } from "react-icons/ti";
import { CartContext } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

const Favourites = () => {
  const { favourites, removeProduct, loading }: any =
    useContext(FavouritesContext);
  // const { addProduct: addToCart }: any = useContext(CartContext) || {};
  const [showMore, setShowMore] = useState(false);
  const { addProduct: addToCart, qty: cartQty }: any =
    useContext(CartContext) || {};
  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };
  const { showToast } = useToast();

  const handleClickCart = (product: any) => {
    if (product.inventory <= 0) {
      showToast("This product is out of stock!");
      return;
    }

    if (!addToCart) {
      showToast("Cart functionality is unavailable.");
      return;
    }

    // Add to cart directly without confirmation
    addToCart(product, cartQty || 1);
    showToast("Item added to the cart!"); // Show toast notification
  };
  //  Force reload the page on component mount
  useEffect(() => {
    if (typeof window !== "undefined" && !window.location.hash) {
      window.location.hash = "reloaded";
      window.location.reload();
    }
  }, []);

  if (loading) {
    return (
      <div className="my-[80px] text-center flex items-center justify-center px-5">
        <p>Loading your favourites...</p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-[80px] bg-[#f8949415] pb-6  text-center flex flex-col items-center px-5 py-8">
        {favourites.length === 0 ? (
          <div className="w-fit text-center bg-[#fafafa] min-h-[250px]  shadow-md rounded-2xl p-8 flex flex-col items-center justify-center gap-6">
            <motion.div
              className="bg-red-100 rounded-full p-4 flex items-center justify-center shadow-sm"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Heart className="text-red-500 w-12 h-12" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Your Favourites
              </h2>
            </div>
            <p className="text-gray-600 max-w-sm text-center leading-relaxed">
              Keep track of your most-loved items here. Add products to your
              favourites and access them anytime.
            </p>
            <div className="mt-4">
              <Link href="/allProducts">
                <button className="px-6 py-3 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg transition-all duration-300">
                  Explore More
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="w-full text-center min-h-[250px]  rounded-2xl p-8 flex flex-col items-center justify-center gap-6">
              <motion.div
                className="bg-red-100 rounded-full p-4 flex items-center justify-center shadow-sm"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Heart className="text-red-500 w-12 h-12" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Your Favourites
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
              {favourites.map((product: any) => (
                <div
                  key={product._id}
                  className="bg-white pt-6 pb-3 drop-shadow-md rounded-2xl overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <Link
                    href={`/product/${product.slug.current}`}
                    prefetch={false}
                  >
                    <Image
                      src={urlForImage(
                        product?.images && product.images[0]
                      ).url()}
                      alt={product.slug}
                      width={220}
                      height={100}
                      className="object-contain h-32 mx-auto hover:scale-110 transition-transform duration-500"
                      priority={false}
                    />
                    <div className="text-center pt-8 pb-4">
                      <h1
                        className={`text-2xl font-bold ${
                          product.name.length > 12
                            ? "text-[14px] sm:text-[16px]"
                            : product.name.length > 10
                              ? "text-[16px] sm:text-[19px]"
                              : "text-[19px] sm:text-[22px]"
                        }`}
                      >
                        {product.name}
                      </h1>
                      <h1 className="text-xl py-2 text-gray-500 font-semibold">
                        <span className="text-green-500">$ </span>{" "}
                        {product.price}
                      </h1>
                    </div>
                  </Link>
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-gray-100 hover:bg-gray-200 w-9 h-9 flex items-center justify-center rounded-full ml-4 hover:scale-125 transition-all duration-500"
                      onClick={() => handleClickCart(product)}
                      id="add-to-cart"
                    >
                      <FiShoppingBag />
                    </button>
                    <button
                      className="bg-red-100 hover:bg-red-200 w-9 h-9 flex items-center justify-center rounded-full cursor-pointer mr-4 hover:scale-125 transition-all duration-500 text-red-500"
                      onClick={() => removeProduct(product)}
                      id="remove-from-fav"
                    >
                      <TiDeleteOutline size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex pt-12  items-center justify-center">
          <button
            className="relative my-6 mx-10 font-semibold text-gray-800 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-gray-800 after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
            onClick={toggleShowMore}
          >
            {showMore ? "See Less " : "See More Products"}
          </button>
        </div>
        {showMore && (
          <div className="more-info my-1">
            <Products />
          </div>
        )}
      </div>
    </>
  );
};

export default Favourites;
