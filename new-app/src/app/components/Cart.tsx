

// import React, { useContext } from "react";
// import { AiOutlineLeft, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
// import { TiDeleteOutline } from "react-icons/ti";
// import { CartContext } from "../context/CartContext";
// import Image from "next/image";
// import { urlForImage } from "@/src/sanity/lib/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { FavouritesContext } from "../context/FavouritesContext";

// const Cart = () => {
//   const {
//     onRemove,
//     toggleCartItemQty,
//     totalPrice,
//     totalQuantity,
//     cartItems,
//     showCart,
//     setShowCart,
//   }: any = useContext(CartContext);

//   const handleClose = () => {
//     setShowCart(false);
//   };
//   const handleCheckout = async () => {
//     try {
//       const response = await fetch("/api/checkout", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ products: cartItems }),
//       });
//       const data = await response.json();
//       if (data.url) {
//         window.location.href = data.url;
//       }
//     } catch (error) {
//       console.error("Error during checkout", error);
//     }

//     if (cartItems === 0) {
//       const noCartItem = "Your cart is empty ! Please continue shopping";
//       // return noCartItem
//     }
//   };

//   // Framer Motion Animation Variants
//   const cartVariants = {
//     hidden: { x: "100%", opacity: 0 },
//     visible: {
//       x: 0,
//       opacity: 1,
//       transition: { type: "spring", stiffness: 100, damping: 20 },
//     },
//   };


//   return (
//     <>
//       {showCart && (
//         <div className="cart-wrapper z-100 ">
//           <motion.div
//             className="cart-container"
//             initial="hidden"
//             animate="visible"
//             exit="hidden"
//             variants={cartVariants}
//           >
//             <button className="cart-heading" onClick={handleClose}>
//               <AiOutlineLeft />
//               <span className="heading">Your Cart</span>
//               <span className="cart-num-items">{totalQuantity}</span>
//             </button>
//             <div>{/* <h1>{noCartItem}</h1> */}</div>
//             <div className="product-container mb-20 custom-scrollbar">
//               {cartItems.map((product: any) => (
//                 <div className="p-2 hover:shadow-lg my-5 hover:scale-105 transition-all duration-300 bg-white shadow-md rounded-lg relative">
//                   <div className="grid sm:grid-cols-2 items-center gap-4">
//                     <div
//                       className="  flex items-center  justify-center w-full h-full p-4 shrink-0 text-center"
//                     >
//                       <Image
//                         className="w-56 h-full object-contain inline-block hover:scale-105 transition-all duration-500"
//                         loader={() => urlForImage(product.images[0]).url()}
//                         src={urlForImage(product.images[0]).url()}
//                         alt={product.images[0]}
//                         width={200}
//                         height={200}
//                         // className="object-cover"
//                       />
//                     </div>

//                     <div className="p-2">
//                       <h3 className="text-lg font-bold text-gray-800">
//                             <h5>{product.name}</h5>
//                       </h3>


//                       <div className="flex items-center justify-between flex-wrap gap-4 mt-6">
//                         <div className="flex items-center gap-3">
//                           <h4 className="text-sm text-gray-500">Qty:</h4>
//                           <div className="quantity-desc">
//                         <span
//                           className="minus"
//                           onClick={() => toggleCartItemQty(product._id, "minus")}
//                         >
//                           <AiOutlineMinus />
//                         </span>
//                         <span className="num">{product.quantity}</span>
//                         <span
//                           className="plus"
//                           onClick={() => toggleCartItemQty(product._id, "plus")}
//                         >
//                           <AiOutlinePlus />
//                         </span>
//                       </div>
//                           </div>

//                         <div>
//                         <h4>  
//                            <span className="text-green-500">$ </span>{product.price}</h4>

//                         </div>
//                       </div>

//                       <div className="divide-x  grid grid-cols-2 text-center mt-6">
          
//                       <button
//                         type="button"
//                         onClick={() => onRemove(product)}
//                         className="remove-item"
//                       >
//                         <TiDeleteOutline />
//                       </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 // <div className="product" key={product._id}>
//                 // <Image
//                 //   loader={() => urlForImage(product.images[0]).url()}
//                 //   src={urlForImage(product.images[0]).url()}
//                 //   alt={product.images[0]}
//                 //   width={200}
//                 //   height={200}
//                 //   className="object-cover"
//                 // />
//                 //   <div className="item-desc">
//                 //     <div className="flex-row top">
//                 //       <h5>{product.name}</h5>

