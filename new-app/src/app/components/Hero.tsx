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












