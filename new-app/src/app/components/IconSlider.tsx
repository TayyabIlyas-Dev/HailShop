import React from 'react'
import { PiCurrencyBtcFill } from "react-icons/pi";
import { SiPolygon } from "react-icons/si";
import { TbBrandAirbnb } from "react-icons/tb";
import { SiDogecoin } from "react-icons/si";
import { SiTether } from "react-icons/si";
import { RiXrpLine } from "react-icons/ri";
import { SiEthereum } from "react-icons/si";
import { SiCardano } from "react-icons/si";

const IconSlider = () => {
  return (
    <div>
      <div className="relative overflow-hidden bg-[#f5f5f7] py-8 h-32 border-[1px] border-[#ffeed57d] borderLeftNone borderRightNone ">
      <div className=" flex items-center justify-center absolute whitespace-nowrap animate-slide">
       
        <p className="text-7xl text-[#e09800] inline-block px-8">
         <PiCurrencyBtcFill/>
        </p>
        <p className="text-7xl text-[#e09900a9] inline-block px-8">
         <SiPolygon/>
        </p>
        <p className="text-7xl text-[#e09800] inline-block px-8">
         <SiEthereum/>
        </p>
        <p className="text-7xl text-[#e09900a9] inline-block px-8">
         <TbBrandAirbnb/>
        </p>
        <p className="text-7xl text-[#e09800] inline-block px-8">
         <SiDogecoin/>
        </p>
        <p className="text-7xl text-[#e09900a9] inline-block px-8">
         <SiTether/>
        </p>
        <p className="text-7xl text-[#e09800] inline-block px-8">
         <RiXrpLine/>
        </p>
        <p className="text-7xl text-[#e09900a9] inline-block px-8">
         <SiCardano/>
        </p>
      </div>
    </div>
    </div>
  )
}

export default IconSlider
