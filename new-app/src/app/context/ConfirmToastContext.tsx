"use client";

import React, { createContext, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ConfirmToastContext = createContext<any>(null);

export const ConfirmToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [confirmData, setConfirmData] = useState<{
    message: string;
    onConfirm: () => void;
  } | null>(null);

  const showConfirmToast = (msg: string, onConfirm: () => void) => {
    setConfirmData({ message: msg, onConfirm });
  };

  const handleConfirm = () => {
    if (confirmData?.onConfirm) {
      confirmData.onConfirm();
    }
    setConfirmData(null);
  };

  const handleCancel = () => {
    setConfirmData(null);
  };

  return (
    <ConfirmToastContext.Provider value={{ showConfirmToast }}>
      {children}
      <AnimatePresence>
        {confirmData && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} // Start hidden & above
            animate={{ opacity: 1, y: 0 }} // Fade-in & slide down
            exit={{ opacity: 0, y: -20 }} // Fade-out & slide up
            transition={{ duration: 0.4, ease: "easeInOut" }} // Smooth transition
            className="fixed top-14 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-3 rounded-lg shadow-lg z-50 text-[10px] sm:text-sm max-w-[90%] sm:max-w-md text-center"
          >
            <p>{confirmData.message}</p>
            <div className="mt-2 flex justify-center gap-4">
              <button
                onClick={handleConfirm}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
              >
                Yes
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
              >
                No
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ConfirmToastContext.Provider>
  );
};

export const useConfirmToast = () => useContext(ConfirmToastContext);
