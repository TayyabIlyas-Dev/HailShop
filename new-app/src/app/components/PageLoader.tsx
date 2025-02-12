"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const PageLoader = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname(); // Track route changes

  useEffect(() => {
    setLoading(true); // Show loader when pathname changes
    const timer = setTimeout(() => setLoading(false), 1000); // Hide after 1 sec

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
        >
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
            <p className="text-white mt-2">Loading...</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
