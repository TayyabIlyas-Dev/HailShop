// "use client"

// import { urlForImage } from '@/sanity/lib/image'
// import Image from 'next/image'
// import React, { useContext, useState } from 'react';
// import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
// import { CartContext } from '../context/CartContext';

// const ProductDetails = ({product}:any) => {
//     const [index,setIndex] = useState(0);
//     const { cartItems, addProduct, qty, decQty, incQty}:any = useContext(CartContext);
//     // console.log(cartItems);

//   return (
//     <div className='product-details-section'>
//         <div className='product-details-container'>

//     	    {/* Left */}
//             <div>
//                 {/* TOP */}
//                 <div className='h-[450px] flex items-center mb-[25px]'>
//                     <Image
//                         loader={()=>urlForImage(product.images[index]).url()}
//                         src={urlForImage(product.images[index]).url()}
//                         alt={product.images[index]}
//                         width={350}
//                         height={350}
//                         className='object-contain mx-auto'
//                     />
//                 </div>

//                 {/* BOTTOM */}
//                 <div className='small-images-container'>
//                     {product.images?.map((item:any,i:number)=>(
//                         <Image
//                             loader={()=>urlForImage(product.images[i]).url()}
//                             src={urlForImage(product.images[i]).url()}
//                             alt={product.images[0]}
//                             width={220}
//                             height={100}
//                             className='object-contain h-32 mx-auto border rounded-xl hover:cursor-pointer'
//                             onClick={()=>setIndex(i)}
//                         />
//                     ))}

//                 </div>
//             </div>

//     	    {/* Right */}
//             <div className='flex flex-col gap-8 md:pt-32 pt-0'>
//                 <div className='flex flex-col gap-4'>
//                     <div className='text-3xl font-bold'>{product.name}</div>
//                     <div className='text-xl font-medium'>{product.price}</div>
//                 </div>

//                 <div className='flex gap-2 items-center'>
//                         <h3>Quantity</h3>
//                         <p className='quantity-desc flex items-center border-black'>
//                             <span className='minus'
//                                 onClick={decQty}
//                             >
//                                 <AiOutlineMinus />
//                             </span>
//                             <span className='num'>{qty}</span>
//                             <span className='plus'
//                                 onClick={incQty}
//                             >
//                                 <AiOutlinePlus />
//                             </span>

//                         </p>
//                 </div>

//                 <button className='btn add-to-cart'
//                     onClick={()=>addProduct(product,qty)}
//                 >
//                     Add To Cart
//                 </button>

//             </div>

//         </div>

//     </div>
//   )
// }

// // export default ProductDetails

// "use client";

// import { urlForImage } from "../../sanity/lib/image";
// import Image from "next/image";
// import React, { useContext, useState } from "react";
// import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
// import { CartContext } from "../context/CartContext";
// import Products from "./Products";
// import { motion } from "framer-motion";
// import Footer from "./Footer";

// const ProductDetails = ({ product }: any) => {
//   const [first, setIndex] = useState(0);
//   const [showMore, setShowMore] = useState(false); // State to toggle the sliding effect
//   const { cartItems, addProduct, qty, decQty, incQty }: any =
//     useContext(CartContext);

//     const descriptionStyle =
//     product.description.length > 90 
//     ? "text-xl text-gray-500 overflow-hidden rounded-lg pb-2 border-gray-300 max-h-[92px] overflow-y-auto px-1 custom-scrollbar" 
//     : "text-xl md:text-2xl";

//   const toggleShowMore = () => {
//     setShowMore((prev) => !prev);
//   };
//   const handleClick = () => {
//     const userConfirmed = confirm("Add item in the cart?");
//     if (!userConfirmed) return; // Exit if the user clicks "Cancel"

//     addProduct(product, qty); // Execute only if the user clicks "OK"
//   };

