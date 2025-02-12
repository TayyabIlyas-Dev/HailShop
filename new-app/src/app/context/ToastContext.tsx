"use client";

import React, { createContext, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ToastContext = createContext<any>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, 2000); // Toast disappears after 2 seconds
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} // Start hidden & above
            animate={{ opacity: 1, y: 0 }} // Fade-in & slide down
            exit={{ opacity: 0, y: -20 }} // Fade-out & slide up
            transition={{ duration: 0.4, ease: "easeInOut" }} // Smooth transition
            className="fixed top-14 left-[30%] sm:left-[38%]  md:left-[42%] lg:left-[44%] transform -translate-x-1/2 bg-black text-white px-6 py-3 rounded-lg shadow-lg z-50 text-[10px] sm:text-sm max-w-[90%] sm:max-w-md text-center"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
