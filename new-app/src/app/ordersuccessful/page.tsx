'use client'
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import CheckOut from "../components/CheckOut"; // Checkout ka function use karne ke liye

const Success = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const router = useRouter();

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) return;

      try {
        const response = await fetch(`/api/verify-payment?session_id=${sessionId}`);
        const data = await response.json();

        if (data.success) {
          const storedFormData = localStorage.getItem("checkoutFormData");
          if (storedFormData) {
            const formData = JSON.parse(storedFormData);

            // ⚡ Checkout page ka function manually call karna
            // CheckOut.handlePlaceOrder(formData);
            localStorage.removeItem("checkoutFormData");
          }
        } else {
          console.log("Payment verification failed");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
      }
    };

    verifyPayment();
  }, [sessionId]);

  return <div>Processing Order...</div>;
};

export default Success;