//   return (
//     <div className="product-details-section mt-24">
//       <div className="product-details-container ">
//         {/* Left Section */}
//                 <motion.div
//                     initial={{ x: -100, opacity: 0 }}
//                     animate={{ x: 0, opacity: 1 }}
//                     transition={{ type: "spring", stiffness: 100, damping: 10 }}
//                   >
//         <div>
//           {/* Main Image */}
//           <div className="h-[450px] flex items-center mb-[25px] border rounded-lg mx-5 hover:shadow-md">
//             <Image
//               src={urlForImage(product.images[first]).url()}
//               alt={product.images[first].alt || "Product Image"}
//               width={350}
//               height={350}
//               className="object-cover mx-auto hover:scale-110 transition-transform duration-300"
//             />
//           </div>

//           {/* Thumbnails */}
//           <div className="small-images-container  mx-4">
//             {product.images?.map((item: any, i: number) => (
//               <Image
//                 key={i}
//                 src={urlForImage(product.images[i]).url()}
//                 alt={item.alt || "Product Image"}
//                 width={220}
//                 height={100}
//                 className="object-cover p-3 h-16 sm:h-32 md:h-20 lg:h-32 border mx-auto rounded-xl hover:cursor-pointer hover:shadow-md hover:scale-105 transition-transform duration-300"
//                 onClick={() => setIndex(i)}
//               />
//             ))}
//           </div>
//         </div>
//         </motion.div>
//         {/* Right Section */}

//         <motion.div
//           initial={{ x: 100, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ type: "spring", stiffness: 100, damping: 10 }}
//         >
//           <div className="flex flex-col gap-8 md:pt-16 pt-0">
//             <div className="flex flex-col gap-4">
//               <div className="text-3xl p-2 font-bold">{product.name}</div>
//               <div className={ `text-xl py-3  font-medium ${descriptionStyle} `}>
//                 {product.description}
//               </div>
//               <div className="text-xl font-medium">
//                 <span className="text-green-600">$ </span> {product.price}
//               </div>
//             </div>

//             {/* Quantity Section */}
//             <div className="flex gap-2 items-center">
//               <h3>Quantity</h3>
//               <p className="quantity-desc flex items-center border-black rounded-md hover:shadow-md">
//                 <span className="minus" onClick={decQty}>
//                   <AiOutlineMinus />
//                 </span>
//                 <span className="num">{qty}</span>
//                 <span className="plus" onClick={incQty}>
//                   <AiOutlinePlus />
//                 </span>
//               </p>
//             </div>

//             <div>
//               {/* Add to Cart Button */}
//               <button className="btn add-to-cart hover:px-2 shadow-sm" onClick={handleClick}>
//                 Add To Cart
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//       {/* See More Button */}
//       <div className="flex pt-6 items-center justify-center">
//         <button
//           className="relative my-6 mx-10 font-semibold text-gray-800 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-gray-800 after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
//           onClick={toggleShowMore}
//         >
//           {showMore ? "See Less " : "See More Products"}
//         </button>
//         {/* </> */}
//       </div>

//       {/* Conditional rendering of extra information, outside the button */}
//       {showMore && (
//         <div className="more-info my-1">
//           <Products />
//         </div>
//       )}
//       <Footer/>
//     </div>
//   );
// };

// export default ProductDetails;



"use client";

import { urlForImage } from "../../sanity/lib/image";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsSuitHeartFill } from "react-icons/bs";
import { CartContext } from "../context/CartContext";
import { FavouritesContext } from "../context/FavouritesContext";
import { useToast } from "../context/ToastContext";
import Products from "./Products";
import { motion } from "framer-motion";
import Footer from "./Footer";

