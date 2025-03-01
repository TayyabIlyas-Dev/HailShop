"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";

const Thanks = () => {
  return (
    <div className="flex items-center justify-center  bg-gray-000 ">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-gray-50  hover:shadow-sm rounded-lg border-b-2 py-24 border-black/5  p-8 text-center w-full"
      >
       <h1 className="text-3xl font-bold text-center text-black mb-4 flex flex-col items-center gap-3">
  <motion.div
    className="bg-black rounded-full p-3 shadow-sm flex hover:scale-105 items-center justify-center"
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    <FaCheck className="text-white w-9 h-9" />
  </motion.div>
  Thanks For Shopping!
</h1>

        <p className="text-gray-500 text-base mb-6">
          We truly appreciate your support! Your order is being processed, and
          we can’t wait to serve you again with more amazing products.
        </p>
        <Link href="/">
          <motion.p
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 inline-block border-2 border-black text-black px-6 py-3 font-semibold hover:bg-black hover:text-white transition"
          >
            Return Home
          </motion.p>
        </Link>
      </motion.div>
    </div>
  );
};

export default Thanks;


// "use client";

// import Link from "next/link";
// import { motion } from "framer-motion";

// const Thanks = () => {
//     return (
//         <div
//             className="flex items-center justify-center  pt-20 pb-28 h-full px-4"
//             style={{
//                 background: "linear-gradient(to bottom, #121212, #e0e0e0)",
//             }}
//         >
//             <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, ease: "easeOut" }}
//                 className="bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl border-2 border-black/35 px-10 py-6 text-center max-w-3xl"
//             >
//                 <h1 className="text-4xl font-semibold text-white mb-4 drop-shadow-lg">
//                      Thanks For Shopping!
//                 </h1>
//                 <p className="text-gray-300 text-lg mb-6">
//                     We truly appreciate your support! Your order is being processed, and
//                     we can’t wait to serve you again with more amazing products.
//                 </p>
//                 <Link href="/">
//                     <motion.p
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         className="mt-4 inline-block border-2 border-white/90 hover:border-black/60 bg-black text-white px-6 py-3 font-semibold rounded-lg hover:bg-white hover:text-black transition-all"
//                     >
//                         Return Home
//                     </motion.p>
//                 </Link>
//             </motion.div>
//         </div>
//     );
// };

// export default Thanks;
