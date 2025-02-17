import React, { useContext } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";
import { CartContext } from "../context/CartContext";
import Image from "next/image";
import { urlForImage } from "@/src/sanity/lib/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Cart: React.FC = () => {
  const {
    onRemove,
    toggleCartItemQty,
    totalPrice,
    totalQuantity,
    cartItems,
    setShowCart, // Assuming a state setter exists to manage cart visibility
  }: any = useContext(CartContext);

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

  const handleClose = () => {
    setShowCart(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="cart"
        className="fixed w-full h-full overflow-scroll custom-scrollbar pb-32  top-20 backdrop-blur-2xl shadow-sm px-3 z-20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        exit={{ y: -100 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="sticky top-4 right-4 p-2 backdrop-blur-2xl text-gray-600 hover:text-gray-800 text-2xl"
        >
          <IoMdClose />
        </button>

        {/* Container */}
        <div className="container mx-auto pt-6 pb-3 px-4 lg:px-0">
          {/* Cart Header */}
          <h2 className="text-3xl  font-semibold  text-center text-gray-800 mb-8">
            Your Cart
          </h2>

          {/* Empty Cart Message */}
          {cartItems.length === 0 ? (
            <div className="text-center my-20">
              <p className="text-gray-600 text-lg">
                Your cart is currently empty.
              </p>
              <Link href="/allProducts" onClick={handleClose}>
                <p className="mt-6 inline-block border-2 border-black text-black px-6 py-3 rounded-md font-semibold hover:bg-black hover:text-white transition">
                  Continue Shopping
                </p>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div className="flex-1">
                {cartItems.map((product: any) => (
                  <div
                    key={product._id}
                    className="p-4 bg-white mt-2 shadow-lg rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02] flex items-center gap-4"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-24 flex justify-center items-center overflow-hidden rounded-lg">
                      <Image
                        src={urlForImage(product.images[0]).url()}
                        alt={product.name}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-1">
                      <h3 className="text-sm font-semibold text-gray-800">
                        {product.name}
                      </h3>
                      <p className="font-semibold text-gray-700 text-sm">
                        {" "}
                        <span className="text-green-500">$ </span>{" "}
                        {product.price}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-gray-500">Qty:</span>
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-1 bg-gray-50">
                          {/* Minus Button */}
                          <button
                            onClick={() =>
                              toggleCartItemQty(product._id, "minus")
                            }
                            className={`text-red-500 text-sm hover:text-red-700 ${
                              product.quantity === 1
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            disabled={product.quantity === 1} // Disable when quantity is 1
                          >
                            <AiOutlineMinus />
                          </button>

                          {/* Quantity Display */}
                          <span className="text-sm mx-2 font-medium">
                            {product.quantity}
                          </span>

                          {/* Plus Button */}
                          <button
                            onClick={() =>
                              toggleCartItemQty(product._id, "plus")
                            }
                            className={`text-green-500 text-sm hover:text-green-700 ${
                              product.quantity >= product.inventory
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            disabled={product.quantity >= product.inventory} // Disable when inventory is reached
                          >
                            <AiOutlinePlus />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => onRemove(product)}
                      className="text-red-400 hover:text-red-600 text-lg"
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow h-fit">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Order Summary
                </h3>

                <hr />
                <div className="flex justify-between mt-4">
                  <span className="text-lg font-semibold">
                    Total ({totalQuantity})
                  </span>
                  <span className="text-lg font-semibold">
                    <span className="text-green-500">$ </span> {totalPrice}
                  </span>
                </div>
                <Link href={"/checkout"}>
                <button
                  onClick={handleClose}
                  className="w-full px-6 py-3 mt-2 bg-white text-black border-2 border-black font-bold rounded-lg hover:bg-black hover:text-white transition"
                >
                 Go To Checkout

                </button>
                 </Link>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Cart;

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

//   const handleClose = () => setShowCart(false);

//   const handleCheckout = async () => {
//     try {
//       const response = await fetch("/api/checkout", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ products: cartItems }),
//       });
//       const data = await response.json();
//       if (data.url) window.location.href = data.url;
//     } catch (error) {
//       console.error("Error during checkout", error);
//     }
//   };

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
//         <div className="cart-wrapper fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
//           <motion.div
//             className="cart-container w-full max-w-md bg-white h-full shadow-lg p-6 flex flex-col justify-between"
//             initial="hidden"
//             animate="visible"
//             exit="hidden"
//             variants={cartVariants}
//           >
//             {/* Header */}
//             <div>
//               <button
//                 className="flex items-center gap-2 text-gray-700 font-bold mb-4"
//                 onClick={handleClose}
//               >
//                 <AiOutlineLeft />
//                 <span>Your Cart</span>
//                 <span className="cart-num-items">{totalQuantity}</span>
//               </button>

//               {/* Empty Cart */}
//               {cartItems.length === 0 ? (
//                 <div className="text-center mt-10">
//                   <p className="text-gray-500 font-semibold">
//                     Your cart is empty!
//                   </p>
//                   <Link href="/allProducts">
//                     <button className="mt-6 px-4 py-2 bg-white text-black font-bold rounded-md border-black border-4 hover:bg-black hover:text-white">
//                       Continue Shopping
//                     </button>
//                   </Link>
//                 </div>
//               ) : (

//               <div className="product-container  space-y-4 custom-scrollbar overflow-y-auto h-[60vh] xl:h-[78%] p-2 pb-32">
//   {cartItems.map((product: any) => (
//     <div
//       key={product._id}
//       className="p-4 bg-white shadow-lg rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02] flex items-center gap-4"
//     >
//       {/* Product Image */}
//       <div className="w-24 h-24 flex justify-center items-center overflow-hidden rounded-lg">
//         <Image
//           src={urlForImage(product.images[0]).url()}
//           alt={product.name}
//           width={80}
//           height={80}
//           className="object-cover"
//         />
//       </div>

//       {/* Product Details */}
//       <div className="flex-1 space-y-1">
//         <h3 className="text-sm font-semibold text-gray-800">{product.name}</h3>
//         <p className="font-semibold text-green-500 text-sm">${product.price}</p>

//         {/* Quantity Controls */}
//         <div className="flex items-center gap-3 mt-2">
//           <span className="text-xs text-gray-500">Qty:</span>
//           <div className="flex items-center border border-gray-300 rounded-lg px-3 py-1 bg-gray-50">
//           <button
//   onClick={() => toggleCartItemQty(product._id, "minus")}
//   className={`text-red-500 text-sm hover:text-red-700 ${product.quantity === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
//   disabled={product.quantity === 1}
// >
//   <AiOutlineMinus />
// </button>
//             <span className="text-sm mx-2 font-medium">{product.quantity}</span>
//             <button
//               onClick={() => toggleCartItemQty(product._id, "plus")}
//               className="text-green-500 text-sm hover:text-green-700"
//             >
//               <AiOutlinePlus />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Remove Button */}
//       <button
//         onClick={() => onRemove(product)}
//         className="text-red-400 hover:text-red-600 text-lg"
//       >
//         <TiDeleteOutline />
//       </button>
//     </div>
//   ))}
// </div>

//               )}
//             </div>

//             {/* Subtotal & Payment Section */}
//             {cartItems.length > 0 && (
//               <div className="subtotal-section  mt-4 border-t fixed  bottom-3 w-[350px] pt-4">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-base font-semibold">Subtotal</h3>
//                   <p className="text-base font-bold text-gray-800">
//                     <span className="text-green-500">$ </span>
//                     {totalPrice}
//                   </p>
//                 </div>
//                 <Link href={'/checkout'}>
//                 <button
//                   onClick={handleCheckout}
//                   className="w-full px-6 py-3 bg-white text-black border-2 border-black font-bold rounded-lg hover:bg-black hover:text-white transition"
//                 >
//                   Go To Checkout
//                 </button>
//                 </Link>
//               </div>
//             )}
//           </motion.div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Cart;
