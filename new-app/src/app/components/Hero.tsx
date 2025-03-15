'use client'
import {heroAirpods, heroBanner } from '@/public/index'
import Image from 'next/image'
import React from 'react';
import { motion } from "motion/react"

const Hero = () => {
    const variants3 = {
        hidden:{x:0,y:70,opacity:0.25},
        visible:{x:0,y:-10,opacity:1, transition:{delay:0.05}},
    }
  return (
    <div className='hero-section pb-24 mt-[80px]'>
        <div className='hero-contianer'>
            <div className='object-cover px-2'>
                <Image 
                    src={heroBanner}
                    height="140"
                    width="1100"
                    alt="banner"
                />
            </div>
            <div className='hero-airpods'>
                <motion.div
                    initial='hidden'
                    animate='visible'
                    variants={variants3}
                >
                    <Image 
                        src={heroAirpods}
                        height="100"
                        width="640"
                        alt="airpods"
                    />
                </motion.div>

            </div>

        </div>

    </div>
  )
}

export default Hero








// hero example 2

// "use client";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import { heroAirpods, heroBanner } from "@/public/index"; // Single Image

// const Hero = () => {
//     return (
//         <div className="relative w-full bg-white text-black overflow-hidden py-16">
//             {/* Hero Image */}
//             <motion.div
//                 initial={{ scale: 1.1, opacity: 0.5 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ duration: 1 }}
//                 className="relative w-full h-[80vh] p-3 md:h-[90vh] flex justify-center items-center"
//             >
//                 <Image
//                     src={heroAirpods}
//                     layout="fill"
//                     objectFit="cover"
//                     alt="Hero Banner"
//                     // height="500"
//                     // width="740"
//                     className="brightness-[10px] m-3"
//                 />
//             </motion.div>

//             {/* Content */}
//             <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
//                 <motion.h1
//                     initial={{ opacity: 0, y: 50 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, delay: 0.2 }}
//                     className="text-4xl md:text-6xl font-extrabold uppercase tracking-wide"
//                 >
//                     Elevate Your Audio Experience
//                 </motion.h1>

//                 <motion.p
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, delay: 0.4 }}
//                     className="mt-4 text-lg md:text-xl max-w-2xl"
//                 >
//                     Discover sound like never before with cutting-edge technology.
//                 </motion.p>

//                 <motion.button
//                     initial={{ scale: 0.8, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 1 }}
//                     transition={{ duration: 0.5, delay: 0.6 }}
//                     className="mt-6 px-6 py-3 text-lg md:text-xl bg-black text-white rounded-full shadow-md hover:scale-105 transition-transform"
//                 >
//                     Shop Now
//                 </motion.button>
//             </div>
//         </div>
//     );
// };

// export default Hero;




// hero example 3

// import { heroAirpods } from '@/public';
// import { motion } from 'framer-motion';
// import Image from 'next/image';

// export default function Hero() {
//   return (
//     <div className="bg-white min-h-screen  flex items-center justify-center relative overflow-hidden">
//       {/* Pulsing Background Glow */}
//       <div className="absolute inset-0 z-0">
//         <motion.div
//           className="w-96 h-96 bg-blue-300 opacity-25 rounded-full blur-3xl absolute top-1/4 left-1/3"
//           animate={{
//             scale: [1, 1.5, 1],
//             opacity: [0.25, 0.5, 0.25],
//           }}
//           transition={{ duration: 3, repeat: Infinity }}
//         />
//       </div>

//       {/* Hero Content */}
//       <div className="relative z-10 text-center mx-3">
//         <motion.h1
//           className="sm:text-5xl  text-3xl md:text-7xl font-extrabold text-gray-700"
//           initial={{ opacity: 0, y: -100 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           Welcome to the HAIL
//         </motion.h1>
//         <motion.p
//           className="mt-4 text-sm px-1 break-words sm:text-xl text-gray-600"
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//         >
//           Explore cutting-edge technology that redefines innovation.
//         </motion.p>

//         {/* Call-to-Action Buttons */}
//         {/* <motion.div
//           className="mt-8 flex gap-4 justify-center"
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 0.5, delay: 0.6 }}
//         >
//           <button className="add-to-cart transition">
//             Shop Now
//           </button>
//           <button className="px-16 py-3 bg-black text-white  hover:bg-transparent hover:text-black font-semibold border-2 border-black transition">
//             All Products
//           </button>
//         </motion.div> */}

//         {/* Animated Rotating Image */}
//         <motion.div
//           className="mt-3 mx-auto w-[500px]"
//           initial={{ rotateY: 0 }}
//           animate={{ rotateY: 360 }}
//           transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
//         >
//           <Image
//             src={heroAirpods}
//             alt="Gadget"
//             layout="responsive"
//             width={500}
//             height={650}
//           />
//         </motion.div>
//       </div>
//     </div>
//   );
// }
