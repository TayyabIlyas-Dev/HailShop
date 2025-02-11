"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const developerName = "Developed by Tayyab Ilyas & Hamza Ilyas";
const typingSpeed = 40; // Har letter ka delay (ms)
const eraseSpeed = 50; // Remove hone ka speed (ms)
const delayBeforeErase = 1200; // Kitni dair name rahe phir erase ho (ms)

const About = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isDeleting && index < developerName.length) {
      // Typing Effect
      const timeout = setTimeout(() => {
        setText((prev) => prev + developerName[index]);
        setIndex(index + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else if (!isDeleting && index === developerName.length) {
      // Wait before deleting
      setTimeout(() => setIsDeleting(true), delayBeforeErase);
    } else if (isDeleting && index > 0) {
      // Erase Effect
      const timeout = setTimeout(() => {
        setText((prev) => prev.slice(0, -1));
        setIndex(index - 1);
      }, eraseSpeed);
      return () => clearTimeout(timeout);
    } else if (isDeleting && index === 0) {
      // Restart Typing
      setIsDeleting(false);
    }
  }, [index, isDeleting]);

  return (
    <div className="h-auto mt-[100px] flex flex-col items-center justify-center bg-white text-black p-6">
      <motion.h1
        className="text-3xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About Hail
      </motion.h1>

      <motion.p
        className="text-xs sm:text-sm max-w-2xl text-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Hail is committed to providing premium  accessories that combine style,  
        durability, and innovation. Our products are designed with precision to  
        enhance your experience, ensuring compatibility and seamless integration.  
        From sleek cases to high-quality charging solutions, every item is crafted  
        to meet the highest standards of performance and aesthetics.
      </motion.p>

      <p className="text-sm font-semibold mt-4">{text}</p>

     
    </div>
  );
};

export default About;
