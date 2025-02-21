"use client";

import React, { createContext, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import Link from "next/link";

const ThankyouContext = createContext<any>(null);

export const ThankyouToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, 1000); // Toast disappears after 2 seconds
  };

  return (
    <ThankyouContext.Provider value={{ showToast }}>
      {children}
      <AnimatePresence>
        {message && (
            <div className="text-center">
      <motion.div
      initial={{ opacity: 0, y: -20 }} // Start hidden & above
      animate={{ opacity: 1, y: 0 }} // Fade-in & slide down
      exit={{ opacity: 0, y: -20 }} // Fade-out & slide up
      transition={{ duration: 0.4, ease: "easeInOut" }} // Smooth transition
      
      className="fixed top-52 left-[30%] sm:left-[38%] border-2 border-gray-700 md:left-[40%] lg:left-[38%] transform -translate-x-1/2 bg-white hover:bg-gray-100  text-black  px-7 py-3 shadow-xl hover:shadow-[30px] z-50 text-[10px] sm:text-sm max-w-[90%] flex flex-col items-center justify-center sm:max-w-md text-center  gap-3 "
    

    >
      <motion.div
        className="bg-green-100 rounded-full my-3 flex items-center justify-center p-3 shadow-sm w-12 text-center "
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <FaCheck className="text-green-500 w-6 h-6" />
      </motion.div>
    
      <span className=" text-lg font-semibold ">Thankyou For Shopping</span>
      <span className=" text-sm ">{message}</span>
      {/* <div className="my-4">
        <Link href='/' className="add-to-cart mx-2 my-8">
          Go To Home
        </Link>
      </div> */}
    </motion.div>
    </div>
    
        )}
      </AnimatePresence>
    </ThankyouContext.Provider>
  );
};

export const useThankyouToast = () => useContext(ThankyouContext);
