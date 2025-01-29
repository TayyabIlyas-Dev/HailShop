"use client";

import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

import { TiDeleteOutline } from "react-icons/ti";
import Image from "next/image";
import { urlForImage } from "@/src/sanity/lib/image";

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
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
  });

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

  const handleSubmit = () => {
    if (validateForm()) {
      alert("Order Placed Successfully!");
    }
  };

  return (
    <div className="px-8 sm:px-12 max-w-7xl mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
      <div className="flex flex-col-reverse lg:flex-row gap-6">
        <div className="w-full lg:w-2/3">
          <div className="mb-6 p-6 border border-gray-300 rounded-lg bg-white">
            <h2 className="text-xl font-semibold mb-4">Contact & Delivery</h2>
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
              <p className="text-red-500 text-sm">{errors.fullName}</p>
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
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                className="p-3 border border-gray-300 rounded w-full sm:w-1/2"
                value={formData.postalCode}
                onChange={handleChange}
              />
              {errors.postalCode && (
                <p className="text-red-500 text-sm">{errors.postalCode}</p>
              )}
            </div>
          </div>

          <div className="p-6 border border-gray-300 rounded-lg bg-white">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
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
                Cash on Delivery is only available for local orders below 60,000
                PKR.
              </p>
            )}

            <button
              onClick={handleSubmit}
              className="mt-6 p-3 bg-white  text-black rounded w-full font-semibold hover:text-white border-black border-2 transition-all hover:bg-black"
            >
              Complete Order
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="p-6 border border-gray-300 rounded-lg bg-white shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {/* <ul className="mb-4">
              <li className="flex justify-between mb-2"><span>Item 1</span><span>$10.00</span></li>
              <li className="flex justify-between mb-2"><span>Item 2</span><span>$15.00</span></li>
              <li className="flex justify-between mb-2"><span>Item 3</span><span>$20.00</span></li>
            </ul> */}
            {cartItems.map((product: any) => (
              <div
                key={product._id}
                className="p-4 bg-white "
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
                    <div>                    <h3 className="text-sm font-bold">{product.name}</h3>

                    <p className="font-semibold pt-2 text-gray-600 text-sm">
                      {" "}
                      <span className="text-green-500">$ </span>
                      {product.price}
                    </p>

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
            ))}
            <hr className="mb-4 border-gray-300" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>
                {" "}
                <span className="text-green-500">$ </span>
                {totalPrice}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
