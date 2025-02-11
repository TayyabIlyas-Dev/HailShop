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

const Card = ({ product }: { product: any }) => {
  const nameStyle =
    product.name.length > 12
      ? "text-[17px] sm:text-[20px]"
      : "text-[20px] sm:text-[23px]";

  // Toast Context
  const { showToast } = useToast();

  // Accessing contexts
  const { addProduct: addToCart, qty: cartQty }: any =
    useContext(CartContext) || {};
  const {
    addProduct: addToFavourites,
    removeProduct: removeFromFavourites,
    isFavourite,
  }: any = useContext(FavouritesContext) || {};

  const isFav = isFavourite ? isFavourite(product) : false;

  // Add to Cart
  const handleClickCart = () => {
    if (!addToCart) {
      showToast("Cart functionality is unavailable.");
      return;
    }

    // Add to cart directly without confirmation
    addToCart(product, cartQty || 1);
    showToast("Item added to the cart!"); // Show toast notification
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

  return (
    <div className="bg-white pt-4 pb-2 drop-shadow-md rounded-2xl overflow-hidden sm:hover:shadow-lg hover:scale-[1.04] transition-all duration-300">
      <Link href={`/product/${product.slug.current}`} prefetch={false}>
        <Image
          src={urlForImage(product?.images && product.images[0]).url()}
          alt={product.slug}
          width={220}
          height={100}
          className="object-contain card-image h-32 mx-auto hover:scale-[1.08] transition-transform duration-700"
          priority={false}
        />
        <div className="text-center pt-4 pb-3">
          <h1 className={`text-2xl font-bold ${nameStyle}`}>{product.name}</h1>
          <h1 className="text-xl py-1 text-gray-500 font-semibold">
            <span className="text-green-500">$ </span> {product.price}
          </h1>
        </div>
      </Link>
      <div className="flex items-center justify-between">
        <button
          className={`bg-gray-100 hover:bg-gray-200 w-9 h-9 flex items-center justify-center rounded-full ml-4 hover:scale-110 transition-all duration-300"
          ${product.inventory <= 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleClickCart}
          id="add-to-cart"
        >
          <FiShoppingBag />
        </button>
        {/* <button
          className={`add-to-cart hover:px-2 ml-3 shadow-sm hover:scale-105 transition-all duration-300 ${
            product.inventory <= 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleClickCart}
          disabled={product.inventory <= 0}
        >
          <FiShoppingBag />
          </button> */}

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
