"use client";
import React, { useContext, useEffect } from "react";
import CheckOut from "../components/CheckOut";
// import { Footer } from "../components";
import { CartContext } from "../context/CartContext";

const Page = () => {
  const {loading }: any = useContext(CartContext);
    //  Force reload the page on component mount
    // useEffect(() => {
    //   if (typeof window !== "undefined" && !window.location.hash) {
    //     window.location.hash = "reloaded";
    //     window.location.reload();
    //   }
    // }, []);
  
    if (loading) {
      return (
        <div className="my-[80px] text-center flex items-center justify-center px-5">
          <p>Loading your favourites...</p>
        </div>
      );
    }

  return (
    <div className="bg-gray-100">
      <div className="pt-20 pb-4">
        <CheckOut />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Page;
