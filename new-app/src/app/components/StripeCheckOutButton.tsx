'use client'
import React, { useContext } from 'react'
import getStripePromise from '../lib/stripe'
import { CartContext } from '../context/CartContext'

interface StripeButtonProps {
  isDisabled: boolean;
}

const StripeCheckOutButton: React.FC<StripeButtonProps> = ({ isDisabled }) => {
  const { cartItems }: any = useContext(CartContext);

  const products = cartItems.map((item: any) => ({
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }));

  const handleCheckOut = async () => {
    const stripe = await getStripePromise();
    const response = await fetch("/api/stripe-session/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: 'no-cache',
      body: JSON.stringify(products)
    });

    const data = await response.json();
    if (data.session) {
      stripe?.redirectToCheckout({ sessionId: data.session.id });
    } else {
      console.log('Session Not Created');
    }
  };

  return (
    <div>
      <button
        className={`mt-6 p-3 w-full font-semibold border-2 border-gray-800 transition-all 
          ${
            isDisabled
              ? "bg-[#000000] hover:bg-[#ffffff] text-[#ffffff] hover:text-[#000000] cursor-not-allowed border-gray-400"
              : "bg-black text-white hover:text-black hover:bg-white border-black"
          }
        `}
        onClick={handleCheckOut}
        disabled={isDisabled}
      >
        Checkout
      </button>
    </div>
  );
};

export default StripeCheckOutButton;
