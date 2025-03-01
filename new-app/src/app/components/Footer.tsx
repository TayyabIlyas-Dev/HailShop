'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BiSupport } from "react-icons/bi";
import { LiaQuestionCircle } from "react-icons/lia";
import { CiLinkedin, CiInstagram, CiTwitter } from "react-icons/ci";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { HailLogo } from '@/public';
import { visa, mastercard, amex, googlePay, applePay } from "@/public"; // Jo bhi import path ho


const Footer = () => {
  return (
    <footer className="bg-white bg-opacity-80 backdrop-blur-lg pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between">
          {/* Address Section */}
          <div className="w-full flex flex-col justify-center items-center sm:items-start lg:w-1/4 mb-6 lg:mb-0">
            <div className='py-3'>
              <Image
                src={HailLogo}
                alt="logo"
                className="w-28"
                width={144}
                height={36}
              />
            </div>
            <p className="text-gray-900 text-xs">
              Q2 Hackathon GIAIC KARACHI 2024,
              <br /> Q2 264840 PK.
            </p>
          </div>

          {/* Links Section */}
          <div className="w-full lg:w-1/4 mb-6 lg:mb-0 text-center sm:text-start hidden md:block">
            <h3 className="text-gray-500 font-medium mb-2">Links</h3>
            <ul className="text-gray-900 space-y-2">
              <li><Link href="#" className="hover:text-gray-900 text-sm">Home</Link></li>
              <li><Link href="/Shop" className="hover:text-gray-900 text-sm">Shop</Link></li>
              <li><Link href="/About" className="hover:text-gray-900 text-sm">About</Link></li>
              <li><Link href="/Contact" className="hover:text-gray-900 text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="w-full lg:w-1/4 mb-6 lg:mb-0 text-center sm:text-start">
            <h3 className="text-gray-500 font-medium mb-2">Help</h3>
            <ul className="text-gray-900 space-y-3">
              <li><Link href="/addComplain" className="hover:text-gray-900 text-sm ">Complain</Link></li>
              <li><Link href="#" className="hover:text-gray-900 text-sm ">Payment Options</Link></li>
              <li><Link href="#" className="hover:text-gray-900 text-sm ">Privacy Policies</Link></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="w-full lg:w-1/4">
           <div>
           <h3 className="text-gray-700 font-medium mb-2">Newsletter</h3>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter Your Email Address"
                className="flex-grow text-xs px-3 py-1 border focus:outline-none focus:ring-2"
              />
              <button
                type="submit"
                className="text-black underline rounded-md"
              >
                Subscribe
              </button>
            </form>
           </div>

           <div className="flex justify-start px-1 items-center space-x-4 py-4">
      <Image src={visa} alt="Visa" width={40} height={30} />
      <Image src={mastercard} alt="MasterCard" width={35} height={30} />
      {/* <Image src={amex} alt="American Express" width={50} height={30} /> */}
      <Image src={googlePay} alt="Google Pay" width={40} height={30} />
      <Image src={applePay} alt="Apple Pay" width={40} height={30} />
    </div>

          </div>
        </div>

        <div className="mt-8 border-t flex justify-around border-gray-300 pt-4">
          <div className='flex text-lg gap-3'>
            <BiSupport/>
            <LiaQuestionCircle/>
          </div>
          <div>
            <p className="text-gray-900 text-center text-xs sm:text-sm">
              © 2025 hail-shop.vercel.app
            </p>
          </div>
          <div className='flex justify-center items-center text-lg gap-2'>
            <Link href='https://www.facebook.com' target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="text-gray-900 text-md sm:text-xl" />
            </Link>
            <Link href='https://www.twitter.com' target="_blank" rel="noopener noreferrer">
              <CiTwitter className="text-gray-900 text-md sm:text-2xl" />
            </Link>
            <Link href='https://www.instagram.com/syco_king9935/' target="_blank" rel="noopener noreferrer">
              <CiInstagram className="text-gray-900 text-md sm:text-2xl" />
            </Link>
            <Link href='https://www.linkedin.com/in/tayyab-ilyas-ai-engineer/' target="_blank" rel="noopener noreferrer">
              <CiLinkedin className="text-gray-900 text-md sm:text-2xl" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
