"use client";

import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/src/sanity/lib/image";
import { BsSuitHeartFill } from "react-icons/bs";
import { FiShoppingBag } from "react-icons/fi";
import { CartContext } from "../context/CartContext";
import { FavouritesContext } from "../context/FavouritesContext";
import { useToast } from "../context/ToastContext";
import { motion } from "framer-motion";

const Card = ({ product }: { product: any }) => {
  const nameStyle =
    product.name.length > 12
      ? "text-[14px] sm:text-[16px]"
      : product.name.length > 10
        ? "text-[16px] sm:text-[19px]"
        : "text-[19px] sm:text-[22px]";

  // Toast Context
  const { showToast } = useToast();

  // Accessing contexts
  const { addProduct: addToCart, cartItems:cart,qty: cartQty }: any =
    useContext(CartContext) || {};
  const {
    addProduct: addToFavourites,
    removeProduct: removeFromFavourites,
    isFavourite,
  }: any = useContext(FavouritesContext) || {};

  const isFav = isFavourite ? isFavourite(product) : false;

  // Add to Cart
  const handleClickCart = () => {
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

 // Check if this specific product is already in the cart
const isInCart = cart?.find((item: any) => item.slug.current === product.slug.current);


   // Add to Cart Function
   const handleAddToCart = () => {
     if (product.inventory <= 0) {
       showToast("This product is out of stock!");
       return;
     }
 
     if (!addToCart) {
       showToast("Cart functionality is unavailable.");
       return;
     }
 
     if (isInCart) {
       showToast("Item already added in your cart");
       return;
     }
 
     addToCart(product, 1);
     showToast("Item added to the cart!");
   };

  // Add/Remove from Favourites
  const handleClickFav = () => {
    if (!addToFavourites || !removeFromFavourites) {
      showToast("Favourites functionality is unavailable.");
      return;
    }

    if (isFav) {
      removeFromFavourites(product);
      showToast("Item removed from favourites!"); // Show toast notification
    } else {
      addToFavourites(product);
      showToast("Item added to favourites!"); // Show toast notification
    }
  };
  const withoutDiscountPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  return (
    <div className="bg-white pt-4 pb-2 drop-shadow-md rounded-2xl overflow-hidden sm:hover:shadow-lg hover:scale-[1.04] transition-all duration-300">
      <Link href={`/product/${product.slug.current}`} prefetch={false}>
      {product.discount > 0 && (
  <div className="absolute z-10 top-2 right-1 ">
    <motion.span
      className="relative text-[7px] font-bold px-2 py-0 rounded-md"
      initial={{ rotate: -5, scale: 0.8, opacity: 0 }}
      animate={{ rotate: 0, scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
                      <span className="text-gray-700 bg-red-100 px-2 py-[2px] rounded-md shadow-sm shadow-red-300">
                      {product.discount}% OFF
      </span>
    </motion.span>
  </div>
)}

        <Image
          src={urlForImage(product?.images && product.images[0]).url()}
          alt={product.slug}
          width={220}
          height={100}
          className="object-contain card-image h-32 px-1 mx-auto hover:scale-[1.08] transition-transform duration-700"
          priority={false}
        />
        <div className="text-center pt-4 pb-3">
          <h1 className={`text-2xl font-bold ${nameStyle}`}>   {product.name}
          </h1>
          <h1 className="text-xl py-2 text-center text-gray-500 font-semibold">
            <span className="text-green-500">$ </span>             {Math.floor(withoutDiscountPrice)}
            {/* <span className= " mb-3 text-xs text-red-400"> {product.discount}% off</span>  */}
          </h1>
        </div>
      </Link>
      <div className="flex items-center justify-between">
        <button
          className={`bg-gray-100 hover:bg-gray-200 w-9 h-9 flex items-center justify-center rounded-full ml-4 hover:scale-110 transition-all duration-300"`}
          onClick={handleAddToCart}
          id="add-to-cart"
        >
          <FiShoppingBag />
        </button>

        <button
          className={`${
            isFav ? "bg-red-100 text-red-500" : "bg-gray-100 text-gray-700"
          } hover:bg-gray-200 w-9 h-9 flex items-center justify-center rounded-full cursor-pointer mr-4 hover:scale-110 transition-all duration-300`}
          onClick={handleClickFav}
          id="add-to-fav"
        >
          <BsSuitHeartFill />
        </button>
      </div>
    </div>
  );
};

export default Card;
