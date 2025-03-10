// "use client";

// import React, { useContext, useEffect, useState } from "react";
// import { CartContext } from "../context/CartContext";
// import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

// import { TiDeleteOutline } from "react-icons/ti";
// import Image from "next/image";
// import { urlForImage } from "@/src/sanity/lib/image";
// import { client } from "@/src/sanity/lib/client";

// const CheckOut: React.FC = () => {
//   const {
//     onRemove,
//     toggleCartItemQty,
//     totalPrice,
//     totalQuantity,
//     cartItems,
//     showCart,
//     setShowCart,
//   }: any = useContext(CartContext);
//   const [paymentMethod, setPaymentMethod] = useState("card");
//   const [formData, setFormData] = useState({
//     email: "",
//     fullName: "",
//     address: "",
//     city: "",
//     postalCode: "",
//   });
//   const [errors, setErrors] = useState({
//     email: "",
//     fullName: "",
//     address: "",
//     city: "",
//     postalCode: "",
//   });

// const handlePlaceOrder = async () => {
//   const orderData = {
//     _type: "order",
//     fullName: formData.fullName,
//     address: formData.address,
//     city: formData.city,
//     zipCode: formData.postalCode,
//     email: formData.email,
//     cartItems: cartItems.map((item: any) => ({
//       _type: "orderItem", // ✅ Isko ek object ki tarah define karein
//       product: { _type: "reference", _ref: item._id }, // ✅ Reference alag rakhein
//       productQty: item.quantity, // ✅ Quantity ko reference se alag rakhein
//       _key: item._id || crypto.randomUUID(), // ✅ Unique key zaroori hai
//     })),
//     totalPrice: totalPrice,
//     totalQuantity: totalQuantity,
//     orderDate: new Date().toISOString(),
//   };

//   try {
//     const response = await client.create(orderData);
//     localStorage.removeItem("cartItems");
//     console.log("Order saved successfully:", response);
//     alert("Order Placed Successfully!");
//   } catch (error) {
//     console.error("Error saving order:", error);
//     alert("Something went wrong!");
//   }
// };

// const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   setFormData({ ...formData, [e.target.name]: e.target.value });
// };

//   const validateForm = () => {
//     let newErrors = {
//       email: "",
//       fullName: "",
//       address: "",
//       city: "",
//       postalCode: "",
//     };
//     let isValid = true;