//                       // <h4>   <span className="text-green-500">$ </span>{product.price}</h4>
//                 //     </div>
//                 //     <div className="flex bottom">
//                       // <div className="quantity-desc">
//                       //   <span
//                       //     className="minus"
//                       //     onClick={() => toggleCartItemQty(product._id, "minus")}
//                       //   >
//                       //     <AiOutlineMinus />
//                       //   </span>
//                       //   <span className="num">{product.quantity}</span>
//                       //   <span
//                       //     className="plus"
//                       //     onClick={() => toggleCartItemQty(product._id, "plus")}
//                       //   >
//                       //     <AiOutlinePlus />
//                       //   </span>
//                       // </div>
//                       // <button
//                       //   type="button"
//                       //   onClick={() => onRemove(product)}
//                       //   className="remove-item"
//                       // >
//                       //   <TiDeleteOutline />
//                       // </button>
//                 //     </div>
//                 //   </div>
//                 // </div>
//               ))}
//             </div>

//             {cartItems.length === 0 ? (
//               <div className="empty-cart">
//                 <div className="flex justify-center items-center">
//                   <Link
//                     href="/allProducts"
//                     className="flex items-center justify-center border-4 w-fit p-3  font-bold m-3 border-black hover:bg-black  hover:text-white"
//                   >
//                     <button>Continue Shopping</button>
//                   </Link>
//                 </div>

//                 <p className="text-center font-semibold text-gray-700 mt-4">
//                   Your cart is empty ! Please continue shopping.
//                 </p>
//               </div>
//             ) : (
//               <div className="p-4 fixed bottom-0 w-full border-t bg-white shadow-lg">
//               <div className="flex flex-col md:flex-row md:justify-between items-center space-y-4 md:space-y-0">
//                 <div className="flex items-center space-x-2">
//                   <h3 className="text-lg font-semibold">Subtotal</h3>
//                   <h3 className="text-lg">
//                     <span className="text-green-500 font-bold">$</span>{totalPrice}
//                   </h3>
//                 </div>
//                 <div>
//                   <button
//                     onClick={handleCheckout}
//                     type="button"
//                     className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold text-sm md:text-base rounded-2xl shadow-lg transition-transform transform hover:scale-105 focus:ring focus:ring-green-300"
//                   >
//                     Pay with Stripe
//                   </button>
//                 </div>
//               </div>
//             </div>
            
//             )}
//           </motion.div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Cart;






// import React, { useContext } from "react";
// import { AiOutlineLeft, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
// import { TiDeleteOutline } from "react-icons/ti";
// import { CartContext } from "../context/CartContext";
// import Image from "next/image";
// import { urlForImage } from "@/src/sanity/lib/image";
// import Link from "next/link";
// import { motion } from "framer-motion";

// const Cart = () => {
//   const {
//     onRemove,
//     toggleCartItemQty,
//     totalPrice,
//     totalQuantity,
//     cartItems,
//     showCart,
//     setShowCart,
//   }: any = useContext(CartContext);

//   const handleClose = () => {
//     setShowCart(false);
//   };
//   const handleCheckout = async () => {
//         try {
//           const response = await fetch("/api/checkout", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ products: cartItems }),
//           });
//           const data = await response.json();
//           if (data.url) {
//             window.location.href = data.url;
//           }
//         } catch (error) {
//           console.error("Error during checkout", error);
//         }

//         if (cartItems === 0) {
//           const noCartItem = "Your cart is empty ! Please continue shopping";
//           // return noCartItem
//         }
//       };

//   // Framer Motion Animation Variants
//   const cartVariants = {
//     hidden: { x: "100%", opacity: 0 },
//     visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } },
//   };

//   return (
//     <>
//       {showCart && (
//         <div className="cart-wrapper z-100">
//           <motion.div
//             className="cart-container"
//             initial="hidden"
//             animate="visible"
//             exit="hidden"
//             variants={cartVariants}
//           >
//         <button className="cart-heading" onClick={handleClose}>
//           <AiOutlineLeft />
//           <span className="heading">Your Cart</span>
//           <span className="cart-num-items">{totalQuantity}</span>
//         </button>
//         <div>{/* <h1>{noCartItem}</h1> */}</div>
//         <div className="product-container">
//           {cartItems.map((product: any) => (
//             <div className="product" key={product._id}>
//               <Image
//                 loader={() => urlForImage(product.images[0]).url()}
//                 src={urlForImage(product.images[0]).url()}
//                 alt={product.images[0]}
//                 width={200}
//                 height={200}
//                 className="object-cover"
//               />
//               <div className="item-desc">
//                 <div className="flex-row top">
//                   <h5>{product.name}</h5>

