'use client'
import { HailLogo } from '@/public'
import Image from 'next/image'
import Link from 'next/link'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r  from-purple-400 to-fuchsia-400 via-cyan-300 animate-gradient-x py-10 px-10 font-sans tracking-wide w-full">
      <div className="max-w-2xl mx-auto text-center">
        <div className='flex-row justify-center items-center hover:scale-110 transition-all duration-300'>
          <Link href="/">
            <Image
              src={HailLogo}
              height="100"
              width="700"
              alt="HAIL"
              className="object-cover inline-block w-[190px] p-3"
            />
          </Link>
        </div>

        <p className="text-sm mt-8 text-gray-700">
        Welcome to HAIL, your ultimate destination for premium tech accessories! From the latest laptops and sleek tablets to high-quality AirPods and cutting-edge drones, we bring you the best in technology. Our curated collection combines performance, style, and innovation, offering products that elevate your digital lifestyle. Shop with HAIL and discover the perfect accessory to enhance your tech experience!
               {/* <a href='javascript:void(0)' className="text-sm font-semibold text-blue-500">Read more...</a> */}
        </p>

        <ul className="flex flex-wrap justify-center gap-6 mt-8">
      <li>
        <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF className="text-blue-600 text-3xl" />
        </Link>
      </li>
      <li>
        <Link href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-blue-500 text-3xl" />
        </Link>
      </li>
      <li>
        <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-pink-600 text-3xl" />
        </Link>
      </li>
      <li>
        <Link href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn className="text-blue-700 text-3xl" />
        </Link>
      </li>
    </ul>
      </div>
      

      <hr className="my-10 border-gray-500  md:text-center sm:text-center" />

      <div className="flex max-md:flex-col gap-4 ">
        <ul className="flex flex-wrap gap-4">
          <li className="text-sm">
            <a href='javascript:void(0)' className='text-gray-700 font-semibold hover:underline'>Terms of Service</a>
          </li>
          <li className="text-sm">
            <a href='javascript:void(0)' className='text-gray-700 font-semibold hover:underline'>Privacy Policy</a>
          </li>
          <li className="text-sm">
            <a href='javascript:void(0)' className='text-gray-700 font-semibold hover:underline'>Security</a>
          </li>
        </ul>
        <p className='text-sm text-gray-700 md:ml-auto'>© HAIL. All rights reserved.</p>
      </div>

    </footer>
  )
}

export default Footer
