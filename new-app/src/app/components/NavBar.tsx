"use client";

import Link from "next/link";
import React, { useContext } from "react";
import { FiShoppingBag } from "react-icons/fi";
import Cart from "./Cart";
import { CartContext } from "../context/CartContext";
import { FavouritesContext } from "../context/FavouritesContext";
import Image from "next/image";
import { HailLogo } from "@/public";
import { motion } from "framer-motion";
import { BsSuitHeartFill } from "react-icons/bs";

const Navbar = () => {
  const { totalQuantity: cartQuantity, showCart, setShowCart }: any = useContext(CartContext);
  const { totalFavourites }: any = useContext(FavouritesContext); // Updated to totalFavourites

  const handleCartClick = () => {
    setShowCart(!showCart);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-[80px] bg-white/50 backdrop-blur-lg shadow-sm after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-gray-800 after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left px-3 z-20">
        <div className="container w-full h-full flex flex-row justify-between items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            <Link href="/" className="logo">
              <Image
                src={HailLogo}
                height="100"
                width="700"
                alt="HAIL"
                className="object-contain w-28 p-3"
              />
            </Link>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            <div>
              <div className="flex items-center gap-6">
                <div>
                  <Link href="/allProducts" className="font-semibold">
                    Products
                  </Link>
                </div>
                <div>
                  {/* Cart Icon */}
                  <button className="cart-icon" onClick={handleCartClick}>
                    <FiShoppingBag />
                    <span className="cart-item-qty">{cartQuantity}</span>
                  </button>

                  {/* Favourites Icon */}
                  <Link href="/favourites" className="pr-3 pl-3">
                    <button className="cart-icon">
                      <BsSuitHeartFill />
                      <span className="fav-item-qty">{totalFavourites}</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {showCart && <Cart />}
    </>
  );
};

export default Navbar;
