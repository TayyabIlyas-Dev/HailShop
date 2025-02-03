import React from 'react'
import { IoLogoApple } from "react-icons/io";
import { SiSony } from "react-icons/si";
import { SiMsi } from "react-icons/si";
import { SiGarmin } from "react-icons/si";
import { SiRazer } from "react-icons/si";
import { SiCorsair } from "react-icons/si";
import { MdFitbit } from "react-icons/md";
import { SiDji } from "react-icons/si";
import { SiAsus } from "react-icons/si";


const IconSlider = () => {
  return (
    <div>
      <div className="relative overflow-hidden bg-[#f5f5f7] py-8 h-32 border-[1px] border-[#ffeed57d] borderLeftNone borderRightNone ">
      <div className=" flex items-center justify-center absolute whitespace-nowrap animate-slide">
       
        <p className="text-7xl text-[#272727] inline-block px-8">
         <IoLogoApple/>
        </p>
        <p className="text-7xl text-[#747474a3] inline-block px-8">
         <SiSony/>
        </p>
        <p className="text-7xl text-[#272727] inline-block px-8">
         <SiMsi/>
        </p>
        <p className="text-7xl text-[#747474a3] inline-block px-8">
         <MdFitbit/>
        </p>
        <p className="text-7xl text-[#272727] inline-block px-8">
         <SiGarmin/>
        </p>
        <p className="text-7xl text-[#747474a3] inline-block px-8">
         <SiRazer/>
        </p>
        <p className="text-7xl text-[#272727] inline-block px-8">
         <SiCorsair/>
        </p>
        <p className="text-7xl text-[#747474a3] inline-block px-8">
         <SiDji/>
        </p>
        <p className="text-7xl text-[#272727] inline-block px-8">
         <SiAsus/>
        </p>
      </div>
    </div>
    </div>
  )
}

export default IconSlider
