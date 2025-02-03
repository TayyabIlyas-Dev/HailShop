
// "use client";

// import Link from "next/link";
// import React, { useContext } from "react";
// import { FiShoppingBag } from "react-icons/fi";
// import Cart from "./Cart";
// import { CartContext } from "../context/CartContext";
// import { FavouritesContext } from "../context/FavouritesContext";
// import Image from "next/image";
// import { HailLogo } from "@/public";
// import { motion } from "framer-motion";
// import { BsSuitHeartFill, } from "react-icons/bs";
// import { TbCards } from "react-icons/tb";

// const Navbar = () => {
//   const { totalQuantity: cartQuantity, showCart, setShowCart }: any = useContext(CartContext);
//   const { totalFavourites }: any = useContext(FavouritesContext); // Updated to totalFavourites

//   const handleCartClick = () => {
//     setShowCart(!showCart);
//   };

//   return (
//     <>
//       <div className="fixed top-0 left-0 w-full h-[80px] bg-white/50 backdrop-blur-lg shadow-sm after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-gray-800 after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left px-3 z-20">
//         <div className="container w-full h-full flex flex-row justify-between items-center">
//           <motion.div
//             initial={{ x: -100, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ type: "spring", stiffness: 100, damping: 10 }}
//           >
//             <Link href="/" className="logo">
//               <Image
//                 src={HailLogo}
//                 height="100"
//                 width="700"
//                 alt="HAIL"
//                 className="object-contain w-24  p-4"
//               />
//             </Link>
//           </motion.div>

//           <motion.div
//             initial={{ x: 100, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ type: "spring", stiffness: 100, damping: 10 }}
//           >
//             <div>
//               <div className="flex items-center justify-center gap-4">
//                 <div className="pb-1 sm:pb-2">
//                   <Link href="/allProducts" className="font-semibold">
                
//                  <span className="text-[28px]">
//                   <TbCards/>
//                  </span>
//                   </Link>
//                 </div>
//                 <div>
//                   {/* Cart Icon */}
                
//                   <button className="cart-icon" onClick={handleCartClick}>
//                     <FiShoppingBag />
//                     <span className="cart-item-qty">{cartQuantity}</span>
//                   </button>
            
//                   {/* Favourites Icon */}
//                   <Link href="/favourites" className="pr-3 pl-3">
//                     <button className="cart-icon">
//                       <BsSuitHeartFill />
//                       <span className="fav-item-qty">{totalFavourites}</span>
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {showCart && <Cart />}
//     </>
//   );
// };

// export default Navbar;













// code 2

















"use client";

import Link from "next/link";
import React, { useContext, useState, useEffect } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";
import Cart from "./Cart";
import { CartContext } from "../context/CartContext";
import { FavouritesContext } from "../context/FavouritesContext";
import Image from "next/image";
import { HailLogo } from "@/public";
import { motion } from "framer-motion";
import { BsSuitHeartFill } from "react-icons/bs";
import { TbCards } from "react-icons/tb";

const Navbar = () => {
  const { totalQuantity: cartQuantity, showCart, setShowCart }: any = useContext(CartContext);
  const { totalFavourites }: any = useContext(FavouritesContext);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCartClick = () => {
    setShowCart(!showCart);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-[80px] bg-white/50 backdrop-blur-lg shadow-sm px-3 z-20">
        <div className="container w-full h-full flex flex-row justify-between items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            <Link href="/" className="logo ">
              <Image
                src={HailLogo}
                height="100"
                width="700"
                alt="HAIL"
                className="object-contain w-24 p-3 hover:scale-x-110 transition-all duration-500"
              />
            </Link>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            <div>
              <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-4">
                    <Link href="/allProducts" className="font-semibold">
                      <span className="text-[28px]">
                        <TbCards />
                      </span>
                    </Link>
                    <button className="cart-icon" onClick={handleCartClick}>
                      <FiShoppingBag />
                      <div className="flex items-center gap-2">
                        <span className="cart-item-qty">{cartQuantity}</span>
                      </div>
                    </button>
                    <Link href="/favourites" className="pr-3 pl-">
                      <button className="cart-icon flex items-center gap-2">
                        <BsSuitHeartFill />
                        <span className="fav-item-qty">{totalFavourites}</span>
                      </button>
                    </Link>
                  </div>
                
                {isMobile ? (
                  <div className="relative">
                    <button className="text-2xl" onClick={toggleMenu}>
                      <HiDotsVertical />
                    </button>
                    {menuOpen && (
                      // <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg p-2">
                      //   <Link href="/allProducts" className="block w-full p-2" onClick={closeMenu}>
                      //     <button className="cart-icon w-full flex justify-between">
                      //       <TbCards />
                      //     </button>
                      //   </Link>
                      //   <button className="cart-icon w-full flex justify-between p-2" onClick={() => { handleCartClick(); closeMenu(); }}>
                      //     <FiShoppingBag />
                      //     <div className="flex items-center gap-2">
                      //       <span className="cart-item-qty">{cartQuantity}</span>
                      //     </div>
                      //   </button>
                      //   <Link href="/favourites" className="block w-full p-2" onClick={closeMenu}>
                      //     <button className="cart-icon w-full flex justify-between">
                      //       <BsSuitHeartFill />
                      //       <div className="flex items-center gap-2">
                      //         <span className="fav-item-qty">{totalFavourites}</span>
                      //       </div>
                      //     </button>
                      //   </Link>
                      // </div>
                      <div>ll</div>
                      
                    )}
                  
                  </div>
                ) : (
                  <div>
                    
                  </div>
                )}
                
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