//     Object.keys(formData).forEach((key) => {
//       if (!formData[key as keyof typeof formData]) {
//         newErrors[key as keyof typeof formData] = "This field is required";
//         isValid = false;
//       }
//     });

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = () => {
//     if (validateForm()) {
//       alert("Order Placed Successfully!");
//     }
//   };

//   const [updatedCart, setUpdatedCart] = useState(cartItems);

//   useEffect(() => {
//     setUpdatedCart(cartItems); // Update cart when items change
//   }, [cartItems]);

//   return (
//     <div className="px-8 sm:px-12 max-w-7xl mx-auto p-4 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
//       <div className="flex flex-col-reverse lg:flex-row gap-6">
//         <div className="w-full lg:w-2/3">
//           <div className="mb-6 p-6 border border-gray-300 rounded-lg bg-white">
//             <h2 className="text-xl font-semibold mb-4">Contact & Delivery</h2>
//             <input
//               type="text"
//               name="email"
//               placeholder="Email or mobile phone number"
//               className="p-3 border border-gray-300 rounded w-full mb-3"
//               value={formData.email}
//               onChange={handleChange}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm">{errors.email}</p>
//             )}

//             <input
//               type="text"
//               name="fullName"
//               placeholder="Full Name"
//               className="p-3 border border-gray-300 rounded w-full mb-3"
//               value={formData.fullName}
//               onChange={handleChange}
//             />
//             {errors.fullName && (
//               <p className="text-red-500 text-sm">{errors.fullName}</p>
//             )}

//             <input
//               type="text"
//               name="address"
//               placeholder="Address"
//               className="p-3 border border-gray-300 rounded w-full mb-3"
//               value={formData.address}
//               onChange={handleChange}
//             />
//             {errors.address && (
//               <p className="text-red-500 text-sm">{errors.address}</p>
//             )}

//             <div className="flex flex-col sm:flex-row gap-4">
//               <input
//                 type="text"
//                 name="city"
//                 placeholder="City"
//                 className="p-3 border border-gray-300 rounded w-full sm:w-1/2"
//                 value={formData.city}
//                 onChange={handleChange}
//               />
//               {errors.city && (
//                 <p className="text-red-500 text-sm">{errors.city}</p>
//               )}

//               <input
//                 type="text"
//                 name="postalCode"
//                 placeholder="Postal Code"
//                 className="p-3 border border-gray-300 rounded w-full sm:w-1/2"
//                 value={formData.postalCode}
//                 onChange={handleChange}
//               />
//               {errors.postalCode && (
//                 <p className="text-red-500 text-sm">{errors.postalCode}</p>
//               )}
//             </div>
//           </div>

//           <div className="p-6 border border-gray-300 rounded-lg bg-white">
//             <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
//             <label className="block mb-3">
//               <input
//                 type="radio"
//                 value="card"
//                 checked={paymentMethod === "card"}
//                 onChange={() => setPaymentMethod("card")}
//                 className="mr-2"
//               />
//               Credit/Debit Card
//             </label>
//             <label className="block mb-3">
//               <input
//                 type="radio"
//                 value="cod"
//                 checked={paymentMethod === "cod"}
//                 onChange={() => setPaymentMethod("cod")}
//                 className="mr-2"
//               />
//               Cash on Delivery
//             </label>

//             {paymentMethod === "card" && (
//               <div className="flex flex-col gap-3">
//                 <input
//                   type="text"
//                   placeholder="Card Number"
//                   className="p-3 border border-gray-300 rounded w-full"
//                 />
//                 <div className="flex flex-col sm:flex-row gap-3">
//                   <input
//                     type="text"
//                     placeholder="MM/YY"
//                     className="p-3 border border-gray-300 rounded w-full sm:w-1/2"
//                   />
//                   <input
//                     type="text"
//                     placeholder="CVC"
//                     className="p-3 border border-gray-300 rounded w-full sm:w-1/2"
//                   />
//                 </div>
//               </div>
//             )}

//             {paymentMethod === "cod" && (
//               <p className="text-sm text-gray-600 mt-3">
//                 Cash on Delivery is only available for local orders below 60,000
//                 PKR.
//               </p>
//             )}

//             <button
//               onClick={handlePlaceOrder}
//               className="mt-6 p-3 bg-white  text-black rounded w-full font-semibold hover:text-white border-black border-2 transition-all hover:bg-black"
//             >
//               Complete Order
//             </button>
//           </div>
//         </div>

//         <div className="w-full lg:w-1/3">
//           <div className="p-6 border border-gray-300 rounded-lg bg-white shadow-md">
//             <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//             {/* <ul className="mb-4">
//               <li className="flex justify-between mb-2"><span>Item 1</span><span>$10.00</span></li>
//               <li className="flex justify-between mb-2"><span>Item 2</span><span>$15.00</span></li>
//               <li className="flex justify-between mb-2"><span>Item 3</span><span>$20.00</span></li>
//             </ul> */}
//             <div className="product-container  space-y-4 custom-scrollbar overflow-y-auto h-[60vh] xl:h-[78%] p-2 pb-32">
//               {cartItems.map((product: any) => (
//                 <div
//                   key={product._id}
//                   className="p-4 bg-white shadow-sm rounded-xl transition-all duration-300 hover:shadow-md hover:scale-[1.02] flex items-center gap-4"
//                 >
//                   <div className="grid grid-cols-3 gap-4 items-center">
//                     {/* Product Image */}
//                     <div className="col-span-1 flex justify-center items-center  hover:scale-110 transition-all duration-700">
//                       <Image
//                         src={urlForImage(product.images[0]).url()}
//                         alt={product.name}
//                         width={80}
//                         height={80}
//                         className="object-contain"
//                       />
//                     </div>
//                     {/* Product Details */}
//                     <div className="col-span-2">
//                       <div>
//                         {" "}
//                         <h3 className="text-sm font-bold">{product.name}</h3>
//                         <p className="font-semibold pt-2 text-gray-600 text-sm">
//                           {" "}
//                           <span className="text-green-500">$ </span>
//                           {product.price}
//                         </p>
//                       </div>
//                       <div className="flex items-center gap-3 mt-2">
//   <span className="text-xs text-gray-500">Qty:</span>
//   <div className="flex items-center border border-gray-300 rounded-lg px-3 py-1 bg-gray-50">
//     {/* Minus Button */}
//     <button
//       onClick={() => toggleCartItemQty(product._id, "minus")}
//       className={`text-red-500 text-sm hover:text-red-700 ${
//         product.quantity === 1 ? "opacity-50 cursor-not-allowed" : ""
//       }`}
//       disabled={product.quantity === 1} // Disable when quantity is 1
//     >
//       <AiOutlineMinus />
//     </button>

//     {/* Quantity Display */}
//     <span className="text-sm mx-2 font-medium">{product.quantity}</span>

//     {/* Plus Button */}
//     <button
//       onClick={() => toggleCartItemQty(product._id, "plus")}
//       className={`text-green-500 text-sm hover:text-green-700 ${
//         product.quantity >= product.inventory ? "opacity-50 cursor-not-allowed" : ""
//       }`}
//       disabled={product.quantity >= product.inventory} // Disable when inventory is reached
//     >
//       <AiOutlinePlus />
//     </button>
//   </div>
// </div>

//                       <button
//                         onClick={() => onRemove(product)}
//                         className="mt-3 text-red-400 text-sm flex items-center gap-1"
//                       >
//                         <TiDeleteOutline /> Remove
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <hr className="mb-4 border-gray-300" />
//             <div className="flex justify-between font-bold text-lg">
//               <span>Total ({totalQuantity})</span>
//               <span>
//                 {" "}
//                 <span className="text-green-500">$ </span>
//                 {totalPrice}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckOut;

"use client";

import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import Image from "next/image";
import { urlForImage } from "@/src/sanity/lib/image";
import { client } from "@/src/sanity/lib/client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useThankyouToast } from "./ThankyouToast";
// import { useThankyouToast } from "./ThankyouToast";
import { useRouter } from "next/navigation";
import Thanks from "./Thanks";
import { useToast } from "../context/ToastContext";

const CheckOut: React.FC = () => {
  const {
    onRemove,
    toggleCartItemQty,
    totalPrice,
    totalQuantity,
    cartItems,
    showCart,
    setShowCart,
  }: any = useContext(CartContext);
  const [isDisabled, setIsDisabled] = useState(true);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
  });
  // useEffect(() => {
  //   setIsDisabled(!validateForm());
  // }, [formData]);
  const router = useRouter();

  useEffect(() => {
    setIsDisabled(!validateForm());
  }, [formData]);
  const [errors, setErrors] = useState({
    email: "",
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const { showToast } = useThankyouToast();

  // const handlePlaceOrder = async () => {
  //   const orderData = {
  //     _type: "order",
  //     fullName: formData.fullName,
  //     address: formData.address,
  //     city: formData.city,
  //     zipCode: formData.postalCode,
  //     email: formData.email,
  //     cartItems: cartItems.map((item: any) => ({
  //       _type: "orderItem",
  //       productId: item._id, // Product ID for tracking (optional)
  //       name: item.name, // Copy Product Name
  //       price: item.price, // Copy Product Price
  //       discount: item.discount || 0, // Copy Discount
  //       finalPrice: item.price - (item.price * (item.discount || 0)) / 100, // Calculate final price
  //       productQty: item.quantity, // Copy Quantity
  //       image: item.images?.[0] || null, // Copy First Image
  //       _key: item._id || crypto.randomUUID(),
  //     })),
  //     totalPrice: totalPrice,
  //     totalQuantity: totalQuantity,
  //     orderDate: new Date().toISOString(),
  //   };

  //   try {
  //     const response = await client.create(orderData);

  //     await Promise.all(
  //       cartItems.map((item: any) =>
  //         client.patch(item._id).inc({ inventory: -item.quantity }).commit()
  //       )
  //     );

  //     localStorage.removeItem("cartItems");
  //     console.log("Order saved successfully:", response);
  //     showToast("Order Placed Successfully!"); // Success toast
  //   } catch (error) {
  //     console.error("Error saving order or updating inventory:", error);
  //     showToast("Something went wrong!"); // Error toast
  //   }
  //   try {
  //     // Order place karne ka logic
  //     setOrderCompleted(true); // Order complete hone pe UI change hoga
  //   } catch (error) {
  //     console.error("Order placement failed:", error);
  //   }
  // };


  // new
  const handlePlaceOrder = async () => {
    if (!/^\d{11}$/.test(formData.postalCode)) {
      alert("Postal code must be exactly 11 digits");
      return; // Stop execution if postal code is invalid
    }
    const orderData = {
      _type: "order",
      fullName: formData.fullName,
      address: formData.address,
      city: formData.city,
      zipCode: formData.postalCode,
      email: formData.email,
      cartItems: cartItems.map((item: any) => ({
        _type: "orderItem",
        productId: item._id,
        name: item.name,
        price: item.price,
        discount: item.discount || 0,
        finalPrice: item.price - (item.price * (item.discount || 0)) / 100,
        productQty: item.quantity,
        image: item.images?.[0] || null,
        _key: item._id || crypto.randomUUID(),
      })),
      paymentMethod: paymentMethod, // 🔥 Fix applied

      totalPrice: totalPrice,
      totalQuantity: totalQuantity,
      orderDate: new Date().toISOString(),
    };
  
    try {
      const response = await client.create(orderData);
      console.log("Order saved successfully:", response);
  
      try {
        await Promise.all(
          cartItems.map((item: any) =>
            client
              .patch(item._id)
              .inc({ inventory: -Number(item.quantity) }) // Convert to number
              .commit()
          )
        );
        
        
        console.log("Inventory updated successfully.");
      } catch (inventoryError) {
        console.error("Error updating inventory:", inventoryError);
        showToast("Inventory update failed!"); // Alag se toast dikhao
      }
  
      localStorage.removeItem("cartItems");
      showToast("Order Placed Successfully!"); // Success toast
      setOrderCompleted(true); // UI update
    } catch (error) {
      console.error("Error saving order:", error);
      showToast("Something went wrong!"); // Error toast
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const validateForm = () => {
    let newErrors = {
      email: "",
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
    };
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof typeof formData]) {
        newErrors[key as keyof typeof formData] = "This field is required";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // const handleSubmit = () => {
  //   if (validateForm()) {
  //     alert("Order Placed Successfully!");
  //   }
  // };

  const [updatedCart, setUpdatedCart] = useState(cartItems);

  useEffect(() => {
    setUpdatedCart(cartItems); // Update cart when items change
  }, [cartItems]);

  return (
    <>
      <div>
        {orderCompleted ? (
         <div>
          <Thanks/>
         </div>
        ) : (
          <div>
            {cartItems.length === 0 ? (
              <div className="text-center backdrop-blur-xl mt-40 mb-40">
                <h1 className="text-4xl font-bold mb-6 text-center">
                  Checkout
                </h1>

                <p className="text-gray-800 text-xl">
                  Your cart is currently empty.
                </p>
                <Link href="/allProducts">
                  <p className="mt-6 inline-block border-2 border-black text-black px-6 py-3  font-semibold hover:bg-black hover:text-white transition">
                    Continue Shopping
                  </p>
                </Link>
              </div>
            ) : (
              <div className="px-8 sm:px-12 max-w-7xl mx-auto p-4 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold mb-6 text-center">
                  Checkout
                </h1>
                <div className="flex flex-col-reverse lg:flex-row gap-6">
                  <div className="w-full lg:w-2/3">
                    <div className="mb-6 p-6 border border-gray-300 rounded-lg bg-white">
                      <h2 className="text-xl font-semibold mb-4">
                        Contact & Delivery
                      </h2>
                      <input
                        type="text"
                        name="email"
                        placeholder="Email or mobile phone number"
                        className="p-3 border border-gray-300 rounded w-full mb-3"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                      )}

                      <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        className="p-3 border border-gray-300 rounded w-full mb-3"
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-sm">
                          {errors.fullName}
                        </p>
                      )}

                      <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        className="p-3 border border-gray-300 rounded w-full mb-3"
                        value={formData.address}
                        onChange={handleChange}
                      />
                      {errors.address && (
                        <p className="text-red-500 text-sm">{errors.address}</p>
                      )}

                      <div className="flex flex-col sm:flex-row gap-4">
                        <input
                          type="text"
                          name="city"
                          placeholder="City"
                          className="p-3 border border-gray-300 rounded w-full sm:w-1/2"
                          value={formData.city}
                          onChange={handleChange}
                        />
                        {errors.city && (
                          <p className="text-red-500 text-sm">{errors.city}</p>
                        )}

                        <input
                          type="number"
                          name="postalCode"
                          placeholder="Phone Number"
                          className="p-3 border border-gray-300 rounded w-full sm:w-1/2"
                          value={formData.postalCode}
                          onChange={handleChange}
                        />
                        {errors.postalCode && (
                          <p className="text-red-500 text-sm">
                            {errors.postalCode}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="p-6 border border-gray-300 rounded-lg bg-white">
                      <h2 className="text-xl font-semibold mb-4">
                        Payment Method
                      </h2>
                      <label className="block mb-3">
                        <input
                          type="radio"
                          value="card"
                          checked={paymentMethod === "card"}
                          onChange={() => setPaymentMethod("card")}
                          className="mr-2"
                        />
                        Credit/Debit Card
                      </label>
                      <label className="block mb-3">
                        <input
                          type="radio"
                          value="cod"
                          checked={paymentMethod === "cod"}
                          onChange={() => setPaymentMethod("cod")}
                          className="mr-2"
                        />
                        Cash on Delivery
                      </label>

                      {paymentMethod === "card" && (
                        <div className="flex flex-col gap-3">
                          <input
                            type="text"
                            placeholder="Card Number"
                            className="p-3 border border-gray-300 rounded w-full"
                          />
                          <div className="flex flex-col sm:flex-row gap-3">
                            <input
                              type="text"
                              placeholder="MM/YY"
                              className="p-3 border border-gray-300 rounded w-full sm:w-1/2"
                            />
                            <input
                              type="text"
                              placeholder="CVC"
                              className="p-3 border border-gray-300 rounded w-full sm:w-1/2"
                            />
                          </div>
                        </div>
                      )}

                      {paymentMethod === "cod" && (
                        <p className="text-sm text-gray-600 mt-3">
                          Cash on Delivery is only available for local orders
                          below 60,000 PKR.
                        </p>
                      )}

                      {/* <button
                  onClick={handlePlaceOrder}
                  className="mt-6 p-3 bg-white text-black rounded w-full font-semibold hover:text-white border-black border-2 transition-all hover:bg-black"
                >
                  Complete Order */}
                      <button
                        onClick={handlePlaceOrder}
                        disabled={isDisabled}
                        className={`mt-6 p-3  w-full font-semibold border-2 border-gray-800 transition-all 
                    ${isDisabled
                            ? "bg-[#000000] hover:bg-[#ffffff]  text-[#ffffff] hover:text-[#000000] cursor-not-allowed border-gray-400"
                            : "bg-white text-black hover:text-white hover:bg-black border-black"
                          }
                  `}
                      >
                        Complete Order
                      </button>
                    </div>
                  </div>

                  <div className="w-full lg:w-1/3">
                    <div className="p-6 border border-gray-300 rounded-lg bg-white shadow-md">
                      <h2 className="text-xl font-semibold mb-4">
                        Order Summary
                      </h2>
                      <div className="product-container space-y-4 custom-scrollbar overflow-y-auto h-[60vh] xl:h-[78%] p-2 pb-32">
                        {cartItems.map((product: any) => {
                          const withoutDiscountPrice = product.discount
                            ? product.price -
                            (product.price * product.discount) / 100
                            : product.price;

                          return (
                            <div
                              key={product._id}
                              className="p-4 bg-white shadow-sm rounded-xl transition-all duration-300 hover:shadow-md hover:scale-[1.02] flex items-center gap-4"
                            >
                              <div className="grid grid-cols-3 gap-4 items-center">
                                <div className="col-span-1 flex justify-center items-center hover:scale-110 transition-all duration-700">
                                  <Image
                                    src={urlForImage(product.images[0]).url()}
                                    alt={product.name}
                                    width={80}
                                    height={80}
                                    className="object-contain"
                                  />
                                </div>
                                <div className="col-span-2">
                                  <div>
                                    <h3 className="text-lg font-bold">
                                      {product.name}
                                    </h3>
                                    <div className="sm:text-[17px] text-[15px] font-medium flex items-center gap-2 relative">
                                      {/* Current Price */}
                                      <span className="text-green-500">$</span>
                                      {Math.floor(withoutDiscountPrice)}

                                      {/* Original Price with Neon Glow */}
                                      {product.discount > 0 && (
                                        <div>
                                          <motion.span
                                            className="relative text-[9px] font-bold px-2 py-0 rounded-md"
                                            initial={{ rotate: -5, scale: 0.8, opacity: 0 }}
                                            animate={{ rotate: 0, scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                          >
                                            <span className="text-white bg-black px-2 py-[3px] rounded-lg shadow-sm ">
                                              {product.discount}% OFF
                                            </span>
                                          </motion.span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3 mt-2">
                                    <span className="text-xs text-gray-500">
                                      Qty:
                                    </span>
                                    <div className="flex items-center border border-gray-300 rounded-lg px-3 py-1 bg-gray-50">
                                      <button
                                        onClick={() =>
                                          toggleCartItemQty(
                                            product._id,
                                            "minus"
                                          )
                                        }
                                        className={`text-red-500 text-sm hover:text-red-700 ${product.quantity === 1
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                          }`}
                                        disabled={product.quantity === 1}
                                      >
                                        <AiOutlineMinus />
                                      </button>
                                      <span className="text-sm mx-2 font-medium">
                                        {product.quantity}
                                      </span>
                                      <button
                                        onClick={() =>
                                          toggleCartItemQty(product._id, "plus")
                                        }
                                        className={`text-green-500 text-sm hover:text-green-700 ${product.quantity >= product.inventory
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                          }`}
                                        disabled={
                                          product.quantity >= product.inventory
                                        }
                                      >
                                        <AiOutlinePlus />
                                      </button>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => onRemove(product)}
                                    className="mt-3 text-red-400 text-sm flex items-center gap-1"
                                  >
                                    <TiDeleteOutline /> Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <hr className="mb-4 border-gray-300" />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total ({totalQuantity})</span>
                        <span>
                          <span className="text-green-500">$ </span>
                          {totalPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CheckOut;