const ProductDetails = ({ product }: any) => {
  const [first, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  // Contexts
  const { cartItems, addProduct, qty, decQty, incQty }: any =
    useContext(CartContext);
  const {
    addProduct: addToFavourites,
    removeProduct: removeFromFavourites,
    isFavourite,
  }: any = useContext(FavouritesContext) || {};
  const { showToast } = useToast();

  const isFav = isFavourite ? isFavourite(product) : false;

  const descriptionStyle =
    product.description.length > 90
      ? "text-xl text-gray-500 overflow-hidden rounded-lg pb-2 border-gray-300 max-h-[92px] overflow-y-auto px-1 custom-scrollbar"
      : "text-xl md:text-2xl";

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  // Add to Cart Handler
  const handleAddToCart = () => {
    const userConfirmed = confirm("Add item to the cart?");
    if (!userConfirmed) return;

    addProduct(product, qty);
    showToast("Item added to the cart!");
  };

  // Add/Remove from Favourites Handler
  const handleToggleFavourite = () => {
    if (!addToFavourites || !removeFromFavourites) {
      showToast("Favourites functionality is unavailable.");
      return;
    }

    if (isFav) {
      removeFromFavourites(product);
      showToast("Item removed from favourites!");
    } else {
      addToFavourites(product);
      showToast("Item added to favourites!");
    }
  };

  return (
    <div className="product-details-section mt-24">
      <div className="product-details-container">
        {/* Left Section */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        >
          <div>
            {/* Main Image */}
            <div className="h-[450px] flex items-center mb-[25px] border rounded-lg mx-5 hover:shadow-md">
              <Image
                src={urlForImage(product.images[first]).url()}
                alt={product.images[first].alt || "Product Image"}
                width={350}
                height={350}
                className="object-cover mx-auto hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Thumbnails */}
            <div className="small-images-container mx-4">
              {product.images?.map((item: any, i: number) => (
                <Image
                  key={i}
                  src={urlForImage(product.images[i]).url()}
                  alt={item.alt || "Product Image"}
                  width={220}
                  height={100}
                  className="object-cover p-3 h-16 sm:h-32 md:h-20 lg:h-32 border mx-auto rounded-xl hover:cursor-pointer hover:shadow-md hover:scale-105 transition-transform duration-300"
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        >
          <div className="flex flex-col gap-8 md:pt-16 pt-0">
            <div className="flex flex-col gap-4">
              <div className="text-3xl p-2 font-bold">{product.name}</div>
              <div className={`text-xl py-3 font-medium ${descriptionStyle}`}>
                {product.description}
              </div>
              <div className="text-xl font-medium">
                <span className="text-green-600">$ </span> {product.price}
              </div>
            </div>

            {/* Quantity Section */}
            <div className="flex gap-2 items-center">
              <h3>Quantity</h3>
              <p className="quantity-desc flex items-center border-black rounded-md hover:shadow-md">
                <span className="minus" onClick={decQty}>
                  <AiOutlineMinus />
                </span>
                <span className="num">{qty}</span>
                <span className="plus" onClick={incQty}>
                  <AiOutlinePlus />
                </span>
              </p>
            </div>

            <div className="flex gap-4">
              {/* Add to Cart Button */}
              <button
                className="btn add-to-cart hover:px-2 shadow-sm"
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>

              {/* Add/Remove from Favourites Button */}
              <button
                className={`${
                  isFav
                    ? "bg-red-100 text-red-500 hover:bg-red-100 border-2 border-red-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-gray-700"
                }  w-24 h-16 flex items-center mt-1  justify-center rounded-lg cursor-pointer hover:scale-110 transition-all duration-500`}
                onClick={handleToggleFavourite}
              >
                <BsSuitHeartFill />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* See More Button */}
      <div className="flex pt-6 items-center justify-center">
        <button
          className="relative my-6 mx-10 font-semibold text-gray-800 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-gray-800 after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
          onClick={toggleShowMore}
        >
          {showMore ? "See Less " : "See More Products"}
        </button>
      </div>

      {/* Conditional rendering of extra information */}
      {showMore && (
        <div className="more-info my-1">
          <Products />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProductDetails;