//                   <h4>   <span className="text-green-500">$ </span>{product.price}</h4>
//                 </div>
//                 <div className="flex bottom">
//                   <div className="quantity-desc">
//                     <span
//                       className="minus"
//                       onClick={() => toggleCartItemQty(product._id, "minus")}
//                     >
//                       <AiOutlineMinus />
//                     </span>
//                     <span className="num">{product.quantity}</span>
//                     <span
//                       className="plus"
//                       onClick={() => toggleCartItemQty(product._id, "plus")}
//                     >
//                       <AiOutlinePlus />
//                     </span>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => onRemove(product)}
//                     className="remove-item"
//                   >
//                     <TiDeleteOutline />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {cartItems.length === 0 ? (
//           <div className="empty-cart">
//         <div className="flex justify-center items-center">
//           <Link
//             href="/allProducts"
//             className="flex items-center justify-center border-4 w-fit p-3  font-bold m-3 border-black hover:bg-black  hover:text-white"
//           >
//             <button>Continue Shopping</button>
//           </Link>
//         </div>

//             <p className="text-center font-semibold text-gray-700 mt-4">
//               Your cart is empty ! Please continue shopping.
//             </p>
//           </div>
//         ) : (
//           <div className="cart-bottom">
//             <div className="total">
//               <h3>Subtotal</h3>
//               <h3>${totalPrice}</h3>
//             </div>
//             <div className="btn-container">
//               <button
//                 onClick={handleCheckout}
//                 type="button"
//                 className="checkout-btn"
//               >
//                 Pay with Stripe
//               </button>
//             </div>
//           </div>
//         )}
//           </motion.div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Cart;






import React, { useContext } from "react";
import { AiOutlineLeft, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { CartContext } from "../context/CartContext";
import Image from "next/image";
import { urlForImage } from "@/src/sanity/lib/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Cart = () => {
  const {
    onRemove,
    toggleCartItemQty,
    totalPrice,
    totalQuantity,
    cartItems,
    showCart,
    setShowCart,
  }: any = useContext(CartContext);

  const handleClose = () => setShowCart(false);

  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: cartItems }),
      });
      const data = await response.json();
      if (data.url) window.location.href = data.url;
    } catch (error) {
      console.error("Error during checkout", error);
    }
  };

  const cartVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <>
      {showCart && (
        <div className="cart-wrapper fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <motion.div
            className="cart-container w-full max-w-md bg-white h-full shadow-lg p-6 flex flex-col justify-between"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={cartVariants}
          >
            {/* Header */}
            <div>
              <button className="flex items-center gap-2 text-gray-700 font-bold mb-4" onClick={handleClose}>
                <AiOutlineLeft />
                <span>Your Cart</span>
                <span className="cart-num-items">{totalQuantity}</span>
              </button>

              {/* Empty Cart */}
              {cartItems.length === 0 ? (
                <div className="text-center mt-10">
                  <p className="text-gray-500 font-semibold">Your cart is empty!</p>
                  <Link href="/allProducts">
                    <button className="mt-6 px-4 py-2 bg-white text-black font-bold rounded-md border-black border-4 hover:bg-black hover:text-white">
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="product-container space-y-4 custom-scrollbar overflow-y-auto max-h-[150vh]">
                  {cartItems.map((product: any) => (
                    <div
                      key={product._id}
                      className="p-4 bg-white shadow-md rounded-lg  hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      <div className="grid grid-cols-3 gap-4 items-center">
                        {/* Product Image */}
                        <div className="col-span-1 flex justify-center items-center  hover:scale-105 transition-all duration-500">
                          <Image
                            src={urlForImage(product.images[0]).url()}
                            alt={product.name}
                            width={80}
                            height={80}
                            className="object-contain"
                          />
                        </div>
                        {/* Product Details */}
                        <div className="col-span-2">
                          <h3 className="text-sm font-bold">{product.name}</h3>
                          
                          <p className="font-semibold text-green-500 text-sm">${product.price}</p>

                          <div className="mt-2 flex items-center justify-between">
                            {/* Quantity */}
                            <div className="flex items-center gap-2">
                              <span className="text-xs">Qty:</span>
                              <div className="flex items-center gap-2 border border-gray-600 rounded-lg px-2 py-1">
                                <button
                                  onClick={() => toggleCartItemQty(product._id, "minus")}
                                  className="text-red-500 text-sm"
                                >
                                  <AiOutlineMinus />
                                </button>
                                <span className="text-sm">{product.quantity}</span>
                                <button
                                  onClick={() => toggleCartItemQty(product._id, "plus")}
                                  className="text-green-500 text-sm"
                                >
                                  <AiOutlinePlus />
                                </button>
                              </div>
                            </div>
                            {/* Price */}
                          </div>
                          {/* Remove Button */}
                          <button
                            onClick={() => onRemove(product)}
                            className="mt-3 text-red-400 text-sm flex items-center gap-1"
                          >
                            <TiDeleteOutline /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Subtotal & Payment Section */}
            {cartItems.length > 0 && (
              <div className="subtotal-section mt-4 border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base font-semibold">Subtotal</h3>
                  <p className="text-base font-bold text-green-500">${totalPrice}</p>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
                >
                  Pay with Stripe
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Cart;
